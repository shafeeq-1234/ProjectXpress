import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "wouter";
import { Database, Brain, Cpu, Coffee, Code, Shield, Eye, FileText, ShoppingCart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectModal from "@/components/ui/project-modal";

const categories = [
  { name: "DBMS", icon: Database, color: "from-neon-cyan to-neon-purple" },
  { name: "AI/ML", icon: Brain, color: "from-neon-purple to-neon-pink" },
  { name: "Hardware", icon: Cpu, color: "from-neon-green to-electric-blue" },
  { name: "Java", icon: Coffee, color: "from-electric-blue to-neon-cyan" },
  { name: "Python", icon: Code, color: "from-neon-pink to-neon-purple" },
  { name: "Bio", icon: FileText, color: "from-neon-cyan to-neon-green" },
  { name: "Cyber Security", icon: Shield, color: "from-neon-purple to-electric-blue" },
  { name: "DIP", icon: Eye, color: "from-electric-blue to-neon-pink" },
  { name: "Ecommerce Websites", icon: ShoppingCart, color: "from-neon-green to-neon-cyan" },
  { name: "Others", icon: MoreHorizontal, color: "from-neon-pink to-electric-blue" },
];

const featuredProjects = [
  {
    id: "1",
    title: "Student Management System",
    description: "Complete DBMS project with admin panel, student portal, and reporting features.",
    price: "₹2,999",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    features: [
      "Complete database schema design",
      "Admin and student portals",
      "Automated report generation",
      "Search and filter functionality",
    ],
    inclusions: [
      "Complete source code",
      "Database setup files",
      "Documentation & reports",
      "Installation support",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
    ],
  },
  {
    id: "2",
    title: "Image Recognition System",
    description: "Advanced ML model for image classification with 95% accuracy and complete documentation.",
    price: "₹4,999",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    features: [
      "Deep learning CNN architecture",
      "95% accuracy on test dataset",
      "Real-time image processing",
      "Multiple class classification",
    ],
    inclusions: [
      "Trained model files",
      "Training scripts",
      "Dataset preparation code",
      "Performance analysis",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
    ],
  },
  {
    id: "3",
    title: "IoT Smart Home System",
    description: "Complete hardware project with sensors, automation, and mobile app control.",
    price: "₹3,499",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    features: [
      "Arduino/Raspberry Pi based",
      "Multiple sensor integration",
      "WiFi connectivity",
      "Mobile app control",
    ],
    inclusions: [
      "Hardware components list",
      "Circuit diagrams",
      "Arduino/Python code",
      "Mobile app source",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
    ],
  },
  {
    id: "4",
    title: "E-Commerce Java App",
    description: "Full-featured e-commerce application with payment integration and admin panel.",
    price: "₹2,499",
    category: "Java",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    features: [
      "Spring Boot framework",
      "Payment gateway integration",
      "User authentication",
      "Inventory management",
    ],
    inclusions: [
      "Complete Java source code",
      "Database schema",
      "API documentation",
      "Deployment guide",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
    ],
  },
  {
    id: "5",
    title: "Data Analytics Dashboard",
    description: "Python-based analytics platform with visualization and reporting capabilities.",
    price: "₹3,999",
    category: "Python",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    features: [
      "Django/Flask framework",
      "Interactive dashboards",
      "Data visualization charts",
      "Export functionality",
    ],
    inclusions: [
      "Python source code",
      "Requirements file",
      "Sample datasets",
      "Setup instructions",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
    ],
  },
  {
    id: "6",
    title: "Network Security Scanner",
    description: "Advanced cybersecurity tool for network vulnerability assessment and reporting.",
    price: "₹5,499",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    features: [
      "Network vulnerability scanning",
      "Automated threat detection",
      "Comprehensive reporting",
      "Real-time monitoring",
    ],
    inclusions: [
      "Security scanner tool",
      "Vulnerability database",
      "Configuration files",
      "User manual",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
    ],
  },
];

// Sample projects for each category
const sampleProjects = [
  // DBMS Projects
  {
    id: "dbms-2",
    title: "Library Management System",
    description: "Complete library management system with book tracking, member management, and fine calculation.",
    price: "₹2,499",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Book inventory management", "Member registration", "Issue/return tracking", "Fine calculation"],
    inclusions: ["Complete source code", "Database schema", "User manual", "Installation guide"],
    screenshots: []
  },
  {
    id: "dbms-3",
    title: "Hospital Management System",
    description: "Comprehensive hospital management with patient records, appointment scheduling, and billing.",
    price: "₹3,499",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Patient management", "Doctor scheduling", "Billing system", "Medical records"],
    inclusions: ["Complete source code", "Database design", "Documentation", "Setup instructions"],
    screenshots: []
  },
  // AI/ML Projects
  {
    id: "aiml-2",
    title: "Chatbot with NLP",
    description: "Intelligent chatbot using natural language processing for customer support automation.",
    price: "₹3,999",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Natural language understanding", "Intent recognition", "Context awareness", "Multi-platform support"],
    inclusions: ["Trained model", "Training data", "Integration code", "API documentation"],
    screenshots: []
  },
  {
    id: "aiml-3",
    title: "Stock Price Prediction",
    description: "Machine learning model for predicting stock prices using historical data and market indicators.",
    price: "₹4,499",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["LSTM neural networks", "Technical indicators", "Risk analysis", "Portfolio optimization"],
    inclusions: ["Prediction model", "Data preprocessing", "Visualization tools", "Performance metrics"],
    screenshots: []
  },
  // Hardware Projects
  {
    id: "hardware-2",
    title: "Smart Security System",
    description: "IoT-based security system with motion detection, camera surveillance, and mobile alerts.",
    price: "₹4,999",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Motion detection", "Camera integration", "Mobile notifications", "Remote monitoring"],
    inclusions: ["Hardware components", "Circuit design", "Mobile app", "Installation guide"],
    screenshots: []
  },
  {
    id: "hardware-3",
    title: "Weather Monitoring Station",
    description: "Automated weather station with sensors for temperature, humidity, pressure, and data logging.",
    price: "₹2,999",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Multi-sensor integration", "Data logging", "Web dashboard", "Historical analysis"],
    inclusions: ["Sensor kit", "Microcontroller code", "Web interface", "Assembly instructions"],
    screenshots: []
  },
  // Java Projects
  {
    id: "java-2",
    title: "Banking Management System",
    description: "Complete banking application with account management, transactions, and reporting features.",
    price: "₹3,299",
    category: "Java",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Account management", "Transaction processing", "Loan management", "Report generation"],
    inclusions: ["Java source code", "Database scripts", "User interface", "Testing documentation"],
    screenshots: []
  },
  {
    id: "java-3",
    title: "Online Exam System",
    description: "Web-based examination system with question bank, automatic grading, and result analysis.",
    price: "₹2,799",
    category: "Java",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Question bank management", "Timed exams", "Auto grading", "Result analytics"],
    inclusions: ["Spring Boot application", "MySQL database", "Admin panel", "Student portal"],
    screenshots: []
  },
  // Python Projects
  {
    id: "python-2",
    title: "Social Media Analytics",
    description: "Python tool for analyzing social media trends, sentiment analysis, and engagement metrics.",
    price: "₹3,799",
    category: "Python",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Sentiment analysis", "Trend detection", "Engagement tracking", "Data visualization"],
    inclusions: ["Python scripts", "API integrations", "Dashboard", "Data processing tools"],
    screenshots: []
  },
  {
    id: "python-3",
    title: "Automated Trading Bot",
    description: "Algorithmic trading bot with technical analysis, risk management, and backtesting capabilities.",
    price: "₹5,499",
    category: "Python",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Technical analysis", "Risk management", "Backtesting", "Real-time trading"],
    inclusions: ["Trading algorithms", "Risk models", "Backtesting framework", "Performance analytics"],
    screenshots: []
  },
  // Ecommerce Projects
  {
    id: "ecommerce-1",
    title: "Multi-vendor Marketplace",
    description: "Complete e-commerce platform with vendor management, payment integration, and order tracking.",
    price: "₹6,999",
    category: "Ecommerce Websites",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Multi-vendor support", "Payment gateway", "Order management", "Admin dashboard"],
    inclusions: ["Full website code", "Database design", "Payment integration", "Admin panel"],
    screenshots: []
  },
  {
    id: "ecommerce-2",
    title: "Fashion Store Website",
    description: "Modern fashion e-commerce site with product catalog, wishlist, and responsive design.",
    price: "₹4,499",
    category: "Ecommerce Websites",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Product catalog", "Shopping cart", "Wishlist", "User reviews"],
    inclusions: ["Responsive website", "Shopping cart", "User authentication", "Product management"],
    screenshots: []
  },
  // Bio Projects
  {
    id: "bio-1",
    title: "DNA Sequence Analysis",
    description: "Bioinformatics tool for DNA sequence analysis, alignment, and mutation detection.",
    price: "₹3,999",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Sequence alignment", "Mutation analysis", "Phylogenetic trees", "Database integration"],
    inclusions: ["Analysis software", "Sample datasets", "Documentation", "Result visualization"],
    screenshots: []
  },
  {
    id: "bio-2",
    title: "Medical Image Analysis",
    description: "AI-powered medical image analysis for detecting anomalies in X-rays and MRI scans.",
    price: "₹5,999",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Image preprocessing", "Anomaly detection", "Classification", "Report generation"],
    inclusions: ["Trained models", "Image processing tools", "Analysis software", "Sample images"],
    screenshots: []
  },
  // Cyber Security Projects
  {
    id: "cyber-2",
    title: "Password Security Analyzer",
    description: "Tool for analyzing password strength, detecting breaches, and security recommendations.",
    price: "₹2,999",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Password strength analysis", "Breach detection", "Security recommendations", "Policy enforcement"],
    inclusions: ["Security analyzer", "Database integration", "Reporting tools", "API access"],
    screenshots: []
  },
  {
    id: "cyber-3",
    title: "Firewall Configuration Tool",
    description: "Network firewall management system with rule configuration and traffic monitoring.",
    price: "₹4,299",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Rule management", "Traffic monitoring", "Threat detection", "Log analysis"],
    inclusions: ["Configuration tool", "Monitoring dashboard", "Rule templates", "Documentation"],
    screenshots: []
  },
  // DIP Projects
  {
    id: "dip-1",
    title: "Face Recognition System",
    description: "Advanced face recognition system with detection, identification, and access control features.",
    price: "₹4,799",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Face detection", "Recognition algorithms", "Access control", "Database management"],
    inclusions: ["Recognition software", "Training tools", "Database setup", "Integration guide"],
    screenshots: []
  },
  {
    id: "dip-2",
    title: "OCR Document Scanner",
    description: "Optical character recognition system for converting scanned documents to editable text.",
    price: "₹3,499",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Text extraction", "Document processing", "Format conversion", "Batch processing"],
    inclusions: ["OCR engine", "Processing tools", "Format converters", "User interface"],
    screenshots: []
  },
  // Others Projects
  {
    id: "others-1",
    title: "Task Management App",
    description: "Productivity app with task tracking, team collaboration, and project management features.",
    price: "₹3,299",
    category: "Others",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Task tracking", "Team collaboration", "Project timelines", "Progress monitoring"],
    inclusions: ["Mobile app", "Web dashboard", "API integration", "User guides"],
    screenshots: []
  },
  {
    id: "others-2",
    title: "Event Management System",
    description: "Complete event management platform with booking, payment, and attendee management.",
    price: "₹4,999",
    category: "Others",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Event creation", "Ticket booking", "Payment processing", "Attendee management"],
    inclusions: ["Web platform", "Payment gateway", "Admin dashboard", "Mobile app"],
    screenshots: []
  }
];

const allProjects = [...featuredProjects, ...sampleProjects];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setLocation] = useLocation();
  const params = useParams();
  
  // Get category from URL params and decode it
  const selectedCategory = params.category ? decodeURIComponent(params.category) : null;
  
  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  const filteredProjects = selectedCategory
    ? allProjects.filter((project) => project.category === selectedCategory)
    : featuredProjects; // Show only featured projects when no category is selected

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleOrderNow = () => {
    setIsModalOpen(false);
    window.location.href = "/order";
  };

  return (
    <div className="pt-20">
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 gradient-text"
          >
            Our Project Categories
          </motion.h2>

          {/* Enhanced Categories Grid - Two rows on desktop, responsive on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.name;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isSelected) {
                      setLocation('/projects');
                    } else {
                      setLocation(`/projects/${encodeURIComponent(category.name)}`);
                    }
                  }}
                  className={`relative glass-effect p-4 md:p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 transform-gpu ${
                    isSelected 
                      ? 'ring-2 ring-neon-cyan shadow-lg shadow-neon-cyan/25' 
                      : 'hover:shadow-xl hover:shadow-purple-500/20'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${category.color} rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center relative overflow-hidden`}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: 'rotateY(0deg) translateZ(1px)' }}
                    >
                      <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-white/10"
                      style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
                    >
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="font-poppins font-semibold text-xs md:text-sm lg:text-base mb-2 leading-tight">{category.name}</h3>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-1 right-1 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6 bg-neon-cyan rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full" />
                    </motion.div>
                  )}
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    style={{
                      background: `linear-gradient(45deg, ${category.color.includes('neon-cyan') ? 'rgba(0,255,255,0.1)' : 
                        category.color.includes('neon-purple') ? 'rgba(139,92,246,0.1)' : 
                        'rgba(0,255,65,0.1)'})`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Filter indicator */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <span className="text-neon-cyan">Showing projects for: {selectedCategory}</span>
              <button
                onClick={() => {
                  setLocation('/projects');
                }}
                className="ml-4 text-gray-400 hover:text-white transition-colors duration-300"
              >
                Clear filter
              </button>
            </motion.div>
          )}

          {/* Featured Projects */}
          <h3 className="text-3xl font-poppins font-bold text-center mb-12 text-white">
            {selectedCategory ? `${selectedCategory} Projects` : 'Featured Projects'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  scale: 1.03,
                  rotateX: 8,
                  rotateY: 8,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProjectClick(project)}
                className="group relative glass-effect rounded-2xl overflow-hidden cursor-pointer transform-gpu shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  <motion.div 
                    className="absolute top-4 right-4 bg-gradient-to-r from-neon-cyan to-electric-blue text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {project.price}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="flex space-x-2">
                      {project.features.slice(0, 2).map((feature: any, i: number) => (
                        <span key={i} className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {feature.split(' ').slice(0, 2).join(' ')}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="p-6 relative">
                  <motion.h4 
                    className="text-xl font-poppins font-bold mb-3 group-hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h4>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <motion.span 
                      className="text-neon-cyan font-medium text-sm px-3 py-1 bg-neon-cyan/10 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline"
                        className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple border-none text-white font-medium transition-all duration-300 px-6 py-2 text-sm button-press"
                      >
                        View Details
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, rgba(0,255,255,0.05) 0%, rgba(139,92,246,0.05) 50%, rgba(255,0,128,0.05) 100%)'
                  }}
                />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No projects found for {selectedCategory}</p>
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link href="/order">
              <Button className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan px-8 py-4 rounded-2xl font-poppins font-semibold text-lg transition-all duration-300 button-press subtle-glow">
                Order Custom Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        onOrderNow={handleOrderNow}
      />
    </div>
  );
}
