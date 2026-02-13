"use client"

import ActiveTooltip from '@/components/ActiveTooltip'
import ProjectsSection from '@/components/ProjectsSection'
import ThreeDScene from '@/components/ThreeDScene'

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <div className="w-full max-w-[90vw] lg:max-w-7xl px-4 z-10">
                <ProjectsSection />
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
        </main>
    )
}
