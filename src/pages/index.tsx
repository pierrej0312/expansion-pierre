import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import styles from '@/styles/Home.module.scss';
import Header from '../components/Header';
import Footer from "@/components/Footer";
import Page from "@/components/Page";
import Image from "next/image";
import {gsap} from "gsap";
import {Feature} from "@/@types/feature";

const Home: React.FC = () => {
    const features: Feature[] = [
        {
            title: 'SSL certificates',
            text: `Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.`,
            svg: (
                <svg className="h-6 w-6 text-gray-000" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                </svg>
            )},
        {
            title: 'SSL certificates',
            text: `Sit quis amet rutrum ellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.`,
            svg: (
                <svg className="h-6 w-6 text-gray-000" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                </svg>
            )},
        {
            title: 'Simple queues',
            text: `Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.`,
            svg: (
                <svg className="h-6 w-6 text-gray-000" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                </svg>
            )},
        {
            title: 'Advanced security',
            text: `Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.`,
            svg: (
                <svg className="h-6 w-6 text-gray-000" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"/>
                </svg>
            )},
    ];

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

        // SUN
        const sunLight = new THREE.DirectionalLight(0xffffff, 6.42);
        sunLight.position.set(0, 0, 1);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 500;
        scene.add(sunLight);

        // point light
        const pointLight1 = new THREE.PointLight(0xFFDF9C, 1007 / (4 * Math.PI * (0.48 ** 2)));
        pointLight1.position.set(-7.8, 3.36, 0.2);
        pointLight1.castShadow = true;
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xA5C7FF, 1007 / (4 * Math.PI * (0.48 ** 2)));
        pointLight2.position.set(7.8, 7.36, -2.2);
        pointLight2.castShadow = true;
        scene.add(pointLight2);

        // GLTF model
        const loader = new GLTFLoader();
        loader.load('/assets/rocket-expension.glb', (gltf) => {
            const model = gltf.scene;
            model.rotation.set(0, -Math.PI, 0);
            scene.add(model);

            // particle
            const particleCount = 10000;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            const textureLoader = new TextureLoader();
            const particleTexture = textureLoader.load('/assets/particles.jpg');


            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * -2; // Random angle
                const radius = Math.random() * 0.02; // Random radius
                const height = Math.random() * 0.01; // Random height

                positions[i * 3] = radius * Math.cos(angle); // X position
                positions[i * 3 + 1] = height * -10; // Y position
                positions[i * 3 + 2] = radius * Math.sin(angle); // Z position

                const speed = Math.random() * 0.01 - 0.005; // Random speed
                velocities[i * 3] = speed * Math.cos(angle); // X velocity
                velocities[i * 3 + 1] = Math.random() * -0.02 - 0.01; // Y velocity
                velocities[i * 3 + 2] = speed * Math.sin(angle); // Z velocity
            }

            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

            const particleMaterial = new THREE.PointsMaterial({
                color: 0xFFFFFF,
                size: 0.1,
                map: particleTexture,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.1,
                depthWrite: false,
            });

            const particleSystem = new THREE.Points(particles, particleMaterial);
            particleSystem.position.set(0, 3, 0);
            model.add(particleSystem);

            const animateParticles = () => {
                const positions = particles.attributes.position.array;
                const velocities = particles.attributes.velocity.array;

                for (let i = 0; i < particleCount; i++) {
                    positions[i * 3] += velocities[i * 3];
                    positions[i * 3 + 1] += velocities[i * 3 + 1];
                    positions[i * 3 + 2] += velocities[i * 3 + 2];

                    // Reset particles
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
            let speed = 0.005;

            const animateRocket = () => {
                model.position.y = rocketPosition;
                rocketPosition += speed * direction;

                if (rocketPosition < 1) {
                    direction *= -1;
                    gsap.to(model.rotation, {
                        y: model.rotation.y + Math.PI * 2,
                        duration: 2,
                        ease: 'power1.inOut'
                    });
                    speed = 0.015;
                    rocketPosition += speed * direction;
                }
                if (rocketPosition > 3) {
                    direction *= -1;
                    speed = 0.005;
                    rocketPosition += speed * direction;
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
        <>
            <Page>
                <main className={styles.header + " mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 w-100"}>
                    <section className={styles.heroSection + " flex-col -max-w-5xl"}>
                        <div className="relative isolate px-6 pt-14">
                            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                                <div className="text-center flex-col gap">
                                    <h1 className="font-medium text-xl text-gray-900 sm:text-6xl">Nous vous accompagnons dans votre <strong className="font-medium text-xl text-highlight">expansion digitale</strong></h1>
                                    <p className="font-regular text-md leading-8 text-gray-500">Le programme Digital Booster d’Expansion est <strong className="font-semibold">l’atout digital des petites, moyennes et grandes entreprises</strong> qui souhaitent développer ou confirmer leur présence en ligne.</p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <button aria-label="ouvrir le formulaire de demande de test" className="btn primary-btn">
                                            <Image
                                                src="/assets/icon.svg"
                                                width={32}
                                                height={32}
                                                alt="icon Digital Booster rocket"
                                                className="h-8 w-auto"/>
                                            Faites le test sans plus tarder
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div aria-hidden="true" className={styles.heroScene}>
                        <div ref={canvasRef} className={styles.canvasContainer}></div>
                        <span className={`${styles.device} ${styles.open}`}></span>
                        <span className={`${styles.device} ${styles.wireframe}`}></span>
                    </div>
                </main>
                <section className="py-24 sm:py-32 -mt-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-md font-semibold leading-7 text-highlight">Deploy faster</h2>
                            <p className="mt-2 text-xl tracking-tight text-gray-900 sm:text-4xl">Everything
                                you need to deploy your app</p>
                            <p className="mt-6 text-md text-gray-500">Quis tellus eget adipiscing
                                convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar
                                et feugiat blandit at. In mi viverra elit nunc.</p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                {features.map((feature, index) => (
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-gray-900">
                                            <div
                                                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-highlight">
                                                {feature.svg}
                                            </div>
                                            {feature.title}
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-500">
                                            {feature.text}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>
            </Page>
        </>
    );
};

export default Home;
