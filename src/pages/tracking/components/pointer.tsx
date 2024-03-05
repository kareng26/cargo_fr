import styled from "styled-components";
import { TableCell } from "@mui/material";
import { Colors } from "@/assets/colors";

const Pointer = styled(TableCell).attrs(() => ({
    sx: {
        color: Colors.RUBAN_A_CHEVEUX,
    },
}))`
    cursor: pointer;
    font-size: 12px;
`;

export { Pointer };
