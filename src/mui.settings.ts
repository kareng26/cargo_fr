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
                autoComplete: "off",
                fullWidth: true,
                size: "small",
            },
            styleOverrides: {
                root: {
                    "& .MuiInputLabel-formControl": {
                        opacity: 0.7,
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {
                size: "medium",
                variant: "outlined",
            },
        },
        MuiFormControl: {
            defaultProps: {
                fullWidth: true,
            },
            styleOverrides: {
                root: {
                    "& .MuiInputLabel-formControl": {
                        opacity: 0.7,
                    },
                },
            },
        },
    },
});
