import { createBrowserRouter } from "react-router-dom";
import { Registration } from "@/pages/registration";
import { Tracking } from "@/pages/tracking";
import { Dashboard } from "@/pages/dashboard";
import { Cargo } from "@/pages/cargo";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/register",
                element: <Registration />,
            },
            {
                path: "/tracking",
                element: <Tracking />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/cargo/:id",
                element: <Cargo />,
            },
        ],
    },
]);
