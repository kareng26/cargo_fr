import React, { forwardRef } from "react";
import styled from "styled-components";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const StyledContainer = styled.div<ContainerProps>`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: margin-top 0.3s ease-out;
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

export { Container };
