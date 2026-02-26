import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Initial positioning
        camera.position.z = 50;

        // Background color and fog
        scene.background = new THREE.Color(0x0A0E27);
        scene.fog = new THREE.Fog(0x1A0033, 100, 500);

        // PARTICLE SYSTEM
        const createParticles = (count: number) => {
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const colors = [];

            for (let i = 0; i < count; i++) {
                positions.push(
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 200
                );

                if (Math.random() > 0.5) {
                    colors.push(1, 0, 0.25); // Red (#FF0040)
                } else {
                    colors.push(0, 1, 1); // Cyan (#00FFFF)
                }
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

            const material = new THREE.PointsMaterial({
                size: 0.5,
                vertexColors: true,
                transparent: true,
                sizeAttenuation: true,
                opacity: 0.8
            });

            return new THREE.Points(geometry, material);
        };

        const particles = createParticles(1000);
        scene.add(particles);

        // GEOMETRIC SHAPES
        // Rotating Wireframe Cube
        const cubeGeom = new THREE.BoxGeometry(20, 20, 20);
        const cubeMaterial = new THREE.MeshStandardMaterial({
            color: 0xFF0040,
            wireframe: true,
            emissive: 0xFF0040,
            emissiveIntensity: 1,
        });
        const cube = new THREE.Mesh(cubeGeom, cubeMaterial);
        cube.position.z = -50;
        scene.add(cube);

        // Pulsing Sphere
        const sphereGeom = new THREE.SphereGeometry(15, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x00FFFF,
            emissive: 0x00FFFF,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.4,
        });
        const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
        sphere.position.set(40, 30, -80);
        scene.add(sphere);

        // NEURAL NETWORK Effect
        const createNeuralNetwork = () => {
            const group = new THREE.Group();
            const nodeGeometry = new THREE.SphereGeometry(0.5, 8, 8);
            const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0040 });

            const nodes: THREE.Vector3[] = [];
            for (let i = 0; i < 30; i++) {
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                const pos = new THREE.Vector3(
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 150
                );
                node.position.copy(pos);
                nodes.push(pos);
                group.add(node);
            }

            // Lines connecting nodes
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    if (nodes[i].distanceTo(nodes[j]) < 40) {
                        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
                        linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
                    }
                }
            }
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF0040, transparent: true, opacity: 0.2 });
            const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            group.add(lines);
            return group;
        };

        const neuralNet = createNeuralNetwork();
        scene.add(neuralNet);

        // GRID PLANE
        const gridHelper = new THREE.GridHelper(200, 20, 0xFF0040, 0x1A0033);
        gridHelper.position.y = -50;
        gridHelper.position.z = -50;
        scene.add(gridHelper);

        // LIGHTING
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xFF0040, 1.5, 200);
        pointLight1.position.set(50, 50, 50);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00FFFF, 1.5, 200);
        pointLight2.position.set(-50, -50, -50);
        scene.add(pointLight2);

        // Animation variables
        let time = 0;
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const onWindowResize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);

        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.005;

            // Rotate objects
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.01;

            neuralNet.rotation.y += 0.002;

            // Pulse sphere
            const pulse = 1 + Math.sin(time * 2) * 0.1;
            sphere.scale.set(pulse, pulse, pulse);

            // Rotate particles
            particles.rotation.y += 0.0005;

            // Camera slight movement based on mouse
            camera.position.x += (mouseX * 30 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 30 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0 opacity-60"
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default HeroBackground;
