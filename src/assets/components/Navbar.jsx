import { useData } from "./DataContext";
import Logo from "./formatted_svg/Logo";
import NavbarSvg from "./formatted_svg/NavbarSvg";
import defaultImage from "../img/favicon-32x32.png";
import NavbarHorizontal from "./formatted_svg/NavbarHorizontal";
import { useEffect, useState } from "react";
import NavbarMobile from "./formatted_svg/NavbarMobile";

const Navbar = () => {
  const [screen, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const { avatar } = useData();

  const isTablet = screen < 1440 && screen > 768;

  return (
    <>
      <div className="relative">
        <div
          className={`fixed bg-figma-semi-dark-blue desktop:top-[2rem] desktop:left-[2rem] desktop:w-[6rem] desktop:h-[60rem] tablet:w-[44.9375rem] tablet:h-[4.5rem] tablet:rounded-[0.625rem] desktop:rounded-[1.25rem] flex desktop:flex-col tablet:left-[1.56rem] tablet:right-[1.5rem] tablet:top-[1.44rem] 
                    ${
                      isTablet
                        ? "tablet:left-[50%] tablet:transform tablet:-translate-x-[50%]"
                        : "desktop:left-[2rem]"
                    }`}
        >
          <div className="desktop:pt-[2.21rem] desktop:ps-[1.99rem] desktop:pe-[2.01rem] desktop:pb-[4.69rem] tablet:ps-[1.5rem] tablet:pt-[1.5rem] tablet:pb-[1.4rem] tablet:pe-[13.56rem]">
            <Logo />
          </div>
          <div className="desktop:w-[1.25rem] desktop:h-[12.5rem] desktop:pt-0 desktop:mb-[34.5rem] tablet:w-[10.8075] tablet:h-[1.25rem] tablet:pt-[1.69rem] tablet:pb-[1.56rem] tablet:pe-[14.07rem]">
            {screen > 1440 ? (
              <NavbarSvg />
            ) : screen >= 768 ? (
              <NavbarHorizontal />
            ) : (
              <NavbarMobile />
            )}
          </div>
          <div className="desktop:mx-[1.75rem] desktop:mt-0 desktop:mb-0 tablet:mt-[1.31rem] tablet:mb-[1.19] tablet:me-[1rem]">
            {avatar ? (
              <img
                className="desktop:w-[2.5rem] desktop:h-[2.5rem]  tablet:w-[2rem] tablet:h-[2rem] desktop:rounded-[2.5rem] tablet:rounded-[2rem] border border-figma-white"
                src={avatar}
                alt="avatar"
              ></img>
            ) : (
              <img
                className="desktop:w-[2.5rem] tablet:w-[2rem] tablet:h-[2rem] desktop:h-[2.5rem] desktop:rounded-[2.5rem] tablet:rounded-[2rem] border border-figma-white"
                src={defaultImage}
                alt="avatar"
              ></img>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
