import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sun = () => {
  const texture = useLoader(TextureLoader, "./textures/sun.jpg"); // Add sun texture

  return (
    <mesh>
      <sphereGeometry args={[20, 32, 32]} />
      <meshStandardMaterial map={texture} emissiveIntensity={1.5} />
      <pointLight position={[0, 0, 0]} intensity={5} />
    </mesh>
  );
};

export default Sun;
