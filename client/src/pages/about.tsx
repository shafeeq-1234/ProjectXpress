import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Linkedin, Instagram } from "lucide-react";
import { SiX } from "react-icons/si";
import { useRef } from "react";
import aadarshjaiswalImage from "@assets/WhatsApp Image 2025-08-15 at 17.46.21_64a52326_1755260193596.jpg";
import shafeeqImage from "@assets/image_1755260210751.png";

const founders = [
  {
    name: "Aadarsh Jaiswal",
    title: "Founder",
    description: "3× Hackathon winner, cybersecurity, AI/ML, and full-stack specialist, turning bold ideas into innovations.",
    image: aadarshjaiswalImage,
    socials: {
      linkedin: "https://www.linkedin.com/in/aadarshjaiswal640",
      instagram: "https://www.instagram.com/aadarshjaiswal640",
      github: "https://github.com/aadarshjaiswal640",
      x: "https://x.com/aadarshjaisw640",
    },
  },
  {
    name: "Shafeeq",
    title: "Co-Founder",
    description: "Hardware & cybersecurity specialist, delivering robust systems and rapid installation setups with precision and reliability.",
    image: shafeeqImage,
    socials: {
      linkedin: "https://www.linkedin.com/in/shafeeq-shaik",
      instagram: "https://www.instagram.com/s.shafeeq_23",
      github: "https://github.com/shafeeq-1234",
      x: "https://x.com/Shafeeq_1234",
    },
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-space-dark via-slate-900 to-space-dark relative overflow-hidden">
      {/* Parallax Background Effects */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-32 right-1/3 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"
      />

      {/* Visionaries Section */}
      <section ref={containerRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-poppins font-bold bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-purple bg-clip-text text-transparent mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Visionaries
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Meet the innovative minds behind Project Xpress, driving technological excellence and student success
            </motion.p>
          </motion.div>

          {/* Founders Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.6 + index * 0.3,
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: index % 2 === 0 ? 8 : -8,
                  rotateX: 5,
                  z: 50,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="group relative glass-effect p-8 rounded-3xl text-center transform-gpu shadow-2xl hover:shadow-4xl transition-all duration-500"
                style={{ 
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* Glowing shadow effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-purple blur-xl -z-10"
                />

                {/* Profile Image with 3D effects */}
                <motion.div 
                  className="relative mb-8"
                  whileHover={{ 
                    rotateY: 360,
                    transition: { duration: 1, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    className="w-40 h-40 mx-auto relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={founder.image}
                      alt={`${founder.name} - ${founder.title}`}
                      className="w-full h-full rounded-full object-cover border-4 border-neon-cyan group-hover:border-neon-purple transition-all duration-500 shadow-2xl"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 0.2, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    />
                  </motion.div>
                </motion.div>

                {/* Founder Details */}
                <motion.div
                  whileHover={{ z: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <motion.h3 
                    className="text-3xl font-poppins font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {founder.name}
                  </motion.h3>
                  <motion.p 
                    className={`mb-6 font-semibold text-lg ${index === 0 ? "text-neon-cyan" : "text-neon-purple"} group-hover:text-electric-blue transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {founder.title}
                  </motion.p>
                  <motion.p 
                    className="text-gray-300 mb-8 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {founder.description}
                  </motion.p>
                </motion.div>

                {/* Social Links with 3D pop effects */}
                <motion.div 
                  className="flex justify-center space-x-6"
                  whileHover={{ z: 30 }}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <motion.a
                    href={founder.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateY: 360,
                      z: 20,
                      boxShadow: "0 10px 30px rgba(0, 119, 181, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.a>

                  <motion.a
                    href={founder.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateY: 360,
                      z: 20,
                      boxShadow: "0 10px 30px rgba(225, 48, 108, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </motion.a>

                  <motion.a
                    href={founder.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateY: 360,
                      z: 20,
                      boxShadow: "0 10px 30px rgba(55, 65, 81, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>

                  <motion.a
                    href={founder.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateY: 360,
                      z: 20,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gradient-to-r from-black to-gray-900 hover:from-gray-800 hover:to-black rounded-full flex items-center justify-center transition-all duration-300 shadow-lg transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <SiX className="w-5 h-5 text-white" />
                  </motion.a>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-full blur-xl"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full blur-xl"
                />
              </motion.div>
            ))}
          </div>

          {/* Floating elements for depth */}
          <motion.div
            className="absolute top-1/4 left-10 w-4 h-4 bg-neon-cyan rounded-full opacity-20"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-16 w-6 h-6 bg-neon-purple rounded-full opacity-20"
            animate={{ 
              y: [0, 30, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-electric-blue rounded-full opacity-30"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </section>
    </div>
  );
}