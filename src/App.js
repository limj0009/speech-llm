import './App.css';
import { useState, useRef } from "react";
import useSpeech from "./hooks/useSpeech";
import { cancelSpeech } from "./components/cancelSpeech";
import { generateResponse } from "./api/api";
import { outputSpeech } from "./components/outputSpeech";

function App() {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [displayText, setDisplayText] = useState("Say something...");
  const { isListening, toggleListening } = useSpeech(OPENAI_API_KEY, handleUserAnswer);
  const topicInputRef = useRef();

  function handleMuteButton() {
    cancelSpeech();
  }

  async function startInterview() {
    const chosenTopic = topicInputRef.current.value.trim();
    if (!chosenTopic) return alert("Please enter a topic!");

    const initialMessages = [
      {
        role: "system",
        content: "You are a technical interviewer. Ask one question at a time about the topic. After each answer, give brief feedback, then ask the next question. Wait for the applicant's answer before continuing."
      },
      {
        role: "user",
        content: `Please interview me on: ${chosenTopic}`
      }
    ];

    setInterviewStarted(true);
    setMessages(initialMessages);

    try {
      const firstQuestion = await generateResponse(initialMessages, OPENAI_API_KEY);
      const updated = [...initialMessages, { role: "assistant", content: firstQuestion }];
      setMessages(updated);
      setDisplayText(firstQuestion);
      outputSpeech(firstQuestion);
    } catch (e) {
      setDisplayText("Error starting interview.");
      console.error(e);
    }
  }

  async function handleUserAnswer(userAnswerText) {
    const updatedMessages = [...messages, { role: "user", content: userAnswerText }];

    try {
      const reply = await generateResponse(updatedMessages, OPENAI_API_KEY);
      const newMessages = [...updatedMessages, { role: "assistant", content: reply }];
      setMessages(newMessages);
      setDisplayText(reply);
      outputSpeech(reply);
    } catch (e) {
      setDisplayText("Error responding.");
      console.error(e);
    }
  }

  return (
    <div className="App">
      {!interviewStarted ? (
        <>
          <h2 className="transcript">Hello! What topic would you like the interview to be based on?</h2>
          <input
            type="text"
            ref={topicInputRef}
            placeholder="e.g. Frontend, Java, Spring"
            style={{ fontSize: "18px", padding: "10px", borderRadius: "8px", width: "80%", maxWidth: "300px", marginBottom: "20px" }}
          />
          <button className="control-button start" onClick={startInterview}>Start Interview</button>
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

            <button className="control-button mute" onClick={handleMuteButton}>
              Mute
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
