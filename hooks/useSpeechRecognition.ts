"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export const useSpeechRecognition = (active: boolean) => {
  const [words, setWords] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!active) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true; // 👈 true -> double double
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const result = event.results[event.resultIndex];
      const finalTranscript = result[0].transcript.trim();

      // 👇 Split and take the last 10 words
      const newWords = finalTranscript.split(/\s+/);
      setWords(prev => {
        const combined = [...prev, ...newWords];
        return combined.slice(-10);
      });

      // 👇 Reset auto-clear timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setWords([]);
      }, 3000);
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
    };

    recognition.start();

    return () => {
      recognition.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active]);

  return { transcript: words.join(" ") };
};