import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients } = await req.json();
    
    if (!ingredients || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Ingredients are required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const prompt = `Create exactly 3 delicious, budget-friendly recipes that can be made with some or all of these ingredients: ${ingredients.join(', ')}.

For each recipe, provide:
- A creative and appealing title
- A brief 1-2 sentence summary
- Preparation time in minutes (keep under 30 minutes)
- Number of servings
- 2-3 relevant tags (like "Quick", "Healthy", "Comfort Food", "Italian", etc.)
- Complete ingredient list with measurements
- Step-by-step cooking instructions

Return the response as a valid JSON array with this exact structure:
[
  {
    "title": "Recipe Title",
    "summary": "Brief description of the dish",
    "timeMinutes": 25,
    "servings": 4,
    "tags": ["tag1", "tag2", "tag3"],
    "ingredients": ["ingredient with measurement", "another ingredient"],
    "steps": ["step 1", "step 2", "step 3"]
  }
]

Make sure the recipes are practical, use common cooking techniques, and result in satisfying meals.`;

    console.log('Calling OpenAI API with prompt for ingredients:', ingredients);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful cooking assistant that creates practical, budget-friendly recipes. Always respond with valid JSON only, no additional text.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received');
    
    let generatedContent = data.choices?.[0]?.message?.content?.trim() || '';
    // Strip code fences if present
    generatedContent = generatedContent.replace(/```(?:json)?/g, '').trim();
    console.log('Generated content:', generatedContent);

    // Parse the JSON response from OpenAI with fallbacks
    let parsed: any;
    try {
      parsed = JSON.parse(generatedContent);
    } catch (parseError) {
      // Try to extract the first JSON array from the text
      const match = generatedContent.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch (innerErr) {
          console.error('Failed to parse extracted JSON array:', innerErr);
          console.error('Raw content:', generatedContent);
          throw new Error('Invalid JSON response from OpenAI');
        }
      } else {
        console.error('Failed to parse OpenAI response as JSON:', parseError);
        console.error('Raw content:', generatedContent);
        throw new Error('Invalid JSON response from OpenAI');
      }
    }

    // Support either an array or an object with a recipes property
    const recipesArray = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.recipes) ? parsed.recipes : null;
    if (!recipesArray) {
      console.error('Parsed content is not a recipes array:', parsed);
      throw new Error('Model did not return a recipes array');
    }

    // Add unique IDs to recipes
    const recipesWithIds = recipesArray.map((recipe: any, index: number) => ({
      id: `generated-${Date.now()}-${index}`,
      ...recipe
    }));

    console.log('Successfully generated recipes:', recipesWithIds.length);

    return new Response(
      JSON.stringify({ recipes: recipesWithIds }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-recipes function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recipes', 
        details: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});