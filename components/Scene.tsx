"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, ScrollControls, Scroll, useScroll } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { Document as DocumentModel } from "./models/Document"
import { MyComputer } from "./models/MyComputer"
import { Macbook } from "./models/Macbook"
import { MysteriousLetter } from "./models/MysteriousLetter"

function SceneContent() {
    const scroll = useScroll()
    const macbookRef = useRef<THREE.Group>(null)
    const documentRef = useRef<THREE.Group>(null)
    const computerRef = useRef<THREE.Group>(null)
    const letterRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        // Total pages: 7

        // r1: Macbook Exit (0 to 0.15)
        const r1 = scroll.range(0, 0.15)

        if (macbookRef.current) {
            const startPos = new THREE.Vector3(-1, -1, -1)
            const endPos = new THREE.Vector3(0, 6, -5)
            macbookRef.current.position.lerpVectors(startPos, endPos, r1)
            macbookRef.current.scale.setScalar(THREE.MathUtils.lerp(0.15, 0.1, r1))
            macbookRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.5, r1)
        }

        // r2: Document Enter/Exit
        // Enters: 0.15 - 0.25
        // Exits: 0.55 - 0.70
        const r2_enter = scroll.range(0.005, 0.15)
        const r2_exit = scroll.range(0.55, 0.15)

        if (documentRef.current) {
            const startPos = new THREE.Vector3(-1, -10, -1)
            const midPos = new THREE.Vector3(-1, -1, -1)
            const endPos = new THREE.Vector3(-1, 6, -5)

            if (scroll.offset < 0.55) {
                documentRef.current.position.lerpVectors(startPos, midPos, r2_enter)
                documentRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0, r2_enter)
                documentRef.current.scale.setScalar(0.02)
            } else {
                documentRef.current.position.lerpVectors(midPos, endPos, r2_exit)
                documentRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.5, r2_exit)
            }
        }

        // r3: MyComputer Enter/Exit
        // Enters: 0.60 - 0.75
        // Exits: 0.75 - 0.83 (Shortened exit to clear space)
        const r3_enter = scroll.range(0.58, 0.15)
        const r3_exit = scroll.range(0.75, 0.08)

        if (computerRef.current) {
            const startPos = new THREE.Vector3(2, -10, -1)
            const centerPos = new THREE.Vector3(0, 1, -1)
            const endPos = new THREE.Vector3(-2, 6, -5)

            if (scroll.offset < 0.75) {
                computerRef.current.position.lerpVectors(startPos, centerPos, r3_enter)
                computerRef.current.scale.setScalar(0.8)
                computerRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0, r3_enter)
            } else {
                computerRef.current.position.lerpVectors(centerPos, endPos, r3_exit)
                computerRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.5, r3_exit)
            }
        }

        // r4: MysteriousLetter Enter
        // Enters: 0.86+ (Delayed slightly to ensure Computer is gone)
        const r4 = scroll.range(0.80, 0.10)

        if (letterRef.current) {
            const startPos = new THREE.Vector3(0, -10, -1)
            // Position it behind contact (Z: -1 or -2)
            const centerPos = new THREE.Vector3(0, 0, -2)

            letterRef.current.position.lerpVectors(startPos, centerPos, r4)
            letterRef.current.scale.setScalar(0.055) // User requested larger scale

            // Fixed rotation: User wants vertical (standing).
            // X = -Math.PI / 2 is the vertical axis (but upside down).
            // Z = Math.PI flips it right side up.
            // Y ends at odd multiple of PI to face front.
            letterRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 2, r4)

            letterRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 3, r4)
            letterRef.current.rotation.z = Math.PI
        }
    })

    return (
        <>
            <group ref={macbookRef} position={[-1, -1, -1]} scale={0.15}>
                <Macbook />
            </group>

            <group ref={documentRef} position={[-1, -10, -1]} scale={0.02}>
                <DocumentModel />
            </group>

            <group ref={computerRef} position={[-1, -10, -1]} scale={0.8}>
                <MyComputer />
            </group>

            <group ref={letterRef} position={[-1, -10, -1]} scale={0.055}>
                <MysteriousLetter />
            </group>
        </>
    )
}

interface SceneProps {
    children: React.ReactNode
}

export function Scene({ children }: SceneProps) {
    const [pages, setPages] = useState(7)

    useEffect(() => {
        const handleResize = () => {
            // Mobile layout (vertical projects) needs more scroll distance
            const isMobile = window.innerWidth < 768
            setPages(isMobile ? 8.5 : 7)
        }

        // Initial check
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="fixed inset-0 h-screen w-screen bg-black">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={["#050505"]} />

                <ambientLight intensity={1.5} />
                <directionalLight position={[2, 5, 2]} intensity={2} />

                <Suspense fallback={null}>
                    {/* Responsive pages count to handle vertical project stacking on mobile */}
                    <ScrollControls pages={pages} damping={0.1}>
                        <SceneContent />
                        <Scroll html style={{ width: '100vw', height: '100vh' }}>
                            {children}
                        </Scroll>
                    </ScrollControls>
                </Suspense>

                <Stars
                    radius={50}
                    depth={50}
                    count={2000}
                    factor={4}
                    fade
                />
            </Canvas>
        </div>
    )
}
