// src/utils/AOSProvider.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const AOSProvider = () => {
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return null;
};

export default AOSProvider;
