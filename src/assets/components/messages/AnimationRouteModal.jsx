import React, { useEffect, useState } from "react";
import { useData } from "../DataContext";

const AnimationRouteModal = ({children}) => {
    const [isAnimating, setIsAnimating] = useState(false)

    const {navigate} = useData()

    useEffect(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsAnimating(true)
            })
        })
    },[])


    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            navigate(-1);
        }, 300);
    };


    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return ( 
        <div 
            className={`fixed inset-0 z-30 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
                isAnimating ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
            }`}
            onClick={handleBackgroundClick}
        >
            <div 
                className={`transform transition-all duration-500 ease-in-out ${
                    isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                onClick={e => e.stopPropagation()}
            >
         {typeof children === "function" ? children({ onClose: handleClose }) : 
          React.cloneElement(children, { onClose: handleClose })}
            </div>
        </div>
    );
};
 
export default AnimationRouteModal;