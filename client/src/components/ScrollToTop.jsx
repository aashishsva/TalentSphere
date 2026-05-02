import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ye line page ko top par le jayegi smoothly ya instantly
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi path change hoga, ye trigger hoga

  return null; // Ye kuch render nahi karega, bas background mein kaam karega
};

export default ScrollToTop;