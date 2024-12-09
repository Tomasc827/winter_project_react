

const CurrentPasswordInput = ({register, errors}) => {

    return ( 
        <div className="relative">
        <input
          className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red  ${
            errors.password
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          placeholder="Current password"
          type="password"
          autoComplete="new-password"
          {...register("currentPassword", {
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
     );
}
 
export default CurrentPasswordInput;