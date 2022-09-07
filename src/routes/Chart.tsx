import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 6000 }
    );
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                // <ApexChart
                //   type="line"
                //   series={[
                //     {
                //       name: "Price",
                //       data: data?.map((price) => price.close) as number[],
                //     },
                //   ]}
                //   options={{
                //     theme: {
                //       mode: isDark ? "dark" : "light",
                //     },
                //     chart: {
                //       height: 300,
                //       width: 500,
                //       toolbar: { show: false },
                //       background: "transparent",
                //     },
                //     stroke: { curve: "smooth", width: 4 },
                //     grid: { show: false },
                //     xaxis: {
                //       type: "datetime",
                //       labels: { show: false },
                //       axisTicks: { show: false },
                //       axisBorder: { show: false },
                //       tooltip: { enabled: false },
                //       categories: data?.map((row) => row.time_close),
                //     },
                //     yaxis: { show: false },
                //     fill: {
                //       type: "gradient",
                //       gradient: {
                //         gradientToColors: ["#0be881"],
                //         stops: [0, 100],
                //       },
                //     },
                //     colors: ["#0fbcf9"],
                //     tooltip: {
                //       y: {
                //         formatter: (value) => `$ ${value.toFixed(2)}`,
                //       },
                //     },
                //   }}
                // />
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => [
                                [price.time_close],
                                [
                                    price.open,
                                    price.high,
                                    price.low,
                                    price.close,
                                ],
                            ]) as any,
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: { show: false },
                            background: "transparent",
                        },
                        stroke: { curve: "smooth", width: 4 },
                        grid: { show: false },
                        xaxis: {
                            type: "datetime",
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            tooltip: { enabled: false },
                            categories: data?.map((row) => row.time_close),
                        },
                        yaxis: { show: false },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#0be881"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
