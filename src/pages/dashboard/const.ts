import { OptionArgs } from "@/pages/dashboard/types.ts";
import { Colors } from "@/assets/colors";

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
                    shadowColor: Colors.DIAPHANE_AILE_DE_CORBEAU,
                },
            },
        },
    ],
});

export { getOption };
