import { useEffect, useRef } from "react";
import { generateResponse } from "../api/api";
import { outputSpeech } from "./outputSpeech";

const Response = ({ transcript, apiKey }) => {
  useEffect(() => {
    if (transcript.trim() === "") {
      return;
    }

  generateResponse(transcript, apiKey)
    .then(res => {
      outputSpeech(res);
    })
    .catch(err => {
      console.error("LLM error:", err);
    });
    
  }, [transcript, apiKey]);

  return null;
};

export default Response;
