"use client"

import { HeroActions } from '@/components/HeroActions'
import TypewriterLoop from '@/components/typeloop'
import ProjectsSection from '@/components/ProjectsSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ActiveTooltip from '@/components/ActiveTooltip'
import ThreeDScene from '@/components/ThreeDScene'

// Import Scene dynamically to avoid SSR issues with Canvas
const Scene = dynamic(
  () => import('@/components/Scene').then((mod) => mod.Scene),
  { ssr: false }
)

export default function Home() {

  const smoothScrollTo = (id: string, duration = 1500, offset = 0) => {
    // If id is 'bottom', use body as a placeholder to start container search, 
    // but ultimately we want the scroll container's max height.
    const element = id === 'bottom' ? document.body : document.getElementById(id);
    if (!element) return;

    let container: HTMLElement | Window = window;
    let curr = element.parentElement;

    // If id is 'bottom', start searching from a known scrollable root or just let the fallback find it
    if (id !== 'bottom') {
      while (curr && curr !== document.body) {
        const style = window.getComputedStyle(curr);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          container = curr;
          break;
        }
        curr = curr.parentElement;
      }
    }

    if (container === window) {
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

    let target = 0;
    if (id === 'bottom') {
      if (container === window) {
        target = document.body.scrollHeight - window.innerHeight;
      } else {
        const c = container as HTMLElement;
        target = c.scrollHeight - c.clientHeight;
      }
    } else {
      target = element.offsetTop + offset;
    }

    const change = target - start;
    let startTime = 0;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const t = Math.min(timeElapsed / duration, 1);
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
    <main className="w-full overflow-x-hidden">
      <Scene>

        {/* SECTION 1: HERO */}
        <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative mb-[10vh] sm:mb-[20vh]">
          <div className="flex flex-col items-center justify-center relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-gradient animate-fadeIn">
              Vitor Vidotto
            </h1>
            <TypewriterLoop />
            <HeroActions />
          </div>

          <div className="absolute bottom-10 animate-bounce text-white text-3xl">
            ↓
          </div>
        </section>

        {/* SECTION 2: PROJECTS */}
        <section id="projects" className="min-h-screen w-full relative mb-[20vh] sm:mb-[40vh] flex flex-col items-center justify-center py-12 sm:py-24">
          <div className="w-full max-w-[90vw] lg:max-w-7xl px-4 z-10">
            <ProjectsSection />
          </div>
        </section>

        {/* SECTION 3: ABOUT */}
        <section id="about" className="min-h-screen w-full relative mb-[20vh] sm:mb-[50vh] flex flex-col items-center justify-center">
          <div className="w-full max-w-[90vw] lg:max-w-7xl px-4 z-10">
            <AboutSection />
          </div>
        </section>

        {/* SECTION 4: INFO / FOOTER */}
        <section id="contact" className="h-screen w-full flex flex-col items-center justify-center relative text-white">
          <div className="z-10 relative">
            <ContactSection />
          </div>
        </section>

      </Scene>

      <button
        onClick={() => smoothScrollTo('bottom')} // Scroll to the very end (page 7 / max)
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center cursor-pointer"
        title="Ir para o final"
      >
        <ActiveTooltip
          displayTime={5000} // Set to 5s for faster feedback than 60s
          tooltipText={
            <div className="text-center text-xs p-2">
              Precisa de ajuda? <br /> Entre em contato!
            </div>
          }
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 relative hover:scale-110 transition-transform duration-300">
            <ThreeDScene />
          </div>
        </ActiveTooltip>
      </button>
    </main>
  )
}

