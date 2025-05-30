import './App.css';
import useSpeech from "./hooks/useSpeech";
import Response from "./components/response";
import { cancelSpeech } from "./components/cancelSpeech";

function App() {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;
  const { isListening, setIsListening, transcript } = useSpeech();
  
  const handleMuteButton = () => {
    cancelSpeech();
  };
  
  return (
    <div className="App">
      <h2 className="transcript">{transcript || "Say something..."}</h2>

      <div className="button-container">
        <button
          className={`control-button ${isListening ? "stop" : "start"}`}
          onClick={() => setIsListening(prev => !prev)}
        >
          {isListening ? "Recording" : "Start"}
        </button>

        <button
          className="control-button mute"
          onClick={handleMuteButton}
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
