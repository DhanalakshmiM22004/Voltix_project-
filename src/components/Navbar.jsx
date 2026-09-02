import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const linkRefs = useRef([]);
  const navRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Measure the active link's position and slide the underline to it —
  // recalculated on active change and on resize so it stays accurate
  // across breakpoints.
  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeIndex];
      const nav = navRef.current;
      if (!el || !nav || !isHome) return;
      const elRect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setUnderline({
        left: elRect.left - navRect.left,
        width: elRect.width,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex, isHome]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#07111D]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="h-16 sm:h-20 flex items-center justify-between">
          {/* Logo + Nav grouped together on the left */}
          <div className="flex items-center gap-10 xl:gap-14">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 sm:w-9 sm:h-9 text-green-600 shrink-0"
              >
                <path d="M13 2L5 14h6l-1 8 9-13h-6l1-7z" />
              </svg>

              <div>
                <h1
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Voltix
                </h1>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-[2px] sm:tracking-[3px] text-green-600 font-semibold ml-0.5">
                  Renewable Energy
                </p>
              </div>
            </Link>

            {isHome && (
              <nav
                ref={navRef}
                className="hidden lg:flex items-center gap-10 font-medium relative"
              >
                {navLinks.map((link, i) => (
                  <a
                    key={link.name}
                    ref={(el) => (linkRefs.current[i] = el)}
                    href={link.href}
                    onClick={() => setActiveIndex(i)}
                    className={`pb-1 transition-colors duration-300 ${
                      activeIndex === i
                        ? "text-green-600 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-green-600"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}

                {/* Sliding underline indicator */}
                <span
                  className="absolute -bottom-0.5 h-[2px] bg-green-600 rounded-full transition-all duration-300 ease-out"
                  style={{ left: underline.left, width: underline.width }}
                />
              </nav>
            )}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {!isHome && (
              <Link
                to="/"
                className="group relative pb-1 font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors duration-300"
              >
                Home
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-green-600 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            )}

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white flex items-center justify-center hover:scale-105 duration-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/quote"
              className="bg-green-600 hover:bg-green-700 text-white px-5 xl:px-7 py-2.5 xl:py-3 rounded-full font-semibold shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm xl:text-base"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white flex items-center justify-center hover:scale-105 duration-300"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-900 dark:text-white transition-transform duration-300"
              style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="bg-white dark:bg-[#07111D] border-t border-gray-200 dark:border-gray-800 px-6 py-6 space-y-1">
          {isHome ? (
            navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveIndex(i);
                  setMenuOpen(false);
                }}
                className={`block py-2.5 px-3 rounded-lg transition-all duration-300 ${
                  activeIndex === i
                    ? "text-green-600 font-semibold bg-green-50 dark:bg-green-950/30"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {link.name}
              </a>
            ))
          ) : (
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              Home
            </Link>
          )}

          <Link
            to="/quote"
            onClick={() => setMenuOpen(false)}
            className="block w-full mt-3 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold text-center transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}