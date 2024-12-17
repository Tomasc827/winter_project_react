const AgeRatingSelect = ({register,errors}) => {
    return ( 
        <>
                <div className="relative">
        <select
          className={`tablet:w-[21rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors.rating
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          defaultValue=""
          id="ageRating"
          {...register("rating", {
            required: "Must select rating",
          })}
        >        <option value="" disabled>Age Rating</option>
        <option value="PG">PG</option>
        <option value="E">E</option>
        <option value="18+">18+</option>
        </select>

        {errors?.rating && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.rating?.message}
          </p>
        )}
      </div>
        </>
     );
}
 
export default AgeRatingSelect;