import { useParams } from "react-router";
import { useData } from "../DataContext";
import BookmarkButton from "../BookmarkButton";
import { useEffect } from "react";




const Description = () => {


const {findShowById,navigate,content} = useData()

const {showID} = useParams()

const show = findShowById(showID)


  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.length > 0 && !show) {
        navigate('/');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, show, navigate]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };



  return (
    <>
    {show && (
      <div className="relative">
        <div className="fixed inset-0 bg-black z-40 bg-opacity-50 flex justify-center items-center "
        onClick={handleBackgroundClick}>
          <div className="bg-figma-semi-dark-blue text-figma-white rounded-t-3xl rounded-b-3xl rounded shadow-2xl shadow-figma-red">
          <div className="relative">
            <img src={show.thumbnail.regular.large} alt={show.title} className="Desktop:min-w-[30rem] w-[30vw] h-auto object-contain rounded-t-3xl border-2 "></img>
                <div className="absolute top-2 right-2"><BookmarkButton/></div>
            </div>
            <p className="text-center figma-heading-l border-x-2 pt-[1rem]">{show.title}</p>
            <div className="grid grid-cols-3 place-items-center  px-[3rem] figma-heading-m pt-[1rem] pb-[2rem] border-x-2">

                <div className="flex flex-col text-center ">
                    <p className="figma-body-s">Release Year:</p>
                    <p>{show.year}</p>
                </div>
                <div className="flex flex-col text-center">
                    <p className="figma-body-s">Category:</p>
                    <p className="">{show.category}</p>
                </div>
                <div className="flex flex-col text-center">
                    <p className="figma-body-s">Rating:</p>
                    <p>{show.rating}</p>
                </div>
            </div>
            <div className="flex flex-col text-center w-[30vw] p-[2rem] figma-body-m border-x-2 border-b-2 rounded-b-3xl">
                <p>Synopsis:</p>
                <p>{show.description}</p>
                <div className="flex pt-[3rem] justify-between px-[3rem]">
                <button
              className="bg-figma-red text-figma-white tablet:w-[12rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className="bg-figma-red text-figma-white tablet:w-[12rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
              type="button"
            >
              Watch Now
            </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Description;
