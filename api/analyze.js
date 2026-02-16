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
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

    const data = await response.json();

    if (!data.content || !data.content[0]) {
      throw new Error('Invalid response from API');
    }

    let resultText = data.content[0].text;
    resultText = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const analysis = JSON.parse(resultText);

    return res.status(200).json(analysis);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze code', 
      details: error.message 
    });
  }
}