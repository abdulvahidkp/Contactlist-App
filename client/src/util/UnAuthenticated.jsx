import { Navigate } from "react-router-dom";
import { checkIfUserLoggedIn } from "../redux/features/userSlice";

export const UnAuthenticatedRoute = ({children}) => {

  if (checkIfUserLoggedIn()) {
    return <Navigate to='/' replace/>;
  }
  return children;
};

export default UnAuthenticatedRoute;