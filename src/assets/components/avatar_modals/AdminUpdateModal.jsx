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
import AnimationRouteModal from "../messages/AnimationRouteModal";
import AnimationModal from "../messages/AnimationModal";
import CloseDescription from "../formatted_svg/CloseDescription";

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

  const show = findShowById(showID);

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
  } = useForm();

  useEffect(() => {
    if (show) {
      const {
        title,
        year,
        category,
        rating,
        description,
        isTrending,
        isBookmarked,
      } = show;
      setValue("title", title);
      setValue("thumbnail.regular.small", show.thumbnail.regular.small);
      setValue("thumbnail.regular.medium", show.thumbnail.regular.medium);
      setValue("thumbnail.regular.large", show.thumbnail.regular.large);
      setValue("year", year);
      setValue("category", category);
      setValue("rating", rating);
      setValue("description", description);
      setValue("isTrending", isTrending.toString());
      setValue("isBookmarked", isBookmarked);
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
            large: data.thumbnail.regular.large,
          },
        },
      };

      if (data.isTrending === "true") {
        if (show.thumbnail.trending) {
          updateContent.thumbnail.trending = {
            small:
              data.thumbnail.trending?.small || show.thumbnail.trending?.small,
            large:
              data.thumbnail.trending?.large || show.thumbnail.trending?.large,
          };
        }
      } else {
        updateContent.thumbnail.trending = {
          small: data.thumbnail.trending?.small || show.thumbnail.regular.small,
          large: data.thumbnail.trending?.large || show.thumbnail.regular.large,
        };
      }

      const updatedContent = await patchContentData(show.id, updateContent);

      if (updatedContent) {
        await fetchData();
        setSuccess("Details have been successfully updated");
        setTimeout(() => {
          setSuccess("");
          navigate(-1);
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
      <AnimationModal onOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <DeleteModal show={show} handleSubmit={handleSubmit} />
      </AnimationModal>
      {show && (
        <AnimationRouteModal>
          {({ onClose }) => (
            <div className="w-full max-w-3xl mx-auto p-6">
              <div className="bg-figma-semi-dark-blue text-figma-white rounded-t-3xl rounded-b-3xl shadow-xl shadow-figma-red relative max-h-[90vh] overflow-y-auto">
                <div className="relative pb-6">
                  <img
                    src={
                      show.thumbnail.regular.large.startsWith("/")
                        ? show.thumbnail.regular.large
                        : `/${show.thumbnail.regular.large}`
                    }
                    alt={show.title}
                    className="w-full h-auto object-contain rounded-t-3xl border-2"
                  />
                  <button 
                    className="absolute z-10 top-[2rem] left-[2rem]"
                    onClick={() => setDeleteModal(true)}
                  >
                    <DeleteSVG />
                  </button>
                  <button 
                    className="absolute z-10 top-[2rem] right-[2rem]"
                    onClick={onClose}
                  >
                    <CloseDescription />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-center gap-2 px-6"
                >
                  <div className="w-full">
                    <div className="text-center mb-2">Title:</div>
                    <TitleInput register={register} errors={errors} />
                    
                    {watch("isTrending") === "true" && (
                      <div className="text-center">
                        <div className="pb-2">Trending images:</div>
                        <TrendingSmallInput register={register} errors={errors} />
                        <TrendingLargeInput register={register} errors={errors} />
                      </div>
                    )}
                    
                    <div className="text-center mt-4">Images:</div>
                    <RegularSmallInput register={register} errors={errors} />
                    <RegularMediumInput register={register} errors={errors} />
                    <RegularLargeInput register={register} errors={errors} />
                    
                    <div className="text-center mt-4">Year:</div>
                    <YearInput register={register} errors={errors} />
                    
                    <div className="text-center mt-4">Category:</div>
                    <CategorySelect register={register} errors={errors} />
                    
                    <div className="text-center mt-4">Age rating:</div>
                    <AgeRatingSelect register={register} errors={errors} />
                    
                    <div className="text-center mt-4">Status:</div>
                    <RadioInput register={register} errors={errors} watch={watch} />
                    
                    <div className="text-center mt-4">Description:</div>
                    <DescriptionTextArea register={register} errors={errors} />
                  </div>

                  <div className="flex justify-between w-full gap-4 mt-8 mb-6">
                    <button
                      aria-label="Cancel"
                      className="bg-figma-red text-figma-white flex-1 h-12 hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m"
                      type="button"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      aria-label="Update"
                      aria-description="Confirm that you want to update the show"
                      className="bg-figma-red text-figma-white flex-1 h-12 hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </AnimationRouteModal>
      )}
    </>
  );
};

export default AdminUpdateModal;
