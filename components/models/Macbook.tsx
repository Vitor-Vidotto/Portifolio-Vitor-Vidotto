"use client"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Macbook(props: any) {
    const { scene } = useGLTF("/models/macbook.glb")
    const ref = useRef<THREE.Object3D>(null)

    // Keep the floating animation?
    // Or maybe just let the parent control position/rotation clearly
    // For now, I'll keep a subtle floating animation if no scroll logic overrides it entirely,
    // but usually ScrollControls will drive the position.
    // The original had a mouse tracking or time based loop.
    // I will leave the time-based rotation for "float" effect but
    // position will be controlled by parent or scroll.

    useFrame((state) => {
        if (!ref.current) return

        const time = state.clock.getElapsedTime()
        const amplitude = Math.PI / 20 // Reduced amplitude so it doesn't spin too much if we are also rotating via scroll
        const speed = 0.6

        // Floating sway
        ref.current.rotation.y += (Math.sin(time * speed) * amplitude - ref.current.rotation.y) * 0.1
    })

    return (
        <primitive
            ref={ref}
            object={scene}
            {...props}
        />
    )
}

useGLTF.preload("/models/macbook.glb")
