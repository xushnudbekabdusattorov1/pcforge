import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeElements = () => {
      document.querySelectorAll('.reveal, .section-label, .rw').forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();
    const interval = setInterval(observeElements, 1200);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);
}
