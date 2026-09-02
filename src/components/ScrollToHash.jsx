import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// After navigating to a URL with a hash (e.g. from the Footer's Quick
// Links, which link to "/#services" etc. from any page), this scrolls to
// the matching section once it's mounted. Plain react-router doesn't do
// this on its own outside of the data-router APIs.
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Small delay so the target page's DOM has mounted first
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(timer);
    }
    // No hash — normal route change, jump to top
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return null;
}