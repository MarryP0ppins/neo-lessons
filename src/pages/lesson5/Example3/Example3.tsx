import  { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ParticlesScene = () => {
  const [slow, setSlow] = useState(false);
  return (
    <>
      <button onClick={() => setSlow((prev) => !prev)}>click</button>
      <Canvas style={{ height: 400 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {!slow ? <Particles /> : <ParticlesSlow />}
      </Canvas>
    </>
  );
};

const Particles = () => {
  const particlesRef = useRef();
  useFrame(() => {
    particlesRef.current.rotation.y += 0.01;
  });

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 10000; i++) {
    vertices.push(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial color="white" size={0.1} />
    </points>
  );
};

const ParticlesSlow = () => {
  const groupRef = useRef();

  // Вращение группы частиц
  useFrame(() => {
    groupRef.current.rotation.y += 0.01;
  });

  // Создаем 1000 отдельных объектов SphereGeometry вместо BufferGeometry
  const particles = [];
  for (let i = 0; i < 10000; i++) {
    const geometry = new THREE.SphereGeometry(0.05, 8, 8); // Маленькая сфера для каждой частицы
    const material = new THREE.MeshBasicMaterial({ color: "white" });
    const particle = new THREE.Mesh(geometry, material);

    // Случайное позиционирование частицы
    particle.position.set(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );

    particles.push(particle);
  }

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <primitive key={index} object={particle} />
      ))}
    </group>
  );
};
