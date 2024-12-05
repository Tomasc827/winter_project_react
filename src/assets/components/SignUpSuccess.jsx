import { useEffect, useState } from "react";
import { useData } from "./DataContext";

const SignUpSuccess = () => {
  const { success } = useData();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      return () => clearTimeout(hideTimeout);
    }
  }, [success]);

  return (
    <>
      <div className="relative">
        {success && (
          <div className="flex justify-center items-center">
            <div
              className={`bg-figma-semi-dark-blue tablet:w-[25rem] tablet:h-[6rem] phone:w-[20.4375rem] phone:h-[6rem] flex justify-center items-center rounded-[1.25rem] text-figma-white figma-body-m border border-green-400 shadow-md shadow-green-400 fixed bottom-[10rem] transition-all duration-500  ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              } `}
            >
              {success}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpSuccess;
