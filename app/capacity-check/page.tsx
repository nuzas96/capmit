"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { setDemoPreview, useDemoPreview } from "../demo-preview";

const loads = [
  { name: "Time", before: 87, after: 103 },
  { name: "Mental", before: 72, after: 81 },
  { name: "Social", before: 61, after: 84 },
] as const;

function Sketch({ kind, className = "" }: { kind: "Time" | "Mental" | "Social" | "leaf"; className?: string }) {
  const paths = {
    Time: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
    Mental: "M23 9 C18 2 10 6 11 13 C3 12 1 23 8 27 C3 35 12 42 18 38 C21 44 27 42 26 34 L26 10 C31 2 40 8 37 15 C45 18 45 28 38 30 C44 39 31 44 27 37 M12 14 L16 18 M8 27 L16 26 M18 38 L18 31 M37 15 L32 20 M38 30 L32 29",
    Social: "M16 5 C7 5 7 18 16 18 C25 18 25 5 16 5 Z M34 7 C26 7 27 19 34 19 C43 19 42 7 34 7 Z M3 39 C3 17 27 17 28 39 M29 25 C39 20 46 29 45 40",
    leaf: "M9 38 C0 20 18 8 38 4 C43 25 31 39 9 38 Z M7 45 L29 15 M17 30 L16 21 M22 25 L32 25",
  };
  return <svg className={`sketch ${className}`} viewBox="0 0 48 48" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

function Frame({ className = "" }: { className?: string }) {
  return <svg className={`planner-frame ${className}`} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M 15 1 C 100 0 238 2 345 1 Q 358 1 358 7 L 359 91 Q 358 99 345 99 C 234 98 111 100 14 99 Q 1 99 2 92 L 1 8 Q 0 1 15 1 Z" /></svg>;
}

function Accent({ className = "" }: { className?: string }) {
  return <svg className={`pen-accent ${className}`} viewBox="0 0 24 30" aria-hidden="true"><path d="M 6 8 L 11 2 M 11 15 L 20 11 M 12 22 L 20 24" /></svg>;
}

export default function Home() {
  const included = useDemoPreview();
  const [animating, setAnimating] = useState(false);
  const crossed = included && !animating;

  function toggle() {
    const next = !included;
    setAnimating(next && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setDemoPreview(next);
  }

  return (
    <main data-capmit-shell="focused" className="planner" data-included={included} data-preview-animating={animating}>
      <header className="masthead"><span className="wordmark">Capmit<Accent /></span><span className="week-label">Aina’s week</span></header>
      <h1>Can I take this on?<svg className="title-stroke" viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></h1>
      <div className="trail-area">
        <section aria-labelledby="day-title" className="calendar"><Frame /><Image src="/doodles/planner-dog.svg" width={120} height={92} alt="" className="planner-dog" />
          <div className="day-heading"><h2 id="day-title">Wednesday<Accent /></h2><span>No scheduled overlap</span></div>
          <div className="timetable" aria-label="Available Wednesday slot, 7:00 PM to 11:00 PM. Proposed Hackathon team meeting fits without overlap.">
            {["7 PM", "8 PM", "9 PM", "10 PM", "11 PM"].map((time, i) => <div className="hour" style={{ top: `${i * 25}%` }} key={time}><span>{time}</span><i /></div>)}
            <div className="meeting"><svg className="meeting-outline" viewBox="0 0 270 184" preserveAspectRatio="none" aria-hidden="true"><path d="M 12 1 C 76 3 180 0 256 2 Q 268 2 268 15 L 267 170 Q 267 182 255 181 C 182 184 85 181 14 183 Q 2 183 2 170 L 2 14 Q 2 1 12 1 Z" /></svg><span className="proposal-label">Proposed</span><h3>Hackathon team meeting</h3><p>7:00 PM–11:00 PM</p><span className="meeting-fit">Fits in this open slot</span><Image src="/doodles/laptop-doodle.svg" width={120} height={96} alt="" className="meeting-sketch" /><Accent className="meeting-accent" /></div>
          </div>
          <label className="include-control"><input type="checkbox" checked={included} onChange={toggle} aria-describedby="preview-notice" /><span className="control-copy">Include this commitment<span className="control-state" aria-hidden="true">{included ? "Preview active" : "Preview off"}</span></span></label>
        </section>
        <div className="decision-intro">
          <div className="insight-callout"><Frame className="insight-frame" /><Accent className="insight-accent" /><Image src="/doodles/thinking-student.svg" width={128} height={160} alt="" className="thought-sketch" /><div><p className="signature">It fits your calendar.<br /><span className="insight">It doesn&apos;t fit your capacity.</span></p>
          <p className="preview-instruction">{included ? "Here’s what this yes would cost." : "Try including it to see what this yes would cost."}</p></div></div>
        </div>
        <svg className="consequence-connector" viewBox="0 0 28 100" preserveAspectRatio="none" aria-hidden="true"><path d="M 1 1 C 15 -1 20 4 19 12 C 16 37 24 60 19 85 Q 19 95 3 97 M 8 94 L 3 97 L 9 99" /></svg>
      </div>
      <div className="analysis-region"><Frame />
        <div className="analysis-heading"><h2 className="analysis-title">Estimated effect this week<Accent /></h2><aside className="analysis-note">Same you.<br />Happier<br />tomorrow.<svg viewBox="0 0 90 85" preserveAspectRatio="none" aria-hidden="true"><path d="M 2 2 L 83 4 L 87 77 L 22 83 L 3 65 Z M 3 65 L 22 65 L 22 83" /></svg></aside></div>
      <section aria-labelledby="load-title" className="capacity-used">
        <div className="comparison-heading"><h3 id="load-title">Capacity used</h3><span className="now-column">Now</span><span className="preview-column">With this<Accent /></span></div>
        {loads.map(({ name, before, after }) => {
          const value = included ? after : before;
          const breach = value > 100;
          return <div className="load-row" data-dimension={name} key={name}>
            <div className="comparison-values"><span className="metric-name"><Sketch kind={name} />{name}</span><span>{before}%</span><strong className={breach ? "breach" : "proposed-value"}>{included ? `${after}%` : "—"}</strong></div>
            <div className="load-track" role="img" aria-label={`${name}: ${value}% capacity used${breach ? ", 3 points over the 100% limit" : ""}. Scale 0 to 110%.`}>
              <span className="load-base" style={{ width: `${before / 110 * 100}%` }} />
              {included && <span className={`load-added ${breach ? "over-limit" : ""}`} style={{ left: `${before / 110 * 100}%`, width: `${(after - before) / 110 * 100}%` }} />}
              <span className="load-limit" />
            </div>
            {name === "Time" && <div className="time-caption"><span className={breach ? "breach" : ""}>{breach ? "3 points over limit" : "Within capacity"}</span><span>100% limit</span></div>}
          </div>;
        })}
      </section>
      <section className="recovery" aria-labelledby="recovery-title">
        <p className="remaining-label">Capacity remaining</p>
        <div className="comparison-values"><h2 id="recovery-title"><Sketch kind="leaf" />Recovery</h2><span>22%</span><strong className={included ? "breach" : ""}>{included ? "9%" : "—"}</strong></div>
        <p className="recovery-description">Space left to rest<br />and recharge.</p>
        <div className="recovery-chart" role="img" aria-label={`Recovery remaining: ${included ? 9 : 22}%. Baseline 22%. Recovery Floor 15%.${included ? " 6 points below your floor." : ""} Detail scale 0 to 30%.`}>
          <div className="recovery-rail" /><div className="recovery-floor"><span>15%<svg className="floor-ring" data-visible={crossed} viewBox="0 0 70 40" aria-hidden="true"><path d="M 57 7 C 40 -1 6 3 3 19 C 0 36 30 40 52 34 C 72 29 70 10 54 6" /></svg></span></div><div className="baseline-marker"><span>22%<small>Now</small></span></div>
          <span className="current-marker-label" data-visible={crossed}>9%<small>With this</small></span>
          <div className="recovery-marker" onTransitionEnd={(event) => { if (event.propertyName === "left" && included) setAnimating(false); }} />
          <svg className="shortfall-bracket" data-visible={crossed} viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M 1 1 Q 0 7 2 12 C 21 15 39 12 51 15 C 68 16 83 14 98 13 Q 100 8 99 1 M 51 15 Q 49 22 51 31" /></svg>
          <p className="shortfall-note" data-visible={crossed}><span>6 points below your floor</span></p>
          <div className="recovery-scale"><span>0%</span><span>30%</span></div>
        </div>
        <div className="recovery-bottom"><div className="floor-caption">Recovery Floor: <strong>15%</strong></div><aside className="rest-note">Rest fuels<br />progress.<svg viewBox="0 0 110 72" preserveAspectRatio="none" aria-hidden="true"><path d="M8 10 C28 -1 90 0 101 16 Q114 46 94 55 L101 69 L80 60 C51 67 7 61 4 41 Q-1 24 8 10 Z" /></svg></aside></div>
      </section>
      <details className="explanation"><summary>Why these estimates?</summary><p>This local demo compares Aina’s week before and with the proposed meeting. Time, Mental, and Social show capacity used. Recovery shows what remains. Including the meeting puts Time 3 points over 100% and Recovery 6 points below the 15% floor.</p></details>
      </div>
      <footer className="decision-footer"><Link href="/trade-offs" className="next-action" aria-describedby="next-note"><Accent className="cta-left" />What has to give?<Accent /></Link><p id="next-note">Trade-off comparison comes next.</p><p id="preview-notice">Preview only. No changes applied.</p></footer>
      <p className="sr-only" role="status">{included ? "Preview included. Time 103%, Mental 81%, Social 84%. Recovery remaining 9%, 6 points below your 15% floor. No changes applied." : "Preview excluded. Time 87%, Mental 72%, Social 61%. Recovery remaining 22%. No changes applied."}</p>
    </main>
  );
}
