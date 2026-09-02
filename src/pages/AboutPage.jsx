import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  Leaf,
  Award,
  Sparkles,
  Users,
  Clock,
  Wrench,
  Sun,
  BatteryCharging,
  Wifi,
  Cpu,
  LineChart,
  MessageSquare,
  ClipboardList,
  Hammer,
  HeartHandshake,
} from "lucide-react";

// Reusable scroll-reveal hook — re-triggers every time the element
// enters or leaves the viewport, so it animates on every scroll pass.
function useInView(threshold = 0.15) {
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

// Image with a loading skeleton and a graceful fallback — so a broken or
// slow-loading URL never leaves a visible broken-image icon in the layout.
function SmartImage({ src, alt, className = "" }) {
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
          <Leaf className="text-green-600/30" size={32} />
        </div>
      )}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
}

// Animated counter — counts up to the numeric part of a value like "250+"
// or "98%" once it scrolls into view.
function AnimatedValue({ value }) {
  const [ref, inView] = useInView(0.4);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^([^\d]*)(\d+(\.\d+)?)(.*)$/);
    if (!inView || !match) return;

    const [, prefix, numStr, , suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const duration = 1200;
    const start = performance.now();

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(decimals);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

const coreValues = [
  { icon: ShieldCheck, title: "Integrity", desc: "We do what's right, even when no one's watching." },
  { icon: Lightbulb, title: "Innovation", desc: "We push renewable technology forward, always." },
  { icon: Leaf, title: "Sustainability", desc: "Every decision is made with the planet in mind." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standard, every project." },
];

const whyChoose = [
  { icon: Sparkles, text: "Free Consultation" },
  { icon: ShieldCheck, text: "Certified Engineers" },
  { icon: Award, text: "10+ Years Experience" },
  { icon: Users, text: "250+ Projects Delivered" },
  { icon: Clock, text: "24 Hour Response Time" },
  { icon: Wrench, text: "Custom-Built Solutions" },
];

const process = [
  { icon: MessageSquare, title: "Consultation", desc: "We learn about your goals, site, and energy needs." },
  { icon: ClipboardList, title: "Design", desc: "Our engineers create a tailored system design." },
  { icon: Hammer, title: "Installation", desc: "Certified technicians install and test everything." },
  { icon: HeartHandshake, title: "Ongoing Support", desc: "Monitoring, maintenance, and support long-term." },
];

const stats = [
  { value: "250+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "500MW", label: "Energy Generated" },
  { value: "10+", label: "Years of Experience" },
];

const technologies = [
  { icon: Sun, name: "Solar Panels" },
  { icon: BatteryCharging, name: "Battery Storage" },
  { icon: Wifi, name: "IoT Sensors" },
  { icon: Cpu, name: "Smart Grid" },
  { icon: LineChart, name: "AI Analytics" },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center shrink-0">
                <Leaf size={14} className="text-white" />
              </span>
              <span className="text-green-600 text-xs sm:text-sm font-bold tracking-[3px] uppercase">
                About Voltix
              </span>
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-[30px] sm:text-[40px] lg:text-[48px] leading-[1.15] font-extrabold tracking-[-1px] text-gray-900 dark:text-white"
            >
              Powering Change, One Project at a Time.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-gray-500 dark:text-gray-300 text-base sm:text-lg leading-7 max-w-xl mx-auto"
            >
              We're a team of engineers, designers, and energy specialists
              building a cleaner future through renewable power.
            </p>
          </Reveal>
        </div>

        <Reveal delay={250} className="!duration-1000">
          <div className="max-w-[850px] mx-auto px-5 sm:px-8 lg:px-12 mt-10">
            <div className="relative">
              <SmartImage
                src="https://images.unsplash.com/photo-1645315840417-da3e21bed18b?w=900"
                alt="Voltix team at work"
                className="w-full h-[300px] sm:h-[420px] lg:h-[480px] rounded-[28px] shadow-2xl"
              />

              {/* Bottom-left accent image */}
              <div className="absolute -left-3 sm:-left-6 -bottom-6 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36">
                <SmartImage
                  src="https://images.unsplash.com/photo-1759722144257-2925448a51a3?w=1000"
                  alt="Solar panels"
                  className="w-full h-full rounded-2xl shadow-xl border-4 border-white dark:border-[#07111D]"
                />
              </div>

              {/* Top-right accent image */}
              <div className="absolute -right-3 sm:-right-6 -top-4 sm:-top-6 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36">
                <SmartImage
                  src="https://images.unsplash.com/photo-1680355065203-43ad84bb6e69?w=1000"
                  alt="Wind turbines"
                  className="w-full h-full rounded-2xl shadow-xl border-4 border-white dark:border-[#07111D]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-white dark:bg-[#07111D] transition-all duration-500">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* 2. Company Story */}
          <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal delay={0} className="!duration-1000">
                <div className="relative">
                  <div className="absolute -inset-3 sm:-inset-4 bg-green-600/10 dark:bg-green-500/10 rounded-[32px] -z-10" />
                  <div className="hidden sm:block absolute -top-5 -right-5 w-16 h-16 rounded-2xl border-4 border-green-600/25 -z-10" />
                  <SmartImage
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900"
                    alt="Solar installation"
                    className="w-full h-[280px] sm:h-[360px] rounded-3xl shadow-xl border-4 border-white dark:border-[#0F2233]"
                  />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white"
                >
                  Our Story
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-300 leading-7">
                  Voltix was founded with a simple belief — that clean energy
                  should be accessible, reliable, and built to last. What
                  started as a small team of engineers has grown into a
                  full-service renewable energy company, delivering solar,
                  wind, and storage solutions to homes and businesses across
                  the country.
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-300 leading-7">
                  Today, we've completed hundreds of projects, but our
                  mission hasn't changed — help our clients cut costs, cut
                  emissions, and build a more sustainable future.
                </p>
              </Reveal>
            </div>
          </div>

          {/* 3. Mission & Vision */}
          <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <div className="grid sm:grid-cols-2 gap-6">
              <Reveal delay={0}>
                <div className="h-full bg-gray-50 dark:bg-[#0F2233] rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center">
                    <Target className="text-green-600" size={22} />
                  </div>
                  <h3
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    className="mt-5 text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Our Mission
                  </h3>
                  <p className="mt-3 text-gray-500 dark:text-gray-400 leading-6">
                    To accelerate the world's transition to clean, renewable
                    energy through innovative, reliable, and affordable
                    solutions.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="h-full bg-gray-50 dark:bg-[#0F2233] rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center">
                    <Eye className="text-green-600" size={22} />
                  </div>
                  <h3
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    className="mt-5 text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Our Vision
                  </h3>
                  <p className="mt-3 text-gray-500 dark:text-gray-400 leading-6">
                    A future where clean, renewable energy powers every home
                    and business — everywhere, for everyone.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 4. Our Core Values */}
          <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Our Core Values
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {coreValues.map((item, i) => {
                const ValueIcon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 100}>
                    <div className="h-full text-center bg-white dark:bg-[#0F2233] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center mx-auto">
                        <ValueIcon className="text-green-600" size={22} />
                      </div>
                      <h3 className="mt-4 font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* 5. Why Choose Voltix */}
          <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Why Choose Voltix?
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {whyChoose.map((item, i) => {
                const WhyIcon = item.icon;
                return (
                  <Reveal key={item.text} delay={i * 100}>
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#0F2233] rounded-xl px-5 py-4">
                      <span className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0">
                        <WhyIcon className="text-green-600" size={16} />
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item.text}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* 6. Our Process */}
          <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Our Process
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {process.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <Reveal key={step.title} delay={i * 120}>
                    <div className="relative h-full bg-white dark:bg-[#0F2233] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-600 text-white font-bold text-sm mb-4">
                        {i + 1}
                      </span>
                      <StepIcon className="text-green-600 mb-2" size={20} />
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6">
                        {step.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* 7. Company Statistics */}
          <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 100}>
                  <div className="text-center bg-gray-50 dark:bg-[#0F2233] rounded-2xl py-8 px-4 h-full">
                    <p
                      style={{ fontFamily: "Manrope, sans-serif" }}
                      className="text-2xl sm:text-3xl font-extrabold text-green-600"
                    >
                      <AnimatedValue value={stat.value} />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 8. Technologies We Use */}
          <div className="py-14 lg:py-16">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Technologies We Use
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 mt-10">
              {technologies.map((tech, i) => {
                const TechIcon = tech.icon;
                return (
                  <Reveal key={tech.name} delay={i * 100}>
                    <div className="flex flex-col items-center gap-2.5 bg-white dark:bg-[#0F2233] border border-gray-100 dark:border-gray-800 rounded-2xl py-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <div className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center">
                        <TechIcon className="text-green-600" size={20} />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 text-center">
                        {tech.name}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* 9. Call To Action */}
          <Reveal delay={0}>
            <div className="pb-16 lg:pb-20">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl px-8 py-14 text-center text-white shadow-xl">
                <h2
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  className="text-2xl sm:text-3xl font-extrabold"
                >
                  Ready to Go Green?
                </h2>
                <p className="mt-3 text-white/90 max-w-md mx-auto">
                  Let's talk about how Voltix can power your next project.
                </p>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 mt-7 bg-white text-green-700 font-semibold rounded-full px-8 py-3.5 hover:-translate-y-0.5 shadow-lg transition-all duration-300"
                >
                  Get a Free Quote
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}