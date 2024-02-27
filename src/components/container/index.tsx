import React, { useEffect } from "react";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { User } from "@/assets/icons";
import { I18 } from "@/i18n.ts";
import { UserInfo, Base, Switcher } from "@/components/container/components";

type Props = {
    children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (window.location.pathname === "/") {
            window.history.pushState({}, "", "/register");
            window.dispatchEvent(new Event("popstate"));
        }
    }, []);

    const onChoose = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
    };

    useEffect(() => {
        const lng = localStorage.getItem("lng");
        if (lng) {
            i18n.changeLanguage(lng);
        }
    }, []);

    return (
        <>
            <Switcher
                input={<Base />}
                IconComponent={() => null}
                variant={"standard"}
                value={i18n.language}
            >
                <MenuItem
                    disabled={i18n.language === "en"}
                    onClick={() => onChoose("en")}
                    value={"en"}
                >
                    {"EN"}
                </MenuItem>
                <MenuItem
                    disabled={i18n.language === "ru"}
                    onClick={() => onChoose("ru")}
                    value={"ru"}
                >
                    {"RU"}
                </MenuItem>
            </Switcher>
            <UserInfo>
                <User />
                <span>{t(I18.SIGNED_IN)}</span>
            </UserInfo>
            {children}
        </>
    );
};

export { Container };
