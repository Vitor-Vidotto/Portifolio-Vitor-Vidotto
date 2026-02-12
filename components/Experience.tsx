"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, useGLTF, OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"

function Macbook() {
  const { scene } = useGLTF("/models/macbook.glb")
  const ref = useRef<THREE.Object3D>(null)

useFrame((state) => {
  if (!ref.current) return

  const targetPosition = new THREE.Vector3(-1, -1, -1)
  const targetScale = new THREE.Vector3(0.15, 0.15, 0.15)

  ref.current.position.lerp(targetPosition, 0.04)
  ref.current.scale.lerp(targetScale, 0.04)

  const time = state.clock.getElapsedTime()

  const amplitude = Math.PI / 9
  const speed = 0.3

  // 🔥 centro agora é FRENTE (0 rad)
  ref.current.rotation.y = Math.sin(time * speed) * amplitude
})



  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, -3, 6]}   // começa mais longe
      scale={0.1}
      rotation={[0, Math.PI, 0]}
    />
  )
}


export function Experience() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#050505"]} />

        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />

        <Suspense fallback={null}>
          <Macbook />
        </Suspense>

        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={4}
          fade
        />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

useGLTF.preload("/models/macbook.glb")

export default Experience
