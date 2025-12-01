import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

interface Props {
  pointCloud: number[][];
}

export default function Hologram3D({ pointCloud }: Props) {
  const positions = useMemo(() => new Float32Array(pointCloud.flat()), [pointCloud]);

  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 60 }}>
      <OrbitControls />

      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          attach="material"
          size={0.05}
          color={"#00ffff"}
          sizeAttenuation={true}
        />
      </points>
    </Canvas>
  );
}
