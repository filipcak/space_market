import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  texturePath: string;
  speed: number;
}

const Planet: React.FC<PlanetProps> = ({ position, size, texturePath, speed }) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, texturePath);

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const t = clock.getElapsedTime() * speed;
      planetRef.current.position.x = Math.cos(t) * position[0];
      planetRef.current.position.z = Math.sin(t) * position[0];
      planetRef.current.rotation.y += 0.002; // Slow rotation
    }
  });

  return (
    <mesh ref={planetRef} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Planet;
