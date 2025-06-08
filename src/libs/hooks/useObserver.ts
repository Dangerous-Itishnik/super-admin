import { RefObject, useEffect, useRef } from 'react'

type UseObserverOptions = {
  delay?: number
  onBatchIntersect: (ids: number[]) => void
  root?: HTMLElement | null
  threshold?: number
}

export function useObserver(
    listRef: RefObject<HTMLElement>,
    data: { id: number }[] | undefined,
    options: UseObserverOptions
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || !sentinelRef.current || !data) {
      return
    }
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target === sentinelRef.current) {
              if (timerRef.current) {
                clearTimeout(timerRef.current)
              }
              timerRef.current = setTimeout(() => {
                options.onBatchIntersect([]);
                timerRef.current = null;
              }, options.delay || 300);
            }
          });
        },
        {
          root: options.root || null,
          threshold: options.threshold ?? 0.1,
        }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect()
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    };
  }, [listRef, data, options])

  return sentinelRef;
}