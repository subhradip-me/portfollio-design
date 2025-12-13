// useLenisWithScrollTrigger.js
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis(lenisOptions = {}) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // init Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      ...lenisOptions,
    });
    lenisRef.current = lenis;

    // tell ScrollTrigger how to read/write the scroll position
    // Use document.scrollingElement in most browsers
    const scroller = document.scrollingElement || document.documentElement;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          // setter: jump Lenis to value immediately
          // immediate: true makes Lenis set position without smooth animation
          lenis.scrollTo(value, { immediate: true });
        }
        // getter: return current scroll position (use window.scrollY as source of truth)
        return window.scrollY || document.documentElement.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // pinType: if the scroller (or its content) is transformed, use 'transform', otherwise 'fixed'
      // force 'fixed' if you want browser fixed positioning; try both if unsure.
      pinType: scroller.style.transform ? "transform" : "fixed",
    });

    // RAF loop: run Lenis and then update ScrollTrigger
    const raf = (time) => {
      lenis.raf(time);
      // keep ScrollTrigger in sync with Lenis' rendered position
      ScrollTrigger.update();
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // refresh ScrollTrigger once to calculate pins
    ScrollTrigger.addEventListener("refreshInit", () => {
      // optional: can do something before refresh
    });
    ScrollTrigger.refresh();

    // handle resize / arbitrary re-layouts (images loading, route changes)
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    // if your app uses routing, call ScrollTrigger.refresh() after route changes

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafIdRef.current);
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // init once

  return lenisRef;
}
