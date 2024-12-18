const TrendingLargeInput = ({register,errors}) => {
    return ( 
        <>
                <div className="relative">
        <input
          className={`desktop:w-[40rem] tablet:w-[35rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors?.thumbnail?.trending?.large
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          placeholder="Trending large"
          type="text"
          id="tlarge"
          {...register("thumbnail.trending.large", {
            required: "Can't be empty",
            pattern: {
              value:
              /^(?!.*[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\u0483-\u0489\ufe20-\ufe2f])(?:\.{0,2}\/)?(?:[\w-]+\/)*[\w-]+\.(?:jpg|jpeg|png|webp)$/i,



              message: "Invalid path format",
            },
          })}
        ></input>

        {errors?.thumbnail?.trending?.large && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.thumbnail.trending.large.message}
          </p>
        )}
      </div>
        </>
     );
}
 
export default TrendingLargeInput;