import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="figma-heading-l desktop:text-[10rem] tablet:text-[7rem] phone:text-[5rem] text-figma-greyish-blue">
          404
        </h1>
        <p className="figma-body-m desktop:text-[1.9rem] tablet:text-[1.3rem] phone:text-[1rem] text-figma-greyish-blue pb-6">
          Page Not Found
        </p>
        <Link
        aria-label="Homepage"
        aria-description="Page not found, click here to go back to the homepage"
          to="/"
          className="flex justify-center items-center bg-figma-red text-figma-white tablet:w-[21rem] h-[3rem] phone:w-[17.4375rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] mb-[1.5rem]"
        >
          Go To Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;
