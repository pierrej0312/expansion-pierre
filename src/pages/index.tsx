import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import styles from '@/styles/Home.module.scss';
import Header from '../components/Header';
import Footer from "@/components/Footer";
import Page from "@/components/Page";
import Image from "next/image";
const Home: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvasRef.current.appendChild(renderer.domElement);

        // Adding directional light (Sun)
        const sunLight = new THREE.DirectionalLight(0xffffff, 6.42);
        sunLight.position.set(0, 0, 1);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 500;
        scene.add(sunLight);

        // Adding point light
        const pointLight1 = new THREE.PointLight(0xFFDF9C, 1007 / (4 * Math.PI * (0.48 ** 2)));
        pointLight1.position.set(-7.8, 3.36, 0.2);
        pointLight1.castShadow = true;
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xA5C7FF, 1007 / (4 * Math.PI * (0.48 ** 2)));
        pointLight2.position.set(7.8, 7.36, -2.2);
        pointLight2.castShadow = true;
        scene.add(pointLight2);

        // Load the GLTF model
        const loader = new GLTFLoader();
        loader.load('/assets/rocket-expension.glb', (gltf) => {
            const model = gltf.scene;
            model.rotation.set(0, -Math.PI, 0);
            scene.add(model);

            // Add particle system for flames
            const particleCount = 10000;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            const textureLoader = new TextureLoader();
            const particleTexture = textureLoader.load('/assets/particles.jpg'); // Replace with your particle texture


            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * -2; // Random angle around the vertical axis
                const radius = Math.random() * 0.02; // Random radius within a cone shape
                const height = Math.random() * 0.01; // Random height within a cone shape

                positions[i * 3] = radius * Math.cos(angle); // X position (horizontal)
                positions[i * 3 + 1] = height * -10; // Y position (vertical, multiplied by -10 for downward direction)
                positions[i * 3 + 2] = radius * Math.sin(angle); // Z position (depth)

                const speed = Math.random() * 0.01 - 0.005; // Random speed within a range
                velocities[i * 3] = speed * Math.cos(angle); // X velocity
                velocities[i * 3 + 1] = Math.random() * -0.02 - 0.01; // Y velocity (downward)
                velocities[i * 3 + 2] = speed * Math.sin(angle); // Z velocity
            }

            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

            const particleMaterial = new THREE.PointsMaterial({
                color: 0xE75336,
                size: 0.1,
                map: particleTexture,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.3,
                depthWrite: false,
            });

            const particleSystem = new THREE.Points(particles, particleMaterial);
            particleSystem.position.set(0, 3, 0); // Position the particle system at the bottom of the rocket
            model.add(particleSystem);

            const animateParticles = () => {
                const positions = particles.attributes.position.array;
                const velocities = particles.attributes.velocity.array;

                for (let i = 0; i < particleCount; i++) {
                    positions[i * 3] += velocities[i * 3];
                    positions[i * 3 + 1] += velocities[i * 3 + 1];
                    positions[i * 3 + 2] += velocities[i * 3 + 2];

                    // Reset particles that move too far
                    if (positions[i * 3 + 1] < -10) { // If particle reaches Y -10
                        const angle = Math.random() * Math.PI * 2;
                        const radius = Math.random() * 0.02;
                        const height = Math.random() * 0.01;

                        positions[i * 3] = radius * Math.cos(angle);
                        positions[i * 3 + 1] = height * -10;
                        positions[i * 3 + 2] = radius * Math.sin(angle);

                        const speed = Math.random() * 0.01 - 0.005;
                        velocities[i * 3] = speed * Math.cos(angle);
                        velocities[i * 3 + 1] = Math.random() * -0.02 - 0.01;
                        velocities[i * 3 + 2] = speed * Math.sin(angle);
                    }
                }
                particles.attributes.position.needsUpdate = true;
            };

            // Animation code for rocket movement
            let rocketPosition = 2; // Initial position of the rocket
            let direction = 1;
            let speed = 0.005// Initial direction of movement (1 for upward, -1 for downward)

            const animateRocket = () => {
                model.position.y = rocketPosition;
                rocketPosition += speed * direction; // Adjust the speed here as needed

                if (rocketPosition > 3 || rocketPosition < 1) {
                    direction *= -1; // Change direction when reaching upper or lower bounds
                }
            };

            const animate = () => {
                requestAnimationFrame(animate);
                animateParticles();
                animateRocket();
                renderer.render(scene, camera);
            };

            animate();
        });

        camera.position.set(0, 0, 20);

        return () => {
            renderer.dispose();
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div>
            <Header />
            <Page>
                <main className={styles.header + " container"}>
                    <section className="flex-col">
                        <h2>
                            Nous vous accompagnons dans votre <strong>expansion digitale</strong>
                        </h2>
                        <p>Le programme Digital Booster d’Expansion est <strong>l’atout digital des petites, moyennes et grandes entreprises</strong> qui souhaitent développer ou confirmer leur présence en ligne.</p>
                        <button>
                            <Image
                                src="/assets/icon.svg"
                                width={32}
                                height={32}
                                alt="icon"
                                className="h-8 w-auto"/>
                            Faites le test sans plus tarder
                        </button>
                    </section>
                    <div ref={canvasRef} className={styles.canvasContainer}>
                    </div>
                </main>
            </Page>
            <Footer />
        </div>
    );
};

export default Home;
