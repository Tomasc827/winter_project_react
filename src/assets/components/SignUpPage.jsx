import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import Logo from "./formatted_svg/Logo";
import ErrorServer from "./messages/ErrorServer";
import { useState } from "react";
import { postData } from "../helpers/post";
import SignUpSuccess from "./messages/SignUpSuccess";
import EmailInput from "./inputs/EmailInput";
import StrengthPassword from "./inputs/StrengthPassword";
import ConfirmPasswordSignup from "./inputs/ConfirmPasswordSignup";

const SignUpPage = () => {
  const {
    setUsers,
    setError,
    navigate,
    setSuccess,
    encodedPassword,
    error,
    success,
    setAvatar,
  } = useData();

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
      setAvatar(response.avatar);
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
        <div className="flex justify-center desktop:mb-[5.19rem] tablet:mb-[4.53rem] phone:mb-[3.65rem]">
          <Logo />
        </div>
        <div className="phone:flex phone:justify-center">
          <form
            className="tablet:min-w-[25rem] tablet:min-h-[26.125rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[26.25rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Sign Up</h2>
            <EmailInput register={register} errors={errors} />
            <StrengthPassword register={register} errors={errors} />
            <ConfirmPasswordSignup
              register={register}
              errors={errors}
              watch={watch}
            />
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
