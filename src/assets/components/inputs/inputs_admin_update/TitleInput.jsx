const TitleInput = ({register,errors}) => {
    return ( 
        <>
                <div className="relative">
        <input
          className={`desktop:w-[40rem] tablet:w-[35rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors.title
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          placeholder="Content Title"
          type="text"
          id="title"
          {...register("title", {
            required: "Can't be empty",
            pattern: {
              value:
              /^(?:(?![\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\u0483-\u0489\ufe20-\ufe2f])[\p{L}\p{N}\p{P}\p{Sm}\p{Zs}]){1,100}$/u,



              message: "Invalid title Format",
            },
          })}
        ></input>

        {errors.title && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.title?.message}
          </p>
        )}
      </div>
        </>
     );
}
 
export default TitleInput;