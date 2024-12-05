import { useData } from "./DataContext";
import Logo from "./formatted_svg/Logo";

const SignUpPage = () => {
   


  return (
    <>
      <div className="desktop:pt-[4.9rem] desktop:pb-[15.62rem] desktop:min-w-[90rem] tablet:pt-[5.5rem] tablet:pb-[26.25rem] tablet:px-[11.5rem] phone:pt-[3rem] phone:pb-[7.19rem] phone:px-[1.5rem]">
        <div className="flex justify-center desktop:mb-[5.19rem] tablet:pb-[4.53rem] phone:pb-[3.65rem]">
          <Logo />
        </div>
        <div className="phone:flex phone:justify-center">
          <form className="desktop:min-w-[25rem] desktop:min-h-[26.125rem] tablet:min-w-[25rem] tablet:min-h-[26.125rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[26.25rem]">
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Sign up</h2>
            <input
              className="tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 focus:border-figma-white"
              placeholder="Email address"
            ></input>
            <input
              className="tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 focus:border-figma-white"
              placeholder="Password"
            ></input>
            <input
              className="tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 focus:border-figma-white"
              placeholder="Confirm password"
            ></input>
            <button className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]">Create an account</button>
            <p className="figma-body-m text-figma-white tablet:ps-[3.81rem] phone:ps-[2.19rem]">Already have an account?<span className="ps-[0.5rem] text-figma-red">Login</span></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
