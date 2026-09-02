import {
  Sun,
  Wind,
  BatteryCharging,
  Building2,
  MapPin,
  Calendar,
  Gauge,
  Ruler,
  CheckCircle2,
  Zap,
  Leaf,
  DollarSign,
  Cpu,
  Wifi,
  LineChart,
  ShieldCheck,
} from "lucide-react";

// All image URLs below were verified by fetching the actual Unsplash photo
// page and reading the real CDN link out of its page metadata — not
// guessed from memory — so they're confirmed to exist and match their topic.
export const projectsData = {
  "solar-plant": {
    icon: Sun,
    category: "Solar Energy",
    title: "Solar Plant Installation",
    subtitle: "Delivering Clean Solar Energy for a Sustainable Future.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400", // solar panel field
    info: [
      { icon: Building2, label: "Client", value: "GreenTech Industries" },
      { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu" },
      { icon: Sun, label: "Category", value: "Solar Energy" },
      { icon: Gauge, label: "Capacity", value: "250 kW" },
      { icon: Calendar, label: "Duration", value: "4 Months" },
      { icon: CheckCircle2, label: "Completed", value: "March 2026" },
    ],
    about:
      "Designed and installed a high-efficiency solar power system for a commercial facility to reduce electricity costs and carbon emissions.",
    gallery: [
      "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=900", // solar panels installed on rooftop
      "https://images.unsplash.com/photo-1680355065203-43ad84bb6e69?w=900", // large solar farm, rows of panels
      "https://images.unsplash.com/photo-1589276534126-adef63a95e05?w=900", // solar panels under blue sky
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900", // solar panel field
    ],
    highlights: [
      "High-efficiency solar panels",
      "Smart energy monitoring",
      "Battery backup integration",
      "Low maintenance system",
    ],
    results: [
      { icon: Zap, value: "40%", label: "Cost Reduction" },
      { icon: Leaf, value: "98%", label: "Emission Cut" },
      { icon: Sun, value: "250kW", label: "Clean Energy" },
      { icon: ShieldCheck, value: "25yr", label: "Panel Lifespan" },
    ],
    technologies: [
      { icon: Sun, name: "Solar Panels" },
      { icon: BatteryCharging, name: "Battery Storage" },
      { icon: Wifi, name: "IoT Sensors" },
      { icon: LineChart, name: "Analytics" },
    ],
  },

  "wind-farm": {
    icon: Wind,
    category: "Wind Energy",
    title: "Wind Farm Development",
    subtitle: "Harnessing Wind Power for Sustainable Energy.",
    heroImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400", // wind turbines field
    info: [
      { icon: Building2, label: "Client", value: "EcoWind Solutions" },
      { icon: MapPin, label: "Location", value: "Coimbatore, India" },
      { icon: Wind, label: "Category", value: "Wind Energy" },
      { icon: Gauge, label: "Capacity", value: "150 kW" },
      { icon: Calendar, label: "Duration", value: "6 Months" },
      { icon: CheckCircle2, label: "Completed", value: "January 2026" },
    ],
    about:
      "Developed a modern wind energy installation to provide clean electricity for industrial operations.",
    gallery: [
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=900", // turbines at golden hour
      "https://images.unsplash.com/photo-1645315840417-da3e21bed18b?w=900", // aerial view, wind farm desert
      "https://images.unsplash.com/photo-1632713711046-fbdf0fc0a707?w=900", // wind turbine in a field
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900", // wind turbines field
    ],
    highlights: [
      "Advanced wind turbines",
      "Remote monitoring",
      "High energy efficiency",
      "Low environmental impact",
    ],
    results: [
      { icon: Wind, value: "150kW", label: "Clean Energy" },
      { icon: DollarSign, value: "30%", label: "Lower Costs" },
      { icon: Leaf, value: "95%", label: "Emission Cut" },
      { icon: ShieldCheck, value: "20yr", label: "Turbine Life" },
    ],
    technologies: [
      { icon: Wind, name: "Wind Turbines" },
      { icon: Wifi, name: "Remote Monitoring" },
      { icon: Cpu, name: "Smart Controls" },
      { icon: LineChart, name: "Analytics" },
    ],
  },

  "battery-storage": {
    icon: BatteryCharging,
    category: "Battery Storage",
    title: "Battery Storage System",
    subtitle: "Reliable Energy Storage for Every Situation.",
    heroImage:
      "https://images.unsplash.com/photo-1676337167629-d896b3ed5724?w=1400", // close-up of a battery
    info: [
      { icon: Building2, label: "Client", value: "Future Energy Pvt Ltd" },
      { icon: MapPin, label: "Location", value: "Bengaluru, India" },
      { icon: BatteryCharging, label: "Category", value: "Battery Storage" },
      { icon: Gauge, label: "Capacity", value: "500 kWh" },
      { icon: Calendar, label: "Duration", value: "3 Months" },
      { icon: CheckCircle2, label: "Completed", value: "May 2026" },
    ],
    about:
      "Installed a large-scale battery storage system to store renewable energy and provide uninterrupted power.",
    gallery: [
      "https://images.unsplash.com/photo-1605191737662-98ba90cb953e?w=900", // battery storage unit
      "https://images.unsplash.com/photo-1604177420682-0c840feb01de?w=900", // electric meter / monitoring
      "https://images.unsplash.com/photo-1717386255785-59c670564341?w=900", // electrical wiring
      "https://images.unsplash.com/photo-1676337167629-d896b3ed5724?w=900", // close-up of a battery
    ],
    highlights: [
      "Lithium-ion battery system",
      "Smart energy management",
      "Emergency backup",
      "Real-time monitoring",
    ],
    results: [
      { icon: BatteryCharging, value: "24/7", label: "Backup Power" },
      { icon: Zap, value: "35%", label: "Efficiency Gain" },
      { icon: Leaf, value: "500kWh", label: "Stored Energy" },
      { icon: ShieldCheck, value: "15yr", label: "System Life" },
    ],
    technologies: [
      { icon: BatteryCharging, name: "Lithium-ion Cells" },
      { icon: Wifi, name: "Real-Time Monitoring" },
      { icon: Cpu, name: "Smart Management" },
      { icon: LineChart, name: "Analytics" },
    ],
  },

  "green-office": {
    icon: Building2,
    category: "Green Building",
    title: "Green Office Transformation",
    subtitle: "Creating Energy-Efficient Workspaces.",
    heroImage:
      "https://images.unsplash.com/photo-1759722144257-2925448a51a3?w=1400", // modern building, green rooftop
    info: [
      { icon: Building2, label: "Client", value: "Voltix Corporate Office" },
      { icon: MapPin, label: "Location", value: "Hyderabad, India" },
      { icon: Building2, label: "Category", value: "Green Building" },
      { icon: Ruler, label: "Area", value: "12,000 sq.ft" },
      { icon: Calendar, label: "Duration", value: "5 Months" },
      { icon: CheckCircle2, label: "Completed", value: "February 2026" },
    ],
    about:
      "Converted a traditional office into an energy-efficient workplace using renewable energy technologies and sustainable design.",
    gallery: [
      "https://images.unsplash.com/photo-1765371512336-99c2b1c6975f?w=900", // modern office interior with plants
      "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=900", // rooftop solar installation
      "https://images.unsplash.com/photo-1604177420682-0c840feb01de?w=900", // smart monitoring / meter
      "https://images.unsplash.com/photo-1759722144257-2925448a51a3?w=900", // modern building, green rooftop
    ],
    highlights: [
      "Rooftop solar installation",
      "LED smart lighting",
      "Energy-efficient HVAC",
      "EV charging stations",
    ],
    results: [
      { icon: Leaf, value: "50%", label: "Lower Energy Use" },
      { icon: Sun, value: "40kW", label: "Solar Generated" },
      { icon: Building2, value: "12K", label: "Sq.Ft Transformed" },
      { icon: ShieldCheck, value: "100%", label: "Sustainable" },
    ],
    technologies: [
      { icon: Sun, name: "Rooftop Solar" },
      { icon: Cpu, name: "Smart Lighting" },
      { icon: Wifi, name: "EV Charging" },
      { icon: LineChart, name: "Energy Analytics" },
    ],
  },
};