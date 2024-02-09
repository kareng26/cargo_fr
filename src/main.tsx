import ReactDOM from "react-dom/client";

import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui.settings.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Global } from "./components/global";
import { Toaster } from "react-hot-toast";
import "./i18n";
import { Container } from "@/components/container";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Global />
                <Provider store={store}>
                    <Container>
                        <RouterProvider router={router} />
                    </Container>
                    <Toaster position={"top-right"} />
                </Provider>
            </LocalizationProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
