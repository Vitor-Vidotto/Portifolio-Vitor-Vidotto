"use client"
import React, { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"

const projectsData = [
    {
        id: 6,
        title: "Software ListaMestra",
        description: "Software de controle de arquivos com automações e funções de controle. Em produção como ferramenta principal de duas empresas.",
        image: "/images/projects/7.png",
        tag: ["Todos", "Desktop"],
        gitUrl: "https://github.com/Vitor-Vidotto/ListaMestra",
        previewUrl: "https://github.com/Vitor-Vidotto/ListaMestra",
    },
    {
        id: 4,
        title: "Protótipo Administrativo",
        description: "Aplicação para empresa fictícia com painel administrativo e área do cliente.",
        image: "/images/projects/4.png",
        tag: ["Todos", "Web"],
        gitUrl: "https://github.com/AutomatizaLabs/AutomatizaLabs",
        previewUrl: "https://automatiza-labs-three.vercel.app/",
    },
    {
        id: 1,
        title: "FavMovies App",
        description: "Aplicação mobile para listagem e detalhes de filmes.",
        image: "/images/projects/1.png",
        tag: ["Todos", "Celular"],
        gitUrl: "https://github.com/Vitor-Vidotto/FavMovies",
        previewUrl: "https://github.com/Vitor-Vidotto/FavMovies",
    },
    {
        id: 7,
        title: "Software EasyCD",
        description: "Controle de cooldowns para times de jogos com overlay e conexão em tempo real.",
        image: "/images/projects/9.png",
        tag: ["Todos", "Desktop"],
        gitUrl: "https://github.com/Vitor-Vidotto/easy-cd",
        previewUrl: "https://github.com/Vitor-Vidotto/easy-cd",
    },
    {
        id: 8,
        title: "Guild Hub",
        description: "Site para guilda de jogos com informações de membros e composições de combate.",
        image: "/images/projects/8.png",
        tag: ["Todos", "Desktop"],
        gitUrl: "https://github.com/Vitor-Vidotto/Helldivers",
        previewUrl: "https://helldivers.vercel.app/",
    },
    {
        id: 2,
        title: "Backup Controller C#",
        description: "Monitoramento e envio de arquivos via FTP para backup e geração de logs.",
        image: "/images/projects/2.png",
        tag: ["Todos", "Desktop"],
        gitUrl: "https://github.com/Vitor-Vidotto",
        previewUrl: "https://github.com/Vitor-Vidotto",
    },
    {
        id: 3,
        title: "Portfólio Angular",
        description: "Primeiro portfólio digital desenvolvido em Angular para estudos.",
        image: "/images/projects/3.png",
        tag: ["Todos", "Web"],
        gitUrl: "https://github.com/Vitor-Vidotto/Portifolio",
        previewUrl: "https://vitor-vidotto.github.io/Portifolio/",
    },
    {
        id: 5,
        title: "Automações Python",
        description: "scripts de automação para limpeza, organização e processos repetitivos.",
        image: "/images/projects/6.png",
        tag: ["Todos", "Desktop"],
        gitUrl: "https://github.com/Vitor-Vidotto/python-automations",
        previewUrl: "https://github.com/Vitor-Vidotto/python-automations",
    },
]

const ProjectsSection = () => {
    const [tag, setTag] = useState("Todos")
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const handleTagChange = (newTag: string) => {
        setTag(newTag)
    }

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    )

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 20, opacity: 0 }
    }

    return (
        <section id="projects" className="py-12 md:py-24 px-4 w-full max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center mb-12 md:mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Meus Projetos
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Uma coleção de trabalhos que demonstram minhas habilidades em desenvolvimento web, mobile e desktop.
                </p>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
                <ProjectTag onClick={handleTagChange} name="Todos" isSelected={tag === "Todos"} />
                <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === "Web"} />
                <ProjectTag onClick={handleTagChange} name="Celular" isSelected={tag === "Celular"} />
                <ProjectTag onClick={handleTagChange} name="Desktop" isSelected={tag === "Desktop"} />
            </div>

            <ul ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.li
                            key={project.id}
                            layout
                            variants={cardVariants}
                            initial="initial"
                            animate={isInView ? "animate" : "initial"}
                            exit="exit"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                imgUrl={project.image}
                                gitUrl={project.gitUrl}
                                previewUrl={project.previewUrl}
                            />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </section>
    )
}

const ProjectTag = ({ name, onClick, isSelected }: { name: string, onClick: (name: string) => void, isSelected: boolean }) => {
    const buttonStyles = isSelected
        ? "text-white bg-purple-600 border-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
        : "text-[#ADB7BE] border-slate-600 hover:border-white hover:text-white bg-transparent"

    return (
        <button
            className={`${buttonStyles} rounded-full border px-6 py-2 text-base md:text-lg cursor-pointer transition-all duration-300 font-medium`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    )
}

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }: any) => {
    return (
        <div className="h-full group">
            <div className="h-52 md:h-64 rounded-t-xl relative overflow-hidden bg-black/20 backdrop-blur-sm border-t border-x border-white/10">
                <div
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center gap-4">
                    <Link
                        href={gitUrl}
                        target="_blank"
                        className="h-12 w-12 border border-[#ADB7BE] rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all group/link"
                    >
                        <CodeBracketIcon className="h-6 w-6 text-[#ADB7BE] group-hover/link:text-white cursor-pointer" />
                    </Link>
                    <Link
                        href={previewUrl}
                        target="_blank"
                        className="h-12 w-12 border border-[#ADB7BE] rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all group/link"
                    >
                        <EyeIcon className="h-6 w-6 text-[#ADB7BE] group-hover/link:text-white cursor-pointer" />
                    </Link>
                </div>
            </div>

            <div className="text-white rounded-b-xl bg-[#181818]/60 backdrop-blur-md border border-white/10 py-6 px-4 h-[180px] flex flex-col hover:border-purple-500/30 transition-colors">
                <h5 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{title}</h5>
                <p className="text-[#ADB7BE] text-sm leading-relaxed flex-grow">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ProjectsSection
