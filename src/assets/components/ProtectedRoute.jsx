import { Navigate } from "react-router";
import { useData } from "./DataContext";



const ProtectedRoute = ({children}) => {
const {currentUser} = useData()

if (!currentUser || !currentUser?.id) {
    return <Navigate to="/forbidden" replace />
}

    return children
}
 
export default ProtectedRoute;