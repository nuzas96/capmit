import Image from "next/image";
import Link from "next/link";
import s from "./week.module.css";

const paths = {
  lecture: "M3 17 L24 7 L45 17 L24 27 Z M12 22 L13 35 Q25 44 36 34 L36 22 M43 19 L43 34",
  paper: "M11 5 L28 5 L39 17 L38 43 L10 42 Z M28 5 L28 18 L39 18 M17 26 L31 26 M17 33 L27 33",
  gym: "M6 15 L12 15 L12 36 L6 36 Z M36 14 L42 14 L42 35 L36 35 Z M12 25 L36 24 M2 24 L6 24 M42 24 L46 24",
  laundry: "M15 7 L23 10 L31 7 L43 18 L36 26 L31 22 L32 42 L14 42 L15 22 L9 26 L3 18 Z",
  people: "M15 6 C6 6 6 19 15 19 C24 19 24 6 15 6 Z M34 8 C26 8 26 20 34 20 C42 20 42 8 34 8 Z M3 41 C3 18 28 19 28 41 M29 26 C40 22 46 30 45 41",
  moon: "M30 5 C8 1 0 31 20 41 Q36 47 43 30 C24 38 15 18 30 5 Z",
  time: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
  mental: "M23 9 C18 2 10 6 11 13 C3 12 1 23 8 27 C3 35 12 42 18 38 C21 44 27 42 26 34 L26 10 C31 2 40 8 37 15 C45 18 45 28 38 30 C44 39 31 44 27 37 M12 14 L16 18 M8 27 L16 26 M18 38 L18 31 M37 15 L32 20 M38 30 L32 29",
  leaf: "M9 38 C0 20 18 8 38 4 C43 25 31 39 9 38 Z M7 45 L29 15 M17 30 L16 21 M22 25 L32 25",
};
function Icon({ name }: { name: keyof typeof paths }) { return <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true"><path d={paths[name]} /></svg>; }
function Accent() { return <svg className={s.accent} viewBox="0 0 24 30" aria-hidden="true"><path d="M6 8 L11 2 M11 15 L20 11 M12 22 L20 24" /></svg>; }
function Frame() { return <svg className={s.frame} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 1 C100 0 238 2 345 1 Q358 1 358 7 L359 91 Q358 99 345 99 C234 98 111 100 14 99 Q1 99 2 92 L1 8 Q0 1 15 1 Z" /></svg>; }
function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) { return <span className={s.tag} data-tone={tone}>{children}</span>; }
const mapping = [
  { name: "Lecture", icon: "lecture", dimensions: ["Time", "Mental"] }, { name: "Assignment", icon: "paper", dimensions: ["Time", "Mental"] },
  { name: "Gym", icon: "gym", dimensions: ["Time", "Physical"] }, { name: "Laundry", icon: "laundry", dimensions: ["Time", "Errands"] },
  { name: "Club admin", icon: "people", dimensions: ["Time", "Social"] }, { name: "Wind-down", icon: "moon", dimensions: ["Recovery"] },
] as const;

export default function YourWeek() {
  return <main className={s.page}>
    <header className={s.header}><span className={s.wordmark}>Capmit<Accent /></span><span className={s.week}>Sep 14–20</span></header>
    <h1>Your week<svg viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></h1><p className={s.intro}>Here’s what’s already taking up your capacity.</p>
    <div className={s.dogNote}><Image src="/doodles/planner-dog.svg" width={120} height={92} alt="" loading="eager" /><span>busy in more<br />ways than one</span></div>
    <section className={`${s.panel} ${s.glance}`} aria-labelledby="glance-title"><Frame /><h2 id="glance-title">Week at a glance<Accent /></h2><dl>{([{ name: "Time", value: "87%", note: "used", icon: "time", fill: 87 }, { name: "Mental", value: "72%", note: "used", icon: "mental", fill: 72 }, { name: "Recovery", value: "22%", note: "remaining", icon: "leaf", fill: 22 }, { name: "Recovery Floor", value: "15%", note: "", icon: "gym", fill: 15 }] as const).map(metric => <div key={metric.name} data-metric={metric.name}><dt><Icon name={metric.icon} />{metric.name}</dt><dd>{metric.value}<small>{metric.note || "Floor"}</small></dd><div className={s.miniBar} aria-hidden="true">{metric.name === "Recovery Floor" ? <i /> : <span style={{ width: `${metric.fill}%` }} />}</div></div>)}</dl></section>
    <nav className={s.days} aria-label="Day of the week">{["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => <button type="button" key={day} aria-current={day === "Wed" ? "date" : undefined} aria-disabled={day !== "Wed"} title={day !== "Wed" ? "This prototype shows Wednesday." : "Wednesday selected"}>{day}</button>)}</nav>
    <section className={`${s.panel} ${s.schedule}`} aria-labelledby="wednesday"><Frame /><h2 id="wednesday">Wednesday<Accent /></h2><p className={s.dayNote}>already a full day</p>
      <div className={s.timeline}>
        <div className={s.timeRow}><time>8 AM</time><article className={s.event}><Icon name="lecture" /><div><h3>Lecture</h3><p>8:00 AM – 10:00 AM</p><Tag>Fixed</Tag></div></article></div>
        <div className={s.gap}><time>10 AM</time></div><div className={s.smallGap}><time>12 PM</time></div>
        <div className={s.timeRow}><time>1 PM</time><article className={`${s.event} ${s.assignment}`}><Icon name="paper" /><div><h3>Assignment</h3><p>1:00 PM – 4:00 PM (3h)</p><Tag tone="Mental">Splittable</Tag><Tag tone="Mental">Deadline protected</Tag></div></article><span className={s.midTime}>3 PM</span></div>
        <div className={s.timeRow}><time>5 PM</time><article className={s.event}><Icon name="gym" /><div><h3>Gym</h3><p>5:00 PM – 6:00 PM</p><Tag>Physical</Tag></div></article></div>
        <div className={s.timeRow}><time>7 PM</time><div className={s.openSlot}><h3>Open on calendar</h3><p>7:00 PM – 11:00 PM</p><span>looks free…<svg viewBox="0 0 60 40" aria-hidden="true"><path d="M54 4 Q18 5 10 34 M4 23 L10 34 L23 27" /></svg></span></div><span className={s.midTime}>9 PM</span></div>
        <div className={s.timeRow}><time>11 PM</time><article className={`${s.event} ${s.rest}`}><Icon name="moon" /><div><h3>Wind-down</h3><p>11:00 PM – 12:00 AM</p><Tag tone="Recovery">Protected</Tag></div></article></div>
      </div>
    </section>
    <section className={`${s.panel} ${s.flexible}`} aria-labelledby="flex-title"><Frame /><h2 id="flex-title">Flexible today<Accent /></h2><div><Icon name="laundry" /><h3>Laundry</h3><Tag tone="Time">Flexible</Tag></div><div><Icon name="people" /><h3>Optional club admin</h3><Tag tone="Social">Optional</Tag></div></section>
    <aside className={s.insight}><Frame /><Image src="/doodles/thinking-student.svg" width={128} height={160} alt="" loading="eager" /><div><h2>Open time doesn’t mean <span className={s.highlight}>unused capacity.</span></h2><p>Your calendar may be free,<br />while the rest of your capacity is already carrying load.</p><span className={s.freeNote}>free slot ≠<br />free capacity</span></div></aside>
    <section className={`${s.panel} ${s.mapping}`} aria-labelledby="mapping-title"><Frame /><h2 id="mapping-title">What’s using your capacity?<Accent /></h2><ul>{mapping.map(row => <li key={row.name}><Icon name={row.icon} /><h3>{row.name}</h3><div className={s.dimensions}><span aria-hidden="true">→</span>{row.dimensions.map((dimension, i) => <span className={s.dimension} key={dimension}>{i > 0 && <span aria-hidden="true">+</span>}<Tag tone={dimension}>{dimension}</Tag></span>)}{row.name === "Wind-down" && <small>(protected)</small>}</div></li>)}</ul></section>
    <footer className={s.footer}><Link href="/add-commitment" className={s.cta}><Accent />+ Add commitment<Accent /></Link><Link href="/home" className={s.back}>Back to dashboard</Link></footer>
  </main>;
}
