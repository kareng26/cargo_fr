import { OptionArgs } from "@/pages/dashboard/types.ts";

const getOption = (data: Array<OptionArgs>) => ({
    tooltip: {
        trigger: "item",
    },
    legend: {
        orient: "horizontal",
        left: "left",
    },
    series: [
        {
            type: "pie",
            legendHoverLink: true,
            height: "400px",
            data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
    ],
});

export { getOption };
