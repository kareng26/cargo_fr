import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

export const PrivateRoute: React.FC<Props> = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     navigate("register");
    // }, []);

    // return children;
    return <Navigate to={"/landing"} replace />;
};
