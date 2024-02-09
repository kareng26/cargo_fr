import styled from "styled-components";
import { TableContainer as TC } from "@mui/material";
import { TableContainerProps } from "@mui/material/TableContainer/TableContainer";

const TableContainer = styled(TC).attrs<TableContainerProps>(() => ({
    sx: {
        boxShadow: "none",
    },
}))``;

export { TableContainer };
