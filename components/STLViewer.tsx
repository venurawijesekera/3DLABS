'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface STLViewerProps {
    file: File;
    color: string;
}

export default function STLViewer({ file, color }: STLViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x252525);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 100);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(1, 1, 1);
        scene.add(dirLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 3.0;

        const loader = new STLLoader();
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const buffer = e.target?.result as ArrayBuffer;
                if (!buffer) throw new Error("Failed to read file");

                const geometry = loader.parse(buffer);
                geometry.center();
                geometry.computeBoundingBox();

                const box = geometry.boundingBox!;
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z);

                const scaleFactor = 60 / maxDim;
                geometry.scale(scaleFactor, scaleFactor, scaleFactor);

                // Map 'White' -> hex, etc. simple mapping
                const hexColor = 0x444444;

                const material = new THREE.MeshPhongMaterial({ color: hexColor, specular: 0x111111, shininess: 50 });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                meshRef.current = mesh;

                camera.position.set(0, 0, 150);
                camera.lookAt(0, 0, 0);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to parse STL");
                setLoading(false);
            }
        };

        reader.readAsArrayBuffer(file);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
        };
    }, [file]); // Re-run if file changes

    // Handle Color Updates
    useEffect(() => {
        if (meshRef.current) {
            let hex = 0x444444; // Default / Black logic
            const c = color.toLowerCase();
            if (c === 'white') hex = 0xeeeeee;
            else if (c === 'grey' || c === 'gray') hex = 0x888888;
            else if (c === 'blue') hex = 0x2244aa;
            else if (c === 'red') hex = 0xaa2222;
            else if (c === 'black') hex = 0x111111;

            (meshRef.current.material as THREE.MeshPhongMaterial).color.setHex(hex);
        }
    }, [color]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', zIndex: 5,
                    color: '#ffb703', fontSize: '13px'
                }}>
                    <span>Loading 3D...</span>
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 5,
                    color: '#ff6b6b'
                }}>
                    Error
                </div>
            )}
        </div>
    );
}
