import Link from "next/link";
import s from "./reasoning.module.css";

const paths = {
  shirt: "M15 7 L23 10 L31 7 L43 18 L36 26 L31 22 L32 42 L14 42 L15 22 L9 26 L3 18 Z",
  paper: "M11 5 L28 5 L39 17 L38 43 L10 42 Z M28 5 L28 18 L39 18 M17 26 L31 26 M17 33 L27 33",
  people: "M15 6 C6 6 6 19 15 19 C24 19 24 6 15 6 Z M34 8 C26 8 26 20 34 20 C42 20 42 8 34 8 Z M3 41 C3 18 28 19 28 41 M29 26 C40 22 46 30 45 41",
  moon: "M30 5 C8 1 0 31 20 41 Q36 47 43 30 C24 38 15 18 30 5 Z",
  clock: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
  leaf: "M9 38 C0 20 18 8 38 4 C43 25 31 39 9 38 Z M7 45 L29 15 M17 30 L16 21 M22 25 L32 25",
  shield: "M7 10 L24 4 L41 10 Q44 31 24 44 Q5 31 7 10 Z",
};
function Icon({ name }: { name: keyof typeof paths }) { return <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true"><path d={paths[name]} /></svg>; }
function Accent() { return <svg className={s.accent} viewBox="0 0 24 30" aria-hidden="true"><path d="M6 8 L11 2 M11 15 L20 11 M12 22 L20 24" /></svg>; }
function Frame() { return <svg className={s.frame} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 1 C100 0 238 2 345 1 Q358 1 358 7 L359 91 Q358 99 345 99 C234 98 111 100 14 99 Q1 99 2 92 L1 8 Q0 1 15 1 Z" /></svg>; }
function Arrow() { return <svg className={s.arrow} viewBox="0 0 65 45" aria-hidden="true"><path d="M5 5 Q49 3 51 36 M42 25 L51 36 L59 24" /></svg>; }
function Calendar({ day }: { day: string }) { return <span className={s.calendar}><svg viewBox="0 0 70 70" aria-hidden="true"><path d="M8 14 L61 11 L64 63 L9 66 Z M9 27 L62 24 M21 5 L23 20 M48 3 L49 18" /></svg><span>{day}</span></span>; }
function Move({ to }: { to: string }) { return <div className={s.move} aria-label={`Wednesday to ${to === "Thu" ? "Thursday" : "Friday"}`}><Calendar day="Wed" /><span aria-hidden="true">→</span><Calendar day={to} /><Accent /></div>; }
function Split() { return <div className={s.splitVisual} aria-label="Assignment split into Wednesday 2 hours and Thursday 1 hour"><Icon name="paper" /><svg viewBox="0 0 55 85" aria-hidden="true"><path d="M3 42 Q20 18 47 13 M36 9 L47 13 L40 23 M3 43 Q24 64 47 72 M40 61 L47 72 L35 74" /></svg><div><span>Wed <strong>2h</strong></span><span>Thu <strong>1h</strong></span></div></div>; }
function Floor() { return <div className={s.recovery} role="img" aria-label="Recovery remaining 17%, above the fixed 15% Recovery Floor. Scale 0 to 30%."><p>Recovery vs. floor</p><div className={s.scale}><div className={s.rail} /><div className={s.floor}><span>15%<small>Floor</small></span></div><div className={s.current}><span>17%<small>Now</small></span></div><div className={s.endpoints}><span>0%</span><span>30%</span></div></div></div>; }
const rows = [
  { name: "Laundry", icon: "shirt", state: "Wednesday → Thursday", tags: [["Flexible", "blue"], ["No hard deadline", "neutral"], ["Thursday has spare capacity", "green"]], explanation: "Laundry was moved because it is flexible and Thursday has more available time and errand capacity.", note: "Flexible task", rule: "safe to move", kind: "move" },
  { name: "Assignment block", icon: "paper", state: "3h block → split", tags: [["Splittable", "green"], ["Deadline protected", "blue"]], explanation: "Your assignment stays on track, but splitting the block lowers Wednesday’s time and mental peak.", note: "Splittable task", rule: "safe to divide", kind: "split" },
  { name: "Wind-down", icon: "moon", state: "Protected", tags: [["Recovery Floor", "violet"], ["Protected", "blue"]], explanation: "Wind-down stays because removing it would push recovery below your minimum.", note: "Protected recovery", rule: "must stay", kind: "protected" },
  { name: "Optional club admin", icon: "people", state: "Wednesday → Friday", tags: [["Optional", "violet"], ["Low consequence", "green"]], explanation: "This task has the lowest consequence of delay among your Wednesday commitments.", note: "Optional task", rule: "safe to defer", kind: "defer" },
] as const;

export default function WhyTheseChanges() {
  return <main className={s.page}>
    <header className={s.header}><span className={s.wordmark}>Capmit<Accent /></span><span className={s.week}>Aina’s week</span></header>
    <h1>Why these changes?<svg viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></h1>
    <div className={s.intro}><p>Nothing moved at random.<br /><span className={s.highlight}>Every change follows your rules.</span></p><div className={s.pathNote}><svg viewBox="0 0 110 95" aria-hidden="true"><path d="M54 6 C37 6 37 28 53 29 C71 29 71 6 54 6 Z M54 29 L54 45 M14 71 L14 59 Q14 44 30 45 L78 45 Q96 44 96 59 L96 71 M14 71 C-1 71 -1 92 14 92 C30 92 30 71 14 71 Z M96 71 C81 71 81 92 96 92 C111 92 111 71 96 71 Z" /></svg><span>Your preferences<br /><b>→ a balanced week</b></span></div></div>
    <section className={s.plan} aria-label="Selected plan: Balanced Week, 3 supporting schedule changes"><Frame /><div className={s.planTitle}><p>Selected plan</p><h2>Balanced Week<Accent /></h2><p className={s.changeCount}>3 supporting changes</p></div><dl>{([{ icon: "clock", label: "Peak time", value: "89%" }, { icon: "leaf", label: "Recovery", value: "17%" }, { icon: "shield", label: "Recovery Floor", value: "15%" }] as const).map(metric => <div key={metric.label}><Icon name={metric.icon} /><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl></section>
    <h2 className={s.reasonHeading}>Here’s why this plan works<Accent /></h2>
    <section className={s.reasoning} aria-label="Three proposed changes and one unchanged recovery constraint"><Frame />{rows.map((row, i) => <article key={row.name} className={s.row} data-kind={row.kind} aria-labelledby={`reason-${i}`}>
      <header className={s.rowHeader}><Icon name={row.icon} /><div><h3 id={`reason-${i}`}>{row.name}</h3><p>{row.state}</p>{row.kind === "split" && <p>Wednesday: 2h<br />Thursday: 1h</p>}{row.kind === "protected" && <p className={s.unchanged}>Unchanged · protected constraint</p>}</div></header>
      <div className={s.tags}>{row.tags.map(([label, color]) => <span key={label} data-color={color}>{label}</span>)}</div>
      <p className={s.explanation}>{row.explanation}</p>
      <div className={s.visual}>{row.kind === "move" ? <Move to="Thu" /> : row.kind === "defer" ? <Move to="Fri" /> : row.kind === "split" ? <Split /> : <Floor />}</div>
      <aside className={s.marginNote}><span>{row.note}<br />→ {row.rule}</span><Arrow /></aside>
    </article>)}</section>
    <aside className={s.principle}><Frame /><svg className={s.person} viewBox="0 0 105 125" aria-hidden="true"><path d="M26 78 C-5 59 7 11 38 9 C78 5 86 54 62 73 M24 79 Q10 88 9 115 M62 73 Q70 83 75 94 L86 81 Q91 75 96 81 Q104 92 87 107 Q74 120 55 98 M37 47 Q42 54 49 46 M53 97 L55 115 M90 28 L96 35 L104 21" /></svg><div><h2>Capmit proposes.<br /><span className={s.highlight}>You decide.</span><Accent /></h2><p>These are recommendations, not automatic changes.</p></div></aside>
    <footer className={s.footer}><Link href="/rebalanced-week" className={s.cta} aria-describedby="apply-note" data-plan="balanced"><Accent />Apply Balanced Week<Accent /></Link><p id="apply-note">Applying this plan comes next. No changes applied.</p><Link href="/trade-offs" className={s.back}>Back to trade-offs</Link><Link href="/" className={s.quiet}>Review capacity again</Link></footer>
  </main>;
}
