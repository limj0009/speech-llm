export const cancelSpeech = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};