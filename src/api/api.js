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
        { role: "system", content: "You are an interview coach for the role of software engineer, provide me with guidance on upcoming questions during a technical (or behavioral interview), please explain your thought process to the answers in a confident and logical manner. Respond within one or two sentences. Also, the response should remove redundant phrasing. For example, if I ask \"Rotation key in AWS\" your response should remove redundant phrasing from \"Rotation keys in AWS typically refer to rotating encryption keys, such as those used in AWS Key Management Service (KMS), to enhance security by periodically updating cryptographic keys and reducing risk exposure.\" to \"rotating encryption keys, such as those used in AWS Key Management Service (KMS), to enhance security by periodically updating cryptographic keys and reducing risk exposure\". Or if I am asking \"What is Next.js\" , don't include redundant phrase like \"Next.js is ...\" at the start of the response. Also, you should realize that ALL input you will receive will be a speech to text input related to software engineering topics. If the input text seems to have typo, please your best knowledge to fill in what the input is in relation to software engineering and the fact it is speech to text. Another thing, please tailor your answer to how it would sound as an answer in an interview. Make it informal! Don't make it sound so AI and prioritize things like its purpose, etc"},
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
