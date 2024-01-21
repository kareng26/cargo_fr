import styled from "styled-components";
import React, { forwardRef } from "react";

type ContainerProps = {
    titlesize: number;
    children: React.ReactNode;
};

const StyledContainer = styled.div<ContainerProps>`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: ${(props) => `${props.titlesize}px`};
    transition: font-size 0.3s ease-out;
    margin-bottom: 20px;
    margin-top: ${() => `calc(50vh - ${window.innerHeight / 2}px)`};
`;

const Container: React.FC<ContainerProps> = forwardRef(
    (props, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <StyledContainer ref={ref} {...props}>
                {props.children}
            </StyledContainer>
        );
    },
);

Container.displayName = "Container";

const Header = styled.header`
    display: flex;
    justify-content: center;
`;

export type TitleProps = {
    scrolly: number;
    titlesize: number;
    children: React.ReactNode;
};

const StyledTitle = styled.div<TitleProps>`
    @keyframes textShine {
        0% {
            background-position: 0 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => `${100 - Math.min(props.scrolly / 5, 80)}vh`};
    font-size: ${(props) => `${props.titlesize}px`};
    transition:
        font-size 0.3s ease-out,
        height 0.3s ease-out;
    z-index: 1000;
    background: linear-gradient(
        to right,
        #8d71fe 20%,
        #ffd32b 30%,
        #4dc2ff 50%,
        #bc942c 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 13s ease-in-out infinite alternate;
`;

const Title: React.FC<TitleProps> = forwardRef(
    (props, ref: React.ForwardedRef<HTMLDivElement>) => {
        return (
            <StyledTitle ref={ref} {...props}>
                {props.children}
            </StyledTitle>
        );
    },
);

Title.displayName = "Title";

export { Header, Title, Container };
