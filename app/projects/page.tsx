"use client"

import ProjectsSection from '@/components/ProjectsSection'

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <div className="w-full max-w-[90vw] lg:max-w-7xl px-4 z-10">
                <ProjectsSection />
            </div>
        </main>
    )
}
