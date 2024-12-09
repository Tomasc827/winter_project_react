import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import Logo from "./formatted_svg/Logo";
import ErrorServer from "./ErrorServer";
import { useState } from "react";
import { postData } from "../helpers/post";
import SignUpSuccess from "./SignUpSuccess";

const SignUpPage = () => {
  const {
    setUsers,
    setError,
    navigate,
    setSuccess,
    encodedPassword,
    error,
    success,
    setAvatar
  } = useData();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]/.test(password)) strength += 20;
    if (strength === 125) strength = 100;
    setPasswordStrength(strength);
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (error) return;
      const { confirmPassword, ...userData } = data;
      const encodedData = {
        ...userData,
        password: encodedPassword(userData.password),
      };
      const response = await postData({
        ...encodedData,
        avatar: "/avatar.jpg",
      });
      setUsers(response);
      setAvatar(response.avatar)
      setSuccess("You have been successfully registered");
      reset();
      setTimeout(() => {
        navigate("/login");
        setSuccess("");
      }, 2500);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <ErrorServer />
      <SignUpSuccess />
      <div className="desktop:pt-[4.9rem] desktop:pb-[12.81rem] desktop:min-w-[90rem] tablet:pt-[5.5rem] tablet:pb-[26.25rem] tablet:px-[11.5rem] phone:pt-[3rem] phone:pb-[7.19rem] phone:px-[1.5rem]">
        <div className="flex justify-center desktop:mb-[5.19rem] tablet:pb-[4.53rem] phone:pb-[3.65rem]">
          <Logo />
        </div>
        <div className="phone:flex phone:justify-center">
          <form
            className="tablet:min-w-[25rem] tablet:min-h-[26.125rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[26.25rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Sign up</h2>
            <div className="relative">
              <input
                className={`tablet:w-[21rem] h-[2.3125rem] caret-figma-red phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2  ${
                  errors.email
                    ? "focus:border-figma-red border-figma-red "
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
                className={`tablet:w-[21rem] h-[2.3125rem] caret-figma-red phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2  ${
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
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number,one special symbol and be at least 8 characters long",
                  },
                  onChange: (e) => calculatePasswordStrength(e.target.value),
                })}
              ></input>
              {passwordStrength > 0 && (
                <div className="mb-2">
                  <div className="h-2 w-full bg-figma-white rounded-full">
                    <div
                      className={`h-full rounded-full  
                                ${
                                  passwordStrength === 0
                                    ? "bg-figma-red"
                                    : passwordStrength === 100
                                    ? "bg-emerald-500"
                                    : passwordStrength >= 50
                                    ? "bg-orange-400"
                                    : "bg-figma-red"
                                }`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <div className="text-sm mt-1">
                    {passwordStrength}% Strength
                  </div>
                </div>
              )}
              {errors.password?.type === "required" && (
                <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className={`tablet:w-[21rem] h-[2.3125rem] caret-figma-red phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2   ${
                  errors.confirmPassword
                    ? "focus:border-figma-red border-figma-red"
                    : "focus:border-figma-white"
                }`}
                placeholder="Confirm password"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Can't be empty",
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "Passwords must match";
                    }
                  },
                })}
              ></input>
              {errors.confirmPassword && (
                <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem]">
                  {errors.confirmPassword.message}
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="figma-error-red mb-[1rem] z-50 right-[1.06rem]  top-[1rem] tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] ">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className="bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              type="submit"
              value="submit"
              disabled={error !== "" || success !== ""}
            >
              Create an account
            </button>
            <p className="figma-body-m text-figma-white tablet:ps-[3.81rem] phone:ps-[2.19rem]">
              Already have an account?
              <span
                className="ps-[0.5rem] text-figma-red cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
