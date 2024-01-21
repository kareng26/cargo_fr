import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2f3642",
        },
    },
    typography: {
        fontFamily: "revert-layer",
        allVariants: {
            color: "#2f3642",
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                size: "small",
            },
        },
        MuiButton: {
            defaultProps: {
                size: "medium",
                variant: "outlined",
            },
        },
    },
});
