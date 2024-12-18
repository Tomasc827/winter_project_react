import { useParams } from "react-router";
import { useData } from "../DataContext";
import BookmarkButton from "../BookmarkButton";
import { useEffect } from "react";
import CloseDescription from "../formatted_svg/CloseDescription";
import RatingsButton from "../RatingsButton";
import AnimationRouteModal from "../messages/AnimationRouteModal";

const Description = ({handleClose}) => {
  const { findShowById, navigate, fetchData, onLoginCheck } = useData();

  const { showID } = useParams();

  const show = findShowById(showID);

  useEffect(() => {
    if (!show) {
      fetchData();
    }
  }, [showID]);

  if (!show) {
    return (
      <div className="fixed inset-0 bg-black z-40 bg-opacity-50 flex justify-center items-center">
        <div className="text-figma-white figma-heading-l">Loading...</div>
      </div>
    );
  }



  return (
    <>
      {show && (
        <AnimationRouteModal>
          {({onClose}) => ( 
          <div className="relative">
            <div className="fixed inset-0 bg-black z-40 bg-opacity-50 flex justify-center items-center">
              <div
                className="Desktop:min-w-[40rem] tablet:min-w-[30rem] phone:min-w-[20rem] w-[30vw] "
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
                    <div className="absolute top-2 left-20">
                      <BookmarkButton
                        media_id={show.id}
                        isBookmarked={show.isBookmarked}
                        reloadData={fetchData}
                      />
                    </div>
                    <div className="absolute top-[1.60rem] right-8" onClick={onClose}>
                      <CloseDescription />
                    </div>
                  </div>
                  <p className="text-center figma-heading-l border-x-2 pt-[1rem]">
                    {show.title}
                  </p>
                  <div className="grid grid-cols-3 place-items-center desktop:px-[3rem] tablet:px-[2rem]  phone:px-[1rem] figma-heading-m pt-[1rem] pb-[1rem] border-x-2 w-[30vw] Desktop:min-w-[40rem] tablet:min-w-[30rem]  phone:min-w-[20rem]">
                    <div className="flex flex-col text-center ">
                      <p className="figma-body-s  phone:text-[0.5em]">
                        Release Year:
                      </p>
                      <p>{show.year}</p>
                    </div>
                    <div className="flex flex-col text-center ">
                      <p className="figma-body-s phone:text-[0.5em]">Category:</p>
                      <p className="">
                        {show.category === "TV Series" ? "Series" : "Movie"}
                      </p>
                    </div>
                    <div className="flex flex-col text-center">
                      <p className="figma-body-s phone:text-[0.5em]">Rating:</p>
                      <p>{show.rating}</p>
                    </div>
                  </div>
                  <div className="flex justify-center pb-3 border-x-2">
                    <RatingsButton
                      showID={showID}
                      contentId={show.id}
                      averageRating={show.averageRating}
                      totalRatings={show.totalRatings}
                      userRating={show.userRating}
                    />
                  </div>
                  <div className="flex flex-col text-center desktop:min-w-[30rem] tablet:min-w-[30rem]  phone:min-w-[20rem] w-[30vw] px-[2rem] figma-body-m border-x-2 border-b-2 rounded-b-3xl">
                    <p>Synopsis:</p>
                    <p>{show.description}</p>
                    <div className="flex pt-[3rem] justify-between px-[3rem] gap-x-[3rem] tablet:flex-row phone:flex-col-reverse">
                      <button
                        aria-label="Cancel"
                        className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[10rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                        type="button"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        aria-label="Watch now"
                        className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[10rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                        type="button"
                        onClick={onLoginCheck}
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </AnimationRouteModal>
      )}
    </>
  );
};

export default Description;
