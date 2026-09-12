import Image from "next/image";
import Link from "next/link";
import s from "./rebalanced.module.css";

const paths = {
  shirt: "M15 7 L23 10 L31 7 L43 18 L36 26 L31 22 L32 42 L14 42 L15 22 L9 26 L3 18 Z",
  paper: "M11 5 L28 5 L39 17 L38 43 L10 42 Z M28 5 L28 18 L39 18 M17 26 L31 26 M17 33 L27 33",
  people: "M15 6 C6 6 6 19 15 19 C24 19 24 6 15 6 Z M34 8 C26 8 26 20 34 20 C42 20 42 8 34 8 Z M3 41 C3 18 28 19 28 41 M29 26 C40 22 46 30 45 41",
  moon: "M30 5 C8 1 0 31 20 41 Q36 47 43 30 C24 38 15 18 30 5 Z",
  clock: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
  leaf: "M9 38 C0 20 18 8 38 4 C43 25 31 39 9 38 Z M7 45 L29 15 M17 30 L16 21 M22 25 L32 25",
  shield: "M7 10 L24 4 L41 10 Q44 31 24 44 Q5 31 7 10 Z M16 22 L22 29 L33 17",
  alert: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 13 L24 26 M24 33 L24 34",
  checklist: "M8 10 L40 9 L41 43 L7 43 Z M16 4 L17 15 M31 3 L32 15 M13 23 L15 25 L18 21 M23 23 L34 23 M13 33 L15 35 L18 31 M23 33 L34 33",
};
function Icon({ name }: { name: keyof typeof paths }) { return <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true"><path d={paths[name]} /></svg>; }
function Accent() { return <svg className={s.accent} viewBox="0 0 24 30" aria-hidden="true"><path d="M6 8 L11 2 M11 15 L20 11 M12 22 L20 24" /></svg>; }
function Frame() { return <svg className={s.frame} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 1 C100 0 238 2 345 1 Q358 1 358 7 L359 91 Q358 99 345 99 C234 98 111 100 14 99 Q1 99 2 92 L1 8 Q0 1 15 1 Z" /></svg>; }
const metrics = [
  { name: "Peak time", before: "103%", after: "89%", icon: "clock", breach: true, beforeNote: "Over capacity before", afterNote: "Within capacity now" },
  { name: "Recovery", before: "9%", after: "17%", icon: "leaf", breach: true, beforeNote: "Below floor before", afterNote: "Above floor now" },
  { name: "Deadline violations", before: "0", after: "0", icon: "shield", breach: false, note: "No violations (before or after)" },
  { name: "Recovery-floor violations", before: "1", after: "0", icon: "alert", breach: true, note: "Back within your floor" },
] as const;
const changes = [
  { name: "Laundry", icon: "shirt", state: "Wednesday → Thursday", tag: "Moved" },
  { name: "Assignment block", icon: "paper", state: "3h → split", tag: "Split" },
  { name: "Optional club admin", icon: "people", state: "Wednesday → Friday", tag: "Moved" },
] as const;

export default function RebalancedWeek() {
  return <main data-capmit-shell="wide" className={s.page} data-plan="balanced" data-state="applied">
    <header className={s.header}><span className={s.wordmark}>Capmit<Accent /></span><span className={s.week}>Aina’s week</span></header>
    <h1>Your week fits again.<svg viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></h1>
    <div className={s.intro}><p>You kept the meeting<br /><span className={s.highlight}>without pushing recovery below your floor.</span></p><div className={s.dogNote}><Image src="/doodles/planner-dog.svg" width={120} height={92} alt="" loading="eager" /><span>same commitments,<br />better balance</span></div></div>
    <section className={`${s.panel} ${s.comparison}`} aria-labelledby="changes-title"><Frame /><h2 id="changes-title">What changed?<Accent /></h2><div className={s.metrics}>{metrics.map(metric => <div className={s.metric} key={metric.name}><h3><Icon name={metric.icon} />{metric.name}</h3><div className={s.values} aria-label={`${metric.name}: ${metric.before} before, ${metric.after} after`}><span className={metric.breach ? s.breach : s.neutral}>{metric.before}</span><span className={s.valueArrow} aria-hidden="true">→</span><strong className={s.healthy}>{metric.after}</strong></div>{"note" in metric ? <p className={s.metricNote}>{metric.note}</p> : <div className={s.valueNotes}><p>{metric.beforeNote}</p><p>{metric.afterNote}</p></div>}</div>)}</div></section>
    <section className={`${s.panel} ${s.recovery}`} aria-labelledby="floor-title"><Frame /><h2 id="floor-title">Recovery vs. floor</h2><p>Recovery Floor = <strong>15%</strong></p><div className={s.scale} role="img" aria-label="Recovery remaining: before 9%, below the 15% floor; after 17%, above the floor. Scale 0 to 30%."><div className={s.rail} /><div className={s.beforeMarker}><span>Before <b>9%</b></span></div><div className={s.floor}><span>15%<small>Floor</small></span></div><div className={s.afterMarker}><span>After <b>17%</b></span></div><div className={s.ends}><span>0%</span><span>30%</span></div></div><aside className={s.floorNote}><svg viewBox="0 0 65 40" aria-hidden="true"><path d="M59 31 Q14 36 10 6 M3 17 L10 6 L21 15" /></svg>Back above<br />your floor</aside></section>
    <section className={`${s.panel} ${s.weekPlan}`} aria-label="Balanced Week applied"><Frame /><div className={s.day}><h2>Wednesday, rebalanced<Accent /></h2><div className={s.timeline} aria-label="Wednesday timetable from 1 PM to 11 PM">{["1 PM", "3 PM", "5 PM", "7 PM", "9 PM", "11 PM"].map((time, i) => <div className={s.hour} style={{ top: `${i * 20}%` }} key={time}><span>{time}</span><i /></div>)}<div className={s.assignment}><h3>Assignment block (2h)</h3><p>1:00 PM – 3:00 PM</p><span className={s.splitTag}>Split</span></div><div className={s.meeting}><span className={s.addedTag}>Added</span><h3>Hackathon team meeting</h3><p>7:00 PM – 11:00 PM</p><Image src="/doodles/laptop-doodle.svg" width={120} height={96} alt="" loading="eager" /></div></div><p className={s.meetingNote}><svg viewBox="0 0 45 40" aria-hidden="true"><path d="M39 35 Q12 35 13 5 M5 15 L13 5 L21 15" /></svg>Meeting’s in!<Accent /></p></div>
      <div className={s.details}><h2>Plan details<Accent /></h2><ul>{changes.map(change => <li key={change.name}><Icon name={change.icon} /><div><h3>{change.name}</h3><p>{change.state}</p>{change.tag === "Split" && <p>Wednesday: 2h<br />Thursday: 1h</p>}<span className={change.tag === "Split" ? s.splitTag : s.addedTag}>{change.tag}</span></div></li>)}</ul><div className={s.protected}><Icon name="moon" /><div><h3>Wind-down</h3><span className={s.protectedTag}>Protected</span><p><strong>Unchanged</strong><br />Protected recovery stays in place.</p></div></div></div>
    </section>
    <section className={`${s.panel} ${s.summary}`} aria-labelledby="summary-title"><Frame /><h2 id="summary-title">Change summary<Accent /></h2><p className={s.planLabel}>Balanced Week applied</p><div className={s.checklist}><Icon name="checklist" /><ul><li><span aria-hidden="true">✓</span>Hackathon team meeting added.</li><li><span aria-hidden="true">✓</span>3 supporting changes applied.</li></ul></div><dl><div><dt><Icon name="shield" />Deadlines protected</dt><dd>Yes</dd></div><div><dt><Icon name="leaf" />Recovery Floor</dt><dd>Protected</dd></div></dl></section>
    <aside className={s.insight}><Frame /><Image src="/doodles/thinking-student.svg" width={128} height={160} alt="" loading="eager" /><div><h2>You didn’t need more hours.<br /><span className={s.highlight}>You needed a better trade-off.</span></h2><p>same commitments,<br />better balance</p></div></aside>
    <footer className={s.footer}><Link href="/home" className={s.cta}><Accent />Back to dashboard<Accent /></Link><p id="dashboard-note">Return to your weekly capacity.</p><Link href="/why-these-changes" className={s.undo}>Undo changes</Link></footer>
  </main>;
}
