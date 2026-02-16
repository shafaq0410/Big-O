const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured. Please add ANTHROPIC_API_KEY to your Vercel environment variables.' });
  }

  console.log('API Key present:', ANTHROPIC_API_KEY ? 'Yes' : 'No');
  console.log('API Key prefix:', ANTHROPIC_API_KEY ? ANTHROPIC_API_KEY.substring(0, 10) + '...' : 'N/A');

  try {
    console.log('Making request to Anthropic API...');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are an expert algorithm analyst. Analyze the following code and provide ONLY a JSON response with this exact structure:

{
  "timeComplexity": "O(...)",
  "timeExplanation": "Brief explanation of why",
  "spaceComplexity": "O(...)",
  "spaceExplanation": "Brief explanation of why",
  "detailedAnalysis": "Detailed breakdown of the algorithm's behavior, loops, recursion, data structures used, and how they contribute to the complexity"
}

Language: ${language || 'auto'}

Code:
\`\`\`
${code}
\`\`\`

Respond ONLY with valid JSON, no markdown, no preamble.`
        }]
      })
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const data = await response.json();
    console.log('Response data preview:', JSON.stringify(data).substring(0, 300));

    // Check for API errors
    if (data.error) {
      console.error('Anthropic API Error:', data.error);
      return res.status(500).json({ 
        error: 'Anthropic API Error', 
        details: data.error.message || JSON.stringify(data.error)
      });
    }

    if (!data.content || !data.content[0]) {
      console.error('Invalid response structure. Full response:', JSON.stringify(data));
      return res.status(500).json({ 
        error: 'Invalid API response structure',
        details: 'The API response did not contain expected content field'
      });
    }

    let resultText = data.content[0].text;
    console.log('Result text preview:', resultText.substring(0, 100));
    
    resultText = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const analysis = JSON.parse(resultText);
    console.log('Successfully parsed analysis');

    return res.status(200).json(analysis);

  } catch (error) {
    console.error('Caught error:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      error: 'Failed to analyze code', 
      details: error.message 
    });
  }
}
