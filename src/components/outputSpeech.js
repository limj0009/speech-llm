export const outputSpeech = (text) => {
  if (!text || !window.speechSynthesis) {
    return;
  }
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US'; 
  speech.pitch = 1;


  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  speech.rate = isMobile ? 1.3 : 2;

  window.speechSynthesis.speak(speech);
};