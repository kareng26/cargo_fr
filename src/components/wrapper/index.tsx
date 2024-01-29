import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Title } from "./components";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

type Props = {
    children: React.ReactNode;
};

const minFontSize = 60;

export const Wrapper: React.FC<Props> = ({ children }) => {
    const scrollY = useRef(0);
    const windowWidth = useRef(window.innerWidth);

    const MotionDiv = useMemo(() => motion(Container), []);

    useEffect(() => {
        const handleScroll = () => {
            scrollY.current = window.scrollY;
            const titleElement = document.getElementById("styled-title");

            if (titleElement) {
                const newSize = windowWidth.current / 4 - scrollY.current / 2;

                titleElement.style.fontSize = `${Math.max(
                    minFontSize,
                    newSize,
                )}px`;
            }
        };

        const handleResize = () => {
            const titleElement = document.getElementById("styled-title");

            if (titleElement && window.innerWidth !== windowWidth.current) {
                const newSize = Math.max(minFontSize, window.innerWidth / 4);
                titleElement.style.fontSize = `${newSize}px`;
                windowWidth.current = window.innerWidth;
            }
        };

        handleScroll();
        handleResize();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
                <MotionDiv>
                    <Title id={"styled-title"}>{"CARGO"}</Title>
                </MotionDiv>
            </StyleSheetManager>
            <div>{children}</div>
        </div>
    );
};
