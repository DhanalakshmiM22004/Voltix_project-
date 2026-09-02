import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Wind, BatteryCharging, Zap, ArrowUpRight } from "lucide-react";

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

const services = [
  {
    icon: Sun,
    title: "Solar Energy",
    slug: "solar-energy",
    desc: "High-efficiency solar panel systems designed to cut costs and maximize clean power generation.",
  },
  {
    icon: Wind,
    title: "Wind Energy",
    slug: "wind-energy",
    desc: "Scalable turbine solutions that harness wind power for reliable, large-scale renewable output.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Storage",
    slug: "battery-storage",
    desc: "Smart energy storage systems that keep power available around the clock, rain or shine.",
  },
  {
    icon: Zap,
    title: "EV Charging",
    slug: "ev-charging",
    desc: "Fast, smart charging infrastructure for homes, businesses, and public spaces.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-24 lg:py-32 bg-gray-50 dark:bg-[#0A1826] transition-all duration-500 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <Reveal delay={0}>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-green-600 font-semibold text-sm tracking-[3px] uppercase">
              What We Offer
            </span>
            <h2
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-4 text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.1] font-extrabold tracking-[-2px] text-gray-900 dark:text-white"
            >
              Our Energy Services
            </h2>
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-gray-500 dark:text-gray-300 text-lg leading-8"
            >
              From generation to storage to insight, we build complete
              renewable systems tailored to your needs.
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 100}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative block bg-white dark:bg-[#0F2233] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-green-100 dark:hover:shadow-none hover:-translate-y-3 hover:border-green-600/40 transition-all duration-500 ease-out"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center group-hover:bg-green-600 group-hover:rotate-6 transition-all duration-500 ease-out">
                    <Icon
                      size={28}
                      className="text-green-600 group-hover:text-white transition-colors duration-500"
                    />
                  </div>

                  {/* Text */}
                  <h3
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    className="mt-6 text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm leading-7">
                    {service.desc}
                  </p>

                  {/* Link */}
                  <div className="mt-6 flex items-center gap-2 text-green-600 font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Learn more
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
