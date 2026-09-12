import Image from "next/image";
import Link from "next/link";
import s from "./home.module.css";

const paths = {
  calendar: "M8 12 L40 11 L41 42 L7 42 Z M8 23 L40 22 M17 5 L18 17 M31 4 L32 16",
  person: "M24 5 C10 5 10 23 24 23 C38 23 38 5 24 5 Z M5 44 C5 17 42 17 43 44",
  time: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
  mental: "M23 9 C18 2 10 6 11 13 C3 12 1 23 8 27 C3 35 12 42 18 38 C21 44 27 42 26 34 L26 10 C31 2 40 8 37 15 C45 18 45 28 38 30 C44 39 31 44 27 37 M12 14 L16 18 M8 27 L16 26 M18 38 L18 31 M37 15 L32 20 M38 30 L32 29",
  physical: "M6 15 L12 15 L12 36 L6 36 Z M36 14 L42 14 L42 35 L36 35 Z M12 25 L36 24 M2 24 L6 24 M42 24 L46 24",
  social: "M15 6 C6 6 6 19 15 19 C24 19 24 6 15 6 Z M34 8 C26 8 26 20 34 20 C42 20 42 8 34 8 Z M3 41 C3 18 28 19 28 41 M29 26 C40 22 46 30 45 41",
  errands: "M7 10 L10 10 M17 10 L40 10 M7 23 L10 23 M17 23 L40 23 M7 36 L10 36 M17 36 L34 36",
  leaf: "M9 38 C0 20 18 8 38 4 C43 25 31 39 9 38 Z M7 45 L29 15 M17 30 L16 21 M22 25 L32 25",
  checklist: "M8 10 L40 9 L41 43 L7 43 Z M16 4 L17 15 M31 3 L32 15 M13 23 L15 25 L18 21 M23 23 L34 23 M13 33 L15 35 L18 31 M23 33 L34 33",
  lecture: "M3 17 L24 7 L45 17 L24 27 Z M12 22 L13 35 Q25 44 36 34 L36 22 M43 19 L43 34",
  paper: "M11 5 L28 5 L39 17 L38 43 L10 42 Z M28 5 L28 18 L39 18 M17 26 L31 26 M17 33 L27 33",
  laundry: "M15 7 L23 10 L31 7 L43 18 L36 26 L31 22 L32 42 L14 42 L15 22 L9 26 L3 18 Z",
  moon: "M30 5 C8 1 0 31 20 41 Q36 47 43 30 C24 38 15 18 30 5 Z",
};
function Icon({ name }: { name: keyof typeof paths }) { return <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true"><path d={paths[name]} /></svg>; }
function Accent() { return <svg className={s.accent} viewBox="0 0 24 30" aria-hidden="true"><path d="M6 8 L11 2 M11 15 L20 11 M12 22 L20 24" /></svg>; }
function Frame() { return <svg className={s.frame} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 1 C100 0 238 2 345 1 Q358 1 358 7 L359 91 Q358 99 345 99 C234 98 111 100 14 99 Q1 99 2 92 L1 8 Q0 1 15 1 Z" /></svg>; }
const loads = [
  { name: "Time", icon: "time", value: 87, color: "#5B8DEF" },
  { name: "Mental", icon: "mental", value: 72, color: "#55B88A" },
  { name: "Physical", icon: "physical", value: 44, color: "#94ACB3" },
  { name: "Social", icon: "social", value: 61, color: "#8B7CE8" },
  { name: "Errands", icon: "errands", value: 38, color: "#A2ADAE" },
] as const;

export default function WeeklyCapacity() {
  return <main className={s.page}>
    <header className={s.header}><span className={s.wordmark}>Capmit<Accent /></span><span className={s.week}>Sep 14–20</span></header>
    <h1>Good morning, Aina<svg viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></h1>
    <p className={s.greeting}>Here’s how much room your week really has.</p>
    <div className={s.dogNote}><Image src="/doodles/planner-dog.svg" width={120} height={92} loading="eager" alt="" /><span>same goals,<br />better balance</span></div>
    <section className={`${s.panel} ${s.hero}`} aria-labelledby="hero-title"><Frame /><h2 id="hero-title">Your week is near capacity.<Accent /></h2><p className={s.heroIntro}>You still have calendar space,<br /><span className={s.highlight}>but your real capacity is tighter.</span></p><aside className={s.equation}><svg viewBox="0 0 65 45" aria-hidden="true"><path d="M58 5 Q25 0 14 37 M7 25 L14 37 L25 28" /></svg>free time ≠<br />free capacity</aside>
      <div className={s.comparisons}>{([{ label: "Calendar space available", value: 22, icon: "calendar", color: "#5B8DEF" }, { label: "Estimated capacity available", value: 11, icon: "person", color: "#23352D" }] as const).map(item => <div className={s.compareRow} key={item.label}><Icon name={item.icon} /><div><h3>{item.label}</h3><div className={s.bar} role="img" aria-label={`${item.label}: ${item.value}%.`}><span style={{ width: `${item.value}%`, background: item.color }} /></div></div><strong>{item.value}%</strong></div>)}<svg className={s.bracket} viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden="true"><path d="M2 1 Q14 1 13 16 L13 40 Q12 49 19 50 Q12 51 13 60 L13 84 Q14 98 2 99" /></svg></div>
      <p className={s.compareNote}>Same free time on calendar,<br />but less usable capacity.</p><p className={s.explanation}>You have room on the clock, but less room across the rest of your week.</p>
    </section>
    <section className={`${s.panel} ${s.capacity}`} aria-labelledby="capacity-title"><Frame /><h2 id="capacity-title">This week’s capacity<Accent /></h2><p className={s.used}>Capacity used</p><div className={s.loadRows}>{loads.map(load => <div className={s.loadRow} key={load.name}><Icon name={load.icon} /><span>{load.name}</span><div className={s.bar} role="img" aria-label={`${load.name}: ${load.value}% capacity used.`}><span style={{ width: `${load.value}%`, background: load.color }} /></div><strong>{load.value}%</strong></div>)}</div></section>
    <section className={`${s.panel} ${s.recovery}`} aria-labelledby="recovery-title"><Frame /><h2 id="recovery-title">Recovery remaining<Accent /></h2><div className={s.recoveryBody}><div className={s.recoveryValue}><Icon name="leaf" /><div><strong>22%</strong><p>Your floor: 15%<br />7% buffer remaining.</p></div></div><div className={s.scale} role="img" aria-label="Recovery remaining 22%, with a 15% floor and 7% buffer remaining. Scale 0 to 30%."><div className={s.rail} /><div className={s.floor}><span>15%<small>Floor</small></span></div><div className={s.marker}><span>22%<small>Now</small></span></div><div className={s.ends}><span>0%</span><span>30%</span></div></div></div><aside className={s.protected}>close, but protected<svg viewBox="0 0 60 35" aria-hidden="true"><path d="M53 3 Q46 27 7 25 M17 17 L7 25 L20 31" /></svg></aside></section>
    <aside className={s.insight}><Frame /><Icon name="checklist" /><div><h2><span className={s.highlight}>Free time is only one part of capacity.</span></h2><p>Capmit also considers mental, physical, social, errands, and recovery load.</p><span className={s.fullPicture}>A fuller picture<br />of your week.</span></div></aside>
    <section className={`${s.panel} ${s.preview}`} aria-labelledby="week-title"><Frame /><div className={s.previewHeading}><h2 id="week-title">This week<Accent /></h2><Link href="/your-week">View this week →</Link></div><h3>Wednesday</h3><ul>{([{ name: "Lecture", icon: "lecture" }, { name: "Assignment work", icon: "paper" }, { name: "Gym", icon: "physical" }, { name: "Laundry", icon: "laundry" }, { name: "Wind-down", icon: "moon" }] as const).map(item => <li key={item.name}><Icon name={item.icon} />{item.name}</li>)}</ul></section>
    <footer className={s.footer}><Link href="/add-commitment" className={s.cta}><Accent />+ Add commitment<Accent /></Link><Link href="/your-week" className={s.secondary}>View this week</Link><p id="week-note">Explore your existing commitments.</p></footer>
  </main>;
}
