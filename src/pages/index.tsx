import { createBrowserRouter } from "react-router-dom";
import { Registration } from "./registration";
import { Tracking } from "./tracking";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <Registration />,
            },
            {
                path: "/tracking",
                element: <Tracking />,
            },
        ],
    },
]);
