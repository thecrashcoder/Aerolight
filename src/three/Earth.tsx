import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from '../lib/gsap';
import { earthVert } from './shaders/earth.vert';
import { atmosphereFrag } from './shaders/atmosphere.frag';

export function Earth() {
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const [dayMap, bumpMap, specularMap, cloudMap] = useTexture([
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png',
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  if (specularMap) {
    specularMap.minFilter = THREE.LinearMipMapLinearFilter;
  }

  useFrame((state) => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       if (globeRef.current) globeRef.current.rotation.y += 0.0005;
       if (cloudRef.current) cloudRef.current.rotation.y += 0.0006;
    }
    
    // Mouse interaction tilt
    if (groupRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const targetX = (state.pointer.y * 0.05);
      const targetY = (state.pointer.x * 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    if (groupRef.current) {
      // Intro animation
      gsap.fromTo(groupRef.current.scale, 
        { x: 0.6, y: 0.6, z: 0.6 },
        { x: 1, y: 1, z: 1, duration: 1.6, ease: 'expo.out' }
      );
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial 
          map={dayMap}
          normalMap={bumpMap}
          roughness={0.4}
          metalness={0.5}
          metalnessMap={specularMap}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudRef} scale={[1.006, 1.006, 1.006]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial 
          map={cloudMap}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere Aura */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.15, 128, 128]} />
        <shaderMaterial
          vertexShader={earthVert}
          fragmentShader={atmosphereFrag}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
