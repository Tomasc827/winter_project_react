

const EmailInput = ({register, errors}) => {



    
    return ( 
        <div className="relative">
        <input
                  aria-label="Email"
                  aria-description="Enter your email here, it must meet standard email format"
                  aria-required="true"
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
     );
}
 
export default EmailInput;