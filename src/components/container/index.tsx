import React, { useEffect } from "react";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { User } from "@/assets/icons";
import { I18 } from "@/i18n.ts";
import { UserInfo, Base, Switcher } from "@/components/container/components";
import { Languages } from "@/types.ts";

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
                value={i18n.language}
                variant={"standard"}
                IconComponent={() => null}
            >
                <MenuItem
                    disabled={i18n.language === Languages.EN}
                    onClick={() => onChoose(Languages.EN)}
                    value={Languages.EN}
                >
                    {"EN"}
                </MenuItem>
                <MenuItem
                    disabled={i18n.language === Languages.RU}
                    onClick={() => onChoose(Languages.RU)}
                    value={Languages.RU}
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
