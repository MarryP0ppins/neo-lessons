import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const Scene = () => (
  <Canvas style={{ height: 400 }}>
    <ambientLight intensity={1} />
    <pointLight position={[10, 10, 10]} intensity={1000} />
    <RotatingCube />
  </Canvas>
);

const RotatingCube = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};
