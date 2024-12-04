import Logo from "./formatted_svg/Logo";

const SignUpPage = () => {
    return ( 
        <>
        <div className="desktop:pt-[4.9rem] desktop:pb-[15.62rem] desktop:max-w-[90rem]">
            <div className="flex justify-center desktop:mb-[5.19rem]">
               <Logo/> 
            </div>
            <div className="desktop:flex desktop:justify-center">
            <form className="desktop:w-[25rem] desktop:h-[26.125rem] bg-figma-semi-dark-blue rounded-[1.25rem] p-[2rem]">
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Sign up</h2>
            <input className="tablet:w-[21rem] tablet:h-[2.3125rem] input-login-style" placeholder="Email address"></input>
            </form>
            </div>

        </div>
        </>
     );
}
 
export default SignUpPage;