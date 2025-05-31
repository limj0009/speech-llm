import './App.css';
import useSpeechWhisper from "./hooks/useSpeechWhisper";
import Response from "./components/response";
import { cancelSpeech } from "./components/cancelSpeech";
import { unlockSpeech } from "./components/unlockSpeech";

function App() {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;
  const { isListening, toggleListening, transcript } = useSpeechWhisper(OPENAI_API_KEY);
  
  const handleMuteButton = () => {
    cancelSpeech();
  };
  
  return (
    <div className="App">
      <h2 className="transcript">{transcript || "Say something..."}</h2>

      <div className="button-container">
        <button
          className={`control-button ${isListening ? "stop" : "start"}`}
          onClick={() => {
            unlockSpeech();
            toggleListening();
          }}
        >
          {isListening ? "Recording" : "Start"}
        </button>

        <button
          className="control-button mute"
          onClick={() => {
            unlockSpeech(); 
            handleMuteButton();
          }}
        >
          Mute
        </button>
      </div>

      {!isListening && transcript.trim() !== "" && (
        <Response
          transcript={transcript}
          apiKey={OPENAI_API_KEY}
        />
      )}
    </div>
  );
}

export default App;
