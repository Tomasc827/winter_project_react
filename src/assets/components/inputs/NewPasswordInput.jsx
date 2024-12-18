

const NewPasswordInput = ({register, errors}) => {
    return ( 
        <div className="relative">
            <input
                      aria-label="New Password"
                      aria-description="Please enter your new password here, it must be 8 to 50 characters long, 1 lowercase letter,1 uppercase letter, one special symbol and one number"
                      aria-required="true"
              className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red  ${
                errors.newPassword
                  ? "focus:border-figma-red border-figma-red"
                  : "focus:border-figma-white"
              }`}
              placeholder="New password"
              type="password"
              {...register("newPassword", {
                required: "Can't be empty",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]).{8,50}$/,
                  message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character and be at least 8 characters long"
                },
              })}
            />
            {errors.newPassword?.type === "required" && (
              <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem]">
                {errors.newPassword.message}
              </p>
            )}

        </div>
    );
}
 
export default NewPasswordInput;