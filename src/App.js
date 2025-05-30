import useSpeech from "./hooks/useSpeech";

function App() {
  const { isListening, setIsListening, transcript } = useSpeech();

  return (
    <div className="App">
      <h1>Speech to Text test</h1>
      <button onClick={() => setIsListening(prev => !prev)}>
        {isListening ? "Stop" : "Start"}
      </button>

      <p><strong>Text:</strong> {transcript}</p>
    </div>
  );
}

export default App;
