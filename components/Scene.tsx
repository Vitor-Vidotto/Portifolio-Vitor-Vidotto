"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, ScrollControls, Scroll, useScroll } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { Document as DocumentModel } from "./models/Document"
import { MyComputer } from "./models/MyComputer"
import { Macbook } from "./models/Macbook"
import { MysteriousLetter } from "./models/MysteriousLetter"

function SceneContent() {
    const scroll = useScroll()
    const { width, height } = useThree((state) => state.viewport)
    const isMobile = width < 768 / 75 // Approximate conversion for mobile check in 3D units or just use viewport width logic
    // actually better to check aspect ratio or just rely on width

    const macbookRef = useRef<THREE.Group>(null)
    const documentRef = useRef<THREE.Group>(null)
    const computerRef = useRef<THREE.Group>(null)
    const letterRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        const r1 = scroll.range(0, 0.15)
        const r2_enter = scroll.range(0.005, 0.15)
        const r2_exit = scroll.range(0.55, 0.15)
        const r3_enter = scroll.range(0.58, 0.15)
        const r3_exit = scroll.range(0.75, 0.08)
        const r4 = scroll.range(0.80, 0.10)

        // RESPONSIVE CALCULATIONS
        // Wide screen: objects to the left. Narrow screen: objects centered or slightly offset.
        const isWide = width > 5;
        const leftSide = isWide ? -width / 3 : 0;
        const center = 0;

        // Macbook
        if (macbookRef.current) {
            // Start at center, move to top-center (or top-left if wide)
            const startPos = new THREE.Vector3(leftSide, -1.5, 0)
            const endPos = new THREE.Vector3(leftSide, height / 2 + 2, -5)

            macbookRef.current.position.lerpVectors(startPos, endPos, r1)

            // Scale based on viewport width
            const baseScale = isWide ? 0.15 : 0.12;
            const targetScale = isWide ? 0.1 : 0.08;
            macbookRef.current.scale.setScalar(THREE.MathUtils.lerp(baseScale, targetScale, r1))
            macbookRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.5, r1)
        }

        // Document
        if (documentRef.current) {
            const startPos = new THREE.Vector3(leftSide, -height, -1)
            const midPos = new THREE.Vector3(leftSide, -1, -1) // Visible state
            const endPos = new THREE.Vector3(leftSide, height / 2 + 2, -5)

            if (scroll.offset < 0.55) {
                documentRef.current.position.lerpVectors(startPos, midPos, r2_enter)
                documentRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0, r2_enter)
                documentRef.current.scale.setScalar(isWide ? 0.02 : 0.015)
            } else {
                documentRef.current.position.lerpVectors(midPos, endPos, r2_exit)
                documentRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.5, r2_exit)
            }
        }

        // MyComputer
        if (computerRef.current) {
            const startPos = new THREE.Vector3(width / 2 + 2, -height, -1) // Enter from right/bottom
            const centerPos = new THREE.Vector3(center, 0, -1) // Center screen for "About"
            const endPos = new THREE.Vector3(-width / 2 - 2, height / 2, -5) // Exit to left/top

            if (scroll.offset < 0.75) {
                computerRef.current.position.lerpVectors(startPos, centerPos, r3_enter)
                // Adjust scale for mobile so it fits
                computerRef.current.scale.setScalar(isWide ? 0.8 : 0.5)
                computerRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0, r3_enter)
            } else {
                computerRef.current.position.lerpVectors(centerPos, endPos, r3_exit)
                computerRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.5, r3_exit)
            }
        }

        // MysteriousLetter
        if (letterRef.current) {
            const startPos = new THREE.Vector3(0, -height, -1)
            // Position it at center or slightly right for Contact? Center is safest.
            const centerPos = new THREE.Vector3(0, 0, -2)

            letterRef.current.position.lerpVectors(startPos, centerPos, r4)
            letterRef.current.scale.setScalar(isWide ? 0.055 : 0.04)

            letterRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 2, r4)
            letterRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 3, r4)
            letterRef.current.rotation.z = Math.PI
        }
    })

    return (
        <>
            <group ref={macbookRef}>
                <Macbook />
            </group>

            <group ref={documentRef}>
                <DocumentModel />
            </group>

            <group ref={computerRef}>
                <MyComputer />
            </group>

            <group ref={letterRef}>
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
            // Slightly increased for mobile to ensure last section (contact) is fully reachable with new spacing
            setPages(isMobile ? 9 : 7)
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
