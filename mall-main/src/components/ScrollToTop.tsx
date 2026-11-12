import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToTargetElement(el: HTMLElement) {
  const stackIdx = el.getAttribute('data-stack-index');
  const top =
    stackIdx !== null
      ? Number(stackIdx) * window.innerHeight
      : el.getBoundingClientRect().top + window.scrollY - 85;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * ScrollToTop ensures each newly navigated page starts cleanly from the top,
 * or scrolls smoothly to the target anchor section if a hash is present.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      let retryTimer: ReturnType<typeof setTimeout> | null = null;

      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          scrollToTargetElement(el);
        } else {
          retryTimer = setTimeout(() => {
            const delayedEl = document.getElementById(targetId);
            if (delayedEl) scrollToTargetElement(delayedEl);
          }, 220);
        }
      }, 120);

      return () => {
        clearTimeout(timer);
        if (retryTimer) clearTimeout(retryTimer);
      };
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};


