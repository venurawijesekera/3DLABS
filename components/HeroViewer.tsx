'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const modelsList = [
    { path: '/assets/models/file1.stl', name: 'Hex Knob' },
    { path: '/assets/models/file2.stl', name: 'Motor Coupling' },
    { path: '/assets/models/file3.stl', name: 'Diamond Tester Nozzle' }
];

export default function HeroViewer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [modelName, setModelName] = useState(modelsList[0].name);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(10, 10, 10);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.5;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        const loader = new STLLoader();
        let currentMesh: THREE.Mesh | null = null;
        let currentModelIndex = 0;
        let animationId: number;

        const loadModel = (index: number) => {
            setLoading(true);
            const modelData = modelsList[index];
            setModelName(modelData.name);

            loader.load(modelData.path, function (geometry) {
                if (currentMesh) {
                    scene.remove(currentMesh);
                    if (currentMesh.geometry) currentMesh.geometry.dispose();
                    if ((currentMesh.material as THREE.Material).dispose) (currentMesh.material as THREE.Material).dispose();
                }

                const material = new THREE.MeshStandardMaterial({
                    color: 0xffa500,
                    metalness: 0.3,
                    roughness: 0.4
                });
                const mesh = new THREE.Mesh(geometry, material);

                geometry.computeBoundingBox();
                const center = new THREE.Vector3();
                if (geometry.boundingBox) geometry.boundingBox.getCenter(center);
                mesh.position.sub(center);

                scene.add(mesh);
                currentMesh = mesh;
                setLoading(false);

                // Fit camera
                const box = new THREE.Box3().setFromObject(mesh);
                const size = box.getSize(new THREE.Vector3()).length();
                const centerBox = box.getCenter(new THREE.Vector3());

                camera.position.y = centerBox.y + size / 2 + 50;
                camera.position.x = centerBox.x + size / 2 + 50;
                camera.position.z = centerBox.z + size / 2 + 50;
                camera.lookAt(centerBox);

            }, undefined, function (error) {
                console.error('An error happened', error);
                setLoading(false);
            });
        };

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        loadModel(0);
        animate();

        const intervalId = setInterval(() => {
            currentModelIndex = (currentModelIndex + 1) % modelsList.length;
            loadModel(currentModelIndex);
        }, 5000);

        const handleResize = () => {
            if (container && camera && renderer) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(intervalId);
            cancelAnimationFrame(animationId);
            if (container) container.removeChild(renderer.domElement);
            if (currentMesh) {
                if (currentMesh.geometry) currentMesh.geometry.dispose();
                if ((currentMesh.material as THREE.Material).dispose) (currentMesh.material as THREE.Material).dispose();
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div id="model-viewer-container" className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s" style={{ position: 'relative', width: '100%', height: '550px', overflow: 'hidden' }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%', outline: 'none', cursor: 'grab' }}></div>
            {loading && (
                <div id="loader-overlay" style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: '#faa415', fontSize: '12px', pointerEvents: 'none'
                }}>Loading...</div>
            )}
            <div id="model-name-display" style={{
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', textTransform: 'uppercase',
                pointerEvents: 'none', letterSpacing: '2px'
            }}>{modelName}</div>
        </div>
    );
}
