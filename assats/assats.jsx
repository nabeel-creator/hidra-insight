
import {Droplets, Zap, Shield, BarChart3, Settings, Waves, Wrench} from 'lucide-react';
import img1 from "@/assats/img1.webp";
import img2 from "@/assats/img2.webp";

const latestBlogs = [
    {
      id: 1,
      title: "Advanced Spillway Design: Ensuring Dam Safety in Extreme Weather",
      excerpt: "Exploring cutting-edge spillway technologies and their critical role in protecting downstream communities during unprecedented flood events.",
      author: "Dr. Sarah Mitchell",
      readTime: "8 mins read",
      date: "Feb 1, 2024",
      category: "Dam Safety",
      icon: <Shield className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Hydroelectric Efficiency: Maximizing Power Generation",
      excerpt: "Latest innovations in turbine technology that are revolutionizing renewable energy production from water resources.",
      author: "Prof. Michael Chen",
      readTime: "6 mins read",
      date: "Jan 30, 2024",
      category: "Hydropower",
      icon: <Zap className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Water Quality Monitoring: IoT Solutions for Reservoir Management",
      excerpt: "How smart sensors and AI are transforming real-time water quality assessment in large-scale reservoir systems.",
      author: "Dr. Emma Rodriguez",
      readTime: "10 mins read", 
      date: "Jan 28, 2024",
      category: "Technology",
      icon: <Settings className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Sediment Management: Extending Dam Lifespan",
      excerpt: "Proven strategies for managing sediment accumulation and maintaining optimal reservoir capacity over decades.",
      author: "Dr. James Wilson",
      readTime: "7 mins read",
      date: "Jan 26, 2024", 
      category: "Maintenance",
      icon: <BarChart3 className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Fish Passage Systems: Balancing Energy and Ecology",  
      excerpt: "Innovative fish ladder designs that maintain biodiversity while ensuring efficient hydroelectric operations.",
      author: "Dr. Lisa Thompson",
      readTime: "9 mins read",
      date: "Jan 24, 2024",
      category: "Environmental",
      icon: <Waves className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Digital Twin Technology in Dam Operations",
      excerpt: "Revolutionary digital modeling techniques that enable predictive maintenance and optimize dam performance.",
      author: "Dr. Alex Kumar",
      readTime: "11 mins read",
      date: "Jan 22, 2024",
      category: "Innovation",
      icon: <Droplets className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1581094372901-efc70e518df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];


  export const allBlogs = [
    {
      id: 1,
      title: "Advanced Spillway Design: Ensuring Dam Safety in Extreme Weather",
      excerpt: "Exploring cutting-edge spillway technologies and their critical role in protecting downstream communities during unprecedented flood events.",
      author: "Dr. Sarah Mitchell",
      readTime: "8 mins read",
      date: "Feb 1, 2024",
      category: "Dam Safety",
      icon: <Shield className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Safety", "Engineering", "Climate"]
    },
    {
      id: 2,
      title: "Hydroelectric Efficiency: Maximizing Power Generation",
      excerpt: "Latest innovations in turbine technology that are revolutionizing renewable energy production from water resources.",
      author: "Prof. Michael Chen",
      readTime: "6 mins read",
      date: "Jan 30, 2024",
      category: "Hydropower",
      icon: <Zap className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Energy", "Turbines", "Efficiency"]
    },
    {
      id: 3,
      title: "Water Quality Monitoring: IoT Solutions for Reservoir Management",
      excerpt: "How smart sensors and AI are transforming real-time water quality assessment in large-scale reservoir systems.",
      author: "Dr. Emma Rodriguez",
      readTime: "10 mins read",
      date: "Jan 28, 2024",
      category: "Technology",
      icon: <Settings className="w-4 h-4" />,
      image: img1,
      tags: ["IoT", "Monitoring", "AI"]
    },
    {
      id: 4,
      title: "Sediment Management: Extending Dam Lifespan",
      excerpt: "Proven strategies for managing sediment accumulation and maintaining optimal reservoir capacity over decades.",
      author: "Dr. James Wilson",
      readTime: "7 mins read",
      date: "Jan 26, 2024",
      category: "Maintenance",
      icon: <Wrench className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Maintenance", "Longevity", "Operations"]
    },
    {
      id: 5,
      title: "Fish Passage Systems: Balancing Energy and Ecology",
      excerpt: "Innovative fish ladder designs that maintain biodiversity while ensuring efficient hydroelectric operations.",
      author: "Dr. Lisa Thompson",
      readTime: "9 mins read",
      date: "Jan 24, 2024",
      category: "Environmental",
      icon: <Waves className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Ecology", "Biodiversity", "Design"]
    },
    {
      id: 6,
      title: "Digital Twin Technology in Dam Operations",
      excerpt: "Revolutionary digital modeling techniques that enable predictive maintenance and optimize dam performance.",
      author: "Dr. Alex Kumar",
      readTime: "11 mins read",
      date: "Jan 22, 2024",
      category: "Technology",
      icon: <Settings className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1581094372901-efc70e518df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Digital Twin", "Predictive", "Innovation"]
    },
    {
      id: 7,
      title: "Concrete Dam Inspection: Modern Non-Destructive Testing",
      excerpt: "Advanced inspection techniques using ultrasonic testing and drone technology for comprehensive structural assessment.",
      author: "Dr. Robert Kim",
      readTime: "12 mins read",
      date: "Jan 20, 2024",
      category: "Dam Safety",
      icon: <Shield className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1581092160607-ee67b6740b14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Inspection", "NDT", "Drones"]
    },
    {
      id: 8,
      title: "Small-Scale Hydropower: Community Energy Solutions",
      excerpt: "Exploring micro-hydro systems that provide sustainable energy solutions for remote communities worldwide.",
      author: "Prof. Maria Santos",
      readTime: "8 mins read",
      date: "Jan 18, 2024",
      category: "Hydropower",
      icon: <Zap className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Micro-hydro", "Community", "Rural"]
    },
    {
      id: 9,
      title: "Flood Risk Assessment: Climate Change Adaptation",
      excerpt: "Comprehensive strategies for updating flood risk models and adapting dam operations for changing precipitation patterns.",
      author: "Dr. Jennifer Park",
      readTime: "10 mins read",
      date: "Jan 16, 2024",
      category: "Dam Safety",
      icon: <Shield className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Flood Risk", "Climate", "Adaptation"]
    }
  ];

  export {latestBlogs};