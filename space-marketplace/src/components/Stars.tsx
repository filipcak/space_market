import { useMemo } from "react";
import { Sphere } from "@react-three/drei";

const Stars = () => {
  const stars = useMemo(() => {
    return new Array(300).fill(null).map(() => ({
      position: [
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
      ]as [number, number, number],
      size: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <>
      {stars.map((star, index) => (
        <Sphere key={index} args={[star.size, 16, 16]} position={star.position}>
          <meshBasicMaterial color="white" />
        </Sphere>
      ))}
    </>
  );
};

export default Stars;
