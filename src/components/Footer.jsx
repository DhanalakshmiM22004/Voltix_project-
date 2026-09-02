import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

// Inline social icons — avoids relying on lucide-react's brand icons,
// which vary/get removed between versions and can crash the import.
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-6.1c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V20H9.4V8.4h3.2v1.6h.1c.4-.8 1.6-1.7 3.2-1.7 3.4 0 4.5 2.3 4.5 5.2V20Z" />
  </svg>
);
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.3.4a4.6 4.6 0 0 1 2.6 2.6c.2.5.4 1.2.4 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.3a4.6 4.6 0 0 1-2.6 2.6c-.5.2-1.2.4-2.3.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.3-.4a4.6 4.6 0 0 1-2.6-2.6c-.2-.5-.4-1.2-.4-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.3a4.6 4.6 0 0 1 2.6-2.6c.5-.2 1.2-.4 2.3-.4C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3a2.8 2.8 0 0 0-1.6 1.6c-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7a2.8 2.8 0 0 0 1.6 1.6c.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3a2.8 2.8 0 0 0 1.6-1.6c.1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7a2.8 2.8 0 0 0-1.6-1.6c-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  </svg>
);

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

// Scale up — used for the social icons
function RevealScale({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${className} ${
        inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
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

const socials = [
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: GithubIcon, label: "GitHub" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
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

        {/* Social icons */}
        <RevealUp delay={400}>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm text-center sm:text-left">
              Follow Us
            </h4>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <RevealScale key={social.label} delay={450 + i * 80}>
                    <a
                      href="#"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  </RevealScale>
                );
              })}
            </div>
          </div>
        </RevealUp>

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
