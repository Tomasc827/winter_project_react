import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import { loginUser } from "../helpers/getUser";

const LoginModal = () => {
  const { setError, navigate, setSuccess, error, processing, setCurrentUser,setAvatar } =
    useData();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (error || processing) return;

    try {
      const user = await loginUser(data);
      console.log("User data from login:", user)
      setCurrentUser(user);
      setAvatar(user.avatar)
      setSuccess("Login successful");
      setTimeout(() => {
        navigate("/");
        setSuccess("");
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
          >
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Login</h2>
            <div className="relative">
              <input
                className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
                  errors.email
                    ? "focus:border-figma-red border-figma-red"
                    : "focus:border-figma-white"
                }`}
                placeholder="Email address"
                type="text"
                id="email"
                {...register("email", {
                  required: "Can't be empty",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9%+-]+(\.[a-zA-Z0-9%+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,100}$/,

                    message: "Invalid email format",
                  },
                })}
              ></input>

              {errors && (
                <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[2.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red  ${
                  errors.password
                    ? "focus:border-figma-red border-figma-red"
                    : "focus:border-figma-white"
                }`}
                placeholder="Password"
                type="password"
                id="password"
                {...register("password", {
                  required: "Can't be empty",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
                  },
                })}
              ></input>
              {errors.password?.type === "required" && (
                <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
            </div>
            <button
              className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              type="submit"
              value="submit"
            >
              Login to your account
            </button>
            <p className="figma-body-m text-figma-white  tablet:ps-[3.75rem] phone:ps-[2.19rem]">
              Don't have an account?
              <span
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
