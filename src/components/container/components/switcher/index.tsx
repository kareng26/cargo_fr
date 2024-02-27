import styled from "styled-components";
import { Select } from "@mui/material";

const Switcher = styled(Select)`
    position: fixed !important;
    left: 0 !important;
    z-index: 9999;

    .MuiSelect-select-MuiInputBase-input {
        padding: 0 !important;
    }
`;

export { Switcher };
