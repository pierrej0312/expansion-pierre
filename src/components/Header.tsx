import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import styles from '../styles/Header.module.scss';

const Header: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialiser la scène, la caméra et le rendu
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        // Créer un cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Fonction d'animation
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        // Exemple d'animation GSAP
        gsap.to(cube.rotation, { x: Math.PI * 2, duration: 2, repeat: -1, yoyo: true });

        // Nettoyage à la suppression du composant
        return () => {
            renderer.dispose();
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <header className={styles.header}>
            <div ref={canvasRef} className={styles.canvasContainer}></div>
            {/* Autres éléments de l'en-tête */}
        </header>
    );
};

export default Header;
