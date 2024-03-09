import React from "react";
import { I18 } from "@/i18n.ts";
import { styled } from "styled-components";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { CreateCargoRespType, GetUserCargoDataType } from "@/types.ts";
import { Info } from "@/components/info";
import { useNavigate } from "react-router-dom";
import { Statuses } from "@/pages/dashboard/types.ts";
import { Colors } from "@/assets/colors";

type Props = {
    cargo: GetUserCargoDataType | CreateCargoRespType;
};

const Tooltip: React.FC<Props> = ({ cargo }) => {
    const navigate = useNavigate();

    return (
        <Container onClick={() => navigate(`/cargo/${cargo.id}`)}>
            <Item>
                <ItemTitle>{t(I18.TOOLTIP_NAME)}</ItemTitle>
                <ItemText>{cargo?.name}</ItemText>
            </Item>
            <Item>
                <ItemTitle>{t(I18.TOOLTIP_STATUS)}</ItemTitle>
                <ItemText id={"status"}>
                    {t(
                        Statuses[
                            cargo?.current_status?.name as keyof typeof Statuses
                        ],
                    )}
                </ItemText>
            </Item>
            <ItemInfo>{t(I18.TOOLTIP_INFO)}</ItemInfo>
        </Container>
    );
};

export { Tooltip };

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 25%;
    min-width: 150px;
    top: 0;
    height: 160px;
    bottom: 20%;
    padding: 20px;
    background-color: ${Colors.BLANC};
    overflow-y: scroll;
    font-family: sans-serif;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ItemTitle = styled(Typography).attrs(() => ({
    fontSize: "12px",
    fontWeight: "600",
}))``;

const ItemInfo = styled(Info)`
    position: absolute;
    bottom: 0;
    align-self: center;
    text-align: center;
`;

const ItemText = styled(Typography).attrs(() => ({
    fontSize: "16px",
}))`
    &#status {
        color: ${Colors.VERT_GOLF};
    }
`;
