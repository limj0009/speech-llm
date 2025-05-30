export const outputSpeech = (text) => {
  if (!text || !window.speechSynthesis) {
    return;
  }
  const speech = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const samantha = voices.find(voice => voice.name === "Samantha");

  if (samantha) {
    speech.voice = samantha;
  }
  speech.lang = 'en-US'; 
  speech.rate = 2;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};