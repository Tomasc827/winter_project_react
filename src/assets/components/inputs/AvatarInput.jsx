const AvatarInput = ({register, errors}) => {

    return ( 
        <div className="relative">
        <input
          className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors.avatar
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          placeholder="Avatar url"
          type="text"
          id="avatar"
          {...register("avatar", {
            pattern: {
              value:
                /^(?=.{1,2048}$)https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg|avif)(?:\?.*)?$/i,

              message: "Invalid url format",
            },
            validate: (value) => {
              if (value === "") return true;  
              return value.match(/^(?=.{1,2048}$)https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg|avif)(?:\?.*)?$/i)
                ? true
                : "Invalid url format";
            },
          })}
        ></input>

        {errors && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.avatar?.message}
          </p>
        )}
      </div>
     );
}
 
export default AvatarInput;