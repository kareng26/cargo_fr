import ReactDOM from "react-dom/client";

import React from "react";

import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui.settings.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
);
