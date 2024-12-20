const YearInput = ({ register, errors }) => {
  return (
    <>
      <div className="relative">
        <input
          aria-label="Year"
          aria-description="Provide the year when the show was released, only numbers, must start with 1 or 2 up to four"
          aria-required="true"
          className={`desktop:w-[40rem] tablet:w-[35rem] h-[2.3125rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors.year
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          placeholder="Content release date"
          type="number"
          id="year"
          {...register("year", {
            required: "Can't be empty",
            pattern: {
              value: /^[12]\d{3}$/,

              message: "Invalid year format",
            },
          })}
        ></input>

        {errors?.year && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.year?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default YearInput;
