

const UpdateConfirmPassword = ({register, errors, watch}) => {
    
    return ( 
        <div className="relative">
        <input
            className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1rem] text-white figma-body-m focus:border-b-2 caret-figma-red  ${
              errors.confirmPassword
                ? "focus:border-figma-red border-figma-red"
                : "focus:border-figma-white"
            }`}
            placeholder="Confirm password"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm new password",
              validate: (value) =>  value === watch("newPassword") || "Passwords must match"
              ,
            })}
          ></input>
          {errors.confirmPassword?.type === "required" && (
            <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem]">
              {errors.confirmPassword.message}
            </p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
              {errors.confirmPassword.message}
            </p>
          )}

              {errors.newPassword?.type === "pattern" && (
              <p className="figma-error-red `tablet:w-[21rem] phone:w-[17.4375rem] mb-[1rem]">
                {errors.newPassword.message}
              </p>
            )}
        </div>
     );
}
 
export default UpdateConfirmPassword;