'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Variables
        let head: THREE.Object3D | THREE.Group;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let mouseX = 0;
        let mouseY = 0;
        let animationFrameId: number;

        // Scene setup
        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
        renderer = new THREE.WebGLRenderer({ alpha: true });

        renderer.setSize(100, 100);

        // Capture the current container for cleanup
        const currentContainer = containerRef.current;
        currentContainer.appendChild(renderer.domElement);

        // Helper functions
        const createHead = (scene: THREE.Scene) => {
            const geometry = new THREE.SphereGeometry(0.6, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            head = new THREE.Mesh(geometry, material);
            scene.add(head);
        };

        const createEyes = (scene: THREE.Scene) => {
            for (let i = -1; i <= 1; i += 2) {
                const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
                const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
                eye.position.set(i * 0.25, 0.2, 0.4);
                head.add(eye);
            }
        };

        const createHat = (scene: THREE.Scene) => {
            const hatGroup = new THREE.Group();
            hatGroup.position.y = 0.55;
            hatGroup.rotation.x = -0.1; // Slight tilt back
            scene.add(hatGroup);

            // Brim (Base) - Wider and slightly curved
            const brimGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32);
            const hatMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.8,
                metalness: 0.1
            });
            const brim = new THREE.Mesh(brimGeometry, hatMaterial);
            hatGroup.add(brim);

            // Crown (Top) - Tapered
            const crownGeometry = new THREE.CylinderGeometry(0.45, 0.6, 0.5, 32);
            const crown = new THREE.Mesh(crownGeometry, hatMaterial);
            crown.position.y = 0.25;
            hatGroup.add(crown);

            // Band (Ribbon)
            const bandGeometry = new THREE.CylinderGeometry(0.48, 0.62, 0.12, 32);
            const bandMaterial = new THREE.MeshStandardMaterial({
                color: 0xcc0000, // Richer red
                roughness: 0.6,
                metalness: 0.1
            });
            const band = new THREE.Mesh(bandGeometry, bandMaterial);
            band.position.y = 0.06;
            crown.add(band);
        };

        const onMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (!head) return;
            const beta = event.beta || 0; // Tilt para cima/baixo
            const gamma = event.gamma || 0; // Tilt para os lados
            head.rotation.x = (beta / 180) * Math.PI / 2;
            head.rotation.y = (gamma / 360) * Math.PI / 2;
        };

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const fillLight = new THREE.DirectionalLight(0x9999ff, 0.5);
        fillLight.position.set(-5, 0, 5);
        scene.add(fillLight);

        // Initialize scene elements
        createHead(scene);
        createEyes(scene);
        createHat(scene);

        // Camera setup
        camera.position.z = 2.2;

        // Event listeners
        const isMobile = window.innerWidth < 768; // Verifica se é mobile

        if (isMobile) {
            window.addEventListener('deviceorientation', handleOrientation);
        } else {
            window.addEventListener('mousemove', onMouseMove);
        }

        // Animation loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!isMobile && head) {
                const centerX = window.innerWidth;
                const centerY = window.innerHeight / 2;
                head.rotation.y = ((mouseX - centerX) / centerX) * Math.PI / 4;
                head.rotation.x = ((mouseY - centerY) / centerY) * Math.PI / 4;
            }
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);

            if (isMobile) {
                window.removeEventListener('deviceorientation', handleOrientation);
            } else {
                window.removeEventListener('mousemove', onMouseMove);
            }

            if (currentContainer && renderer.domElement) {
                currentContainer.removeChild(renderer.domElement);
            }

            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default ThreeDScene;