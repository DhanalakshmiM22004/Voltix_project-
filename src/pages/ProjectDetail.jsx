import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsData } from "../data/projectsData";

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

// Animated counter — parses a leading number out of a value like "250kW",
// "98%", "24/7", or "12K" and counts up to it once it scrolls into view,
// then re-appends whatever prefix/suffix text surrounded that number.
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

// Fullscreen lightbox for the gallery, with prev/next navigation
function Lightbox({ images, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-5 animate-[fadeIn_0.25s_ease-out]">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300"
      >
        <X size={20} />
      </button>
      <button
        onClick={() => onNav(-1)}
        className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300"
      >
        <ChevronLeft size={22} />
      </button>
      <img
        src={images[index]}
        alt=""
        className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl animate-[popIn_0.3s_ease-out]"
      />
      <button
        onClick={() => onNav(1)}
        className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300"
      >
        <ChevronRight size={22} />
      </button>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const data = projectsData[slug];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!data) return <Navigate to="/" replace />;

  const Icon = data.icon;
  const relatedSlugs = Object.keys(projectsData).filter((s) => s !== slug).slice(0, 3);

  const navigateLightbox = (dir) => {
    setLightboxIndex((i) => (i + dir + data.gallery.length) % data.gallery.length);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <Reveal delay={0}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
              {" › "}
              <a href="/#projects" className="hover:text-green-600 transition-colors">Projects</a>
              {" › "}
              <span className="text-gray-700 dark:text-gray-300">{data.title}</span>
            </p>
          </Reveal>

          {/* Hero image with overlay */}
          <Reveal delay={100} className="!duration-1000">
            <div className="relative mt-6 rounded-[28px] overflow-hidden h-[280px] sm:h-[380px] lg:h-[460px]">
              <SmartImage
                src={data.heroImage}
                alt={data.title}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="inline-flex items-center gap-1.5 text-white/90 text-xs font-bold tracking-[2px] uppercase bg-white/15 backdrop-blur rounded-full px-3.5 py-1.5">
                  <Icon size={13} />
                  {data.category}
                </span>
                <h1
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  className="mt-4 text-[26px] sm:text-[36px] lg:text-[44px] leading-[1.15] font-extrabold text-white tracking-[-1px] max-w-2xl"
                >
                  {data.title}
                </h1>
                <p className="mt-2 text-white/85 text-sm sm:text-base max-w-lg">
                  {data.subtitle}
                </p>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  Request Similar Project
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white dark:bg-[#07111D] transition-all duration-500">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Project Information cards */}
          <div className="py-12 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {data.info.map((item, i) => {
                const InfoIcon = item.icon;
                return (
                  <Reveal key={item.label} delay={i * 80}>
                    <div className="bg-gray-50 dark:bg-[#0F2233] rounded-2xl p-5 text-center h-full">
                      <InfoIcon className="text-green-600 mx-auto" size={20} />
                      <p className="mt-2.5 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* About */}
          <div className="py-12 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white"
              >
                About the Project
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-300 leading-7 max-w-3xl">
                {data.about}
              </p>
            </Reveal>
          </div>

          {/* Gallery */}
          <div className="py-12 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Project Gallery
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {data.gallery.map((img, i) => (
                <Reveal key={i} delay={i * 100}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    <SmartImage
                      src={img}
                      alt={`${data.title} ${i + 1}`}
                      className="w-full h-full"
                      imgClassName="group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Key Features / Highlights */}
          <div className="py-12 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Key Features
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-2xl mx-auto">
              {data.highlights.map((item, i) => (
                <Reveal key={item} delay={i * 100}>
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#0F2233] rounded-xl px-5 py-4">
                    <CheckCircle2 className="text-green-600 shrink-0" size={20} />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="py-12 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Results &amp; Impact
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {data.results.map((item, i) => {
                const ResultIcon = item.icon;
                return (
                  <Reveal key={item.label} delay={i * 100}>
                    <div className="text-center bg-gray-50 dark:bg-[#0F2233] rounded-2xl py-8 px-4 h-full">
                      <ResultIcon className="text-green-600 mx-auto mb-2" size={22} />
                      <p
                        style={{ fontFamily: "Manrope, sans-serif" }}
                        className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white"
                      >
                        <AnimatedValue value={item.value} />
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.label}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Technologies */}
          <div className="py-12 lg:py-16 border-b border-gray-100 dark:border-gray-800">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Technologies Used
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10">
              {data.technologies.map((tech, i) => {
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

          {/* Related Projects */}
          <div className="py-12 lg:py-16">
            <Reveal delay={0}>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] text-gray-900 dark:text-white text-center"
              >
                Related Projects
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {relatedSlugs.map((relSlug, i) => {
                const rel = projectsData[relSlug];
                const RelIcon = rel.icon;
                return (
                  <Reveal key={relSlug} delay={i * 120}>
                    <Link
                      to={`/projects/${relSlug}`}
                      className="group relative block h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <SmartImage
                        src={rel.heroImage}
                        alt={rel.title}
                        className="w-full h-full"
                        imgClassName="group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-[#0F2233]/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight size={16} className="text-green-600" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white/80 text-[11px] font-semibold uppercase tracking-wide flex items-center gap-1">
                          <RelIcon size={12} />
                          {rel.category}
                        </span>
                        <p className="text-white font-bold mt-1">{rel.title}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <Reveal delay={0}>
            <div className="pb-16 lg:pb-20">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl px-8 py-14 text-center text-white shadow-xl">
                <h2
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  className="text-2xl sm:text-3xl font-extrabold"
                >
                  Ready For Your Project?
                </h2>
                <p className="mt-3 text-white/90 max-w-md mx-auto">
                  Let's build a sustainable future together.
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

      {lightboxIndex !== null && (
        <Lightbox
          images={data.gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={navigateLightbox}
        />
      )}
    </>
  );
}