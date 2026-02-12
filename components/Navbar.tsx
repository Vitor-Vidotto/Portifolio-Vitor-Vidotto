"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const navLinks = [
    { href: "/", label: "Início" },
    { href: "/projects", label: "Projetos" },
    { href: "/about", label: "Sobre" },
    { href: "/contact", label: "Contato" },
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
            <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-gray-400"
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
