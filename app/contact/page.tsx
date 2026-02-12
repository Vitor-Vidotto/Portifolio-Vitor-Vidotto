"use client"

import ContactSection from '@/components/ContactSection'

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
            <div className="z-10 relative">
                <ContactSection />
            </div>
        </main>
    )
}
