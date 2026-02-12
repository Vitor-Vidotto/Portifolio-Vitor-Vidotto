"use client"

import { HeroActions } from '@/components/HeroActions'
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
      </section>
    </main>
  )
}
