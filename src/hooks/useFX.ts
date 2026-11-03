import { useEffect } from 'react';

export default function useFX() {
  useEffect(() => {
    const root = document.documentElement;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    const on = <K extends keyof WindowEventMap>(
      t: EventTarget,
      ev: string,
      fn: (e: any) => void,
      o?: boolean | AddEventListenerOptions
    ) => {
      t.addEventListener(ev, fn, o);
      cleanups.push(() => t.removeEventListener(ev, fn, o));
    };

    // Scroll progress bar
    const bar = document.querySelector('.scroll-progress') as HTMLElement | null;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = root.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        root.style.setProperty('--scroll', `${Math.min(y, 900)}`);
        ticking = false;
      });
    };
    onScroll();
    on(window, 'scroll', onScroll, { passive: true });

    if (!reduce && fine) {
      // Cursor spotlight glow with smooth physics
      const glow = document.querySelector('.cursor-glow') as HTMLElement | null;
      let tx = window.innerWidth / 2;
      let ty = window.innerHeight / 2;
      let x = tx;
      let y = ty;
      let raf: number;

      const onPointerMove = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        if (glow) glow.classList.add('on');
      };
      on(window, 'pointermove', onPointerMove);

      const loop = () => {
        x += (tx - x) * 0.12;
        y += (ty - y) * 0.12;
        if (glow) {
          glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        raf = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => cancelAnimationFrame(raf));

      // 3D Card tilt effect
      const attachTiltListeners = () => {
        document.querySelectorAll<HTMLElement>('.card, .tilt-box').forEach((card) => {
          if (card.dataset.tiltAttached === 'true') return;
          card.dataset.tiltAttached = 'true';

          const onCardMove = (e: MouseEvent) => {
            const r = card.getBoundingClientRect();
            const px = e.clientX - r.left;
            const py = e.clientY - r.top;
            card.style.setProperty('--sx', `${px}px`);
            card.style.setProperty('--sy', `${py}px`);
            const rotateX = ((py / r.height) - 0.5) * -12;
            const rotateY = ((px / r.width) - 0.5) * 12;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
          };

          const onCardLeave = () => {
            card.style.transform = '';
          };

          card.addEventListener('mousemove', onCardMove);
          card.addEventListener('mouseleave', onCardLeave);
          cleanups.push(() => {
            card.removeEventListener('mousemove', onCardMove);
            card.removeEventListener('mouseleave', onCardLeave);
          });
        });
      };

      attachTiltListeners();
      const interval = setInterval(attachTiltListeners, 1500);
      cleanups.push(() => clearInterval(interval));

      // Magnetic buttons
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const onMagMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const mx = (e.clientX - (r.left + r.width / 2)) * 0.3;
          const my = (e.clientY - (r.top + r.height / 2)) * 0.35;
          el.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        };
        const onMagLeave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mousemove', onMagMove);
        el.addEventListener('mouseleave', onMagLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMagMove);
          el.removeEventListener('mouseleave', onMagLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
