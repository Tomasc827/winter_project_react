import { Star } from "lucide-react";
import { useData } from "./DataContext";

const RatingsButton = ({contentId, averageRating, totalRatings, userRating,showID}) => {
    
    const {submitRating, currentUser,setError,setLoginModal,location} = useData()

    const handleRating = async (rating) => {
        await submitRating(contentId,rating)
    }
    const onStarClick = () => {
        if (!currentUser || !currentUser.id) {
          setLoginModal(true);
          setError("You must be logged in to watch");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      };
    return ( 
        <>
        <div className={`flex items-start flex-col pointer-events-auto gap-1 ${location.pathname === `/description/${showID}` ? "items-center" : "items-start "}`}>
            <div className={`flex gap-1`}>
            {[1,2,3,4,5].map((star) => (
                <button
                aria-label="Rating"
                aria-description="Rating is from 1 to 5 stars"
                key={star}
                onClick={() => {
                handleRating(star)
                onStarClick(star) } }
                className="hover:scale-110 transition-transform p-0.5 focus:outline-none"
                disabled={!currentUser?.id}
                >
                    <Star
                    size={16}
                    className={`${(userRating && star <= userRating) || (!userRating && star <= averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} transition-colors`}
                    />
                </button>
            ))}
            </div>
            <div className="text-figma-body-s">
                {averageRating ? 
                    <>
                    <span>{averageRating.toFixed(1)} average</span>
                    <span className="mx-2">:</span>
                    <span>{totalRatings} {totalRatings === 1 ? "rating" : "ratings"}</span>
                    </>
                    : <span>No ratings yet</span> }
            </div>
        </div>
        </>
     );
}
 
export default RatingsButton;