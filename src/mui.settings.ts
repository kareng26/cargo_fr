import { createTheme } from "@mui/material";
import { Colors } from "@/assets/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: Colors.OCTAVE,
        },
    },
    typography: {
        fontFamily: "revert-layer",
        allVariants: {
            color: Colors.OCTAVE,
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
