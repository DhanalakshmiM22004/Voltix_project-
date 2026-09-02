import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { servicesData } from "../data/servicesData";

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
function SmartImage({ src, alt, className = "", imgClassName = "" }) {
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
          } ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/40 dark:to-[#0F2233]">
          <CheckCircle2 className="text-green-600/30" size={32} />
        </div>
      )}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
}

// ---------- Section renderers ----------

function TextSection({ section }) {
  return (
    <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
      <div
        className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
          section.reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Reveal delay={0} className="!duration-1000">
          <SmartImage
            src={section.image}
            alt={section.title}
            className="w-full h-[280px] sm:h-[360px] rounded-3xl shadow-lg"
          />
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{ fontFamily: "Manrope, sans-serif" }}
            className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white"
          >
            {section.title}
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-300 leading-7">
            {section.body}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function CardsSection({ section }) {
  return (
    <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
      <Reveal delay={0}>
        <h2
          style={{ fontFamily: "Manrope, sans-serif" }}
          className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
        >
          {section.title}
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {section.items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.text} delay={i * 100}>
              <div className="h-full bg-gray-50 dark:bg-[#0F2233] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-green-600" size={22} />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {item.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function StepsSection({ section }) {
  return (
    <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
      <Reveal delay={0}>
        <h2
          style={{ fontFamily: "Manrope, sans-serif" }}
          className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
        >
          {section.title}
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {section.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 120}>
            <div className="relative h-full bg-white dark:bg-[#0F2233] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-600 text-white font-bold text-sm mb-4">
                {i + 1}
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6">
                {item.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function GallerySection({ section }) {
  return (
    <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
      <Reveal delay={0}>
        <h2
          style={{ fontFamily: "Manrope, sans-serif" }}
          className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
        >
          {section.title}
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {section.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 120}>
            <div className="group relative h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <SmartImage
                src={item.image}
                alt={item.title}
                className="w-full h-full"
                imgClassName="group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm">
                {item.title}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// Connected-node timeline design — filled circular step markers linked by
// a horizontal line, deliberately different from StepsSection's large
// outlined numerals so "How It Works" and "Installation Process" read as
// two distinct visual treatments rather than the same component twice.
function TimelineSection({ section }) {
  return (
    <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
      <Reveal delay={0}>
        <h2
          style={{ fontFamily: "Manrope, sans-serif" }}
          className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
        >
          {section.title}
        </h2>
      </Reveal>

      <div className="relative mt-16">
        {/* Connecting line, spans behind the nodes on sm+ */}
        <div className="hidden sm:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-green-200 dark:bg-green-900" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
          {section.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="text-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-lg shadow-green-600/30 mx-auto">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-bold text-gray-900 dark:text-white text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6 max-w-[220px] mx-auto">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqItem({ item, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0F2233]">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
            {item.q}
          </span>
          <ChevronDown
            size={18}
            className={`text-green-600 shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-6">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FaqSection({ section }) {
  return (
    <div className="py-14 lg:py-16 border-b border-gray-100 dark:border-gray-800">
      <Reveal delay={0}>
        <h2
          style={{ fontFamily: "Manrope, sans-serif" }}
          className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
        >
          {section.title}
        </h2>
      </Reveal>
      <div className="max-w-2xl mx-auto space-y-3 mt-10">
        {section.items.map((item, i) => (
          <FaqItem key={item.q} item={item} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <Reveal delay={0}>
      <div className="py-14 lg:py-16">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl px-8 py-14 text-center text-white shadow-xl">
          <h2
            style={{ fontFamily: "Manrope, sans-serif" }}
            className="text-2xl sm:text-3xl font-extrabold"
          >
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-white/90 max-w-md mx-auto">
            Get a free, no-obligation quote from our renewable energy
            experts today.
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
  );
}

const sectionRenderers = {
  text: TextSection,
  cards: CardsSection,
  steps: StepsSection,
  timeline: TimelineSection,
  gallery: GallerySection,
  faq: FaqSection,
  cta: CtaSection,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = servicesData[slug];

  if (!data) return <Navigate to="/" replace />;

  const Icon = data.icon;

  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-8 bg-white dark:bg-[#07111D] transition-all duration-500 overflow-hidden">
      {/* Hero */}
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <Reveal delay={0}>
          <span className="inline-flex items-center gap-2 text-green-600 text-xs sm:text-sm font-bold tracking-[2px] uppercase">
            <Icon size={15} />
            {data.badge}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1
            style={{ fontFamily: "Manrope, sans-serif" }}
            className="mt-5 text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.2] font-extrabold tracking-[-1px] text-gray-900 dark:text-white"
          >
            {data.title}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 mt-7 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-8 py-3.5 shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get a Free Quote
            <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>

      {/* Hero image */}
      <Reveal delay={250} className="!duration-1000">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 mt-12">
          <SmartImage
            src={data.heroImage}
            alt={data.badge}
            className="w-full h-[240px] sm:h-[360px] lg:h-[440px] rounded-[28px] shadow-2xl"
          />
        </div>
      </Reveal>

      {/* Sections */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 mt-6">
        {data.sections.map((section) => {
          const Renderer = sectionRenderers[section.type];
          if (!Renderer) return null;
          return <Renderer key={section.id || section.type} section={section} />;
        })}
      </div>
    </section>
  );
}