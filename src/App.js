import useSpeech from "./hooks/useSpeech";
import Response from "./components/response";

function App() {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;
  const { isListening, setIsListening, transcript } = useSpeech();
  
  return (
    <div className="App" style={{ padding: 30 }}>
      <h1>Speech to Text test</h1>
      <button onClick={() => setIsListening(prev => !prev)}>
        {isListening ? "Stop" : "Start"}
      </button>

      <p><strong>Text:</strong> {transcript}</p>
      {!isListening && transcript.trim() !== "" && (
        <Response transcript={transcript} apiKey={OPENAI_API_KEY} />
      )}
    </div>
  );
}

export default App;
