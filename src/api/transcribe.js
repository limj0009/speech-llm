export async function transcribeSpeech (speech, apiKey) {
  const formData = new FormData();
  formData.append("file", speech, "audio.mp4");
  formData.append("model", "whisper-1");
  formData.append("language", "en");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Whisper API error:", errorText);
    return "";
  }

  const data = await response.json();
  return data.text;
};