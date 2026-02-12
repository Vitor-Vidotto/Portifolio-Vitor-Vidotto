"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { Suspense, useRef, memo } from "react"
import { usePathname } from "next/navigation"
import * as THREE from "three"
import { Document as DocumentModel } from "./models/Document"
import { MyComputer } from "./models/MyComputer"
import { Macbook } from "./models/Macbook"
import { MysteriousLetter } from "./models/MysteriousLetter"

const SceneContent = memo(() => {
    const pathname = usePathname()
    const { width, height } = useThree((state) => state.viewport)

    const macbookRef = useRef<THREE.Group>(null)
    const documentRef = useRef<THREE.Group>(null)
    const computerRef = useRef<THREE.Group>(null)
    const letterRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        const isWide = width > 5
        const leftSide = isWide ? -width / 10 : 0
        const center = 0

        const isHome = pathname === "/"
        const isProjects = pathname === "/projects"
        const isAbout = pathname === "/about"
        const isContact = pathname === "/contact"

        const lerpSpeed = 5 * delta

        // Update MacBook (Home)
        if (macbookRef.current) {
            const targetPos = isHome ? new THREE.Vector3(leftSide, -1.5, 0) : new THREE.Vector3(leftSide, height * 2, -5)
            const targetScale = isHome ? (isWide ? 0.15 : 0.12) : 0
            macbookRef.current.position.lerp(targetPos, lerpSpeed)
            macbookRef.current.scale.setScalar(THREE.MathUtils.lerp(macbookRef.current.scale.x, targetScale, lerpSpeed))
            macbookRef.current.rotation.x = THREE.MathUtils.lerp(macbookRef.current.rotation.x, isHome ? 0 : 0.5, lerpSpeed)
        }

        // Update Document (Projects)
        if (documentRef.current) {
            const targetPos = isProjects ? new THREE.Vector3(leftSide, -1, -1) : new THREE.Vector3(leftSide, -height * 2, -1)
            const targetScale = isProjects ? (isWide ? 0.02 : 0.015) : 0
            documentRef.current.position.lerp(targetPos, lerpSpeed)
            documentRef.current.scale.setScalar(THREE.MathUtils.lerp(documentRef.current.scale.x, targetScale, lerpSpeed))
        }

        // Update MyComputer (About)
        if (computerRef.current) {
            const targetPos = isAbout ? new THREE.Vector3(center, 0, -1) : new THREE.Vector3(width / 2 + 2, -height, -1)
            const targetScale = isAbout ? (isWide ? 0.8 : 0.5) : 0
            computerRef.current.position.lerp(targetPos, lerpSpeed)
            computerRef.current.scale.setScalar(THREE.MathUtils.lerp(computerRef.current.scale.x, targetScale, lerpSpeed))
        }

        // Update Letter (Contact)
        if (letterRef.current) {
            const targetPos = isContact ? new THREE.Vector3(0, 0, -2) : new THREE.Vector3(0, -height, -1)
            const targetScale = isContact ? (isWide ? 0.055 : 0.04) : 0
            letterRef.current.position.lerp(targetPos, lerpSpeed)
            letterRef.current.scale.setScalar(THREE.MathUtils.lerp(letterRef.current.scale.x, targetScale, lerpSpeed))

            // Fixed upright rotation (Restoring previous stable values)
            letterRef.current.rotation.x = -Math.PI / 2
            letterRef.current.rotation.y = Math.PI
            letterRef.current.rotation.z = Math.PI
        }
    })

    return (
        <group>
            <group ref={macbookRef} scale={0}>
                <Macbook />
            </group>
            <group ref={documentRef} scale={0}>
                <DocumentModel />
            </group>
            <group ref={computerRef} scale={0}>
                <MyComputer />
            </group>
            <group ref={letterRef} scale={0}>
                <MysteriousLetter />
            </group>
        </group>
    )
})

SceneContent.displayName = "SceneContent"

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 35 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
        >
            <color attach="background" args={["#050505"]} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 5, 2]} intensity={2} />

            <Suspense fallback={null}>
                <SceneContent />
            </Suspense>

            <Stars
                radius={50}
                depth={50}
                count={2000}
                factor={4}
                fade
            />
        </Canvas>
    )
}
