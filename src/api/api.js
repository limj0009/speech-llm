export async function generateResponse(transcript, apiKey) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      messages: transcript,
      temperature: 0.7,
      max_tokens: 50,
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI API error:", errorText);
    return"";
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
};