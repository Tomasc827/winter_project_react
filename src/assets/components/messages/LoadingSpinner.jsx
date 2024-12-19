const LoadingSpinner = () => {
    return ( 
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-16 h-16">
            <div className="absolute w-16 h-16 border-4 border-figma-red rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute w-16 h-16 border-4 border-figma-white border-opacity-20 rounded-full"></div>
            </div>
        </div>
        </>
     );
}
 
export default LoadingSpinner;