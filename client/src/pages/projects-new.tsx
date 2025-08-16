import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "wouter";
import { Database, Brain, Cpu, Coffee, Smartphone, Shield, Eye, FileText, ShoppingCart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectModal from "@/components/ui/project-modal";

const categories = [
  { name: "DBMS", icon: Database, color: "from-neon-cyan to-electric-blue" },
  { name: "AI/ML", icon: Brain, color: "from-neon-purple to-neon-pink" },
  { name: "Hardware", icon: Cpu, color: "from-neon-green to-neon-cyan" },
  { name: "Java", icon: Coffee, color: "from-electric-blue to-neon-purple" },
  { name: "Bio", icon: FileText, color: "from-neon-green to-electric-blue" },
  { name: "Cyber Security", icon: Shield, color: "from-neon-purple to-electric-blue" },
  { name: "DIP", icon: Eye, color: "from-neon-cyan to-neon-green" },
  { name: "Ecommerce Websites", icon: ShoppingCart, color: "from-electric-blue to-neon-cyan" },
  { name: "Mobile Apps", icon: Smartphone, color: "from-neon-pink to-neon-purple" },
  { name: "Others", icon: MoreHorizontal, color: "from-neon-pink to-electric-blue" },
];

// Featured projects data (same as before)
const featuredProjects = [
  {
    id: "student-portal",
    title: "Student Management Portal",
    description: "Complete student information system with advanced features for academic tracking and administration.",
    price: "₹3,999",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Student Registration", "Grade Management", "Attendance Tracking", "Report Generation"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation", "Installation Guide"],
    screenshots: []
  },
  {
    id: "ai-recommendation",
    title: "AI Recommendation Engine",
    description: "Sophisticated machine learning system for personalized recommendations and user behavior analysis.",
    price: "₹5,999",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Collaborative Filtering", "Content-Based Filtering", "Real-time Analytics", "User Personalization"],
    inclusions: ["ML Models", "Training Data", "API Integration", "Performance Metrics"],
    screenshots: []
  },
  {
    id: "iot-home-automation",
    title: "IoT Home Automation",
    description: "Smart home automation system with sensor integration and mobile app control for modern living.",
    price: "₹4,499",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Smart Controls", "Sensor Integration", "Mobile App", "Voice Commands"],
    inclusions: ["Hardware Kit", "Mobile App", "Circuit Diagrams", "Setup Guide"],
    screenshots: []
  }
];

// Sample projects for all categories (same as before)
const sampleProjects = [
  // DBMS Projects
  {
    id: "dbms-2",
    title: "Library Management System",
    description: "Complete library management system with book tracking, member management, and fine calculation.",
    price: "₹2,499",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
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
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Patient management", "Doctor scheduling", "Billing system", "Medical records"],
    inclusions: ["Complete source code", "Database design", "Documentation", "Setup instructions"],
    screenshots: []
  },
  {
    id: "dbms-4",
    title: "Property Management System",
    description: "Complete property management platform for administrators, owners, tenants, and employees with role-specific features for efficient building operations.",
    price: "₹1,200",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Admin, Owner, Tenant, and Employee Dashboards", "Parking Slot Allocation", "Maintenance Fee Management", "Complaint Management"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation", "Installation Guide"],
    screenshots: []
  },
  {
    id: "dbms-5",
    title: "EB Bill Management System",
    description: "Complete electricity billing system for managing consumer details, calculating bills, and tracking payment status with ease.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Consumer Registration & Management", "Automatic Bill Calculation", "Payment Tracking & History", "Bill Report Generation"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-6",
    title: "Stadium Management System",
    description: "A ticket booking and management system for stadium events, enabling seat reservations, match scheduling, and customer record maintenance.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Customer Ticket Booking", "Seat Number Allocation", "Match Date & Price Management", "View All Bookings with Details", "Easy Data Entry & Validation"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-7",
    title: "Insurance Management System",
    description: "A complete insurance policy management platform for administrators and customers, enabling policy creation, approval workflows, and customer query handling.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Manage Registered Users & Policies", "Policy Categories Management", "Policy Application & Approval System", "Track Approved, Disapproved, and Pending Policy Holders", "Customer Query Management"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-8",
    title: "E-Commerce Management System",
    description: "A complete online shopping platform enabling customers to browse, add to cart, place orders, and make payments, while admins can manage products, categories, users, and orders efficiently.",
    price: "₹1,400",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["User Registration & Login", "Add to Cart & Update/Delete Cart Items", "Order Placement & Payment Processing", "Admin CRUD Operations for Products, Categories, Users, and Orders", "Secure User & Admin Access Control"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-9",
    title: "Waste Management System",
    description: "A comprehensive waste collection and recycling platform developed in Python and Django, designed to enhance efficiency, accountability, and environmental sustainability through a centralized database, user engagement programs, and performance tracking.",
    price: "₹1,200",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["User Registration for Customers, Collectors, and Administrators", "Rewards Program for Recycling Contributions", "Facility Location & Capacity Management", "Collector Performance Evaluation & Metrics", "User Feedback & Rating System"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-10",
    title: "Café Management System",
    description: "A Flask-based café management platform for handling menu items, processing orders, and organizing categories with MySQL backend support.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Menu Management (Add, Edit, Delete Items)", "Order Placement & Status Tracking", "Mark Orders as Completed or Cancelled", "Category-based Menu Organization"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-11",
    title: "Job Management System",
    description: "An online recruitment platform developed using Flask and MySQL that connects job seekers with companies, enabling smooth job applications, profile management, and interview tracking.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Job Seeker Registration & Login", "Create, Update, and Manage Academic Profile", "Resume Upload & Management", "Search and Apply for Multiple Job Vacancies", "View Applied Jobs with Details", "Interview Scheduling & Result Status Updates", "Account Details & Summary"],
    inclusions: ["Complete Source Code", "Database Design", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-12",
    title: "Event Management System",
    description: "A Streamlit-based platform integrated with MySQL to manage all aspects of event organization, including attendees, hosts, suppliers, bills, and event scheduling. Designed for both small and large-scale event operations.",
    price: "₹1,400",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Manage Events (Name, Type, Dates, Venue, Timings)", "Host Management with Contact Details", "Supplier Management & Departmental Allocation", "Bill Tracking with Payment Status", "Attendee Registration & Event Participation Tracking", "Custom SQL Query Execution for Data Analysis"],
    inclusions: ["Complete Source Code", "Database Schema & Relationships", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-13",
    title: "Movie Management System",
    description: "A full-stack movie booking platform powered by MySQL, enabling secure user management, real-time seat booking, and complete admin control. Incorporates advanced SQL features like views, triggers, and stored procedures for optimized performance.",
    price: "₹2,000",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Secure User Registration, Login, and Role-based Access", "Manage Movies, Actors, Genres, and Bookings", "Real-time Seat Availability with Overbooking Prevention", "Admin Panel for CRUD Operations on All Entities", "Advanced SQL Implementation (Views, Triggers, Stored Procedures)"],
    inclusions: ["Complete Source Code", "Database Design & SQL Scripts", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-14",
    title: "Human Resource Management System (HRMS)",
    description: "A robust employee and department management platform designed using MySQL, applying functional dependency and normalization principles to ensure an optimized and well-structured database.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Employee Management (Profile, Department, Account Status)", "Department Management with Manager and Project Assignment", "Leave Application & Approval System", "Status Updates for Employee Work Departments", "Secure Admin Access and Control"],
    inclusions: ["Complete Source Code", "Database Design with Functional Dependencies & 3NF Schema", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-15",
    title: "IPL Management System",
    description: "A complete IPL database solution built using MySQL for efficient management of teams, players, matches, and tournament statistics. The project follows database normalization and ensures accurate, secure, and scalable data handling for the entire league.",
    price: "₹1,800",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Team & Player Management (Teams, Owners, Sponsors, Head Coach, Contracts)", "Match Scheduling & Results Tracking (Matches, Stadium, Umpires)", "Performance Statistics (Runs Stats, Purple Cap, Orange Cap, Player Stats)", "League & Sponsorship Management (IPL Committee, League Sponsor, Team Sponsor)", "Ticket Management System for Matches"],
    inclusions: ["Complete Source Code", "MySQL Database with Fully Normalized Schema", "Entity-Relationship Diagram (ERD)", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-16",
    title: "University Management System",
    description: "A Flask-powered university portal with MySQL backend, designed to simplify student and administrative workflows. The system provides role-based dashboards for students and admins, enabling efficient profile management, course handling, and institutional record-keeping.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Student Dashboard — View profile, enrolled courses, and academic details", "Admin Dashboard — Manage student records, courses, and administrative data", "Course Management — Add, update, and delete course information", "Role-Based Access — Secure login for both students and administrators", "Responsive UI for smooth navigation across devices"],
    inclusions: ["Complete Source Code", "MySQL Database with Normalized Schema", "Entity-Relationship Diagram (ERD)", "User Documentation"],
    screenshots: []
  },
  {
    id: "dbms-17",
    title: "Online Exam System",
    description: "A web-based platform for conducting secure online examinations with dedicated student and admin sections.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Secure student login and profile access", "Rules & regulations display before exams", "System compatibility check and face input collection", "Real-time exam interface with automated scoring", "Instant result viewing for students", "Admin tools for student record management and result monitoring"],
    inclusions: ["Student dashboard (login, rules, compatibility check, exam, results)", "Admin dashboard (student CRUD, result review)"],
    screenshots: []
  },
  {
    id: "dbms-18",
    title: "Music Streaming System",
    description: "An interactive online platform for streaming, organizing, and managing your favorite music with a personalized library.",
    price: "₹1,500",
    category: "DBMS",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["User authentication and personalized library", "Browse and search for songs, artists, and albums", "Create and manage playlists", "Track listening history", "Built-in music player with play, pause, skip, and volume control"],
    inclusions: ["User dashboard (songs, artists, albums view)", "Playlist management module", "History tracking module", "Music player interface"],
    screenshots: []
  },
  // AI/ML Projects
  {
    id: "aiml-2",
    title: "Chatbot with NLP",
    description: "Intelligent chatbot using natural language processing for customer support automation.",
    price: "₹3,999",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
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
  {
    id: "aiml-4",
    title: "Farm Academy",
    description: "An AI-powered platform that guides farmers with crop selection, fertilizer usage, and disease diagnosis, while providing learning resources for modern farming practices.",
    price: "₹1,800",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["AI crop & fertilizer recommendations", "Disease detection with treatment suggestions", "Farming tips & best practices library", "Multilingual farmer support"],
    inclusions: ["Farmer dashboard with alerts", "Recommendation & diagnosis modules", "Educational content section"],
    screenshots: []
  },
  {
    id: "aiml-5",
    title: "Sign Language Predictor",
    description: "An AI-powered system that recognizes and translates sign language gestures into text in real time using computer vision and deep learning. The application supports both live webcam input and uploaded images for detection.",
    price: "₹1,500",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-Time Detection – Recognizes signs instantly via webcam", "Common Phrase Recognition – Maps gestures to frequently used phrases", "Image Upload Detection – Processes uploaded images for sign prediction", "Interactive UI – Responsive, user-friendly interface", "Sentence Builder – Combines detected signs into sentences"],
    inclusions: ["Real-time sign recognition module", "Image-based sign detection tool", "Phrase mapping & sentence-building system", "Modern web-based UI for interaction"],
    screenshots: []
  },
  {
    id: "aiml-6",
    title: "Movie Recommendation System",
    description: "An AI-powered platform that recommends movies based on user preferences, viewing history, or a described plot. Supports keyword search, genre-based discovery, and similar movie suggestions with detailed movie information.",
    price: "₹1,500",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Smart Recommendations – Suggests similar movies based on your choice", "Plot-based Search – Describe a movie to find the closest match", "Detailed Movie Info – Ratings, overview, cast, release date, budget, and revenue", "Genre Filtering – Browse and discover by movie genres", "Interactive UI – Sleek, responsive interface for seamless browsing", "Multi-source Availability – Shows where the movie can be streamed or watched"],
    inclusions: ["AI-powered recommendation engine", "Search by title, keywords, or plot description", "Movie details with posters and metadata", "Similar movie suggestions module"],
    screenshots: []
  },
  {
    id: "aiml-7",
    title: "Learnable AI: AI-powered Education Tool",
    description: "An advanced AI-powered educational platform that enhances learning through content summarization, smart focus modes, and personalized learning paths for effective study experiences.",
    price: "₹2,000",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Content Summarization – Condenses complex material into clear, concise summaries", "Smart Focus Mode – Highlights key points, explains terms, and adds annotations", "Learning Path Generator – Creates step-by-step study plans with time estimates and resource recommendations", "Image-to-Content – Extracts text, generates summaries, and provides image descriptions and analysis", "History & Organization – Search past content, filter by type, and revisit materials anytime", "Export & Share – One-click copy, download in text/PDF, or share via link/email"],
    inclusions: ["AI-driven accessibility tools for diverse learning needs", "Voice navigation and speech recognition support", "Adaptive content delivery for various subjects", "Study material organization and quick search functionality"],
    screenshots: []
  },
  {
    id: "aiml-8",
    title: "Multimodal Creative Writing Assistant",
    description: "AI tool for writers that uses text, image, and audio to inspire, co-write, and refine stories with advanced multimodal capabilities.",
    price: "₹1,800",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Idea generation & style adaptation", "Visual & audio-based inspiration", "Real-time co-writing and editing", "Feedback for clarity and flow"],
    inclusions: ["Multimodal input support", "Style transfer & rewriting tools", "Export to TXT, DOCX, PDF"],
    screenshots: []
  },
  {
    id: "aiml-9",
    title: "Traffic Route Prediction using Machine Learning",
    description: "AI-based system that predicts optimal travel routes by analyzing traffic patterns, weather, and historical data for efficient navigation.",
    price: "₹1,800",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time traffic analysis", "Route optimization & ETA prediction", "Congestion & incident alerts", "Weather-aware routing"],
    inclusions: ["Data from maps & traffic APIs", "Predictive ML models", "Export routes & share options"],
    screenshots: []
  },
  {
    id: "aiml-10",
    title: "Neural Architecture to Reduce AI Footprints",
    description: "Lightweight and energy-efficient AI model architecture designed to minimize computational cost, memory usage, and carbon footprint while maintaining high performance.",
    price: "₹1,800",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Low-latency inference", "Reduced parameter count", "Energy-efficient computation", "Model compression & pruning", "Edge-device deployment ready", "Scalable across platforms"],
    inclusions: ["Optimized neural network design", "Performance vs. footprint analysis", "Deployment toolkit for edge & cloud"],
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
  {
    id: "hardware-4",
    title: "Rain Detection System",
    description: "An Arduino-powered IoT system that detects rainfall using a rain sensor and sends alerts for timely actions. Ideal for smart irrigation and flood-prevention setups.",
    price: "₹1,200",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time rain detection", "automated notifications", "IoT-enabled monitoring"],
    inclusions: ["Real-time rain monitoring", "automated alerts", "water management optimization"],
    screenshots: []
  },
  {
    id: "hardware-5",
    title: "Pulse Detection",
    description: "A health-monitoring device that measures heart rate using pulse sensors, displaying results instantly and optionally logging data via IoT.",
    price: "₹1,800",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Instant pulse readings", "IoT data logging", "wearable integration"],
    inclusions: ["Accurate pulse monitoring", "real-time display", "remote health tracking"],
    screenshots: []
  },
  {
    id: "hardware-6",
    title: "Radar Detection",
    description: "An ultrasonic-sensor-based radar system to detect object distance and movement, displayed on a live radar interface.",
    price: "₹1,600",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Object detection", "distance measurement", "live visualization"],
    inclusions: ["Object detection", "range measurement", "real-time visualization"],
    screenshots: []
  },
  {
    id: "hardware-7",
    title: "Fish Feeder",
    description: "An automated fish feeding system using Arduino timers or IoT scheduling to dispense food at set intervals.",
    price: "₹1,400",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Scheduled feeding", "IoT integration", "automated operation"],
    inclusions: ["Timely fish feeding", "reduced manual effort", "improved aquarium management"],
    screenshots: []
  },
  {
    id: "hardware-8",
    title: "Smart Dustbin",
    description: "An ultrasonic-sensor-enabled dustbin that opens automatically when approached, reducing touch-based contamination.",
    price: "₹1,800",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Hands-free operation", "sensor detection", "hygiene-focused"],
    inclusions: ["Hands-free operation", "improved hygiene", "modern waste management"],
    screenshots: []
  },
  {
    id: "hardware-9",
    title: "RFID Attendance System",
    description: "An Arduino-based attendance tracker where RFID cards record entries and log them to a database for tracking.",
    price: "₹2,100",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Contactless entry", "database logging", "fast scanning"],
    inclusions: ["Quick, contactless attendance marking", "secure data logging"],
    screenshots: []
  },
  {
    id: "hardware-10",
    title: "Soil, Humidity, Temperature, and Moisture Monitoring",
    description: "A multi-sensor system to measure and log environmental conditions for smart agriculture or greenhouse management.",
    price: "₹1,800",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Multi-sensor data collection", "real-time monitoring", "IoT-enabled analytics"],
    inclusions: ["Precision farming support", "automated irrigation", "real-time data monitoring"],
    screenshots: []
  },
  {
    id: "hardware-11",
    title: "Solar Energy Monitoring System",
    description: "A solar panel setup with Arduino-based sensors to track energy generation and optimize performance.",
    price: "₹2,000",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Energy generation tracking", "performance optimization", "IoT integration"],
    inclusions: ["Renewable energy tracking", "efficiency optimization", "cost savings"],
    screenshots: []
  },
  {
    id: "hardware-12",
    title: "Fire Alarm",
    description: "An automated fire detection system that uses temperature and smoke sensors to identify fire hazards and trigger alarms instantly.",
    price: "₹1,600",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time fire detection", "loud buzzer alerts", "safety-focused"],
    inclusions: ["Early fire detection", "enhanced safety", "reduced property damage risk"],
    screenshots: []
  },
  {
    id: "hardware-13",
    title: "ECG Health Monitor",
    description: "A portable ECG monitoring device that records heart activity and provides real-time data for health tracking and diagnosis.",
    price: "₹2,000",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time ECG display", "heart rate monitoring", "health diagnostics support"],
    inclusions: ["Continuous heart health monitoring", "early detection of cardiac issues", "improved patient care"],
    screenshots: []
  },
  {
    id: "hardware-14",
    title: "Air Quality Monitoring",
    description: "A sensor-based system that measures air quality parameters like PM2.5, CO₂, and temperature to monitor pollution levels.",
    price: "₹2,000",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time air quality index display", "pollution alerts", "environmental tracking"],
    inclusions: ["Improved awareness of air quality", "health risk prevention", "data-driven environmental decisions"],
    screenshots: []
  },
  // Cyber Security Projects
  {
    id: "cybersec-1",
    title: "ZK-Shield – Privacy-First Fraud Prevention for Retail",
    description: "Develop a frictionless, real-time fraud prevention system that verifies users with Zero-Knowledge Proofs (ZKPs) and AI-based behavioral authentication — ensuring no personal data leaks.",
    price: "₹2,000",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Behavioral Analytics – AI tracks biometrics like scroll speed, typing style, click delay", "ZKP Trust Engine – Verifies legitimacy without exposing data", "Fraud Detection – Flags anomalies before damage occurs", "Loyalty & Return Protection – Confirms same-user activity without revealing ID", "Real-Time Trust Score – Dynamic session handling (0–100 scale)", "Wallet-Based Login – Web3 identity with ZK-attestation"],
    inclusions: ["Reduce account takeovers, bot fraud, and return abuse", "Build lasting customer trust through zero-data-leak policy", "Scalable plug-and-play integration for global retail platforms"],
    screenshots: []
  },
  {
    id: "cybersec-2",
    title: "AI Phishing Detection",
    description: "Develop a machine learning system to detect phishing websites by analyzing both phishing and legitimate URLs. Features are extracted from domains, HTML content, and address bars to train and compare multiple ML and deep learning models.",
    price: "₹1,500",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["URL and content-based feature extraction", "Comparison of models like Gradient Boosting, CatBoost, MLP, Random Forest, SVM, etc.", "Binary classification: Phishing or Legitimate", "Web interface for real-time URL checks"],
    inclusions: ["Gradient Boosting Classifier – 97.4% accuracy, 0.977 F1-score", "Most impactful features: HTTPS usage, Anchor URL, Website Traffic"],
    screenshots: []
  },
  {
    id: "cybersec-3",
    title: "Cryptography Chain",
    description: "A lightweight, privacy-first communication platform that uses advanced encryption algorithms to secure text, voice, and file sharing. Designed to protect sensitive data from cyber threats, it ensures confidentiality, authenticity, and integrity without sacrificing performance.",
    price: "₹1,500",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["End-to-End Encryption (AES, RSA, ECC, Post-Quantum)", "Secure Key Generation & Exchange", "Digital Signatures for authenticity", "Encrypted file transfer with integrity checks"],
    inclusions: ["Strong protection against interception and tampering", "Scalable for personal, corporate, or government use"],
    screenshots: []
  },
  {
    id: "cybersec-4",
    title: "Quantum Coin Toss Simulator",
    description: "A Python-based simulator that uses quantum principles to model coin tosses where outcomes exist in superposition until measured. Users can run single or multi-qubit experiments, visualize probability distributions, and explore Bloch sphere representations.",
    price: "₹1,200",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Quantum principles simulation for coin tosses", "Single or multi-qubit experiments", "Probability distributions visualization", "Bloch sphere representations", "Interactive learning experience"],
    inclusions: ["Understand quantum mechanics basics", "Observe probabilistic results", "Gain hands-on experience with quantum state visualization"],
    screenshots: []
  },
  {
    id: "cybersec-5",
    title: "VigilantEyes AI",
    description: "An AI-powered surveillance platform for security and monitoring across multiple sectors, offering real-time alerts, facial recognition, and advanced CCTV analytics.",
    price: "₹3,500",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Criminal identification", "suspect tracking", "theft detection", "passenger screening", "campus access control", "traffic monitoring"],
    inclusions: ["Enhanced safety", "faster investigations", "reduced crime rates", "scalable security solutions for industries and smart cities"],
    screenshots: []
  },
  // DIP Projects
  {
    id: "dip-1",
    title: "MICR Code Detection",
    description: "Processes cheque images to detect and recognize MICR codes using image preprocessing and ML models.",
    price: "₹1,500",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Image preprocessing (grayscale, denoising, binarization)", "MICR region extraction", "character segmentation", "SVM/KNN recognition"],
    inclusions: ["Automated MICR extraction", "high recognition accuracy", "reduced manual errors in banking workflows"],
    screenshots: []
  },
  {
    id: "dip-2",
    title: "Face Detection",
    description: "Automatically identifies and locates human faces in images or video feeds using computer vision and ML.",
    price: "₹1,500",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time detection", "AI-based identification", "security and attendance applications"],
    inclusions: ["Improves authentication systems", "enhances surveillance accuracy", "enables AI-driven features like emotion analysis"],
    screenshots: []
  },
  {
    id: "dip-3",
    title: "Color Detection",
    description: "Recognizes and classifies specific colors within images or video using image processing algorithms.",
    price: "₹1,500",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Multi-color detection", "real-time processing", "adaptable for robotics and automation"],
    inclusions: ["Supports automated sorting", "aids visually impaired users", "assists robotics navigation"],
    screenshots: []
  },
  {
    id: "dip-4",
    title: "Image Compression",
    description: "Reduces the size of image files while retaining visual clarity using lossless or lossy algorithms.",
    price: "₹1,500",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Storage optimization", "faster uploads/downloads", "adaptable for web and IoT"],
    inclusions: ["Saves storage space", "accelerates image transfer", "improves application performance"],
    screenshots: []
  },
  {
    id: "dip-5",
    title: "Skin Disease Detection",
    description: "An AI-powered image processing system that analyzes skin images to detect common conditions like acne, rashes, and pigmentation issues.",
    price: "₹2,000",
    category: "DIP",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Automated skin analysis", "real-time detection", "health-focused"],
    inclusions: ["Early skin condition identification", "improved healthcare accessibility", "data-driven diagnosis support"],
    screenshots: []
  },
  // Java Projects
  {
    id: "java-1",
    title: "Hospital Management System",
    description: "Manages patient records, employee information, hospital rooms, departments, login authentication, and ambulance details.",
    price: "₹1,800",
    category: "Java",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Patient tracking", "room allocation", "staff management", "ambulance scheduling"],
    inclusions: ["Streamlines hospital operations", "improves data management", "enhances patient care"],
    screenshots: []
  },
  {
    id: "java-2",
    title: "Airline Management System",
    description: "Manages passenger details, flight information, and bookings in a desktop application.",
    price: "₹1,500",
    category: "Java",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Login authentication", "add/cancel bookings", "journey tracking", "payment processing"],
    inclusions: ["Streamlines airline operations", "enhances booking and passenger tracking efficiency"],
    screenshots: []
  },
  {
    id: "java-3",
    title: "Hotel Management System",
    description: "Manages hotel operations including guest check-in/check-out, room allocation, reservations, billing, and staff management.",
    price: "₹1,600",
    category: "Java",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Room management", "reservation system", "billing", "staff tracking"],
    inclusions: ["Improves guest service", "optimizes room occupancy", "enhances operational efficiency"],
    screenshots: []
  },
  {
    id: "java-4",
    title: "Library Management System",
    description: "Manages books, members, and borrowing/return processes in a library.",
    price: "₹1,500",
    category: "Java",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Inventory tracking", "issue/return logging", "fine calculation"],
    inclusions: ["Streamlines library operations", "reduces manual errors", "improves service efficiency"],
    screenshots: []
  },
  {
    id: "java-5",
    title: "Bank Management System",
    description: "Manages customer accounts, transactions, deposits, withdrawals, and account information.",
    price: "₹1,800",
    category: "Java",
    image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Secure login", "transaction management", "account overview", "reporting"],
    inclusions: ["Streamlines banking processes", "ensures transaction accuracy", "improves account management"],
    screenshots: []
  },
  // Bio Projects
  {
    id: "bio-1",
    title: "Pneumonia Detection using CNN",
    description: "AI system using Convolutional Neural Networks to detect pneumonia from chest X-rays with 95% accuracy. Classifies COVID-19, bacterial, and viral pneumonia for faster, more accurate diagnoses.",
    price: "₹1,500",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["95% accuracy in pneumonia detection", "Classification of COVID-19, bacterial, and viral cases", "Reduced misdiagnosis risk and faster decision-making"],
    inclusions: ["Preprocessed dataset of 20,000+ X-ray images", "CNN-based deep learning model", "Training pipeline and evaluation metrics"],
    screenshots: []
  },
  {
    id: "bio-2",
    title: "Drug Repurposing using Knowledge Graph Embeddings",
    description: "Platform using knowledge graph embeddings to identify existing drugs for vector-borne diseases, cutting costs and accelerating discovery.",
    price: "₹1,500",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Comparison of 7 embedding models", "Applied to DRKG dataset for 7 diseases", "Streamlit app for drug ranking"],
    inclusions: ["Accelerated drug discovery", "Systematic model comparison", "Data-driven treatment predictions"],
    screenshots: []
  },
  {
    id: "bio-3",
    title: "MedVision AI",
    description: "AI-powered medical imaging platform analyzing X-rays, ultrasounds, CT, and MRI for fast, accurate reports.",
    price: "₹2,500",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Multi-modality AI analysis with confidence scores", "Image preprocessing and DICOM support", "Professional follow-up integration"],
    inclusions: ["Faster diagnosis, especially in remote areas", "Actionable, patient-friendly medical insight"],
    screenshots: []
  },
  {
    id: "bio-4",
    title: "Patient Health Risk Prediction",
    description: "An AI-based system that analyzes patient data to predict risks of chronic conditions such as stroke, heart disease, and diabetes. Helps healthcare providers take preventive action.",
    price: "₹2,500",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Data preprocessing", "risk prediction model", "visual risk reports"],
    inclusions: ["Early disease detection", "improved patient care", "reduced healthcare costs"],
    screenshots: []
  },
  {
    id: "bio-5",
    title: "DNA Sequence Alignment Tool",
    description: "A bioinformatics tool for comparing DNA sequences to identify genetic similarities, mutations, and evolutionary relationships.",
    price: "₹3,000",
    category: "Bio",
    image: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Sequence alignment algorithms", "mutation detection", "similarity scoring"],
    inclusions: ["Accelerated genetic research", "improved disease prediction", "better understanding of genetic relationships"],
    screenshots: []
  },
  // Others Projects
  {
    id: "others-1",
    title: "Robofest",
    description: "SRMIST's premier robotics festival showcasing innovation, competitions, and hands-on workshops.",
    price: "₹0",
    category: "Others",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Robotics competitions", "workshops", "interactive demos", "student engagement"],
    inclusions: ["Inspires students", "fosters creativity", "highlights SRMIST as a hub for technological excellence"],
    screenshots: []
  },
  {
    id: "others-2",
    title: "Text to Handwriting",
    description: "A browser-based tool converting typed text into realistic handwritten images with customizable fonts, colors, and styles.",
    price: "₹1,200",
    category: "Others",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Font and ink customization", "paper style options", "instant rendering"],
    inclusions: ["Enables users to create personalized handwritten notes and letters effortlessly"],
    screenshots: []
  },
  {
    id: "others-3",
    title: "Food Waste to Blockchain Donations",
    description: "A blockchain-based platform where restaurants and households can log surplus food, allowing NGOs to claim and track deliveries with full transparency.",
    price: "₹2,500",
    category: "Others",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time food availability logging", "secure blockchain-based tracking", "NGO matching system"],
    inclusions: ["Reduced food wastage", "efficient redistribution to the needy", "transparent donation records"],
    screenshots: []
  },
  {
    id: "others-4",
    title: "Personal Carbon Footprint Tracker",
    description: "A web and mobile app that tracks daily activities like travel, energy usage, and diet to calculate and display the user's carbon footprint.",
    price: "₹2,200",
    category: "Others",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Activity logging", "automated carbon emission calculation", "eco-friendly recommendations"],
    inclusions: ["Increased environmental awareness", "measurable reduction in carbon footprint", "gamified sustainability goals"],
    screenshots: []
  },
  {
    id: "others-5",
    title: "Advanced Educational Website",
    description: "A modern, interactive e-learning platform with courses, quizzes, and personalized learning paths for students and professionals.",
    price: "₹2,500",
    category: "Others",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Course library", "progress tracking", "gamified quizzes", "certificate generation"],
    inclusions: ["Enhanced learning engagement", "accessible education for all", "career skill development"],
    screenshots: []
  },
  // Ecommerce Projects
  {
    id: "ecommerce-1",
    title: "Reemss Fitness",
    description: "A modern fitness platform offering workouts, nutrition guidance, and wellness tips for all fitness levels.",
    price: "₹5,000",
    category: "Ecommerce Websites",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Personalized workouts", "nutrition plans", "progress tracking"],
    inclusions: ["Empowers users to achieve their health goals", "build sustainable fitness habits"],
    screenshots: []
  },
  {
    id: "ecommerce-2",
    title: "SweetDelights",
    description: "An online bakery offering freshly baked goods, custom cakes, and treats delivered to customers.",
    price: "₹3,000",
    category: "Ecommerce Websites",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Product catalog", "online ordering", "Whatsapp toggle chat"],
    inclusions: ["Brings convenience and joy to customers with high-quality bakery products"],
    screenshots: []
  },
  {
    id: "ecommerce-3",
    title: "Fashion Store",
    description: "An e-commerce website for clothing and accessories with an intuitive interface, secure checkout, and personalized product recommendations.",
    price: "₹5,000",
    category: "Ecommerce Websites",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Product catalog with filters", "cart & checkout", "secure payment gateway"],
    inclusions: ["Streamlined shopping experience", "increased customer engagement", "higher sales potential"],
    screenshots: []
  },
  // Mobile Apps Projects
  {
    id: "mobile-1",
    title: "Mood Sync",
    description: "A responsive web app promoting emotional wellness by tracking moods and correlating them with biometric health data.",
    price: "₹3,500",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Real-time mood logging", "biometric integration (Google Fit/Fitbit)", "visual trend analysis"],
    inclusions: ["Enhances self-awareness", "helps understand emotional trends", "prepares for AI-driven mood prediction"],
    screenshots: []
  },
  {
    id: "mobile-2",
    title: "Personal Habit Tracker App",
    description: "A mobile app that helps users build and maintain positive habits with reminders, progress tracking, and streak rewards.",
    price: "₹3,000",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["Habit creation", "daily reminders", "streak tracking", "progress charts"],
    inclusions: ["Improved productivity", "better time management", "consistent personal growth"],
    screenshots: []
  },
  {
    id: "mobile-3",
    title: "Community App",
    description: "A platform for like-minded individuals to connect, share updates, and collaborate through groups and discussion boards.",
    price: "₹4,500",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    features: ["User profiles", "group creation", "posts & comments", "private messaging"],
    inclusions: ["Enhanced social engagement", "knowledge sharing", "stronger community bonds"],
    screenshots: []
  },
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
    : featuredProjects;

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleOrderNow = () => {
    setIsModalOpen(false);
    window.location.href = "/order";
  };

  // When a category is selected, show projects first, then other categories
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-space-dark via-slate-900 to-space-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-1/3 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-purple bg-clip-text text-transparent">
              {selectedCategory} Projects
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Explore our collection of {selectedCategory} projects
            </p>
            <button
              onClick={() => setLocation('/projects')}
              className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple rounded-full text-white font-medium transition-all duration-300"
            >
              ← Back to All Categories
            </button>
          </motion.div>

          {/* Projects Grid - Shown First */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
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
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-neon-purple text-xs font-medium rounded-full border border-neon-purple/30">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-cyan to-electric-blue border-2 border-space-dark"></div>
                          ))}
                        </div>
                      </div>
                      
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
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>

        {/* Project Modal */}
        <ProjectModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOrderNow={handleOrderNow}
        />
      </div>
    );
  }

  // Default view - show categories first, then featured projects
  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-slate-900 to-space-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-1/3 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold font-poppins mb-6 bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-purple bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of cutting-edge projects across multiple technology domains.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
            Project Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  rotateX: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocation(`/projects/${encodeURIComponent(category.name)}`)}
                className="group relative glass-effect rounded-2xl p-6 cursor-pointer text-center transform-gpu transition-all duration-300 border border-gray-700 hover:border-neon-purple/50"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-neon-purple transition-colors duration-300">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 5,
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-neon-purple text-xs font-medium rounded-full border border-neon-purple/30">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-cyan to-electric-blue border-2 border-space-dark"></div>
                        ))}
                      </div>
                    </div>
                    
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
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderNow={handleOrderNow}
      />
    </div>
  );
}