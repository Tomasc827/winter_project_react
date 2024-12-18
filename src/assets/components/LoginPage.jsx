import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import Logo from "./formatted_svg/Logo";
import ErrorServer from "./messages/ErrorServer";
import SignUpSuccess from "./messages/SignUpSuccess";
import { loginUser } from "../helpers/getUser";
import EmailInput from "./inputs/EmailInput";
import LoginPasswordInput from "./inputs/LoginPasswordInput";

const LoginPage = () => {
  const {
    setError,
    navigate,
    setSuccess,
    error,
    processing,
    setCurrentUser,
    setAvatar,
    fetchData,
    fetchRatings,
  } = useData();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (error || processing) return;

    try {
      const caseInsensitive = {
        ...data,
        email: data.email.toLowerCase()
      };
      const user = await loginUser(caseInsensitive);
      setCurrentUser(user);
      setAvatar(user.avatar);
      
      await Promise.all([fetchData(), fetchRatings()]);
      navigate("/");
      setSuccess("Login successful");
      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <ErrorServer />
      <SignUpSuccess />
      <div className="desktop:pt-[4.9rem] desktop:pb-[15.62rem] desktop:min-w-[90rem] tablet:pt-[5rem] tablet:pb-[29.56rem] tablet:px-[11.5rem] phone:pt-[3rem] phone:pb-[7.19rem] phone:px-[1.5rem]">
        <div className="flex justify-center desktop:mb-[5.19rem] tablet:mb-[4.53rem] phone:mb-[3.65rem]">
          <Logo />
        </div>
        <div className="phone:flex phone:justify-center">
          <form
            className="tablet:min-w-[25rem] tablet:min-h-[23.3125rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[22.8125rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Login</h2>
            <EmailInput register={register} errors={errors} />
            <LoginPasswordInput register={register} errors={errors} />
            <div className="relative"></div>
            <button
              className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              type="submit"
              value="submit"
            >
              Login to your account
            </button>
            <p className="figma-body-m text-figma-white  tablet:ps-[3.75rem] phone:ps-[2rem]">
              Don't have an account?
              <span
                className="ps-[0.5rem] text-figma-red cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
