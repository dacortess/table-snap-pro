import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No se proporcionó ninguna imagen' },
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const mimeType = imageFile.type;
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key no configurada en las variables de entorno' },
        { status: 500 }
      );
    }

    console.log('Enviando imagen a OpenRouter API...');

    const models = [
      'google/gemini-2.0-flash-exp:free',
      'qwen/qwen-2-vl-7b-instruct:free',
      'meta-llama/llama-3.2-11b-vision-instruct:free',
    ];

    let response;
    let lastError;

    for (const model of models) {
      try {
        console.log(`Intentando con modelo: ${model}`);
        
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'Table Snap Pro',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `Extract the data from the table in the image and return it as a JSON object.
    The JSON should represent the table structure, where keys are column headers and values
    are lists of corresponding cell values e.g. {"Column 1": ["value 1.1", "value 1.2"], "Column 2": ["value 2.1", "value 2.2"]}.
    If there are no explicit headers, create generic ones like Column 1, Column 2, etc.
    Return ONLY the JSON object, without any additional text or markdown formatting.`,
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
          console.log(`Éxito con modelo: ${model}`);
          break;
        }

        if (response.status === 429) {
          const errorData = await response.json();
          console.log(`Rate limit con ${model}, intentando siguiente modelo...`);
          lastError = errorData;
          continue;
        }

        lastError = await response.json();
        console.log(`Error con ${model}:`, lastError);
        continue;

      } catch (err) {
        console.error(`Error al intentar con ${model}:`, err);
        lastError = err;
        continue;
      }
    }

    if (!response || !response.ok) {
      console.error('Todos los modelos fallaron. Último error:', lastError);
      return NextResponse.json(
        { 
          error: 'Todos los modelos están temporalmente saturados. Por favor, intenta de nuevo en unos minutos o considera agregar tu propia API key de OpenRouter.',
          details: 'Los modelos gratuitos tienen límites de uso. Intenta nuevamente en 1-2 minutos.'
        },
        { status: 429 }
      );
    }

    const data = await response.json();
    console.log('Respuesta de OpenRouter:', data);

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No se recibió respuesta de la API' },
        { status: 500 }
      );
    }

    let jsonData;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        const jsonString = jsonMatch[1].trim();
        jsonData = JSON.parse(jsonString);
      } else {
        // Intentar parsear directamente
        jsonData = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
      console.log('Contenido recibido:', content);
      return NextResponse.json(
        { 
          error: 'Error al parsear la respuesta de la API. La respuesta no es un JSON válido.',
          rawContent: content 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: jsonData });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error instanceof Error ? error.message : 'Error desconocido'}` },
      { status: 500 }
    );
  }
}