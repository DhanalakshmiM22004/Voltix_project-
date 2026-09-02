import { useEffect, useState } from "react";

// Full-screen splash shown while the app first loads. Fades itself out
// once the window has finished loading (or after a short minimum time,
// so it doesn't just flash on a fast connection) and then unmounts.
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const MIN_DISPLAY_MS = 900;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
      setTimeout(() => {
        setFading(true);
        setTimeout(() => setVisible(false), 500); // matches fade-out duration
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-[#07111D] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-2.5 animate-[voltixPulse_1.4s_ease-in-out_infinite]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 sm:w-12 sm:h-12 text-green-600"
        >
          <path d="M13 2L5 14h6l-1 8 9-13h-6l1-7z" />
        </svg>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Voltix
        </h1>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-40 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full w-1/3 bg-green-600 rounded-full animate-[voltixBar_1.1s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes voltixPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        @keyframes voltixBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}