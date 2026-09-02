import {
  Sun,
  Wind,
  BatteryCharging,
  Zap,
  CheckCircle2,
  Leaf,
  Landmark,
  Timer,
  Home,
  Building2,
  MapPin,
  Wallet,
  Gauge,
  Activity,
  BrainCircuit,
  ClipboardList,
  TrendingUp,
  Compass,
  ShieldCheck,
} from "lucide-react";

// All image URLs below were verified by fetching the actual Unsplash photo
// page and reading the real CDN link out of its page metadata — not
// guessed from memory — so they're confirmed to exist and match their topic.
export const servicesData = {
  "solar-energy": {
    icon: Sun,
    badge: "Solar Energy Solutions",
    title: "Clean, Affordable & Sustainable Solar Power for Homes and Businesses.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200", // solar panel field
    sections: [
      {
        type: "text",
        id: "overview",
        title: "Overview",
        body: "Our solar energy systems convert sunlight into reliable, low-cost electricity for residential and commercial properties. From site assessment to system design, we handle every step so you can start saving from day one.",
        image:
          "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=900", // solar panels on rooftop
      },
      {
        type: "cards",
        id: "benefits",
        title: "Benefits",
        items: [
          { icon: Wallet, text: "Lower Electricity Bills" },
          { icon: Leaf, text: "Eco-Friendly" },
          { icon: Landmark, text: "Government Incentives" },
          { icon: Timer, text: "25-Year Panel Lifespan" },
        ],
      },
      {
        type: "steps",
        id: "how-it-works",
        title: "How It Works",
        items: [
          { title: "Site Assessment", desc: "We evaluate your roof, energy usage, and sun exposure." },
          { title: "Custom Design", desc: "Engineers design a system sized to your exact needs." },
          { title: "Installation", desc: "Certified technicians install panels and inverters." },
          { title: "Power & Monitor", desc: "Your system goes live with real-time performance tracking." },
        ],
      },
      {
        type: "timeline",
        id: "installation-process",
        title: "Installation Process",
        items: [
          { title: "Consultation", desc: "Free on-site or virtual consultation with our team." },
          { title: "Permits & Approval", desc: "We handle all paperwork and utility approvals." },
          { title: "Mounting & Wiring", desc: "Panels, racking, and electrical work completed safely." },
          { title: "Inspection & Activation", desc: "Final inspection and system activation." },
        ],
      },
      {
        type: "gallery",
        id: "featured-projects",
        title: "Featured Projects",
        items: [
          { title: "Rooftop Solar Install", image: "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=700" },
          { title: "Large-Scale Solar Farm", image: "https://images.unsplash.com/photo-1680355065203-43ad84bb6e69?w=700" },
          { title: "Panel Array Under Blue Sky", image: "https://images.unsplash.com/photo-1589276534126-adef63a95e05?w=700" },
        ],
      },
      {
        type: "faq",
        id: "faq",
        title: "Frequently Asked Questions",
        items: [
          { q: "How much can I save with solar?", a: "Most homeowners cut their electricity bills by 50–90% depending on system size and local rates." },
          { q: "How long does installation take?", a: "Most residential installs are completed within 1–3 days once permits are approved." },
          { q: "What maintenance is required?", a: "Solar panels need minimal maintenance — occasional cleaning and an annual inspection." },
        ],
      },
      { type: "cta", id: "cta" },
    ],
  },

  "wind-energy": {
    icon: Wind,
    badge: "Wind Energy Solutions",
    title: "Harness the Power of Wind for a Sustainable Future.",
    heroImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200", // wind turbines field
    sections: [
      {
        type: "text",
        id: "turbine-technology",
        title: "Wind Turbine Technology",
        body: "We deploy high-efficiency turbines engineered for maximum energy capture across a range of wind conditions, backed by advanced blade design and smart control systems.",
        image:
          "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=900", // turbines at golden hour
      },
      {
        type: "cards",
        id: "advantages",
        title: "Advantages",
        items: [
          { icon: Leaf, text: "Zero Emissions" },
          { icon: Wallet, text: "Low Operating Costs" },
          { icon: Gauge, text: "High Energy Yield" },
          { icon: Timer, text: "20+ Year Lifespan" },
        ],
      },
      {
        type: "text",
        id: "industries-served",
        title: "Industries Served",
        body: "From utility-scale wind farms to industrial facilities and agricultural operations, our wind solutions are tailored to a wide range of energy demands and site conditions.",
        image:
          "https://images.unsplash.com/photo-1645315840417-da3e21bed18b?w=900", // aerial wind farm
        reverse: true,
      },
      {
        type: "gallery",
        id: "project-gallery",
        title: "Project Gallery",
        items: [
          { title: "Wind Turbine Field", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700" },
          { title: "Turbines at Golden Hour", image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=700" },
          { title: "Aerial Wind Farm View", image: "https://images.unsplash.com/photo-1632713711046-fbdf0fc0a707?w=700" },
        ],
      },
      {
        type: "steps",
        id: "installation-timeline",
        title: "Installation Timeline",
        items: [
          { title: "Feasibility Study", desc: "Wind resource assessment and site analysis." },
          { title: "Engineering & Permits", desc: "Turbine selection, design, and regulatory approval." },
          { title: "Construction", desc: "Foundation, tower, and turbine installation." },
          { title: "Commissioning", desc: "Testing, grid connection, and handover." },
        ],
      },
      {
        type: "faq",
        id: "faq",
        title: "Frequently Asked Questions",
        items: [
          { q: "How much wind is needed to generate power?", a: "Most turbines start generating at wind speeds around 3–4 m/s, with peak output around 12–15 m/s." },
          { q: "Are wind turbines noisy?", a: "Modern turbines are engineered for low noise output and are typically sited with setback distances in mind." },
          { q: "How long does a wind project take?", a: "Timelines vary by scale, typically ranging from a few months for small installs to over a year for utility-scale farms." },
        ],
      },
    ],
  },

  "battery-storage": {
    icon: BatteryCharging,
    badge: "Battery Storage Solutions",
    title: "Reliable Energy Anytime, Day or Night.",
    heroImage:
      "https://images.unsplash.com/photo-1676337167629-d896b3ed5724?w=1200", // close-up of a battery
    sections: [
      {
        type: "text",
        id: "energy-storage-systems",
        title: "Energy Storage Systems",
        body: "Our battery systems store excess energy from solar and wind so you have reliable power around the clock — even during outages or peak demand periods.",
        image:
          "https://images.unsplash.com/photo-1605191737662-98ba90cb953e?w=900", // battery storage unit
      },
      {
        type: "text",
        id: "smart-backup",
        title: "Smart Backup Solutions",
        body: "Automated switching keeps critical circuits powered during grid outages, with intelligent load management that prioritizes what matters most.",
        image:
          "https://images.unsplash.com/photo-1604177420682-0c840feb01de?w=900", // electric meter / monitoring
        reverse: true,
      },
      {
        type: "text",
        id: "residential-storage",
        title: "Residential Storage",
        body: "Compact, wall-mounted battery units designed for homes — pairing seamlessly with rooftop solar to maximize self-consumption and backup resilience.",
        image:
          "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=900", // rooftop solar
      },
      {
        type: "text",
        id: "commercial-storage",
        title: "Commercial Storage",
        body: "Scalable storage arrays for businesses that reduce demand charges, support peak shaving, and provide dependable backup power for operations.",
        image:
          "https://images.unsplash.com/photo-1717386255785-59c670564341?w=900", // electrical wiring
        reverse: true,
      },
      {
        type: "text",
        id: "monitoring-dashboard",
        title: "Monitoring Dashboard",
        body: "Track charge levels, energy flow, and system health in real time from a simple, intuitive dashboard — accessible from any device.",
        image:
          "https://images.unsplash.com/photo-1604177420682-0c840feb01de?w=900", // electric meter / monitoring
      },
      {
        type: "cards",
        id: "benefits",
        title: "Benefits",
        items: [
          { icon: ShieldCheck, text: "Power During Outages" },
          { icon: Wallet, text: "Reduced Demand Charges" },
          { icon: Gauge, text: "Optimized Energy Use" },
          { icon: Leaf, text: "Cleaner Energy Mix" },
        ],
      },
    ],
  },

  "ev-charging": {
    icon: Zap,
    badge: "EV Charging Infrastructure",
    title: "Fast, Smart and Reliable Charging Solutions.",
    heroImage:
      "https://images.unsplash.com/photo-1692061157268-b128a8f37d6d?w=1200", // EV charging at a station
    sections: [
      {
        type: "text",
        id: "home-chargers",
        title: "Home Chargers",
        body: "Level 2 home charging stations that fully charge most EVs overnight, with app-based scheduling to charge during off-peak, lower-cost hours.",
        image:
          "https://images.unsplash.com/photo-1692061157268-b128a8f37d6d?w=900",
      },
      {
        type: "text",
        id: "commercial-chargers",
        title: "Commercial Chargers",
        body: "Multi-unit charging stations for offices, retail, and fleets — designed for high uptime and simple fleet management.",
        image:
          "https://images.unsplash.com/photo-1717386255785-59c670564341?w=900", // electrical infrastructure
        reverse: true,
      },
      {
        type: "text",
        id: "public-charging",
        title: "Public Charging Stations",
        body: "Fast-charging networks for public spaces, designed for high traffic and built to withstand outdoor conditions year-round.",
        image:
          "https://images.unsplash.com/photo-1692061157268-b128a8f37d6d?w=900",
      },
      {
        type: "timeline",
        id: "installation-process",
        title: "Installation Process",
        items: [
          { title: "Site Survey", desc: "We assess your electrical capacity and layout." },
          { title: "Permitting", desc: "We manage all permits and utility coordination." },
          { title: "Installation", desc: "Certified electricians install and test the hardware." },
          { title: "Activation", desc: "Charger goes live with app and network setup." },
        ],
      },
      {
        type: "cards",
        id: "pricing",
        title: "Pricing",
        items: [
          { icon: Home, text: "Home — from ₹45,000" },
          { icon: Building2, text: "Commercial — Custom Quote" },
          { icon: MapPin, text: "Public — Custom Quote" },
          { icon: Wallet, text: "Flexible Financing Available" },
        ],
      },
    ],
  },
};

export const serviceIconMeta = {
  CheckCircle2,
  Compass,
  ClipboardList,
  TrendingUp,
  Activity,
  BrainCircuit,
};