import React from "react";

import ReactEcharts from "echarts-for-react";

export const option = () => ({
    dataset: {
        source: [["score", "product"]],
    },
    xAxis: {
        axisLabel: {
            show: true,
            color: "#BEBEBE",
        },
    },
    grid: {
        left: "15%",
        right: 10,
        top: 0,
        bottom: 20,
    },
    yAxis: {
        show: false,
        type: "category",
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        inverse: true,
        axisLabel: {
            show: true,
            formatter(value) {
                return value.length > 10 ? `${value.slice(0, 10)}...` : value;
            },
        },
    },
    series: [
        {
            type: "bar",
            barWidth: 20,
            encode: {
                x: "score",
                y: "product",
            },
            labelLayout: {
                x: "0",
            },
            label: {
                show: true,
                textAlign: "start",
                position: [0, 5],
                formatter(params) {
                    return params.name;
                },
            },
            showBackground: true,
            backgroundStyle: {
                showBackground: true,
                color: "#F9F9F9",
            },
            itemStyle: {
                color() {
                    return "#583BE8";
                },
            },
        },
    ],
});

const Dashboard: React.FC = () => {
    return (
        <div>
            <ReactEcharts
                style={{ height: "200px" }}
                option={option()}
                opts={{ renderer: "svg" }}
            />
        </div>
    );
};

export { Dashboard };
