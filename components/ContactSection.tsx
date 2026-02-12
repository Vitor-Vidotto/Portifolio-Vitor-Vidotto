"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const ContactSection = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = React.useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <section
            ref={sectionRef}
            id="contact-content"
            className="w-full max-w-5xl mx-auto text-white px-4 md:px-0"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Column */}
                    <div className="text-left space-y-6">
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            Vamos <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Criar Algo Incrível?</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Estou disponível para novos projetos e colaborações.
                            Se você busca inovação e qualidade, mande um oi e vamos tirar sua ideia do papel.
                        </motion.p>

                        <motion.div variants={itemVariants} className="pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-widest font-semibold">
                                <span className="w-8 h-[1px] bg-gray-500"></span>
                                Redes Sociais
                            </div>
                        </motion.div>
                    </div>

                    {/* Links Column */}
                    <div className="grid gap-4">
                        <ContactLink
                            href="https://br.linkedin.com/in/vitor-vidotto"
                            icon="/images/linkedin.svg"
                            title="LinkedIn"
                            description="Conecte-se profissionalmente"
                            color="hover:border-blue-500/50 hover:bg-blue-500/10"
                            variants={itemVariants}
                        />
                        <ContactLink
                            href="https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20"
                            icon="/images/whatsapp.svg"
                            title="WhatsApp"
                            description="Converse comigo agora"
                            color="hover:border-green-500/50 hover:bg-green-500/10"
                            variants={itemVariants}
                        />
                        <ContactLink
                            href="https://www.instagram.com/soy.vidotto/"
                            icon="/images/instagram.svg"
                            title="Instagram"
                            description="Acompanhe meu dia a dia"
                            color="hover:border-pink-500/50 hover:bg-pink-500/10"
                            variants={itemVariants}
                        />
                    </div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500 flex justify-between items-center"
                >
                    <span>© {new Date().getFullYear()} Vitor Vidotto</span>
                    <span>Desenvolvido com Next.js & Three.js</span>
                </motion.div>
            </motion.div>
        </section>
    )
}

const ContactLink = ({ href, icon, title, description, color, variants }: any) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={variants}
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 group ${color}`}
    >
        <div className="w-12 h-12 relative flex-shrink-0 bg-white/10 rounded-lg p-2 group-hover:bg-white/20 transition-colors">
            <Image
                src={icon}
                alt={title}
                fill
                className="object-contain p-1"
            />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">{title}</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
        </div>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
            →
        </div>
    </motion.a>
)

export default ContactSection
