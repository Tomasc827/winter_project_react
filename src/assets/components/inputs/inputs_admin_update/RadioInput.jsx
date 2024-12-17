const RadioInput = ({ register, errors, watch }) => {
    const currentValue = watch("isTrending");
    
    return (
      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isTrending"
              value="true"
              checked={currentValue === "true"}
              {...register("isTrending")}
              className="w-4 h-4 accent-figma-red"
            />
            <span>Trending</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isTrending"
              value="false"
              checked={currentValue === "false"}
              {...register("isTrending")}
              className="w-4 h-4 accent-figma-red"
            />
            <span>Not Trending</span>
          </label>
        </div>
        
        {errors?.isTrending && (
          <p className="figma-error-red mt-2">
            {errors.isTrending.message}
          </p>
        )}
      </div>
    );
  };
  
  export default RadioInput;