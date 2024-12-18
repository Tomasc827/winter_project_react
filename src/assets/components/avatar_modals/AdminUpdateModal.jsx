import { useParams } from "react-router";
import { useData } from "../DataContext";
import { useEffect } from "react";
import { patchContentData } from "../../helpers/update";
import { useForm } from "react-hook-form";
import TitleInput from "../inputs/inputs_admin_update/TitleInput";
import TrendingSmallInput from "../inputs/inputs_admin_update/TrendingSmallInput";
import TrendingLargeInput from "../inputs/inputs_admin_update/TrendingLargeInput";
import RegularSmallInput from "../inputs/inputs_admin_update/RegularSmallInput";
import RegularMediumInput from "../inputs/inputs_admin_update/RegularMediumInput";
import RegularLargeInput from "../inputs/inputs_admin_update/RegularLargeInput";
import YearInput from "../inputs/inputs_admin_update/YearInput";
import CategorySelect from "../inputs/inputs_admin_update/CategorySelect";
import AgeRatingSelect from "../inputs/inputs_admin_update/AgeRatingSelect";
import DescriptionTextArea from "../inputs/inputs_admin_update/DescriptionTextarea";
import RadioInput from "../inputs/inputs_admin_update/RadioInput";
import DeleteSVG from "../formatted_svg/DeleteSVG";
import DeleteModal from "./DeleteModal";

const AdminUpdateModal = () => {
  const {
    findShowById,
    navigate,
    fetchData,
    setError,
    setSuccess,
    deleteModal,
    setDeleteModal,
  } = useData();


  const { showID } = useParams();

  const show = findShowById(showID)

  useEffect(() => {
    

    if (!show) {
      fetchData();
    }
  }, [showID]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
} = useForm()


  useEffect(() => {
    if (show) {
      const { title,year,category,rating,description,isTrending,isBookmarked } = show;
      setValue("title", title);
      setValue("thumbnail.regular.small",show.thumbnail.regular.small)
      setValue("thumbnail.regular.medium",show.thumbnail.regular.medium)
      setValue("thumbnail.regular.large",show.thumbnail.regular.large)
      setValue("year", year);
      setValue("category", category);
      setValue("rating", rating);
      setValue("description", description);
      setValue("isTrending",isTrending.toString())
      setValue("isBookmarked",isBookmarked)
      if (isTrending && show.thumbnail.trending) {
        setValue("thumbnail.trending.small", show.thumbnail.trending.small);
        setValue("thumbnail.trending.large", show.thumbnail.trending.large);
      }
    }
  }, [show, setValue]);

  if (!show) {
    return (
      <div className="fixed inset-0 bg-black z-40 bg-opacity-50 flex justify-center items-center">
        <div className="text-figma-white figma-heading-l">Loading...</div>
      </div>
    );
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const onSubmit = async (data) => {
    try {
      const updateContent = {
        title: data.title,
        year: data.year,
        category: data.category,
        rating: data.rating,
        description: data.description,
        isTrending: data.isTrending === "true",
        isBookmarked: data.isBookmarked,
        thumbnail: {
          regular: {
            small: data.thumbnail.regular.small,
            medium: data.thumbnail.regular.medium,
            large: data.thumbnail.regular.large
          }
        }
      };

      if (data.isTrending === "true") {
        if( show.thumbnail.trending) {
          updateContent.thumbnail.trending = {
            small: data.thumbnail.trending?.small || show.thumbnail.trending?.small,
            large: data.thumbnail.trending?.large || show.thumbnail.trending?.large
          };}
        } else {
          updateContent.thumbnail.trending = {
            small: data.thumbnail.trending?.small || show.thumbnail.regular.small,
            large: data.thumbnail.trending?.large || show.thumbnail.regular.large
          }
        }

      const updatedContent = await patchContentData(show.id, updateContent);

      if (updatedContent) {
        await fetchData();
        setSuccess("Details have been successfully updated");
        setTimeout(() => {
          setSuccess("");
          navigate(-1)
        }, 1500);
      } else {
        throw new Error("No data received from update");
      }
    } catch (error) {
      setError(error.message || "Failed to update content");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };



  return (
    <>
          {deleteModal && (
          <div
            className="fixed bg-black bg-opacity-50 z-50 inset-0 flex justify-center items-center"
            onClick={() => setDeleteModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`rounded-lg shadow-lg transform transition-all duration-700 ease-in-out ${
                deleteModal
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <DeleteModal show={show}
              handleSubmit={handleSubmit} />
            </div>
          </div>
        )}
      {show && (

        <div className="relative">
          <div
            className="fixed inset-0 bg-black z-40 bg-opacity-50 flex justify-center items-center "
            onClick={handleBackgroundClick}
          >
            <div className="bg-figma-semi-dark-blue text-figma-white rounded-t-3xl rounded-b-3xl rounded shadow-2xl shadow-figma-red">
              <div className="relative">
                <img
                  src={
                    show.thumbnail.regular.large.startsWith("/")
                      ? show.thumbnail.regular.large
                      : `/${show.thumbnail.regular.large}`
                  }
                  alt={show.title}
                  className="Desktop:min-w-[40rem] tablet:min-w-[30rem] phone:min-w-[20rem] w-[30vw] h-auto object-contain rounded-t-3xl border-2 "
                ></img>
                <div className="absolute z-10 top-[2rem] left-[2rem]"><DeleteSVG/></div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex flex-col text-center desktop:min-w-[30rem] tablet:min-w-[30rem]  phone:min-w-[20rem] w-[30vw] px-[2rem] figma-body-m border-x-2 border-b-2 rounded-b-3xl">
                  <div className="flex pt-[3rem] justify-between px-[3rem] gap-x-[3rem] tablet:flex-row phone:flex-col-reverse">
                    <button
                      className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[10rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[10rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUpdateModal;
