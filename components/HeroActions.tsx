"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroActions() {

  const smoothScrollTo = (id: string, duration = 1000) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Detect the scrollable container.
    // Drei's ScrollControls puts content in a fixed div and creates a scrollable div on top.
    // We need to find the parent that has overflow-y: auto or scroll.
    let container: HTMLElement | Window = window;
    let curr = element.parentElement;
    while (curr && curr !== document.body) {
      const style = window.getComputedStyle(curr);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        container = curr;
        break;
      }
      curr = curr.parentElement;
    }

    // If we are in "ScrollControls", the element is inside a fixed container that moves via transform.
    // THE SCROLL CONTAINER IS DISCONNECTED FROM THE CONTENT.
    // Content is position: fixed. Scroll container is absolute/fixed on top with height.
    // We need to look for a div that has children with height > 100vh.

    // FALLBACK: If we can't find a parent container (because content is fixed), 
    // we might need to find the sibling "scroll" div that Drei creates.
    // Drei usually creates a div structure like:
    // <div>
    //   <div style="overflow: scroll"> (THIS IS THE SCROLLER)
    //      <div style="height: 100vh * pages"></div>
    //   </div>
    //   <div style="position: fixed"> (THIS IS WHERE OUR CONTENT IS) </div>
    // </div>

    // So checking parentElement of 'element' won't work if we are in the fixed content.
    // We need to search the DOM for the scroller.

    // Let's try to find an element with a very large height that is NOT our container.
    if (container === window) {
      // Try to find the Drei scroll container by looking for a div with overflow-y
      const divs = document.querySelectorAll('div');
      for (let i = 0; i < divs.length; i++) {
        const d = divs[i];
        const s = window.getComputedStyle(d);
        if ((s.overflowY === 'auto' || s.overflowY === 'scroll') && d.scrollHeight > window.innerHeight) {
          container = d;
          break;
        }
      }
    }

    const start = container === window ? window.scrollY : (container as HTMLElement).scrollTop;

    // Calculate target. 
    // If we are in the fixed content, 'element.offsetTop' gives position relative to the fixed wrapper (top: 0).
    // So element.offsetTop is effectively the scroll position we want to reach.

    // Center the element in the viewport
    const containerHeight = container === window ? window.innerHeight : (container as HTMLElement).clientHeight;
    const target = element.offsetTop - (containerHeight - element.offsetHeight) / 2;

    const change = target - start;
    let startTime = 0;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const t = Math.min(timeElapsed / duration, 1);

      // Ease in out cubic
      const ease = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

      const val = start + change * ease;

      if (container === window) {
        window.scrollTo(0, val);
      } else {
        (container as HTMLElement).scrollTop = val;
      }

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-8">

      {/* Botões principais */}
      <div className="flex gap-4 flex-wrap justify-center">

        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => smoothScrollTo('projects')}
          className="group relative overflow-hidden rounded-full px-6 py-3 flex items-center gap-3 
          bg-white/10 backdrop-blur-md border border-white/20
          text-white font-medium shadow-lg cursor-pointer"
        >
          <Image src="/images/rocket.svg" alt="Projetos" width={20} height={20} />
          Meus Projetos

          {/* Glow animado */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => smoothScrollTo('about')}
          className="group relative overflow-hidden rounded-full px-6 py-3 flex items-center gap-3 
          bg-white/10 backdrop-blur-md border border-white/20
          text-white font-medium shadow-lg cursor-pointer"
        >
          <Image src="/images/person.svg" alt="Sobre mim" width={20} height={20} />
          Me Conheça

          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </motion.button>

      </div>


    </div>
  )
}
