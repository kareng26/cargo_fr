import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Title } from "./components";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

type Props = {
    children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
    const [scrollY, setScrollY] = useState(0);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    const initialTitleSize = 400;
    const finalTitleSize = 100;

    const titleSize = Math.max(
        finalTitleSize +
            (initialTitleSize - finalTitleSize) * (1 - scrollY / 400),
        finalTitleSize,
    );

    const initialTitleMarginTop = `calc(50vh - ${window.innerHeight / 2}px)`;

    const MotionDiv = motion(Container);

    const adjustedTitleSize = titleSize * (currentWidth / 1500);

    useEffect(() => {
        const handleResize = () => setCurrentWidth(window.innerWidth);

        const handleScroll = () => setScrollY(window.scrollY);

        handleResize();
        handleScroll();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
                <MotionDiv
                    initial={{ marginTop: initialTitleMarginTop }}
                    titlesize={adjustedTitleSize}
                >
                    <Title titlesize={adjustedTitleSize} scrolly={scrollY}>
                        {"CARGO"}
                    </Title>
                </MotionDiv>
            </StyleSheetManager>
            <div>{children}</div>
        </div>
    );
};
