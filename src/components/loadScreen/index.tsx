import * as React from "react";
import { Loader } from "@/components/loader";
import { styled } from "styled-components";

const LoadScreen: React.FC = () => (
    <Wrap>
        <Loader />
    </Wrap>
);

const Wrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden !important;
    pointer-events: none !important;
    z-index: 9999999999999999999999; /* Ensure it's above other elements */
`;

export { LoadScreen };
