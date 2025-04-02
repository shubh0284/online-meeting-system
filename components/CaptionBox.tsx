"use client";

interface CaptionBoxProps {
  active: boolean;
  transcript: string;
  captionLog: string[];
  onClose: () => void;
}

import { X } from "lucide-react";

export default function CaptionBox({
  active,
  transcript,
  captionLog,
  onClose,
}: CaptionBoxProps) {
  if (!active) return null;

  return (
    <>
      {/* Transcript Modal */}
      <div className="fixed bottom-24 right-4 z-50 w-[400px] max-h-[60vh] overflow-y-auto rounded-xl bg-black/90 p-4 shadow-lg text-white">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Transcript</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="space-y-2 text-sm overflow-y-scroll max-h-[45vh] pr-2">
          {captionLog.length === 0 ? (
            <p className="text-gray-400">No captions yet...</p>
          ) : (
            captionLog.map((line, index) => (
              <p key={index} className="bg-white/10 rounded p-2">
                {line}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Floating current caption at bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4">
        <div className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl text-base shadow-lg text-center">
          {transcript}
        </div>
      </div>
    </>
  );
}