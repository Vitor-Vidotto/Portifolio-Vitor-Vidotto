"use client"

import AboutSection from '@/components/AboutSection'

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-[90vw] lg:max-w-7xl px-4 z-10">
                <AboutSection />
            </div>
        </main>
    )
}
