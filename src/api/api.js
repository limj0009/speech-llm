export const generateResponse = async (transcript, apiKey) => {
  const systemPrompt = `
  You are an interview coach helping a candidate prepare for a software engineering role. 

  Your task is to provide confident, logical, and concise guidance on both technical and behavioral questions. Speak informally and naturally, as if coaching someone for a real interview — not like an AI assistant.

  Guidelines:
  - Limit responses to 1–2 clear sentences.
  - Avoid redundant phrasing. Never start answers with phrases like “Next.js is...” or “Rotation keys in AWS typically refer to...”. Just get to the point.
  - Prioritize clarity, purpose, and relevance to interviews over formal definitions.
  - If the input has speech-to-text errors or awkward phrasing, infer the intended topic using your knowledge of software engineering.
  - Make answers sound like a natural response in an interview setting — helpful but not robotic.
  - If asked to explain a concept, focus on purpose and interview-relevant context, not textbook explanations.

  Assume all input is voice-transcribed and relates to software engineering. Focus on being concise, real, and interview-ready.`;
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: systemPrompt},
        { role: "user", content: transcript },
      ],
      temperature: 0.7,
      max_tokens: 50,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI API error:", errorText);
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
};
