import { useState } from 'react';
import type { Step } from '../types';
import { formatDuration } from '../utils/time';
import { StepTimer } from './StepTimer';

export function StepList({ steps }: { steps: Step[] }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ol className="steps">
      {steps.map((step, i) => (
        <li key={i} className={done.has(i) ? 'done' : ''}>
          <label className="step-head">
            <input type="checkbox" checked={done.has(i)} onChange={() => toggle(i)} aria-label={`${i + 1}단계 완료`} />
            <span className="step-num">{i + 1}</span>
            <span className="step-text">
              {step.text}
              {step.timerSeconds ? <em className="step-dur"> ({formatDuration(step.timerSeconds)})</em> : null}
            </span>
          </label>
          {step.timerSeconds ? <StepTimer seconds={step.timerSeconds} stepNumber={i + 1} /> : null}
        </li>
      ))}
    </ol>
  );
}
