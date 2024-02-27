import React from "react";
import { AnimatedTitle } from "@/components/animatedTitle";
import { useGetUserCargoesQuery } from "@/store/api";
import { Chart, Content } from "@/pages/dashboard/components";
import { LoadScreen } from "@/components/loadScreen";
import { getOption } from "@/pages/dashboard/const.ts";
import {
    OptionArgs,
    StatusColores,
    Statuses,
} from "@/pages/dashboard/types.ts";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { I18 } from "@/i18n.ts";

const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const { data: cargoes, isFetching } = useGetUserCargoesQuery({});

    const transformedStatuses = Object.values(Statuses).reduce(
        (acc: Array<OptionArgs>, status: Statuses) => {
            const value = cargoes?.data?.filter(({ current_status }) => {
                return (
                    Statuses[current_status?.name as keyof typeof Statuses] ===
                    status
                );
            })?.length;
            if (value) {
                acc.push({
                    name: t(status),
                    value,
                    itemStyle: { color: StatusColores[status] },
                });
            }
            return acc;
        },
        [],
    );

    return (
        <>
            <AnimatedTitle />
            <div>
                {!isFetching ? (
                    <Content>
                        <Typography align={"center"}>
                            {t(I18.CARGO_DASHBOARD)}
                        </Typography>

                        <Chart
                            opts={{ renderer: "svg" }}
                            option={getOption(transformedStatuses)}
                        />
                    </Content>
                ) : (
                    <LoadScreen />
                )}
            </div>
        </>
    );
};

export { Dashboard };
