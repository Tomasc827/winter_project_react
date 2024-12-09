

const UpdateConfirmPassword = ({register, errors, watch}) => {
    
    return ( 
        <div className="relative">
        <input
            className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[2.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red  ${
              errors.password
                ? "focus:border-figma-red border-figma-red"
                : "focus:border-figma-white"
            }`}
            placeholder="Confirm password"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm new password",
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
              validate: (value) =>  value === watch("newPassword") || "Passwords must match"
              ,
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
     );
}
 
export default UpdateConfirmPassword;