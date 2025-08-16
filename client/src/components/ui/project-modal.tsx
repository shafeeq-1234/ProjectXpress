import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  features: string[];
  inclusions: string[];
  screenshots: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onOrderNow: () => void;
}

export default function ProjectModal({ isOpen, onClose, project, onOrderNow }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-effect p-8 rounded-3xl relative shadow-2xl border border-white/10">
              {/* Fixed Close Button - Always Visible */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="fixed top-16 right-4 md:top-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-red-500/25 transition-all duration-300 z-[9999] border-2 border-white/30 backdrop-blur-sm"
                style={{ 
                  zIndex: 99999,
                  position: 'fixed',
                  top: 'max(64px, env(safe-area-inset-top) + 16px)',
                  right: 'max(16px, env(safe-area-inset-right) + 16px)'
                }}
              >
                <X className="w-6 h-6 md:w-7 md:h-7" />
              </motion.button>
              
              {/* Backdrop close indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed top-16 left-4 md:top-6 md:left-6 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2 text-white text-xs md:text-sm z-[9998]"
                style={{ 
                  zIndex: 99998,
                  top: 'max(64px, env(safe-area-inset-top) + 16px)',
                  left: 'max(16px, env(safe-area-inset-left) + 16px)'
                }}
              >
                Click outside to close
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Images */}
                <div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-2xl mb-4"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {project.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column - Details */}
                <div>
                  <h3 className="text-3xl font-poppins font-bold mb-4 gradient-text">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="bg-neon-cyan text-black px-3 py-1 rounded-full font-bold">
                      {project.price}
                    </span>
                    <span className="text-neon-cyan font-medium">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="text-xl font-poppins font-bold mb-3 text-neon-cyan">
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-cyan rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-poppins font-bold mb-3 text-neon-purple">
                      What's Included
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      {project.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-purple rounded-full flex-shrink-0" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={onOrderNow}
                    className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan py-4 rounded-2xl font-poppins font-bold text-lg transition-all duration-300 button-press subtle-glow"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
