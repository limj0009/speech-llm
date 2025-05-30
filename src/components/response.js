import { useEffect, useState } from "react";
import { generateResponse } from "../api/api";

const Response = ({ transcript, apiKey }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transcript.trim() === "") {
      setResponse("");
      return;
    }

    setLoading(true);
    generateResponse(transcript, apiKey).then(res => setResponse(res)).catch(err => {
        console.error(err);
        setResponse("Failed to get response.");
      }).finally(() => setLoading(false));
  }, [transcript, apiKey]);

  return (
    <p>
      <strong>Response:</strong> {loading ? "Loading..." : response}
    </p>
  );
};

export default Response;
