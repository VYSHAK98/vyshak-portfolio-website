"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { SCRIPT } from "@/lib/data";

export interface CallMessage {
  who: "AGENT" | "CALLER" | "SYSTEM";
  text: string;
}

/**
 * Mobile voice-agent call simulation. Same SCRIPT content as the desktop
 * AiPipeline (same real product, same transcript), different timing/
 * ending copy per the mobile spec: turns at 900 + i*2300ms, ends 2.6s
 * after the last turn with a "Call ended" system line.
 */
export function useCallSimulation(transcriptRef: RefObject<HTMLElement | null>) {
  const [calling, setCalling] = useState(false);
  const [stage, setStage] = useState(-1);
  const [timer, setTimer] = useState("00:00");
  const [messages, setMessages] = useState<CallMessage[]>([
    { who: "SYSTEM", text: "Tap Start Call to run a simulated voice session." },
  ]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const callingRef = useRef(calling);

  useEffect(() => {
    callingRef.current = calling;
  }, [calling]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      if (interval.current) clearInterval(interval.current);
    },
    []
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const box = transcriptRef.current;
      if (box) box.scrollTop = box.scrollHeight;
    });
  };

  const say = (who: CallMessage["who"], text: string, nextStage: number) => {
    setMessages((m) => [...m, { who, text }]);
    setStage(nextStage);
    scrollToBottom();
  };

  const endCall = (manual: boolean) => {
    if (interval.current) clearInterval(interval.current);
    setCalling(false);
    setStage(-1);
    if (!manual) say("SYSTEM", "Call ended.", -1);
  };

  const startCall = () => {
    setCalling(true);
    setMessages([]);
    setStage(0);
    setTimer("00:00");
    let sec = 0;
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      sec++;
      setTimer(`${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`);
    }, 1000);
    SCRIPT.forEach((m, i) => {
      timers.current.push(
        setTimeout(
          () => {
            if (callingRef.current) say(m.who, m.text, m.stage);
          },
          900 + i * 2300
        )
      );
    });
    timers.current.push(
      setTimeout(
        () => {
          if (callingRef.current) endCall(false);
        },
        900 + SCRIPT.length * 2300 + 2600
      )
    );
  };

  const toggleCall = () => (calling ? endCall(true) : startCall());

  return { calling, stage, timer, messages, toggleCall };
}
