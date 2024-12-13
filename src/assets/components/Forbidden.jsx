import { Link } from "react-router";

const Forbidden = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="figma-heading-l desktop:text-[10rem] tablet:text-[7rem] phone:text-[5rem] text-figma-greyish-blue">
          403
        </h1>
        <h2 className="figma-heading-m desktop:text-[5rem] tablet:text-[4rem] phone:text-[3rem] text-figma-greyish-blue pb-[3rem]">
          Forbidden
        </h2>
        <p className="figma-body-m desktop:text-[1.9rem] tablet:text-[1.3rem] phone:text-[1rem] text-figma-greyish-blue pb-6">
          You don't have permission to this page
        </p>
        <Link
          to="/"
          className="flex justify-center items-center bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] mb-[1.5rem]"
        >
          Go To Homepage
        </Link>
      </div>
    </>
  );
};

export default Forbidden;
