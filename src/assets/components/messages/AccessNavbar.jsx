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
          desktop:text-2xl
          tablet:text-xl
          phone:text-[0.9rem]
          tablet:leading-[1rem]
          bg-figma-dark-blue 
          desktop:px-4
          py-2 
          desktop:text-left
          tablet:text-center
          tablet:px-3
          rounded-full
          transition-all 
          duration-500 
          ease-in-out
          select-none
          pointer-events-none
          absolute
          ${isVisible ? 
            "opacity-100 phone:translate-y-0 Desktop:translate-y-0" : 
            "opacity-0 phone:-translate-y-4 Desktop:-translate-y-0"
          }
        `}
      >
        {accessText}
      </p>
  );
};

export default AccessNavbar;