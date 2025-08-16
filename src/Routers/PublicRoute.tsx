import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.jwt);
    if(token){
        // return <Navigate to="/dashboard" replace />;
        return <Navigate to="/"/>
    }return children;
    }
    export default PublicRoute;