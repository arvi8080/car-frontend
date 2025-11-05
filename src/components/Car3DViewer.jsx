// src/components/Car3DViewer.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from 'three';

function CarModel({ scrollY }) {
  const { scene } = useGLTF("/models/car.glb");
  const ref = useRef();
  const [fit, setFit] = useState({ scale: 1, center: [0, 0, 0], ready: false });

  useEffect(() => {
    if (scene && ref.current) {
      try {
        const box = new THREE.Box3().setFromObject(scene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        let scale = 3.2 / maxDim;
        if (!isFinite(scale) || scale <= 0) scale = 1;
        const center = box.getCenter(new THREE.Vector3());
        setFit({ scale, center: [center.x, center.y, center.z], ready: true });
      } catch {
        setFit({ scale: 1, center: [0, -0.5, 0], ready: false });
      }
    }
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y = scrollY * 0.002;
      const wheelNames = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr', 'Wheel_FL', 'Wheel_FR', 'Wheel_RL', 'Wheel_RR'];
      wheelNames.forEach(name => {
        const wheel = ref.current.getObjectByName(name);
        if (wheel) {
          wheel.rotation.x -= delta * 3;
        }
      });
    }
  });

  const scale = fit.ready ? fit.scale : 0.85;
  const position = fit.ready ? [-fit.center[0], -fit.center[1], -fit.center[2]] : [0, -0.5, 0];

  return (
    <group>
      <primitive ref={ref} object={scene} scale={scale} position={position} />
    </group>
  );
}

const Car3DViewer = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[480px] bg-light rounded-xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={<Html center><span className="text-gray-400">Loading 3D Car...</span></Html>}>
          <CarModel scrollY={scrollY} />
          <Environment preset="sunset" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.4} scale={10} blur={2.5} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Car3DViewer;
