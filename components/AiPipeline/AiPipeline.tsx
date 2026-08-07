"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AiPipeline.module.css";
import { NODES, SCRIPT, REPLIES } from "@/lib/data";

interface Message {
  who: "AGENT" | "CALLER" | "SYSTEM";
  text: string;
}

const WAVE_BARS = Array.from({ length: 26 }, (_, i) => ({
  dur: (0.55 + (i % 5) * 0.13).toFixed(2) + "s",
  delay: (i * 0.045).toFixed(2) + "s",
}));

export default function AiPipeline() {
  const [calling, setCalling] = useState(false);
  const [stage, setStage] = useState(-1);
  const [callTimer, setCallTimer] = useState("00:00");
  const [messages, setMessages] = useState<Message[]>([
    { who: "SYSTEM", text: "Press Start Call to run a simulated voice session, or type a question below." },
  ]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const callInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const callingRef = useRef(calling);

  useEffect(() => {
    callingRef.current = calling;
  }, [calling]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      if (callInterval.current) clearInterval(callInterval.current);
    },
    []
  );

  const scrollTranscript = () => {
    requestAnimationFrame(() => {
      const box = transcriptRef.current;
      if (box) box.scrollTop = box.scrollHeight;
    });
  };

  const say = (who: Message["who"], text: string, nextStage: number) => {
    setMessages((m) => [...m, { who, text }]);
    setStage(nextStage);
    scrollTranscript();
  };

  const endCall = (manual: boolean) => {
    if (callInterval.current) clearInterval(callInterval.current);
    setCalling(false);
    setStage(-1);
    if (!manual) say("SYSTEM", "Call complete. Transcript streamed live, then persisted to the session record.", -1);
  };

  const startCall = () => {
    setCalling(true);
    setMessages([]);
    setStage(0);
    setCallTimer("00:00");
    let sec = 0;
    if (callInterval.current) clearInterval(callInterval.current);
    callInterval.current = setInterval(() => {
      sec++;
      setCallTimer(`${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`);
    }, 1000);
    SCRIPT.forEach((m, i) => {
      timers.current.push(
        setTimeout(
          () => {
            if (callingRef.current) say(m.who, m.text, m.stage);
          },
          700 + i * 2300
        )
      );
    });
    timers.current.push(
      setTimeout(
        () => {
          if (callingRef.current) endCall(false);
        },
        700 + SCRIPT.length * 2300 + 900
      )
    );
  };

  const toggleCall = () => (calling ? endCall(true) : startCall());

  const handleAskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const input = e.currentTarget;
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    say("CALLER", q, 0);
    const l = q.toLowerCase();
    const reply = l.includes("stack") || l.includes("built")
      ? REPLIES.stack
      : l.includes("hire") || l.includes("job") || l.includes("role")
        ? REPLIES.hire
        : l.includes("latency") || l.includes("fast") || l.includes("speed")
          ? REPLIES.latency
          : REPLIES.default;
    [1, 2, 3, 4].forEach((s, i) => {
      timers.current.push(setTimeout(() => setStage(s), 220 + i * 240));
    });
    timers.current.push(setTimeout(() => say("AGENT", reply, 4), 1180));
  };

  const callCta = calling ? "End Call" : "Start Call";

  return (
    <section id="ai" data-screen-label="AI Engineering" className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div data-rv className={styles.eyebrow}>
          05 — AI ENGINEERING
        </div>
        <h2 data-rv className={styles.heading}>
          Engineering AI experiences.
        </h2>
        <p data-rv className={styles.intro}>
          A model is easy. The interface around it is the hard part — capture, latency, streaming
          state, interruption, and the moment a user stops trusting it. Start the demo below to
          watch the pipeline I build light up, stage by stage.
        </p>

        <div className={styles.panels}>
          <div data-rv className={styles.transcriptPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelHeaderLeft}>
                <span
                  className={styles.statusDot}
                  style={{
                    background: calling ? "var(--accent)" : "#3a3a3a",
                    boxShadow: calling ? "0 0 10px rgba(79,140,255,.9)" : "none",
                  }}
                />
                <span className={styles.statusText}>VOICE AGENT — {calling ? "LIVE" : "IDLE"}</span>
              </div>
              <span className={styles.timer}>{callTimer}</span>
            </div>

            <div data-transcript ref={transcriptRef} className={styles.transcript}>
              {messages.map((m, i) => {
                const agent = m.who === "AGENT";
                const sys = m.who === "SYSTEM";
                return (
                  <div key={i} className={styles.msgRow} style={{ justifyContent: agent || sys ? "flex-start" : "flex-end" }}>
                    <div
                      className={styles.bubble}
                      style={{
                        borderRadius: agent || sys ? "4px 14px 14px 14px" : "14px 14px 4px 14px",
                        background: sys ? "transparent" : agent ? "rgba(79,140,255,.09)" : "rgba(255,255,255,.045)",
                        borderColor: sys ? "rgba(255,255,255,.06)" : agent ? "rgba(79,140,255,.22)" : "rgba(255,255,255,.08)",
                      }}
                    >
                      <div className={styles.bubbleWho}>{m.who}</div>
                      <div className={styles.bubbleText} style={{ color: sys ? "var(--text-muted)" : "var(--text)" }}>
                        {m.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.transcriptFooter}>
              <div className={styles.wave} style={{ opacity: calling ? 1 : 0.16 }}>
                {WAVE_BARS.map((b, i) => (
                  <span
                    key={i}
                    className={`${styles.waveBar} anim-vWave`}
                    style={{ animationDuration: b.dur, animationDelay: b.delay }}
                  />
                ))}
              </div>
              <div className={styles.controls}>
                <button
                  data-magnetic
                  data-cursor={callCta}
                  onClick={toggleCall}
                  className={styles.callBtn}
                  style={{
                    color: calling ? "#fff" : "#050505",
                    background: calling ? "transparent" : "#fff",
                    borderColor: calling ? "rgba(255,255,255,.2)" : "#fff",
                  }}
                >
                  {callCta}
                </button>
                <input
                  data-ai-input
                  placeholder="or type a question…"
                  aria-label="Ask the agent"
                  className={styles.aiInput}
                  onKeyDown={handleAskKeyDown}
                />
              </div>
            </div>
          </div>

          <div data-rv className={styles.pipelinePanel}>
            <div className={styles.pipelineLabel}>PIPELINE</div>
            <div className={styles.nodeList}>
              {NODES.map((n, i) => {
                const active = stage === i;
                const past = stage > i;
                const border = active ? "rgba(79,140,255,.55)" : past ? "rgba(79,140,255,.2)" : "rgba(255,255,255,.08)";
                const bg = active ? "rgba(79,140,255,.1)" : "rgba(255,255,255,.012)";
                const dot = active ? "var(--accent)" : past ? "rgba(79,140,255,.45)" : "#2e2e2e";
                const glow = active ? "rgba(79,140,255,.8)" : "transparent";
                const color = active ? "#fff" : "#c9c9c9";
                const shift = active ? "8px" : "0px";
                const link = i === NODES.length - 1 ? "transparent" : past || active ? "rgba(79,140,255,.5)" : "rgba(255,255,255,.08)";
                return (
                  <div key={n.label}>
                    <div
                      className={styles.nodeItem}
                      style={{ borderColor: border, background: bg, transform: `translateX(${shift})` }}
                    >
                      <span className={styles.nodeDot} style={{ background: dot, boxShadow: `0 0 10px ${glow}` }} />
                      <div className={styles.nodeText}>
                        <div className={styles.nodeLabel} style={{ color }}>
                          {n.label}
                        </div>
                        <div className={styles.nodeMeta}>{n.meta}</div>
                      </div>
                    </div>
                    <div className={styles.nodeLink} style={{ background: link }} />
                  </div>
                );
              })}
            </div>
            <div className={styles.authRow}>
              <span className={styles.authPill}>JWT</span>
              <span className={styles.authPill}>OAuth</span>
              <span className={styles.authPill}>Session Management</span>
              <span className={styles.authPill}>SDK Distribution</span>
            </div>
          </div>
        </div>

        <p className={styles.footnote}>SIMULATED TRANSCRIPT — MIRRORS THE PRODUCTION CHATBOT SDK BEHAVIOUR</p>
      </div>
    </section>
  );
}
