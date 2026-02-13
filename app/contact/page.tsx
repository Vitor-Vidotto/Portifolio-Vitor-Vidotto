"use client"

import ActiveTooltip from '@/components/ActiveTooltip'
import ContactSection from '@/components/ContactSection'
import ThreeDScene from '@/components/ThreeDScene'

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
            <div className="z-10 relative">
                <ContactSection />
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
                            Estamos na pagina de contato...<br>Não seja timido! </br><br /> Entre em contato!
                        </>
                    }
                >
                    <ThreeDScene />
                </ActiveTooltip>
            </a>
        </main>
    )
}
