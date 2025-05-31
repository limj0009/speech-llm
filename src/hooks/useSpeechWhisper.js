import { useState, useRef } from "react";
import { transcribeSpeech } from "../api/transcribe";

const useSpeechWhisper = (apiKey) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef([]);

  const startRecording = async () => {
    try {
        alert("Requesting microphone access...");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        alert("Microphone access granted!");
        const mediaRecorder = new MediaRecorder(stream);
        alert("MediaRecorder initialized!");
        mediaRecorder.ondataavailable = (e) => {
            alert("Data available from recorder");
        if (e.data.size > 0) {
            audioRef.current.push(e.data);
        }
        };

        mediaRecorder.onstop = async () => {
             alert("Recording stopped, preparing to transcribe...");
        const speech = new Blob(audioRef.current, { type: 'audio/webm' });
        const text = await transcribeSpeech(speech, apiKey);
        alert("Transcription complete!");
        setTranscript(text);
        audioRef.current = [];
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
    } catch (err) {
        console.error("ERROR", err);
        alert("SPEECH TO TEXT ERROR");
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
    toggleListening,
    transcript,
    setTranscript
  };
};

export default useSpeechWhisper;
