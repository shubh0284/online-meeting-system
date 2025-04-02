"use client";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface CaptionBoxProps {
  active: boolean;
}

export default function CaptionBox({ active }: CaptionBoxProps) {
  const { transcript } = useSpeechRecognition(active);

  if (!active || !transcript) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4">
      <div className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl text-base shadow-lg text-center">
        {transcript}
      </div>
    </div>
  );
}