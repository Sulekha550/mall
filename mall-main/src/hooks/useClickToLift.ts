import { useEffect } from 'react';

/**
 * Global hook to enable click-to-lift image/card interaction
 * across all pages and sections (Effect 1).
 */
export const useClickToLift = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Do not trigger lift if clicking on interactive controls, inputs, links, or nav
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.prem-navbar') ||
        target.closest('.ed-subnav') ||
        target.closest('.cinematic-hud') ||
        target.closest('.hud-container')
      ) {
        return;
      }

      // Check if clicked element is inside a card or lift target
      const card = target.closest('.ed-card, .ed-lift-target, .ed-shopping-card, .ed-dining-fixed-card') as HTMLElement | null;

      if (card) {
        const isAlreadyLifted = card.classList.contains('is-lifted');

        // Reset any other lifted cards smoothly
        document.querySelectorAll('.is-lifted').forEach((el) => {
          if (el !== card) {
            el.classList.remove('is-lifted');
          }
        });

        // Toggle the clicked card
        if (isAlreadyLifted) {
          card.classList.remove('is-lifted');
        } else {
          card.classList.add('is-lifted');
        }
      } else {
        // Clicked on background: return all cards smoothly to baseline
        document.querySelectorAll('.is-lifted').forEach((el) => {
          el.classList.remove('is-lifted');
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.is-lifted').forEach((el) => {
          el.classList.remove('is-lifted');
        });
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

