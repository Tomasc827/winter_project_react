import { useForm } from "react-hook-form";
import { useData } from "../DataContext";
import CloseModalSVG from "../formatted_svg/CloseModalSVG";
import { postContentData } from "../../helpers/post";
import TitleInput from "../inputs/inputs_admin_update/TitleInput";
import TrendingSmallInput from "../inputs/inputs_admin_update/TrendingSmallInput";
import TrendingLargeInput from "../inputs/inputs_admin_update/TrendingLargeInput";
import RegularSmallInput from "../inputs/inputs_admin_update/RegularSmallInput";
import RegularMediumInput from "../inputs/inputs_admin_update/RegularMediumInput";
import RegularLargeInput from "../inputs/inputs_admin_update/RegularLargeInput";
import YearInput from "../inputs/inputs_admin_update/YearInput";
import CategorySelect from "../inputs/inputs_admin_update/CategorySelect";
import AgeRatingSelect from "../inputs/inputs_admin_update/AgeRatingSelect";
import RadioInput from "../inputs/inputs_admin_update/RadioInput";
import DescriptionTextArea from "../inputs/inputs_admin_update/DescriptionTextarea";
import { useEffect } from "react";



const AdminAddModal = () => {
  const {
    setError,
    setSuccess,
    error,
    setAdminAdd,
    content,
    fetchData
  } = useData();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (error) return;

      const newContent = {
        title: data.title,
        year: data.year,
        category: data.category,
        rating: data.rating,
        description: data.description,
        isTrending: data.isTrending === "true",
        isBookmarked: false,
        date: new Date(),
        thumbnail: {
          regular: {
            small: data.thumbnail.regular.small,
            medium: data.thumbnail.regular.medium,
            large: data.thumbnail.regular.large
          }
        }
      }

      if (data.isTrending === "true") {
        if (data.thumbnail.trending?.small && data.thumbnail.trending?.large) {
          newContent.thumbnail.trending = {
            small: data.thumbnail.trending.small,
            large: data.thumbnail.trending.large
          }
        } else {
          newContent.thumbnail.trending = {
            small: data.thumbnail.regular.small,
            large: data.thumbnail.regular.large
          }
        }
      }
 
      const response = await postContentData({
        ...data,
        isBookmarked: false,
        date: new Date(),
        
      });
      

      if (response){
        await fetchData()
      setSuccess("New show was successfully added");
      reset();
      setTimeout(() => {
       setAdminAdd(false)
        setSuccess("");
      }, 2500);
    }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (!content) {
      fetchData();
    }
  }, [content,fetchData])

  return (
    <>
      <div className="">
        <div className="phone:flex phone:justify-center">
          <form
            className="tablet:min-w-[25rem] tablet:min-h-[23.3125rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] phone:min-h-[22.8125rem]"
            onSubmit={handleSubmit(onSubmit)}
          > <div className="flex justify-between">
            <h2 className="figma-heading-l text-white pb-[2.5rem]">Show Add Panel</h2>
            <button className="block mb-10" type="button" onClick={() => setAdminAdd(false)}><CloseModalSVG /></button>
            </div>
            <TitleInput register={register} errors={errors} />
                  {watch ("isTrending") === "true" &&
                  <div>
                <TrendingSmallInput register={register} errors={errors} />
                <TrendingLargeInput register={register} errors={errors} />
                </div>
                  }
  
                <RegularSmallInput register={register} errors={errors} />
                <RegularMediumInput register={register} errors={errors} />
                <RegularLargeInput register={register} errors={errors} />
                <YearInput register={register} errors={errors} />
                <CategorySelect register={register} errors={errors} />
                <AgeRatingSelect register={register} errors={errors} />
                <RadioInput register={register} errors={errors} watch={watch} />
                <DescriptionTextArea register={register} errors={errors} />
            
            <div className="flex justify-between">
                
                <button
                          className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[7rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                          type="button"
                          onClick={() => setAdminAdd(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[7rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                          type="submit"
                        >
                          Add New Show
                        </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddModal;
