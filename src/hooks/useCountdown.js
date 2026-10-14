import { useEffect, useState } from 'react';

function diff(target) {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** Ticks once per second until `isoDate` (local time, e.g. "2027-06-12T16:00:00"). */
export function useCountdown(isoDate) {
  const target = new Date(isoDate).getTime();
  const [left, setLeft] = useState(() => diff(target));

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}
