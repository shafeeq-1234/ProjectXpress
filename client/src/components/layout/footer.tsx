import { motion } from "framer-motion";
import { Link } from "wouter";
import { Phone, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import logoImage from "@assets/file_2025-08-09_12.31.00_1_-removebg-preview_1754761464833.png";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Projects" },
    { href: "/order", label: "Order" },
  ];

  const categories = [
    "DBMS Projects",
    "AI/ML Solutions",
    "Hardware Projects",
    "Web Applications",
  ];

  const contactInfo = [
    {
      type: "email",
      label: "projectxpress27@gmail.com",
      href: "mailto:projectxpress27@gmail.com",
      icon: Mail
    },
    {
      type: "phone", 
      label: "Call: 8807186582",
      href: "tel:+918807186582",
      icon: Phone
    },
    {
      type: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/projectxpress27/",
      icon: Instagram
    },
    {
      type: "linkedin",
      label: "LinkedIn", 
      href: "https://www.linkedin.com/company/project-xpress",
      icon: Linkedin
    }
  ];

  return (
    <footer className="py-12 bg-carbon-black border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Project Xpress Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-poppins font-bold gradient-text">
                Project Xpress
              </span>
            </div>
            <p className="text-gray-400">
              Premium college projects with guaranteed delivery and lifetime support.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-poppins font-bold mb-4 text-neon-cyan">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="hover:text-neon-cyan transition-colors duration-300 cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-poppins font-bold mb-4 text-neon-purple">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-poppins font-bold mb-4 text-neon-green">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              {contactInfo.map((info, index) => (
                <li key={`contact-${index}`}>
                  <a
                    href={info.href}
                    target={info.type !== "email" && info.type !== "phone" ? "_blank" : undefined}
                    rel={info.type !== "email" && info.type !== "phone" ? "noopener noreferrer" : undefined}
                    className="hover:text-neon-green transition-colors duration-300 flex items-center space-x-2"
                  >
                    {info.icon && <info.icon className="w-4 h-4" />}
                    <span>{info.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://chat.whatsapp.com/BHqqZmgDHeg0UTeQ4GE0st"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-green transition-colors duration-300 flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Group</span>
                </a>
              </li>

            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>
            &copy; 2024 Project Xpress. All rights reserved. Built with passion by Shafeeq & Aadarsh.
          </p>
        </motion.div>
      </div>


    </footer>
  );
}
