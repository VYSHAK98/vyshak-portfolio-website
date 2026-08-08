"use client";

import { useRef } from "react";
import styles from "./MobileAi.module.css";
import { NODES } from "@/lib/data";
import { useCallSimulation } from "@/lib/mobile/useCallSimulation";

const WAVE_BARS = Array.from({ length: 20 }, (_, i) => ({
  dur: (0.5 + (i % 5) * 0.12).toFixed(2) + "s",
  delay: (i * 0.05).toFixed(2) + "s",
}));

export default function MobileAi() {
  const transcriptRef = useRef<HTMLDivElement>(null);
  const { calling, stage, timer, messages, toggleCall } = useCallSimulation(transcriptRef);
  const cta = calling ? "End Call" : "Start Call";

  return (
    <section id="ai" className={styles.section}>
      <div data-rv className={styles.eyebrow}>
        04 — AI ENGINEERING
      </div>
      <h2 data-rv className={styles.heading}>
        Engineering AI experiences.
      </h2>
      <p data-rv className={styles.intro}>
        A model is easy. The interface around it is the hard part. Tap start to watch the
        pipeline light up, stage by stage.
      </p>

      <div data-rv className={styles.panel}>
        <div className={styles.consoleHeader}>
          <div className={styles.consoleStatus}>
            <span
              className={styles.statusDot}
              style={{
                background: calling ? "var(--accent)" : "#3a3a3a",
                boxShadow: calling ? "0 0 10px rgba(79,140,255,.9)" : "none",
              }}
            />
            <span className={styles.statusText}>VOICE AGENT — {calling ? "LIVE" : "IDLE"}</span>
          </div>
          <span className={styles.timer}>{timer}</span>
        </div>

        <div ref={transcriptRef} className={styles.transcript}>
          {messages.map((m, i) => {
            const agent = m.who === "AGENT";
            const sys = m.who === "SYSTEM";
            return (
              <div key={i} className={styles.msgRow} style={{ justifyContent: agent || sys ? "flex-start" : "flex-end" }}>
                <div
                  className={styles.bubble}
                  style={{
                    borderRadius: sys ? "10px" : agent ? "4px 14px 14px 14px" : "14px 14px 4px 14px",
                    background: sys ? "transparent" : agent ? "rgba(79,140,255,.1)" : "rgba(255,255,255,.045)",
                    borderColor: sys ? "transparent" : agent ? "rgba(79,140,255,.28)" : "rgba(255,255,255,.08)",
                  }}
                >
                  <div className={styles.bubbleWho}>{m.who}</div>
                  <div className={styles.bubbleText} style={{ color: sys ? "#8f8f8f" : "#fff" }}>
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.consoleFooter}>
          <div className={styles.wave} style={{ opacity: calling ? 1 : 0.16 }}>
            {WAVE_BARS.map((b, i) => (
              <span
                key={i}
                className={`${styles.waveBar} anim-mWave`}
                style={{ animationDuration: b.dur, animationDelay: b.delay }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={toggleCall}
            className={styles.callBtn}
            style={{
              color: calling ? "#fff" : "#050505",
              background: calling ? "transparent" : "#fff",
              borderColor: calling ? "rgba(255,255,255,.2)" : "#fff",
            }}
          >
            {cta}
          </button>
        </div>
      </div>

      <div data-rv className={styles.panel}>
        <div className={styles.pipelineLabel}>PIPELINE</div>
        <div className={styles.nodeList}>
          {NODES.map((n, i) => {
            const active = stage === i;
            const past = stage > i;
            const lit = active || past;
            const border = active ? "rgba(79,140,255,.55)" : "rgba(255,255,255,.08)";
            const bg = active ? "rgba(79,140,255,.08)" : "transparent";
            const dot = lit ? "var(--accent)" : "#2e2e2e";
            const label = lit ? "#fff" : "#7a7a7a";
            const link = i === NODES.length - 1 ? "transparent" : lit ? "rgba(79,140,255,.5)" : "rgba(255,255,255,.08)";
            return (
              <div key={n.label}>
                <div className={styles.nodeItem} style={{ borderColor: border, background: bg }}>
                  <span className={styles.nodeDot} style={{ background: dot }} />
                  <div>
                    <div className={styles.nodeLabel} style={{ color: label }}>
                      {n.label}
                    </div>
                    <div className={styles.nodeMeta}>{n.meta}</div>
                  </div>
                </div>
                <div className={styles.connector} style={{ background: link }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
