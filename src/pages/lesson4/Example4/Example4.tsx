import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import type { Mesh } from "three";

type GalleryItemType = {
  position: [x: number, y: number, z: number];
  index: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  active: number;
};
const GalleryItem: React.FC<GalleryItemType> = ({
  position,
  index,
  setActive,
  active,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = 0.5;
      meshRef.current.rotation.x = 0.5;
      meshRef.current.scale.setScalar(active === index ? 1.2 : 1);
    }
  });

  return (
    <Box
      args={[2, 2, 2]}
      position={position}
      ref={meshRef}
      onClick={() => setActive(index)}
    >
      <meshStandardMaterial color={`hsl(${index * 60}, 50%, 50%)`} />
    </Box>
  );
};

export const ThreeDGallery = () => {
  const [active, setActive] = useState(0);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1000} />
      {[-6, 0, 6].map((x, index) => (
        <GalleryItem
          key={index}
          position={[x, 0, 0]}
          index={index}
          setActive={setActive}
          active={active}
        />
      ))}
    </Canvas>
  );
};
