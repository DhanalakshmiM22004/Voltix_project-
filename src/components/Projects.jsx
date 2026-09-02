import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

// Reusable scroll-reveal hook — re-triggers every time the element
// enters or leaves the viewport, so it animates on every scroll pass.
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Small wrapper that applies the fade-up transition
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

const projects = [
  {
    title: "Solar Plant",
    slug: "solar-plant",
    location: "Chennai, Tamil Nadu",
    tag: "Solar Energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
  },
  {
    title: "Wind Farm",
    slug: "wind-farm",
    location: "Aberdeen, Scotland",
    tag: "Wind Energy",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
  },
  {
    title: "Battery Storage",
    slug: "battery-storage",
    location: "Fremont, California",
    tag: "Energy Storage",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
  },
  {
    title: "Green Office",
    slug: "green-office",
    location: "Portland, Oregon",
    tag: "Smart Building",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24 lg:py-32 bg-white dark:bg-[#07111D] transition-all duration-500 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <Reveal delay={0}>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-green-600 font-semibold text-sm tracking-[3px] uppercase">
              Our Work
            </span>
            <h2
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-4 text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.1] font-extrabold tracking-[-2px] text-gray-900 dark:text-white"
            >
              Featured Projects
            </h2>
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-gray-500 dark:text-gray-300 text-lg leading-8"
            >
              A look at the renewable energy systems we've designed, built,
              and deployed for our partners.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-8 mt-20">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 150}>
              <Link
                to={`/projects/${project.slug}`}
                className="group relative block rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out"
              >
                {/* Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Tag */}
                  <span className="absolute top-5 left-5 bg-white/90 dark:bg-[#0F2233]/90 backdrop-blur text-green-600 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                    {project.tag}
                  </span>

                  {/* Arrow */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 dark:bg-[#0F2233]/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={18} className="text-green-600" />
                  </div>

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3
                      style={{ fontFamily: "Manrope, sans-serif" }}
                      className="text-2xl font-bold text-white"
                    >
                      {project.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-200">
                      <MapPin size={14} />
                      {project.location}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
