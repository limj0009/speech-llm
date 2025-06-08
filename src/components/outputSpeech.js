export const outputSpeech = (text) => {
  if (!text || !window.speechSynthesis) {
    return;
  }
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US'; 
  speech.pitch = 1;
  speech.rate = 3;

  window.speechSynthesis.speak(speech);
};