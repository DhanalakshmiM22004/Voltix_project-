import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

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

const points = [
  "15+ years of renewable energy expertise",
  "Certified engineers and project managers",
  "End-to-end design, installation & support",
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "12", label: "Countries Served" },
  { value: "2.4GW", label: "Clean Energy Delivered" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 lg:py-32 bg-gray-50 dark:bg-[#0A1826] transition-all duration-500 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT — Image */}
          <Reveal delay={0} className="!duration-1000">
            <div className="relative">
              {/* Offset background panel, sits behind the photo */}
              <div className="absolute -inset-4 lg:-inset-6 bg-green-600/10 dark:bg-green-500/10 rounded-[36px] -z-10" />
              {/* Outlined accent square, peeking from the top-left corner */}
              <div className="hidden sm:block absolute -top-6 -left-6 lg:-left-8 w-20 h-20 rounded-2xl border-4 border-green-600/25 -z-10" />

              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900"
                className="w-full h-[520px] object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-[#0F2233]"
              />

              {/* Circular badge, overlapping the bottom-left corner */}
              <div className="absolute -bottom-7 -left-7 lg:-left-10 w-28 h-28 rounded-full bg-green-600 text-white flex flex-col items-center justify-center shadow-xl">
                <p className="text-2xl font-extrabold leading-none">10+</p>
                <p className="text-[10px] uppercase tracking-[1.5px] mt-1.5 text-white/90">
                  Years
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — Text */}
          <div>
            <Reveal delay={100}>
              <span className="inline-block text-green-600 font-semibold text-sm tracking-[3px] uppercase">
                About Us
              </span>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="mt-4 text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.15] font-extrabold tracking-[-1.5px] text-gray-900 dark:text-white"
              >
                Building a cleaner tomorrow, one project at a time.
              </h2>
              <p
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="mt-6 text-gray-500 dark:text-gray-300 text-base lg:text-lg leading-8 max-w-xl"
              >
                We're a team of engineers and energy specialists dedicated to
                making renewable power accessible, reliable and affordable
                for businesses and communities around the world.
              </p>
            </Reveal>

            {/* Checklist */}
            <div className="mt-8 space-y-4">
              {points.map((point, i) => (
                <Reveal key={point} delay={200 + i * 100}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-600 shrink-0" size={22} />
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-10 border-t border-gray-200 dark:border-gray-800">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={500 + i * 100}>
                  <div>
                    <p
                      style={{ fontFamily: "Manrope, sans-serif" }}
                      className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white"
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
