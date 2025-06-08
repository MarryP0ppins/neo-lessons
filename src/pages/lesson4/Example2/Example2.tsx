import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

const InteractiveSphere = () => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    meshRef.current?.scale.setScalar(hovered ? 1.2 : 1);
  });

  return (
    <Sphere
      args={[2, 32, 32]}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color="blue" />
    </Sphere>
  );
};

export const InteractiveSphereScene = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ height: 400 }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1000} />
    <InteractiveSphere />
    <OrbitControls enablePan={false} enableZoom={true} />
  </Canvas>
);
