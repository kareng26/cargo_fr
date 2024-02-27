import React from "react";
import { styled } from "styled-components";
import { CircularProgress } from "@mui/material";

type Props = {
    size?: number;
};

const Loader: React.FC<Props> = ({ size }) => {
    return (
        <Wrapper>
            <CircularProgress size={size} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export { Loader };
