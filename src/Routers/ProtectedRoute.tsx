import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.jwt);
    if(token){
        // return <Navigate to="/dashboard" replace />;
       return children;
    } return <Navigate to="/login"/>
    }
    export default ProtectedRoute;