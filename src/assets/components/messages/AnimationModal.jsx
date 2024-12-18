import { useEffect, useState } from "react";

const AnimationModal = ({onOpen, onClose,children}) => {

    const [isAnimating, setIsAnimating] = useState(false)
    const [mounted,setMounted] = useState(false)

    useEffect (() => {
        if (onOpen) {
            setMounted(true)
         const animationFramse =  requestAnimationFrame(() => {
               requestAnimationFrame(() => {
                setIsAnimating(true)
               })
            })
            return () => cancelAnimationFrame(animationFramse)
        } else {
            setIsAnimating(false)
            const timer = setTimeout(() => {
                setMounted(false)
            },500)
            return () => clearTimeout(timer)
        }
    },[onOpen])

    if (!mounted) return null;

 
    return ( 
        <>
            <div className={`fixed inset-0 z-40 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${isAnimating ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"}`}
            onClick={onClose}>
            <div className={`transform transition-all duration-500 ease-in-out ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            onClick={e => e.stopPropagation()}>
                {children}
            </div>
            </div>
        </>
     );
}
 
export default AnimationModal;