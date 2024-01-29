import React, { forwardRef } from "react";
import styled from "styled-components";

export type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
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

    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
        font-size 0.5s ease-out,
        height 0.5s ease-out;
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

export { Title };
