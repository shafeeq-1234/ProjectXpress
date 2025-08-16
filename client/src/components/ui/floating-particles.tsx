import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const particles = [
  { id: 1, color: "bg-neon-cyan", size: "w-2 h-2", left: "10%", top: "20%", delay: 0, depth: 1 },
  { id: 2, color: "bg-neon-purple", size: "w-3 h-3", left: "80%", top: "10%", delay: 2, depth: 2 },
  { id: 3, color: "bg-neon-pink", size: "w-1 h-1", left: "50%", top: "60%", delay: 4, depth: 0.5 },
  { id: 4, color: "bg-neon-green", size: "w-2 h-2", left: "20%", top: "80%", delay: 1, depth: 1.5 },
  { id: 5, color: "bg-electric-blue", size: "w-1 h-1", left: "70%", top: "40%", delay: 3, depth: 0.8 },
  { id: 6, color: "bg-neon-cyan", size: "w-1 h-1", left: "30%", top: "30%", delay: 5, depth: 0.6 },
  { id: 7, color: "bg-neon-purple", size: "w-2 h-2", left: "90%", top: "70%", delay: 1.5, depth: 1.2 },
  { id: 8, color: "bg-neon-pink", size: "w-3 h-3", left: "15%", top: "50%", delay: 3.5, depth: 1.8 },
];

const geometricShapes = [
  { id: 9, shape: "triangle", left: "5%", top: "40%", size: 20, depth: 1.5 },
  { id: 10, shape: "diamond", left: "85%", top: "25%", size: 15, depth: 1.2 },
  { id: 11, shape: "hexagon", left: "60%", top: "75%", size: 18, depth: 0.8 },
];

export default function FloatingParticles() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="floating-particles fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Particle Elements */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle ${particle.size} ${particle.color} rounded-full`}
          style={{
            left: particle.left,
            top: particle.top,
            opacity: 0.3 + (particle.depth * 0.2),
            transform: `translateX(${mousePosition.x * particle.depth * 20}px) translateY(${mousePosition.y * particle.depth * 15}px)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {geometricShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.left,
            top: shape.top,
            transform: `translateX(${mousePosition.x * shape.depth * 25}px) translateY(${mousePosition.y * shape.depth * 20}px)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="border-2 border-neon-cyan/20 backdrop-blur-sm"
            style={{
              width: shape.size,
              height: shape.size,
              clipPath: shape.shape === 'triangle' 
                ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                : shape.shape === 'diamond'
                ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                : shape.shape === 'hexagon'
                ? 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                : undefined,
            }}
          />
        </motion.div>
      ))}

      {/* Floating Orbs */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)',
          left: '20%',
          top: '60%',
          transform: `translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 25}px)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          right: '25%',
          top: '30%',
          transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -15}px)`,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
