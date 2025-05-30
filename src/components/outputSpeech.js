export const outputSpeech = (text) => {
  if (!text || !window.speechSynthesis) {
    return;
  }
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US'; 
  speech.rate = 2;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};