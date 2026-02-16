const GROQ_API_KEY = process.env.GROQ_API_KEY;

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

  if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set');
    return res.status(500).json({ 
      error: 'API key not configured. Please add GROQ_API_KEY to your Vercel environment variables.',
      help: 'Get a free API key at https://console.groq.com'
    });
  }

  try {
    console.log('Making request to Groq API...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
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
        }],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response received');

    // Check for API errors
    if (data.error) {
      console.error('Groq API Error:', data.error);
      return res.status(500).json({ 
        error: 'Groq API Error', 
        details: data.error.message || JSON.stringify(data.error)
      });
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure:', JSON.stringify(data));
      return res.status(500).json({ 
        error: 'Invalid API response structure',
        details: 'The API response did not contain expected choices field'
      });
    }

    let resultText = data.choices[0].message.content;
    console.log('Result text preview:', resultText.substring(0, 100));
    
    // Clean up markdown formatting
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