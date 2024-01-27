import styled from "styled-components";
import React, { forwardRef } from "react";

import { Box as BC, Container as CC, Typography } from "@mui/material";

const Container = styled(CC)`
    display: flex !important;
    margin: 170px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Content = styled(CC)`
    display: flex !important;
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

const Box = styled(BC)`
    display: flex;
    padding: 10px 0;
    flex-direction: column;
`;

const Cell = styled.div`
    height: 65px;
    width: 360px;
    padding: 7px;
`;

const Title = styled(Typography)`
    font-size: 24px !important;
    font-weight: 700 !important;
`;

const GroupTitle = styled(Typography).attrs(() => ({
    fontSize: 18,
}))``;

const ButtonWrap = styled.div`
    display: flex;
    align-self: center;
    gap: 5px;
`;

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

const List = styled.ul`
    width: 100%;
    height: 200px;
    position: relative;
    z-index: 667;
    overflow: scroll;
    background: white;
    scrollbar-gutter: unset;
    border: 0.5px solid #2f3642;
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(47, 54, 66, 0.2); /* Add box shadow */
`;

const Item = styled.div`
    cursor: pointer;
    margin: 10px 0;
    padding: 5px 15px;
    &:hover {
        background: rgba(47, 54, 66, 0.1);
    }
`;

export {
    Container,
    Box,
    Cell,
    Content,
    Title,
    GroupTitle,
    ButtonWrap,
    Block,
    Item,
    List,
};
