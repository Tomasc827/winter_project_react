import { useState } from "react";

const StrengthPassword = ({register,errors,}) => {
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


    return ( 
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
                "Password must contain at least one uppercase letter, one lowercase letter, one number,one special symbol and be from 8 to 50 characters long",
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
     );
}
 
export default StrengthPassword;
