import { useEffect, useState } from "react";
import { useData } from "../DataContext";

const AccessNavbar = () => {
  const { access,accessText } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    let fadeInTimeout;
    let fadeOutTimeout;

    if (access) {
      clearTimeout(fadeOutTimeout);
      setIsRendered(true);
      fadeInTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 20);
    } else {
      clearTimeout(fadeInTimeout);
      setIsVisible(false);
      fadeOutTimeout = setTimeout(() => {
        setIsRendered(false);
      }, 500); 
    }

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
    };
  }, [access]);

  if (!isRendered) return null;

  return (
      <p
        className={`
          text-figma-white 
          figma-heading-s
          bg-figma-dark-blue 
          px-4
          py-2 
          rounded-full
          transition-all 
          duration-500 
          ease-in-out
          select-none
          absolute
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
        `}
      >
        {accessText}
      </p>
  );
};

export default AccessNavbar;