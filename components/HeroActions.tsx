"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function HeroActions() {
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {/* Botões principais */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/projects">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative overflow-hidden rounded-full px-6 py-3 flex items-center gap-3 
            bg-white/10 backdrop-blur-md border border-white/20
            text-white font-medium shadow-lg cursor-pointer transition-all hover:bg-white/20"
          >
            <Image src="/images/rocket.svg" alt="Projetos" width={20} height={20} />
            Meus Projetos

            {/* Glow animado */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.div>
        </Link>

        <Link href="/about">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative overflow-hidden rounded-full px-6 py-3 flex items-center gap-3 
            bg-white/10 backdrop-blur-md border border-white/20
            text-white font-medium shadow-lg cursor-pointer transition-all hover:bg-white/20"
          >
            <Image src="/images/person.svg" alt="Sobre mim" width={20} height={20} />
            Conheça-me

            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
