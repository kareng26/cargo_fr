import styled from "styled-components";
import { Box as BC } from "@mui/material";

const Box = styled(BC)`
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 550px) {
        height: 100%;
    }

    button {
        margin: 10px 0;
        align-self: center;
    }
`;

export { Box };
