import { useState, useEffect, useRef } from "react";

const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let currentText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript + " ";
      }
      setTranscript(prev => (prev + " " + currentText).trim());
    };
    
    recognition.onend = () => { };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      return;
    }
    if (isListening) {
      setTranscript("");
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isListening]);

  return {
    isListening,
    setIsListening,
    transcript
  };
};

export default useSpeech;