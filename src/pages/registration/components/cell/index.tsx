import styled from "styled-components";
import { Typography } from "@mui/material";

const Cell = styled.div`
    height: 65px;
    width: 360px;
    padding: 7px;
`;

const CellErrorText = styled(Typography).attrs(() => ({
    variant: "caption",
    color: "error",
}))``;

export { Cell, CellErrorText };
