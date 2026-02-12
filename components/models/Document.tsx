"use client"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Document(props: any) {
    const { scene } = useGLTF("/models/document.glb")
    const ref = useRef<THREE.Object3D>(null)

    useFrame((state) => {
        if (!ref.current) return

        const time = state.clock.getElapsedTime()
        const amplitude = Math.PI / 20
        const speed = 0.8

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

useGLTF.preload("/models/document.glb")
