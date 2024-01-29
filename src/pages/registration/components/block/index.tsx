import React, { forwardRef } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";

type BlockProps = {
    currentstep: number;
    stepindex: number;
    children: React.ReactNode;
};

const StyledBlock = styled.div<BlockProps>`
    display: ${(props) =>
        props.currentstep === props.stepindex ? "block" : "none"};
`;

const Block: React.FC<BlockProps> = forwardRef(
    (props, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <StyledBlock ref={ref} {...props}>
                {props.children}
            </StyledBlock>
        );
    },
);

Block.displayName = "Block";

const BlockTitle = styled(Typography).attrs(() => ({
    fontSize: 18,
}))``;

export { Block, BlockTitle };
