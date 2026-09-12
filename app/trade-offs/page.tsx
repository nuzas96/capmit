"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./trade-offs.module.css";

const paths = {
  shirt: "M15 7 L23 10 L31 7 L43 18 L36 26 L31 22 L32 42 L14 42 L15 22 L9 26 L3 18 Z",
  paper: "M11 5 L28 5 L39 17 L38 43 L10 42 Z M28 5 L28 18 L39 18 M17 26 L31 26 M17 33 L27 33",
  people: "M15 6 C6 6 6 19 15 19 C24 19 24 6 15 6 Z M34 8 C26 8 26 20 34 20 C42 20 42 8 34 8 Z M3 41 C3 18 28 19 28 41 M29 26 C40 22 46 30 45 41",
  moon: "M30 5 C8 1 0 31 20 41 Q36 47 43 30 C24 38 15 18 30 5 Z",
  cart: "M3 7 L9 9 L15 33 L38 33 L44 15 L11 15 M17 40 L19 40 M34 40 L36 40",
  clock: "M24 5 C12 4 5 13 5 24 C5 35 14 42 25 42 C37 41 43 32 42 22 C42 11 33 5 24 5 Z M24 12 L24 24 L32 27",
  leaf: "M9 38 C0 20 18 8 38 4 C43 25 31 39 9 38 Z M7 45 L29 15 M17 30 L16 21 M22 25 L32 25",
  shield: "M7 10 L24 4 L41 10 Q44 31 24 44 Q5 31 7 10 Z",
  calendar: "M7 11 L41 10 L41 42 L6 42 Z M7 21 L41 21 M16 4 L16 15 M32 4 L32 15",
};
type IconName = keyof typeof paths;
function Icon({ name }: { name: IconName }) { return <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true"><path d={paths[name]} /></svg>; }
function Accent() { return <svg className={s.accent} viewBox="0 0 24 30" aria-hidden="true"><path d="M6 8 L11 2 M11 15 L20 11 M12 22 L20 24" /></svg>; }
function Frame() { return <svg className={s.frame} viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 1 C100 0 238 2 345 1 Q358 1 358 7 L359 91 Q358 99 345 99 C234 98 111 100 14 99 Q1 99 2 92 L1 8 Q0 1 15 1 Z" /></svg>; }
type Change = { icon: IconName; title: string; detail?: string; reason: string; split?: boolean; remove?: boolean };
const scenarios = [
  { id: "balanced", title: "Balanced week", description: "Small changes, keep most things.", peak: 89, recovery: 17, count: 3,
    changes: [
      { icon: "shirt", title: "Laundry", detail: "Wednesday → Thursday", reason: "Flexible" },
      { icon: "paper", title: "Assignment block", detail: "3h → split", reason: "Splittable", split: true },
      { icon: "people", title: "Optional club admin", detail: "Wednesday → Friday", reason: "Optional" },
    ] as Change[], conclusion: "You keep the meeting with minimal changes." },
  { id: "recovery", title: "Protect recovery", description: "More rest, fewer commitments.", peak: 85, recovery: 24, count: 2,
    changes: [
      { icon: "moon", title: "Keep wind-down + sleep protected", reason: "Keep" },
      { icon: "cart", title: "Move groceries", detail: "→ Friday", reason: "Flexible" },
      { icon: "people", title: "Optional society check-in", detail: "Skip this commitment", reason: "Optional", remove: true },
      { icon: "paper", title: "Keep assignment block intact", reason: "Keep" },
    ] as Change[], conclusion: "More recovery space, but one optional commitment is removed." },
] as const;

function RecoveryScale({ value }: { value: number }) {
  return <div className={s.recovery}><h4>Recovery vs. floor</h4>
    <div className={s.scale} role="img" aria-label={`Recovery remaining ${value}%, above the 15% Recovery Floor. Scale 0 to 30%.`}>
      <div className={s.rail} /><div className={s.floor}><span>15%<small>Floor</small></span></div>
      <div className={s.marker} style={{ left: `${value / 30 * 100}%` }}><span>{value}%<small>This plan</small></span></div>
      <div className={s.endpoints}><span>0%</span><span>30%</span></div>
    </div><p>Recovery Floor: <strong>15%</strong> · {value - 15} points above</p>
  </div>;
}

export default function TradeOffs() {
  const [selected, setSelected] = useState<string>("balanced");
  const plan = scenarios.find(item => item.id === selected)!;
  return <main className={s.page}>
    <header className={s.header}><span className={s.wordmark}>Capmit<Accent /></span><span className={s.week}>Aina’s week</span></header>
    <h1>What has to give?<svg viewBox="0 0 110 12" aria-hidden="true"><path d="M2 4 Q49 1 106 4 L47 10" /></svg></h1>
    <div className={s.intro}><p>To take on this meeting,<br /><span className={s.highlight}>something else needs to change.</span></p>
      <div className={s.balance}><span className={s.balanceNote}>same you,<br />more balance</span><svg viewBox="0 0 130 105" aria-hidden="true"><path d="M64 15 L66 90 M24 93 Q62 77 90 94 Z M19 27 L108 15 M20 28 L4 67 L39 67 Z M107 17 L88 57 L126 57 Z M4 67 Q20 91 39 67 M88 57 Q106 80 126 57 M63 6 C52 7 54 21 64 20 C75 20 75 6 63 6 Z" /></svg><span>you decide</span></div>
    </div>
    <section className={s.proposal} aria-label="Proposed commitment"><Frame /><div><span className={s.proposed}>Proposed</span><h2>Hackathon team meeting</h2><p>Wednesday, 7:00 PM – 11:00 PM</p></div><p className={s.explanation}>This meeting fits in your schedule,<br />but it pushes you over your capacity.</p></section>
    <fieldset className={s.scenarios}><legend>Here are two ways to make it work:</legend>
      {scenarios.map(scenario => <section className={s.scenario} data-selected={selected === scenario.id} data-scenario={scenario.id} key={scenario.id} aria-labelledby={`${scenario.id}-title`}><Frame />
        <label className={s.selection}><input type="radio" name="scenario" value={scenario.id} checked={selected === scenario.id} onChange={() => setSelected(scenario.id)} aria-labelledby={`${scenario.id}-title`} aria-describedby={`${scenario.id}-description`} /><span><span id={`${scenario.id}-title`} className={s.scenarioTitle}><span className={scenario.id === "balanced" ? s.highlight : undefined}>{scenario.title}</span><Accent /></span>{scenario.id === "balanced" && <span className={s.recommended}>Recommended</span>}</span></label>
        {scenario.id === "balanced" && <aside className={s.tradeNote}>balanced<br />trade-off<svg viewBox="0 0 65 45" aria-hidden="true"><path d="M52 3 Q57 29 10 34 M19 23 L10 34 L24 38" /></svg></aside>}<p id={`${scenario.id}-description`} className={s.description}>{scenario.description}</p>
        <div className={s.scenarioBody}><div className={s.changes}><h3>Proposed changes</h3><ul>{scenario.changes.map((change, index) => <li key={index}><Icon name={change.icon} /><div><p className={change.remove ? s.removed : undefined}>{change.title}</p>{change.detail && <p className={s.changeDetail}>{change.detail}</p>}{change.split && <div className={s.split}><svg viewBox="0 0 20 45" aria-hidden="true"><path d="M2 2 L3 33 Q3 36 16 35 M3 10 L16 10 M12 6 L17 10 L12 14 M12 31 L17 35 L12 39" /></svg><span>Wednesday: 2h<br />Thursday: 1h</span></div>}</div><span className={s.reason} data-reason={change.reason}>{change.reason}</span></li>)}</ul></div>
          <div className={s.outlook}><h3>Resulting outlook</h3><dl>{([{ icon: "clock", label: "Peak time", value: `${scenario.peak}%` }, { icon: "leaf", label: "Recovery", value: `${scenario.recovery}%` }, { icon: "shield", label: "Deadlines protected", value: "Yes" }, { icon: "calendar", label: "Schedule changes", value: scenario.count }] as const).map(row => <div key={row.label}><dt><Icon name={row.icon} />{row.label}</dt><dd><span className={row.value === "Yes" ? s.yes : undefined}>{row.value}</span></dd></div>)}</dl>{scenario.id === "recovery" && <p className={s.removalNote}>One optional commitment removed.</p>}<RecoveryScale value={scenario.recovery} /></div>
        </div><div className={s.conclusion}><p>{scenario.conclusion}</p>{scenario.id === "balanced" ? <svg className={s.smile} viewBox="0 0 40 40" aria-hidden="true"><path d="M10 6 L10 12 M29 5 L30 11 M7 21 Q18 43 33 20" /></svg> : <Icon name="moon" />}</div>
      </section>)}
    </fieldset>
    <aside className={s.summary}><Frame /><Image src="/doodles/thinking-student.svg" loading="eager" width={128} height={160} alt="" /><div><p className={s.summaryTitle}><span className={s.highlight}>You keep the meeting.</span><br />Your recovery stays above the floor.</p><p className={s.summaryValue} role="status">{plan.title}: {plan.recovery}% recovery · {plan.count} schedule changes.</p><span className={s.sameYou}>Different plans,<br />same you</span></div></aside>
    <footer className={s.footer}><Link href="/why-these-changes" className={s.cta} aria-describedby="review-note" data-selected-plan="balanced"><Accent />{selected === "balanced" ? "Review this plan" : "Review Balanced Week"}<Accent /></Link><p id="review-note">{selected === "balanced" ? "Review Balanced Week before applying." : "Protect Recovery is comparison-only. Review Balanced Week to continue."}</p><Link href="/" className={s.back}>Back to capacity check</Link><p>Preview only. No changes applied.</p></footer>
  </main>;
}
