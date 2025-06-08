import { useState, useRef } from "react";
import { transcribeSpeech } from "../api/transcribe";

const useSpeech = (apiKey, handleUserAnswer) => {
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioRef.current.push(e.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const speech = new Blob(audioRef.current, { type: 'audio/mp4' });
        const text = await transcribeSpeech(speech, apiKey);
        audioRef.current = [];
        handleUserAnswer(text);
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (err) {
      console.error(err);
      alert("There is an issue with the recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsListening(prev => !prev);
  };

  return {
    isListening,
    toggleListening
  };
};

export default useSpeech;
