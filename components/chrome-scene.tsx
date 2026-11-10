"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function ChromeStar({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const shape = useMemo(() => {
    const star = new THREE.Shape();
    const points = 10;

    for (let point = 0; point < points; point += 1) {
      const angle = (point / points) * Math.PI * 2 - Math.PI / 2;
      const radius = point % 2 === 0 ? 1.35 : 0.62;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (point === 0) star.moveTo(x, y);
      else star.lineTo(x, y);
    }

    star.closePath();
    return star;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current || reducedMotion) return;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.1;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 0.8}
      rotationIntensity={reducedMotion ? 0 : 0.16}
      floatIntensity={reducedMotion ? 0 : 0.35}
    >
      <mesh ref={mesh} scale={1.08}>
        <extrudeGeometry
          args={[shape, {
            depth: 0.3,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: 0.12,
            bevelThickness: 0.12,
          }]}
        />
        <MeshDistortMaterial
          color="#f4f2ff"
          metalness={1}
          roughness={0.08}
          distort={0.14}
          speed={reducedMotion ? 0 : 0.8}
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>
    </Float>
  );
}

function CursorReactiveSculpture({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const { gl } = useThree();

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = gl.domElement.getBoundingClientRect();
      const insideCanvas = event.clientX >= bounds.left
        && event.clientX <= bounds.right
        && event.clientY >= bounds.top
        && event.clientY <= bounds.bottom;

      if (!insideCanvas) {
        pointer.current.set(0, 0);
        return;
      }

      pointer.current.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [gl, reducedMotion]);

  useFrame(() => {
    if (!group.current || reducedMotion) return;

    const target = pointer.current;
    group.current.rotation.x += (target.y * 0.24 - group.current.rotation.x) * 0.045;
    group.current.rotation.y += (target.x * 0.35 - group.current.rotation.y) * 0.045;
    group.current.position.x += (target.x * 0.12 - group.current.position.x) * 0.045;
    group.current.position.y += (target.y * 0.09 - group.current.position.y) * 0.045;
  });

  return (
    <group ref={group}>
      <ChromeStar reducedMotion={reducedMotion} />
    </group>
  );
}

export default function ChromeScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="three-stage" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 5, 4]} intensity={3.5} />
          <pointLight position={[-4, -2, 2]} intensity={5.5} color="#a982ff" />
          <pointLight position={[3, -3, -2]} intensity={4.5} color="#7ceaff" />
          <CursorReactiveSculpture reducedMotion={reducedMotion} />
          <Sparkles count={42} scale={5.2} size={2.2} speed={reducedMotion ? 0 : 0.25} color="#ffffff" />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
