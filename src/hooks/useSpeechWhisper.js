import { useState, useRef } from "react";
import { transcribeSpeech } from "../api/transcribe";

const useSpeechWhisper = (apiKey) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const speech = new Blob(audioRef.current, { type: 'audio/webm' });
      const text = await transcribeSpeech(speech, apiKey);
      setTranscript(text);
      audioRef.current = [];
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
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
    toggleListening,
    transcript,
    setTranscript
  };
};

export default useSpeechWhisper;
