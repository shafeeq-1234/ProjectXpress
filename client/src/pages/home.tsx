import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, Users, Award, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

// Import review images
import vivekImage from "@assets/image_1755325200460.png";
import rahulImage from "@assets/image_1755325546843.png";
import vanshikaImage from "@assets/Screenshot 2025-08-16 115200_1755325571630.png";
import tanishqImage from "@assets/image_1755330292970.png";
import madhavImage from "@assets/image_1755330423498.png";



const testimonials = [
  {
    name: "Vivek Kumar",
    college: "SRM University",
    content: "Complete project with report, PPT, and post-project support delivered on time – beyond expectations!",
    rating: 5,
    image: vivekImage
  },
  {
    name: "Rahul Sharma",
    college: "IIIT Nagpur",
    content: "Most affordable rates with premium quality that truly outshines the rest.",
    rating: 5,
    image: rahulImage
  },
  {
    name: "Vanshika Agarwal",
    college: "Delhi University",
    content: "Perfect DBMS project with smooth UI and flawless execution – professor was impressed!",
    rating: 5,
    image: vanshikaImage
  },
  {
    name: "Tanishq Warkede",
    college: "Reemss Fitness",
    content: "Sleek, user-friendly gym website with top-notch design and functionality.",
    rating: 5,
    image: tanishqImage
  },
  {
    name: "Madhav Yadav",
    college: "SRMIST Ktr",
    content: "Smooth offline installation with clear step-by-step instructions, completely hassle-free.",
    rating: 5,
    image: madhavImage
  }
];

export default function Home() {

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced background with 3D depth */}
        <div className="absolute inset-0 parallax-layer">
          {/* Layer 1 - Furthest back */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            }}
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Layer 2 - Middle depth */}
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 opacity-12"
            style={{
              background: 'conic-gradient(from 0deg, rgba(0,255,255,0.15), rgba(0,102,255,0.15), rgba(139,92,246,0.15), rgba(0,255,255,0.15))',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
              rotate: [0, 90, 180, 360],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Layer 3 - Closest to front */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-8"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, rgba(0,255,255,0.1) 50%, transparent 70%)',
            }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Enhanced Floating elements for depth - More on left side */}
          <motion.div
            className="absolute top-32 right-20 w-6 h-6 bg-neon-cyan rounded-full opacity-60"
            animate={{
              y: [0, -50, 0],
              x: [0, 25, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <motion.div
            className="absolute bottom-32 left-20 w-4 h-4 bg-neon-purple rounded-full opacity-70"
            animate={{
              y: [0, -40, 0],
              x: [0, -20, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Additional 3D elements on left side */}
          <motion.div
            className="absolute top-1/4 left-16 w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full opacity-50"
            animate={{
              y: [0, -60, 0],
              x: [0, 30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.div
            className="absolute top-3/4 left-8 w-5 h-5 bg-electric-blue rounded-full opacity-60"
            animate={{
              y: [0, -45, 0],
              x: [0, 35, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          <motion.div
            className="absolute top-1/2 left-4 w-3 h-3 bg-neon-green rounded-full opacity-80"
            animate={{
              y: [0, -35, 0],
              x: [0, 20, 0],
              rotate: [0, -270, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          {/* Geometric shapes for more complexity */}
          <motion.div
            className="absolute top-20 left-32 w-6 h-6 opacity-40"
            style={{
              background: 'linear-gradient(45deg, rgba(0,255,255,0.6), rgba(139,92,246,0.6))',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 120, 240, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          />

          <motion.div
            className="absolute bottom-1/4 left-24 w-4 h-8 opacity-50"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,20,147,0.5), rgba(0,191,255,0.5))',
              borderRadius: '2px',
            }}
            animate={{
              y: [0, -55, 0],
              x: [0, 25, 0],
              rotateZ: [0, 45, 90, 135, 180],
              scaleY: [1, 1.5, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center glass-effect px-6 py-3 rounded-full">
              <motion.div 
                className="w-3 h-3 bg-neon-green rounded-full mr-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-gray-300">
                <span className="gradient-text font-bold">100+ Projects</span> successfully delivered
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 leading-tight hero-text">
              High-Impact Projects & Websites,{" "}
              <span className="gradient-text animate-pulse-subtle">Delivered to Perfection</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              From ready-made to custom projects in 10+ technology domains with installation, documentation, explanation, and lifetime support
            </p>

            {/* Enhanced Delivery Options with smaller mobile buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <motion.div
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 5,
                  z: 10
                }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect px-4 py-3 md:px-6 md:py-4 rounded-2xl transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-6 h-6 md:w-8 md:h-8 bg-neon-green rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black" />
                  </motion.div>
                  <span className="font-medium text-sm md:text-base">Online via AnyDesk</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.08,
                  rotateY: -5,
                  z: 10
                }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect px-4 py-3 md:px-6 md:py-4 rounded-2xl transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-6 h-6 md:w-8 md:h-8 bg-neon-purple rounded-full flex items-center justify-center"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <div className="font-medium text-sm md:text-base">Offline for SRMIST (KTR)</div>
                    <div className="text-xs md:text-sm text-gray-400">Expanding soon to other colleges</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Explore Projects Button with 3D toggle */}
            <motion.div className="mb-12">
              <Link href="/projects">
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotateX: 10,
                    rotateY: 10,
                    z: 30
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Button className="relative bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan hover:from-neon-purple hover:via-neon-cyan hover:to-neon-purple px-8 py-4 md:px-12 md:py-6 rounded-2xl font-poppins font-bold text-lg md:text-xl transition-all duration-300 button-press shadow-2xl animate-pulse-glow ring-2 ring-neon-cyan/50 hover:ring-neon-purple/50">
                    <motion.span
                      initial={{ y: 0 }}
                      whileHover={{ y: -3 }}
                      className="relative z-10 drop-shadow-lg"
                      animate={{ textShadow: ["0 0 10px #00ffff", "0 0 20px #ff00ff", "0 0 10px #00ffff"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🚀 Explore Projects
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-2xl"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl opacity-30 blur-sm"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Enhanced Feature Cards with 3D animations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: "🚀", title: "Fast Delivery", desc: "Quick turnaround" },
                { icon: "💰", title: "Best Price", desc: "Affordable rates" },
                { icon: "📁", title: "10+ Categories", desc: "Multiple domains" },
                { icon: "📞", title: "24/7 Support", desc: "Always available" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    rotateX: 10,
                    z: 20,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect p-4 md:p-6 rounded-2xl text-center cursor-pointer transform-gpu group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl mb-2"
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h4 
                    className="font-poppins font-bold text-sm md:text-base mb-1 group-hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ y: -2 }}
                  >
                    {feature.title}
                  </motion.h4>
                  <p className="text-xs md:text-sm text-gray-400">{feature.desc}</p>
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, rgba(0,255,255,0.05) 0%, rgba(139,92,246,0.05) 100%)'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Testimonials Section - Responsive Review Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 gradient-text"
          >
            What Our Clients Say
          </motion.h2>

          {/* Horizontal Scrolling Review Cards */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 snap-x snap-mandatory">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
                    z: 20,
                    transition: { duration: 0.3 }
                  }}
                  className="flex-shrink-0 w-80 max-w-[90vw] glass-effect rounded-2xl p-6 card-3d group snap-start"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* User Info with Circular Profile */}
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-neon-cyan/50 flex-shrink-0"
                      whileHover={{
                        scale: 1.1,
                        borderColor: 'rgba(0, 255, 255, 1)',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-lg group-hover:text-neon-cyan transition-colors duration-300 truncate">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium truncate">
                        {testimonial.college}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex text-neon-cyan mb-4 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <Star className="w-5 h-5 fill-current drop-shadow-lg" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <blockquote className="text-gray-300 text-sm italic leading-relaxed text-center">
                    <span className="text-neon-cyan text-2xl mr-1 leading-none">"</span>
                    <span>{testimonial.content}</span>
                    <span className="text-neon-cyan text-2xl ml-1 leading-none">"</span>
                  </blockquote>
                  
                  {/* Enhanced 3D glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                    style={{
                      background: 'linear-gradient(45deg, rgba(0,255,255,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                      boxShadow: '0 0 30px rgba(0,255,255,0.3)'
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6">
              <p className="text-gray-400 text-sm flex items-center">
                <span className="mr-2">👈</span>
                Scroll to see more reviews
                <span className="ml-2">👉</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
