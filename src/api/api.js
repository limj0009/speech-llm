export const generateResponse = async (transcript, apiKey) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: "Answer in one to two sentences."},
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
