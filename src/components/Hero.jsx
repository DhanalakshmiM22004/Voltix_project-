import { ArrowRight, Leaf, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

// Image with a soft placeholder + graceful fallback, so a slow/broken
// network request never leaves a blank hole in the layout.
function HeroImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/40 dark:to-[#0F2233]">
          <Leaf className="text-green-600/40" size={40} />
        </div>
      )}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
}

const features = [
  { icon: ShieldCheck, title: "Trusted", desc: "Certified energy partner." },
  { icon: Zap, title: "Fast", desc: "Smart renewable solutions." },
  { icon: Leaf, title: "Eco", desc: "Sustainable future." },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 lg:pt-24 pb-16 lg:pb-20 bg-white dark:bg-[#07111D] transition-all duration-500 overflow-hidden">
      {/* Fades into Services' background color instead of a hard cut */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-44 lg:h-56 bg-gradient-to-b from-transparent via-gray-50/70 dark:via-[#0A1826]/70 to-gray-50 dark:to-[#0A1826]" />

      <div className="max-w-[1450px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            
            {/* Heading */}
            <Reveal delay={100}>
              <h1
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="mt-5 text-[36px] sm:text-[46px] md:text-[54px] lg:text-[52px] xl:text-[62px] leading-[1.08] font-extrabold tracking-[-1.5px] text-gray-900 dark:text-white"
              >
                Powering a{" "}
                <span className="relative inline-block text-green-600">
                  sustainable
                  
                    
                </span>{" "}
                future.
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={200}>
              <p
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="mt-5 text-[15px] sm:text-base lg:text-lg leading-7 lg:leading-8 text-gray-500 dark:text-gray-300 max-w-md mx-auto lg:mx-0"
              >
                We deliver reliable solar, wind and battery storage systems
                that help businesses and communities reduce costs and
                transition to cleaner energy.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={300}>
              <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  to="/quote"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-7 py-3.5 flex items-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight size={17} />
                </Link>
                               <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-200 font-semibold rounded-full px-7 py-3.5 border border-gray-200 dark:border-gray-700 hover:border-green-600 hover:text-green-600 transition-all duration-300"
                >
                  Learn More
                </Link>

              </div>
            </Reveal>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 max-w-md mx-auto lg:mx-0 lg:max-w-none">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title} delay={400 + i * 100}>
                    <div className="text-center lg:text-left">
                      <Icon className="text-green-600 mb-2 mx-auto lg:mx-0" size={24} />
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                        {f.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 leading-snug">
                        {f.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* RIGHT — image collage, visible at every breakpoint */}
          <div className="relative flex justify-center lg:justify-end mt-2 lg:mt-0">
            <Reveal delay={200} className="!duration-1000 w-full max-w-[440px] lg:max-w-none">
              <div className="relative">
                <HeroImage
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900"
                  alt="Solar panels under a clear sky"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[520px] rounded-[28px] lg:rounded-[36px] shadow-2xl"
                />

                {/* Bottom-left accent image */}
                <div className="absolute -left-3 sm:-left-6 -bottom-6 w-28 h-24 sm:w-40 sm:h-32 lg:w-44 lg:h-36">
                  <HeroImage
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=700"
                    alt="Wind turbines on a green field"
                    className="w-full h-full rounded-2xl shadow-xl border-4 border-white dark:border-[#07111D]"
                  />
                </div>

                {/* Top-right accent image */}
                <div className="absolute -right-3 sm:-right-6 lg:-right-10 -top-4 sm:-top-6 lg:-top-8 w-16 h-20 sm:w-24 sm:h-32 lg:w-32 lg:h-44">
                  <HeroImage
                    src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700"
                    alt="Wind farm at sunset"
                    className="w-full h-full rounded-2xl shadow-xl border-4 border-white dark:border-[#07111D]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}