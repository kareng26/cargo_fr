import styled from "styled-components";
import { TableCell } from "@mui/material";

const Pointer = styled(TableCell).attrs(() => ({
    sx: {
        color: "#bc942c",
    },
}))`
    cursor: pointer;
    font-size: 12px;
`;

export { Pointer };
