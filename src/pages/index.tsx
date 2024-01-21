import { createBrowserRouter } from "react-router-dom";
import { CargoRegistration } from "./registration";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <CargoRegistration />,
            },
        ],
    },
]);
