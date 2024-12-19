import { useForm } from "react-hook-form";
import { useData } from "../DataContext";
import { loginUser } from "../../helpers/getUser";
import EmailInput from "../inputs/EmailInput";
import LoginPasswordInput from "../inputs/LoginPasswordInput";
import CloseModalSVG from "../formatted_svg/CloseModalSVG";


const LoginModal = () => {
  const {
    setError,
    navigate,
    setSuccess,
    error,
    processing,
    setCurrentUser,
    setAvatar,
    setLoginModal
  } = useData();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (error || processing) return;

    try {
      const user = await loginUser(data);
      setCurrentUser(user);
      setAvatar(user.avatar);
      setSuccess("Login successful");
      setTimeout(() => {
        setSuccess("");
        setLoginModal(false)
      }, 2500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="">
        <div className="phone:flex phone:justify-center">
          <form
            className="tablet:min-w-[25rem] tablet:min-h-[23.3125rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[22.8125rem]"
            onSubmit={handleSubmit(onSubmit)}
          > <div className="flex justify-between">
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Login</h2>
            <button className="block mb-10" type="button" onClick={() => setLoginModal(false)}><CloseModalSVG /></button>
            </div>
            <EmailInput register={register} errors={errors} />
            <LoginPasswordInput register={register} errors={errors} />
            <div className="relative"></div>
            <button
              aria-label="Login"
              className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              type="submit"
              value="submit"
            >
              Login to your account
            </button>
            <p className="figma-body-m text-figma-white  tablet:ps-[3.75rem] phone:ps-[2.19rem]">
              Don't have an account?
              <span
                aria-label="Signup Page"
                aria-description="Click here if you do not have an account to sign up"
                className="ps-[0.5rem] text-figma-red cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
