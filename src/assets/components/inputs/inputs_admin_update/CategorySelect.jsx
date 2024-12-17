const CategorySelect = ({register,errors}) => {
    return ( 
        <>
                <div className="relative">
        <select
          className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors.category
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          defaultValue=""
          id="category"
          {...register("category", {
            required: "Must select category",
          })}
        >        <option value="" disabled>Category</option>
        <option value="Movie">Movie</option>
        <option value="TV Series">TV Series</option></select>

        {errors?.category && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.category?.message}
          </p>
        )}
      </div>
        </>
     );
}
 
export default CategorySelect;