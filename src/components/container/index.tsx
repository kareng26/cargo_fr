import React, { useEffect } from "react";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Base } from "./components/base";
import { Switcher } from "./components/switcher";

type Props = {
    children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
    const { i18n } = useTranslation();

    const onChoose = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
    };

    useEffect(() => {
        const lng = localStorage.getItem("lng");
        if (lng) {
            console.info("lng", lng);
            i18n.changeLanguage(lng);
            console.info("lng333", lng);
        }
    }, []);

    return (
        <div>
            <Switcher
                input={<Base />}
                IconComponent={() => null}
                variant={"standard"}
                value={i18n.language}
            >
                <MenuItem onClick={() => onChoose("en")} value={"en"}>
                    {"EN"}
                </MenuItem>
                <MenuItem onClick={() => onChoose("ru")} value={"ru"}>
                    {"RU"}
                </MenuItem>
            </Switcher>
            {children}
        </div>
    );
};

export { Container };
