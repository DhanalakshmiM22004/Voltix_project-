import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";


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

// Fade + slide up — used for the link columns
function RevealUp({ children, delay = 0, className = "" }) {
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

// Slide in from the left — used for the logo block
function RevealLeft({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

  

// A link with a small underline that animates in on hover
function FooterLink({ href = "#", children }) {
  const className =
    "group relative inline-block text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300 text-sm";
  const underline = (
    <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-green-600 transition-all duration-300 group-hover:w-full" />
  );

  // Internal app routes (e.g. /services/solar-energy) use react-router's
  // Link for client-side navigation; hash anchors stay as plain <a> tags.
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
        {underline}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
      {underline}
    </a>
  );
}

const quickLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

const services = [
  { name: "Solar Energy", slug: "solar-energy" },
  { name: "Wind Energy", slug: "wind-energy" },
  { name: "Battery Storage", slug: "battery-storage" },
  { name: "EV Charging", slug: "ev-charging" },
];

const contactDetails = [
  { icon: MapPin, text: "Chennai, Tamil Nadu" },
  { icon: Mail, text: "voltix.com" },
  { icon: Phone, text: "+91 98765 43210" },
];

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-green-500 bg-[#F8FFF9] dark:bg-[#07111D] transition-all duration-500">
      <div className="max-w-[1450px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-16 lg:pt-20 pb-8">
        {/* Main grid — responsive per breakpoint:
            mobile: 1 col, everything stacked
            tablet: logo full width, links+services side by side, contact full width
            desktop: logo | links | services | contact, all in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo */}
          <RevealLeft delay={0} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-green-600 shrink-0"
              >
                <path d="M13 2L5 14h6l-1 8 9-13h-6l1-7z" />
              </svg>
              <div>
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
                >
                  Voltix
                </h3>
                <p className="text-[10px] uppercase tracking-[2px] text-green-600 font-semibold">
                  Renewable Energy
                </p>
              </div>
            </div>
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-6 max-w-xs"
            >
              Powering a cleaner tomorrow through innovative renewable energy
              solutions.
            </p>
          </RevealLeft>

          {/* Quick Links */}
          <RevealUp delay={150}>
            <h4 className="font-bold text-gray-900 dark:text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </RevealUp>

          {/* Services */}
          <RevealUp delay={250}>
            <h4 className="font-bold text-gray-900 dark:text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <FooterLink href={`/services/${service.slug}`}>
                    {service.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </RevealUp>

          {/* Contact */}
          <RevealUp delay={350} className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-gray-900 dark:text-white mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5">
              {contactDetails.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-center gap-2.5">
                    <Icon size={16} className="text-green-600 shrink-0" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </RevealUp>
        </div>


        {/* Bottom bar */}
        <RevealUp delay={500}>
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>© 2026 Voltix. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms &amp; Conditions</FooterLink>
            </div>
          </div>
        </RevealUp>
      </div>
    </footer>
  );
}
