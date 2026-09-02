import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

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

const testimonials = [
  {
    quote:
      "Voltix transformed our energy infrastructure. Their team delivered the project on time and exceeded our expectations at every stage.",
    name: "Arjun Mehta",
    role: "GreenTech Industries",
    initials: "AM",
  },
  {
    quote:
      "From consultation to installation, the process was seamless. Our electricity costs dropped by 40% within the first quarter alone.",
    name: "Priya Sharma",
    role: "Future Energy Pvt Ltd",
    initials: "PS",
  },
  {
    quote:
      "Professional, responsive, and genuinely invested in getting the details right. Voltix is now our go-to partner for renewable projects.",
    name: "David Chen",
    role: "EcoWind Solutions",
    initials: "DC",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 dark:bg-[#0A1826] transition-all duration-500 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <Reveal delay={0}>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-green-600 font-semibold text-sm tracking-[3px] uppercase">
              Testimonials
            </span>
            <h2
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.1] font-extrabold tracking-[-2px] text-gray-900 dark:text-white"
            >
              What Our Clients Say
            </h2>
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-gray-500 dark:text-gray-300 text-lg leading-8"
            >
              Real feedback from the businesses and communities we've
              partnered with.
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 150}>
              <div className="relative h-full bg-white dark:bg-[#0F2233] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
                <Quote className="text-green-100 dark:text-green-950/60" size={36} />

                {/* Stars */}
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={15}
                      className="text-green-500 fill-green-500"
                    />
                  ))}
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7 text-sm">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-11 h-11 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}