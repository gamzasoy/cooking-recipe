import { useCallback, useEffect, useRef, useState } from 'react';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done';

export function useTimer(durationSeconds: number, onDone?: () => void) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const endAt = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (status !== 'running') return;
    const id = setInterval(() => {
      const left = (endAt.current - Date.now()) / 1000;
      if (left <= 0) {
        setRemaining(0);
        setStatus('done');
        onDoneRef.current?.();
      } else {
        setRemaining(left);
      }
    }, 250);
    return () => clearInterval(id);
  }, [status]);

  const start = useCallback(() => {
    setRemaining((r) => {
      const from = r <= 0 ? durationSeconds : r;
      endAt.current = Date.now() + from * 1000;
      return from;
    });
    setStatus('running');
  }, [durationSeconds]);

  const pause = useCallback(() => setStatus('paused'), []);

  const reset = useCallback(() => {
    setStatus('idle');
    setRemaining(durationSeconds);
  }, [durationSeconds]);

  return { remaining, status, start, pause, reset };
}
