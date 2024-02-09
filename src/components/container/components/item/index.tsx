import styled from "styled-components";
import { MenuItem } from "@mui/material";

const Item = styled(MenuItem)`
    display: ${(props) => (props.isVisible ? "block" : "none")};
`;

export { Item };
