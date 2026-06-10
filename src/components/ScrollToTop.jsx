import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we are navigating to an article page
    if (pathname.startsWith('/blog/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
