import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
    },
    typography: {
        fontFamily: "Inter",
    },
    components: {
        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },
    },
});
