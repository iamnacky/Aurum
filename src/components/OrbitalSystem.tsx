import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceNodeProps {
  position: [number, number, number];
  label: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

function ServiceNode({
  position,
  color,
  orbitRadius,
  orbitSpeed,
  onClick,
  onHover,
}: ServiceNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const time = useRef(Math.random() * Math.PI * 2);

  useFrame(() => {
    if (meshRef.current) {
      time.current += orbitSpeed;
      meshRef.current.position.x = Math.cos(time.current) * orbitRadius;
      meshRef.current.position.z = Math.sin(time.current) * orbitRadius;
      meshRef.current.position.y = position[1] + Math.sin(time.current * 2) * 0.2;
      meshRef.current.rotation.y = time.current;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = 'default';
  };

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function CentralCard() {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const scale = Math.min(viewport.width / 10, 1);

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={meshRef} scale={scale}>
        {/* Main card */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 1.6, 0.05]} />
          <meshStandardMaterial
            color="#0B0B0B"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Gold border */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[2.6, 1.7, 0.02]} />
          <meshStandardMaterial
            color="#C7A24F"
            emissive="#C7A24F"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Screen glow */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.3, 1.4]} />
          <meshBasicMaterial color="#C7A24F" transparent opacity={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const orbits = useMemo(() => [2.5, 3.5, 4.5], []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={linesRef}>
      {orbits.map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
          <meshBasicMaterial
            color="#C7A24F"
            transparent
            opacity={0.1 - i * 0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 5;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#C7A24F"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ onNodeClick }: { onNodeClick: (service: string, description: string) => void }) {
  const services = [
    { name: 'Website Consultancy', color: '#C7A24F', orbitRadius: 2.5, speed: 0.005, description: 'We analyze your website, user journey, and business goals to design a strategy that maximizes growth.' },
    { name: 'UX Strategy', color: '#F1D18A', orbitRadius: 3.5, speed: 0.003, description: 'User experience strategy that converts visitors into customers through intuitive design.' },
    { name: 'Website Design', color: '#D4AF37', orbitRadius: 4.5, speed: 0.004, description: 'Stunning, custom designs that capture your brand essence and engage your audience.' },
    { name: 'Website Development', color: '#B8860B', orbitRadius: 2.5, speed: 0.006, description: 'Modern, performant websites built with cutting-edge technology and best practices.' },
    { name: 'SEO Optimization', color: '#C7A24F', orbitRadius: 3.5, speed: 0.004, description: 'Search engine optimization that improves visibility and drives organic traffic.' },
    { name: 'Mobile Optimization', color: '#F1D18A', orbitRadius: 4.5, speed: 0.003, description: 'Responsive design ensuring your website performs flawlessly on all devices.' },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#C7A24F" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#F1D18A" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#C7A24F"
      />
      
      <OrbitLines />
      <Particles />
      <CentralCard />
      
      {services.map((service, index) => (
        <ServiceNode
          key={service.name}
          position={[0, (index % 2 === 0 ? 0.5 : -0.5), 0]}
          label={service.name}
          color={service.color}
          orbitRadius={service.orbitRadius}
          orbitSpeed={service.speed}
          onClick={() => onNodeClick(service.name, service.description)}
          onHover={() => {}}
        />
      ))}
    </>
  );
}

interface OrbitalSystemProps {
  onNodeClick: (service: string, description: string) => void;
}

export default function OrbitalSystem({ onNodeClick }: OrbitalSystemProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene onNodeClick={onNodeClick} />
      </Suspense>
    </Canvas>
  );
}
