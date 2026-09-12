"use client";

import Image from "next/image";
import Link from "next/link";
import { setDemoPreview } from "../demo-preview";
import s from "./screen3.module.css";

const iconPaths = {
  Assignment: "M12 6 L36 7 L35 42 L11 41 Z M18 15 L29 15 M18 22 L29 22 M18 29 L25 29",
  Lecture: "M3 17 L24 7 L45 17 L24 27 Z M12 22 L13 35 Q25 44 36 34 L36 22 M43 19 L43 34",
  Social: "M15 6 C6 6 6 19 15 19 C24 19 24 6 15 6 Z M34 8 C26 8 26 20 34 20 C42 20 42 8 34 8 Z M3 41 C3 18 28 19 28 41 M29 26 C40 22 46 30 45 41",
  Work: "M6 16 L42 15 L41 40 L6 40 Z M17 15 L17 8 L31 8 L32 15 M7 25 Q24 34 41 25 M23 26 L23 32",
  Errand: "M8 10 L34 10 L34 40 L6 40 Z M14 23 L22 31 L43 9",
  Custom: "M24 7 L24 41 M7 24 L41 24",
  Time: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
  Mental: "M23 9 C18 2 10 6 11 13 C3 12 1 23 8 27 C3 35 12 42 18 38 C21 44 27 42 26 34 L26 10 C31 2 40 8 37 15 C45 18 45 28 38 30 C44 39 31 44 27 37 M12 14 L16 18 M8 27 L16 26 M18 38 L18 31 M37 15 L32 20 M38 30 L32 29",
  Physical: "M6 15 L12 15 L12 36 L6 36 Z M36 14 L42 14 L42 35 L36 35 Z M12 25 L36 24 M2 24 L6 24 M42 24 L46 24",
};
type IconName = keyof typeof iconPaths;
function Icon({ name }: { name: IconName }) { return <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true"><path d={iconPaths[name]} /></svg>; }
function Accent() { return <svg className={s.accent} viewBox="0 0 24 30" aria-hidden="true"><path d="M6 8 L11 2 M11 15 L20 11 M12 22 L20 24" /></svg>; }
function Frame() { return <svg className={s.frame} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 1 C100 0 238 2 345 1 Q358 1 358 7 L359 91 Q358 99 345 99 C234 98 111 100 14 99 Q1 99 2 92 L1 8 Q0 1 15 1 Z" /></svg>; }
function Arrow() { return <svg className={s.arrow} viewBox="0 0 70 40" aria-hidden="true"><path d="M65 3 Q52 35 7 27 M17 18 L7 27 L19 33" /></svg>; }
const templates: { label: string; icon: IconName }[] = [
  { label: "Assignment", icon: "Assignment" }, { label: "Lecture", icon: "Lecture" },
  { label: "Club meeting", icon: "Social" }, { label: "Part-time work", icon: "Work" },
  { label: "Social", icon: "Social" }, { label: "Errand", icon: "Errand" }, { label: "Custom", icon: "Custom" },
];
const loads: { name: IconName; value: string; fill: number; color: string }[] = [
  { name: "Time", value: "4h", fill: 64, color: "#5B8DEF" },
  { name: "Mental", value: "Medium", fill: 44, color: "#55B88A" },
  { name: "Social", value: "High", fill: 77, color: "#8B7CE8" },
  { name: "Physical", value: "Low", fill: 24, color: "#A9B8B3" },
  { name: "Errand", value: "None", fill: 0, color: "#A9B8B3" },
];

export default function AddCommitment() {
  const rules = [true, true, true];
  return <main data-capmit-shell="focused" className={s.page}>
    <header className={s.header}><span className={s.wordmark}>Capmit<Accent /></span><span className={s.week}>Aina’s week</span></header>
    <div data-shell-title className={s.title}><h1>Add commitment</h1><svg viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></div>
    <section className={s.panel} aria-labelledby="template-title"><Frame />
      <div className={s.teamNote}><Icon name="Social" /><span>Build great<br />things together</span></div>
      <h2 id="template-title">What are you adding?<Accent /></h2>
      <div className={s.templates} aria-label="Commitment templates">
        {templates.map(({ label, icon }) => <button key={label} type="button" aria-pressed={label === "Club meeting"} aria-disabled={label !== "Club meeting"} title={label !== "Club meeting" ? "This prototype uses the Club meeting template." : undefined}><Icon name={icon} />{label}</button>)}
      </div>
    </section>
    <section className={`${s.panel} ${s.details}`} aria-labelledby="details-title"><Frame />
      <div className={s.fields}><h2 id="details-title">Details<Accent /></h2>
        <label>Title<textarea readOnly rows={2} value="Hackathon team meeting" /></label>
        <label>Day<input readOnly value="Wednesday" /></label>
        <fieldset className={s.timeGroup}><legend>Time</legend><div className={s.timeField}><input aria-label="Start time" readOnly value="7:00 PM" /><span>–</span><input aria-label="End time" readOnly value="11:00 PM" /></div></fieldset>
      </div>
      <div className={s.calendar} aria-label="Wednesday, proposed Hackathon team meeting, 7:00 PM–11:00 PM"><Frame /><h3>Wednesday<Accent /></h3>
        <div className={s.timeline}>{["7 PM", "8 PM", "9 PM", "10 PM", "11 PM"].map((hour, i) => <span className={s.hour} style={{ top: `${i * 25}%` }} key={hour}>{hour}</span>)}
          <div className={s.meeting}><span className={s.proposed}>Proposed</span><h4>Hackathon team meeting</h4><p>7:00 PM –<br />11:00 PM</p><Image src="/doodles/laptop-doodle.svg" width={120} height={96} alt="" /><Accent /></div>
        </div>
      </div>
    </section>
    <section className={`${s.panel} ${s.loadPanel}`} aria-labelledby="expected-load" ><Frame />
      <h2 id="expected-load" tabIndex={-1}>Expected load<Accent /></h2><p className={s.support}>Based on your Club meeting template.</p>
      <div className={s.loadComposition}><div className={s.loadRows}>{loads.map(({ name, value, fill, color }) => <div key={name} className={s.loadRow}><Icon name={name} /><span>{name}</span><div className={s.bar} aria-hidden="true"><i style={{ width: `${fill}%`, background: color }} /></div><strong>{value}</strong></div>)}</div>
        <aside className={s.autofill}><Image src="/doodles/planner-dog.svg" width={120} height={92} alt="" /><Frame /><h3>Already filled<br />for you.</h3><p>Adjust only if this meeting is different.</p></aside>
      </div>
      <div className={s.modelNote}><Arrow /><span>Complex model underneath,<br />simple for you</span></div>
    </section>
    <section className={`${s.panel} ${s.rules}`} aria-labelledby="rules-title"><Frame /><h2 id="rules-title">Commitment rules<Accent /></h2>
      <div className={s.ruleControls}>{["Optional", "Fixed time", "Not splittable"].map((rule, i) => <label key={rule}><input type="checkbox" checked={rules[i]} readOnly aria-disabled="true" onClick={event => event.preventDefault()} /><span>{rule}</span></label>)}</div>
      <p className={s.rulesNote}><Arrow />set for this meeting</p>
    </section>
    <footer className={s.footer}><Link href="/capacity-check" className={s.cta} onClick={() => setDemoPreview(false)}><Accent />Can I take this on?<Accent /></Link><a href="#expected-load" className={s.secondary}>Review load details</a></footer>
  </main>;
}
