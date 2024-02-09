import { styled } from "styled-components";
import { Typography } from "@mui/material";

const Cargo = styled.div``;

const CargoItem = styled.div`
    display: flex;
    gap: 5px;
`;

const CargoTitle = styled(Typography).attrs(() => ({
    fontSize: "24px",
    fontWeight: "600",
}))``;

const CargoItemTitle = styled(Typography).attrs(() => ({
    // fontSize: "18px",
    fontWeight: "600",
}))``;

export { Cargo, CargoItem, CargoTitle, CargoItemTitle };
