/**
 * Senior-friendly slow TTS voice assistant using Web Speech API
 */

export function speak(text: string, enabled: boolean = true) {
  if (!enabled) return;
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  try {
    // Cancel any ongoing speech to prevent queuing up multiple reads
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR"; // Korean voice
    
    // Slower, clearer speech rate for elders
    utterance.rate = 0.82; 
    utterance.pitch = 1.0; // Comforting mid-register tone
    
    // Try to find a high quality Korean voice if available, but fallback happily
    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang.startsWith("ko"));
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn("Speech Synthesis error:", error);
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
