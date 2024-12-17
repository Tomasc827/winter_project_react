import { useForm } from "react-hook-form";
import { deleteData } from "../../helpers/delete";
import { useData } from "../DataContext";

const DeleteModal = ({show}) => {

    const {setDeleteModal,fetchData,setSuccess,navigate,setError} = useData()

    const {handleSubmit} = useForm()
    const handleDelete = async() => {
        try {
          const deletedData = await deleteData(show.id)
          if (deletedData) {
            await fetchData()
            setSuccess(`${show.title} has been successfully deleted`)
            setTimeout(() => {
              setSuccess("");
              setDeleteModal(false)
              navigate(-1)
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

    return ( <>
    
    <div className="">
        <div className="phone:flex phone:justify-center">
          <form onSubmit={handleSubmit(handleDelete)}
            className="tablet:min-w-[25rem]  bg-figma-semi-dark-blue rounded-[1.25rem] tablet:p-[2rem] phone:p-[1.5rem] phone:flex phone:flex-col phone:min-w-[20.4375rem] "
            
          > <div className="flex justify-center">
            <h2 className="figma-heading-l text-white pb-[2.5rem] tablet:w-[25rem] text-center">Are you sure you want to delete {show.title}?</h2>
            </div>
            <div className="relative flex justify-center gap-5">
            <button
                      className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[10rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                      type="button"
                      onClick={() => setDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-figma-red text-figma-white desktop:min-w-[45%]  tablet:min-w-[8rem] tablet:max-w-[15rem] h-[3rem] phone:min-w-[10rem] hover:bg-figma-white hover:text-figma-dark-blue duration-700 rounded-[0.375rem] figma-body-m mb-[1.5rem]"
                      type="submit"
                    >
                      Delete
                    </button>
                    </div>
          </form>
        </div>
      </div>

    </> );
}
 
export default DeleteModal;