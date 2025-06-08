import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import type { Mesh } from "three";

const AnimatedTorus = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime();
      meshRef.current.rotation.x = -clock.getElapsedTime();
      meshRef.current.material.color.setHSL(
        Math.sin(clock.getElapsedTime()) * 0.5 + 0.5,
        0.5,
        0.5
      );
    }
  });

  return (
    <Torus args={[2, 0.4, 16, 100]} ref={meshRef}>
      <meshStandardMaterial />
    </Torus>
  );
};

export const AnimatedTorusScene = () => (
  <Canvas style={{ height: 400 }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1000} />
    <AnimatedTorus />
  </Canvas>
);
