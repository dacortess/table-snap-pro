import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured');
      return NextResponse.json(
        { 
          availableModels: 0,
          error: 'API key no configurada' 
        },
        { status: 200 }
      );
    }

    console.log('Fetching models from OpenRouter...');
    
    const allModels = await fetchAvailableModels(apiKey);
    console.log(`Total models fetched: ${allModels.length}`);
    
    const visionModels = filterVisionModels(allModels);
    console.log(`Vision models after filter: ${visionModels.length}`);
    
    const companyModels = filterByCompanies(visionModels);
    console.log(`Company models after filter: ${companyModels.length}`);
    
    const freeModels = filterFreeModels(companyModels);
    console.log(`Free models after filter: ${freeModels.length}`);

    return NextResponse.json({
      availableModels: freeModels.length,
      totalModels: allModels.length,
      visionModels: visionModels.length,
      companyModels: companyModels.length,
      freeModels: freeModels.length,
      models: freeModels.map(m => ({
        id: m.id,
        name: m.name,
        contextLength: m.context_length
      })).slice(0, 10) // 10 primeros modelos
    });

  } catch (error) {
    console.error('Error checking model availability:', error);
    return NextResponse.json(
      { 
        availableModels: 0,
        error: error instanceof Error ? error.message : 'Error al consultar modelos disponibles' 
      },
      { status: 200 }
    );
  }
}