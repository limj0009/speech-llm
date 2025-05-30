const unlockSpeech = () => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance('');
    window.speechSynthesis.speak(speech);
  }
};
