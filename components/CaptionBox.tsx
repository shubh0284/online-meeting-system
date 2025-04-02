'use client';

import { Minus, Plus, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CaptionBoxProps {
  active: boolean;
  transcript: string;
  captionLog: string[];
  onClose: () => void;
}

export default function CaptionBox({
  active,
  transcript,
  captionLog,
  onClose,
}: CaptionBoxProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [captionLog]);

  const downloadTranscript = () => {
    const blob = new Blob([captionLog.join(' ')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!active) return null;

  return (
    <>
      {/* Transcript Panel */}
      <div className="fixed bottom-24 right-4 z-50 w-[400px] rounded-xl bg-black/90 shadow-lg text-white">
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
          <h2 className="text-lg font-bold">Transcript</h2>
          <div className="flex gap-2 items-center">
            <button onClick={downloadTranscript} title="Download Transcript">
              <Download size={18} />
            </button>
            <button onClick={() => setMinimized((prev) => !prev)} title="Minimize">
              {minimized ? <Plus size={18} /> : <Minus size={18} />}
            </button>
          </div>
        </div>

        {!minimized && (
          <div
            ref={scrollRef}
            className="px-4 pb-4 text-sm overflow-y-auto max-h-[45vh] pr-1 leading-relaxed whitespace-pre-wrap"
          >
            {captionLog.join(' ')}
          </div>
        )}
      </div>

      {/* Floating live caption */}
      {transcript && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4">
          <div className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl text-base shadow-lg text-center">
            {transcript}
          </div>
        </div>
      )}
    </>
  );
}