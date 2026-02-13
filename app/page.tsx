"use client"

import ActiveTooltip from '@/components/ActiveTooltip'
import { HeroActions } from '@/components/HeroActions'
import ThreeDScene from '@/components/ThreeDScene'
import TypewriterLoop from '@/components/typeloop'

export default function Home() {
  return (
    <main className="w-full">
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative">
        <div className="flex flex-col items-center justify-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-gradient animate-fadeIn">
            Vitor Vidotto
          </h1>
          <TypewriterLoop />
          <HeroActions />
        </div>
        <a
          href="/contact"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 rounded-full flex items-center justify-center text-sm sm:text-base"
          title="Entrar em contato"
        >
          <ActiveTooltip
            tooltipText={
              <>
                Precisa de ajuda? <br /> Entre em contato!
              </>
            }
          >
            <ThreeDScene />
          </ActiveTooltip>
        </a>
      </section>
    </main>
  )
}
