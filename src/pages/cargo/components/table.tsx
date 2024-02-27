import { styled } from "styled-components";
import { TableCell as TC, TableRow as TR } from "@mui/material";

const TableCell = styled(TC)`
    flex: 1;
`;

const TableRow = styled(TR)`
    display: flex !important;
`;

export { TableCell, TableRow };
