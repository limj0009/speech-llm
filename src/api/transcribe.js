import axios from 'axios';

export const transcribeSpeech = async (speech, apiKey) => {
  const formData = new FormData();
  formData.append("file", speech, "speech.webm");
  formData.append("model", "whisper-1");
  formData.append("language", "en");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error("Whisper API error:", error);
    return "";
  }
};
