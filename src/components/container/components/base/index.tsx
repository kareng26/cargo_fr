import styled from "styled-components";
import { InputBase } from "@mui/material";

const Base = styled(InputBase)`
    text-decoration: none;

    .MuiSelect-select {
        padding: 10px !important;
        background: transparent !important;
    }
`;

export { Base };
