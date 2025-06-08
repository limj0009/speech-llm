import { generateResponse } from "../api/api";
import { outputSpeech } from "./outputSpeech";

export async function startInterviewProcess(topic, apiKey, setChatLog, setDisplayText) {
  if (!topic) {
    return alert("Please enter a topic!");
  }
  const systemPrompt = "You are a technical interviewer. Ask one question at a time about the topic that you might see in a technical interview. After each answer, give brief feedback, then ask the next question. Preferrably, the your next generated questions should take it account to previous questions and user's response. Wait for the user's answer before continuing.";
  const initialMessages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Please interview me on the topic, ${topic.trim()}` }
  ];
  setChatLog(initialMessages);

  try {
    const question = await generateResponse(initialMessages, apiKey);
    const updated = [...initialMessages, { role: "assistant", content: question }];
    setChatLog(updated);
    setDisplayText(question);
    outputSpeech(question);
    return true;
  } catch (err) {
    console.error(err);
    return false; 
  }
};
