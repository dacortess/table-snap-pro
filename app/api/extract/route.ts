import { NextRequest } from 'next/server';

interface OpenRouterModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  context_length: number;
  architecture?: {
    modality?: string;
    input_modalities?: string[];
    output_modalities?: string[];
  };
  supported_parameters?: string[];
}

interface ProcessingStep {
  step: string;
  status: 'processing' | 'success' | 'error';
  message: string;
  timestamp: number;
}

async function fetchAvailableModels(apiKey: string): Promise<OpenRouterModel[]> {
  const response = await fetch('https://openrouter.ai/api/v1/models', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener modelos de OpenRouter');
  }

  const data = await response.json();
  return data.data || [];
}

function filterVisionModels(models: OpenRouterModel[]): OpenRouterModel[] {
  return models.filter(model => {
    const supportsVision = 
      model.architecture?.modality === 'multimodal' ||
      model.architecture?.modality === 'multimodal->text' ||
      (model.architecture?.input_modalities && 
       model.architecture.input_modalities.includes('image')) ||
      model.id.toLowerCase().includes('vision') ||
      model.id.toLowerCase().includes('vl') ||
      model.id.toLowerCase().includes('gemini') ||
      model.id.toLowerCase().includes('gpt-4') ||
      model.id.toLowerCase().includes('claude');
    
    return supportsVision;
  });
}

function filterByCompanies(models: OpenRouterModel[]): OpenRouterModel[] {
  const allowedCompanies = ['openai', 'google', 'anthropic', 'meta', 'qwen'];
  
  return models.filter(model => {
    const modelId = model.id.toLowerCase();
    return allowedCompanies.some(company => modelId.includes(company));
  });
}

function filterFreeModels(models: OpenRouterModel[]): OpenRouterModel[] {
  return models.filter(model => {
    const promptPrice = parseFloat(model.pricing.prompt);
    const completionPrice = parseFloat(model.pricing.completion);
    return promptPrice === 0 && completionPrice === 0;
  });
}

function sortByContextLength(models: OpenRouterModel[]): OpenRouterModel[] {
  return models.sort((a, b) => {
    const contextA = a.context_length || 0;
    const contextB = b.context_length || 0;
    return contextB - contextA;
  });
}

function sendProgressUpdate(
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController,
  step: ProcessingStep
) {
  const data = `data: ${JSON.stringify(step)}\n\n`;
  controller.enqueue(encoder.encode(data));
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File;

        if (!imageFile) {
          sendProgressUpdate(encoder, controller, {
            step: 'error',
            status: 'error',
            message: 'No se proporcionó ninguna imagen',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString('base64');
        const mimeType = imageFile.type;
        const imageUrl = `data:${mimeType};base64,${base64Image}`;

        const apiKey = process.env.OPENROUTER_API_KEY;
        
        if (!apiKey) {
          sendProgressUpdate(encoder, controller, {
            step: 'error',
            status: 'error',
            message: 'API key no configurada en las variables de entorno',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        sendProgressUpdate(encoder, controller, {
          step: 'fetching_models',
          status: 'processing',
          message: 'Consultando modelos disponibles en OpenRouter...',
          timestamp: Date.now()
        });

        let allModels: OpenRouterModel[];
        try {
          allModels = await fetchAvailableModels(apiKey);
          sendProgressUpdate(encoder, controller, {
            step: 'fetching_models',
            status: 'success',
            message: `${allModels.length} modelos encontrados`,
            timestamp: Date.now()
          });
        } catch (err) {
          sendProgressUpdate(encoder, controller, {
            step: 'fetching_models',
            status: 'error',
            message: 'Error al consultar modelos disponibles',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        sendProgressUpdate(encoder, controller, {
          step: 'filtering_vision',
          status: 'processing',
          message: 'Filtrando modelos con capacidad de visión...',
          timestamp: Date.now()
        });

        const visionModels = filterVisionModels(allModels);
        sendProgressUpdate(encoder, controller, {
          step: 'filtering_vision',
          status: 'success',
          message: `${visionModels.length} modelos con visión encontrados`,
          timestamp: Date.now()
        });

        sendProgressUpdate(encoder, controller, {
          step: 'filtering_companies',
          status: 'processing',
          message: 'Filtrando modelos de OpenAI, Google, Anthropic, Meta y Qwen...',
          timestamp: Date.now()
        });

        const companyModels = filterByCompanies(visionModels);
        sendProgressUpdate(encoder, controller, {
          step: 'filtering_companies',
          status: 'success',
          message: `${companyModels.length} modelos de empresas seleccionadas`,
          timestamp: Date.now()
        });

        sendProgressUpdate(encoder, controller, {
          step: 'filtering_free',
          status: 'processing',
          message: 'Filtrando modelos gratuitos...',
          timestamp: Date.now()
        });

        const freeModels = filterFreeModels(companyModels);
        
        if (freeModels.length === 0) {
          sendProgressUpdate(encoder, controller, {
            step: 'filtering_free',
            status: 'error',
            message: 'No se encontraron modelos gratuitos disponibles',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        const sortedModels = sortByContextLength(freeModels);

        sendProgressUpdate(encoder, controller, {
          step: 'filtering_free',
          status: 'success',
          message: `${sortedModels.length} modelos gratuitos disponibles (ordenados por contexto)`,
          timestamp: Date.now()
        });

        let response;
        let lastError;
        let successfulModel = null;

        for (const model of sortedModels) {
          try {
            sendProgressUpdate(encoder, controller, {
              step: 'trying_model',
              status: 'processing',
              message: `Intentando con modelo: ${model.name || model.id}`,
              timestamp: Date.now()
            });
            
            response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                'X-Title': 'Table Snap Pro',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: model.id,
                messages: [
                  {
                    role: 'user',
                    content: [
                      {
                        type: 'text',
                        text: `
                          Analyze the image and extract the table data exactly as shown.

                          Rules:
                          - Detect column headers from the top row and row headers from the first column.
                          - Preserve the original text exactly as it appears (language, symbols, currency signs, numbers).
                          - Do NOT translate, normalize, calculate, infer, or reorder values.
                          - Preserve the original top-to-bottom and left-to-right order of the table.
                          - If a cell is empty, return an empty string "".
                          - If there are no explicit column headers, create generic ones: "Column 1", "Column 2", etc.

                          Output format (STRICT):
                          - Return a single JSON object.
                          - The FIRST key MUST be "Row Header" (if row headers exist).
                          - All other keys MUST follow in the exact left-to-right order of the table columns.
                          - Each key maps to an array of cell values ordered top-to-bottom.
                          - The length of all arrays MUST be identical.

                          Return ONLY valid JSON.
                          Do NOT include explanations, markdown, or extra text.
                          `,
                      },
                      {
                        type: 'image_url',
                        image_url: {
                          url: imageUrl,
                        },
                      },
                    ],
                  },
                ],
              }),
            });

            if (response.ok) {
              successfulModel = model.name || model.id;
              sendProgressUpdate(encoder, controller, {
                step: 'trying_model',
                status: 'success',
                message: `Éxito con modelo: ${successfulModel}`,
                timestamp: Date.now()
              });
              break;
            }

            if (response.status === 429) {
              const errorData = await response.json();
              lastError = errorData;
              sendProgressUpdate(encoder, controller, {
                step: 'trying_model',
                status: 'error',
                message: `Rate limit con ${model.name || model.id}, intentando siguiente...`,
                timestamp: Date.now()
              });
              continue;
            }

            lastError = await response.json();
            sendProgressUpdate(encoder, controller, {
              step: 'trying_model',
              status: 'error',
              message: `Error con ${model.name || model.id}, intentando siguiente...`,
              timestamp: Date.now()
            });
            continue;

          } catch (err) {
            lastError = err;
            sendProgressUpdate(encoder, controller, {
              step: 'trying_model',
              status: 'error',
              message: `Error al intentar con ${model.name || model.id}`,
              timestamp: Date.now()
            });
            continue;
          }
        }

        if (!response || !response.ok) {
          sendProgressUpdate(encoder, controller, {
            step: 'error',
            status: 'error',
            message: 'Todos los modelos fallaron. Por favor, intenta de nuevo en unos minutos.',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        sendProgressUpdate(encoder, controller, {
          step: 'processing_response',
          status: 'processing',
          message: 'Procesando respuesta del modelo...',
          timestamp: Date.now()
        });

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
          sendProgressUpdate(encoder, controller, {
            step: 'processing_response',
            status: 'error',
            message: 'No se recibió respuesta del modelo',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        let jsonData;
        try {
          const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) {
            const jsonString = jsonMatch[1].trim();
            jsonData = JSON.parse(jsonString);
          } else {
            jsonData = JSON.parse(content);
          }
          
          sendProgressUpdate(encoder, controller, {
            step: 'processing_response',
            status: 'success',
            message: 'Respuesta procesada correctamente',
            timestamp: Date.now()
          });
        } catch (parseError) {
          sendProgressUpdate(encoder, controller, {
            step: 'processing_response',
            status: 'error',
            message: 'Error al parsear la respuesta JSON',
            timestamp: Date.now()
          });
          controller.close();
          return;
        }

        sendProgressUpdate(encoder, controller, {
          step: 'complete',
          status: 'success',
          message: 'Datos extraídos exitosamente',
          timestamp: Date.now()
        });

        const finalData = `data: ${JSON.stringify({ 
          type: 'data', 
          data: jsonData,
          model: successfulModel 
        })}\n\n`;
        controller.enqueue(encoder.encode(finalData));
        controller.close();

      } catch (error) {
        sendProgressUpdate(encoder, controller, {
          step: 'error',
          status: 'error',
          message: `Error interno del servidor: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          timestamp: Date.now()
        });
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}