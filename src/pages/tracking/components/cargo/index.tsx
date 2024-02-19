import { styled } from "styled-components";
import { Typography } from "@mui/material";

const CargoesTitle = styled(Typography).attrs(() => ({
    fontSize: "24px",
    fontWeight: "600",
}))``;

const CargoesHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CargoesContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 40px;
    flex: 1.5;
`;

export { CargoesTitle, CargoesHeader, CargoesContainer };
