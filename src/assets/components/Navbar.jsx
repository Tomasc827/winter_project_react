import { useData } from "./DataContext";
import Logo from "./formatted_svg/Logo";
import NavbarSvg from "./formatted_svg/NavbarSvg";
import defaultImage from "../img/favicon-32x32.png";
import NavbarHorizontal from "./formatted_svg/NavbarHorizontal";
import { useEffect, useState } from "react";
import NavbarMobile from "./formatted_svg/NavbarMobile";
import LogoMobile from "./formatted_svg/LogoMobile";
import LoginModal from "./avatar_modals/LoginModal";
import UserModal from "./avatar_modals/UserModal";
import SignUpSuccess from "./messages/SignUpSuccess";
import ErrorServer from "./messages/ErrorServer";

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

  const {
    avatar,
    loginModal,
    setLoginModal,
    currentUser,
    userModal,
    setUserModal,
  } = useData();

  const openModal = () => {
    if (currentUser?.id) {
      setUserModal(true);
    } else {
      setLoginModal(true);
    }
  };

  const closeModal = () => {
    setUserModal(false);
    setLoginModal(false);
  };

  const isTablet = screen < 1440 && screen > 768;
  const isMoblie = screen < 768;

  return (
    <>
    <ErrorServer/>
    <SignUpSuccess />
      <div className="relative">
        {loginModal && !currentUser?.id && (
          <div
            className="fixed bg-black bg-opacity-50 z-50 inset-0 flex justify-center items-center"
            onClick={() => closeModal()}
          >
            <div onClick={(e) => e.stopPropagation()}
                      className={`rounded-lg shadow-lg transform transition-all duration-700 ease-in-out ${
                        loginModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                      }`}>
              <LoginModal />
            </div>
          </div>
        )}
        {userModal && currentUser && currentUser.id && (
          <div
            className="fixed bg-black bg-opacity-50 z-50 inset-0 flex justify-center items-center"
            onClick={() => closeModal()}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <UserModal />
            </div>
          </div>
        )}
        <div
          className={`fixed z-30 bg-figma-semi-dark-blue desktop:top-[2rem] desktop:left-[2rem] desktop:w-[6rem] desktop:h-[60rem] tablet:w-[44.9375rem] tablet:h-[4.5rem] tablet:rounded-[0.625rem] desktop:rounded-[1.25rem] flex desktop:flex-col tablet:left-[1.56rem] tablet:right-[1.5rem] tablet:top-[1.44rem] phone:w-[23.4375rem] phone:h-[3.5rem]
                    ${
                      isTablet
                        ? "tablet:left-[50%] tablet:transform tablet:-translate-x-[50%]"
                        : "desktop:left-[2rem]"
                    } ${
            isMoblie
              ? `phone:left-[50%] phone:transform phone:-translate-x-[50%]`
              : ""
          }`}
        >
          <div className={`desktop:pt-[2.21rem] desktop:ps-[1.99rem] desktop:pe-[2.01rem] desktop:pb-[4.69rem] tablet:ps-[1.5rem] tablet:pt-[1.5rem] tablet:pb-[1.4rem]  phone:py-[1.13rem] phone:ps-[1rem] ${!currentUser || !currentUser.id ? "phone:pe-[3.5rem] tablet:pe-[15.06rem]": "tablet:pe-[13.56rem]"}`}>
            {screen >= 768 ? <Logo /> : <LogoMobile />}
          </div>
          <div className={`desktop:w-[1.25rem] desktop:h-[12.5rem] desktop:ps-0 desktop:pt-0 tablet:ps-0 desktop:mb-[34.5rem] tablet:w-[10.8075] tablet:h-[1.25rem] tablet:pt-[1.69rem] tablet:pb-[1.56rem]   phone:py-[1.25rem] ${!currentUser || !currentUser.id ? "phone:ps-[3rem] phone:pe-[3.53rem] tablet:pe-[12.07rem]": "phone:ps-[5rem] phone:pe-[5.03rem] tablet:pe-[14.07rem]"}`}>
            {screen >= 1440 ? (
              <NavbarSvg />
            ) : screen >= 768 ? (
              <NavbarHorizontal />
            ) : (
              <NavbarMobile />
            )}
          </div>
          <div
            className="desktop:mx-[1.75rem] desktop:mt-0 desktop:mb-0 tablet:mt-[1.31rem] tablet:mb-[1.19] tablet:me-[1rem] phone:my-[1rem] cursor-pointer"
            onClick={() => openModal()}
          >
            {avatar ? (
              <img
                className={`desktop:w-[2.5rem] desktop:h-[2.5rem]  tablet:w-[2rem] tablet:h-[2rem] desktop:rounded-[2.5rem] tablet:rounded-[2rem]  border border-figma-white phone:w-[1.5rem] phone:h-[1.5rem] phone:rounded-[1.5rem]`}
                src={avatar}
                alt="avatar"
              ></img>
            ) : (
              <img
                className="desktop:w-[2.5rem] tablet:w-[2rem] tablet:h-[2rem] desktop:h-[2.5rem] desktop:rounded-[2.5rem] tablet:rounded-[2rem] border border-figma-white phone:w-[1.5rem] phone:h-[1.5rem] phone:rounded-[1.5rem]"
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
