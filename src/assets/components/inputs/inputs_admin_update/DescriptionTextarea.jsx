const DescriptionTextArea = ({ register, errors }) => {
  return (
    <>
      <div className="relative">
        <textarea
          rows="7"
          cols="40"
          aria-label="Description"
          aria-description="Provide a description for the show, up to 500 characters"
          aria-required="true"
          className={`desktop:w-[40rem] tablet:w-[35rem] h-[5rem] phone:w-[17.4375rem] input-login-style mb-[1.5rem] text-white figma-body-m focus:border-b-2 caret-figma-red ${
            errors.description
              ? "focus:border-figma-red border-figma-red"
              : "focus:border-figma-white"
          }`}
          placeholder="Brief description up to 500 charaters"
          id="description"
          {...register("description", {
            required: "Can't be empty",
            pattern: {
              value:
        /.{1,1000}$/,
                // /^(?!.*[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\u0483-\u0489\ufe20-\ufe2f])(?!.*[<>])(?!.*\s{2,})[A-Za-z0-9\s.,!?'"\-();]{1,1000}$/</>

              message: "Invalid description",
            },
          })}
        ></textarea>

        {errors.description && (
          <p className="figma-error-red absolute z-50 right-[1.06rem] inline top-[1rem] ">
            {errors.description?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default DescriptionTextArea;
