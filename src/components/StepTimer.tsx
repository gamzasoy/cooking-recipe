import { useTimer } from '../hooks/useTimer';
import { formatClock } from '../utils/time';

function beep() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
    osc.onended = () => ctx.close();
  } catch {
    /* 소리를 낼 수 없어도 화면 표시는 유지 */
  }
}

export function StepTimer({ seconds, stepNumber }: { seconds: number; stepNumber: number }) {
  const { remaining, status, start, pause, reset } = useTimer(seconds, beep);
  return (
    <div className={`timer timer-${status}`} role="timer" aria-label={`${stepNumber}단계 타이머`}>
      <span className="timer-clock">{status === 'done' ? '완료!' : formatClock(remaining)}</span>
      {status === 'running' ? (
        <button type="button" onClick={pause}>일시정지</button>
      ) : status !== 'done' ? (
        <button type="button" onClick={start}>{status === 'paused' ? '계속' : '시작'}</button>
      ) : null}
      {status !== 'idle' && (
        <button type="button" onClick={reset}>리셋</button>
      )}
    </div>
  );
}
