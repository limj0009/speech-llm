import './App.css';
import { useState, useRef } from "react";
import useSpeech from "./hooks/useSpeech";
import { cancelSpeech } from "./components/cancelSpeech";
import { outputSpeech } from "./components/outputSpeech";
import { startInterviewProcess } from "./components/interview";
import { generateResponse } from "./api/api";

function App() {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const topicRef = useRef();
  const { isListening, toggleListening } = useSpeech(OPENAI_API_KEY, handleUserAnswer);

  async function startInterview() {
    const topic = topicRef.current?.value;
    const success = await startInterviewProcess(topic, OPENAI_API_KEY, setChatLog, setDisplayText);
    if (success) {
      setInterviewStarted(true);
    } else {
        setDisplayText("Failed to start the interview.");
    }
  }

  async function handleUserAnswer(userAnswer) {
    const updatedChatLog = [...chatLog, { role: "user", content: userAnswer }];
    try {
      const response = await generateResponse(updatedChatLog, OPENAI_API_KEY);
      const newChatLog = [...updatedChatLog, { role: "assistant", content: response }];
      setChatLog(newChatLog);
      setDisplayText(response);
      outputSpeech(response);
    } catch (err) {
      console.error(err);
      setDisplayText("Something went wrong with our interviewer...");
    }
  }

  return (
    <div className="App">
      {!interviewStarted ? (
        <>
          <h1 className="header">Mock Interviewer</h1>
          <h3 className="subheader">Powered by gpt-4.1-nano and Whisper</h3>
          <h2 className="transcript">Hello! What topic would you like the interview to be based on?</h2>
          <input
            type="text"
            ref={topicRef}
            placeholder="e.g. Frontend, Java, Spring"
          />
          <button className="control-button startinterview" onClick={startInterview}>Start Interview</button>
        </>
      ) : (
        <>
          <h2 className="transcript">{displayText}</h2>
          <div className="button-container">
            <button
              className={`control-button ${isListening ? "stop" : "start"}`}
              onClick={() => {
                cancelSpeech();
                toggleListening();
              }}
            >
              {isListening ? "Recording" : "Start"}
            </button>
            <button className="control-button mute" onClick={cancelSpeech}>
              Mute
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
