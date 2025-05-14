import React from "react";
import { View, Text } from "react-native";
import { BarChart, XAxis, YAxis } from "react-native-svg-charts";
import { Rect } from "react-native-svg";
import * as scale from "d3-scale";

export function BarCharts() {
    const data = [11, 15, 12, 20, 15, 17];
    const labels = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const colors = ["#98FB98", "#0000FF", "#FFC0CB", "#0000FF", "#800080"];
    const categoryLabels = ["Arrack", "Brandy", "Gin", "Whisky", "Rum"];

    // === Graph 1: Rounded Bars ===
    const RoundedBars = ({ x, y, bandwidth, data }) =>
        data.map((value, index) => (
            <Rect
                key={index}
                x={x(index)}
                y={y(value)}
                width={bandwidth}
                height={y(0) - y(value)}
                fill="#87CEEB"
                rx={6}
                ry={6}
            />
        ));

    // === Graph 2: Multi-colored Segmented Bars ===
    const SegmentedBars = ({ x, y, bandwidth, data }) =>
        data.map((value, index) => {
            const segmentValue = value / 5;
            return Array.from({ length: 5 }, (_, segmentIndex) => {
                const topValue = segmentValue * (segmentIndex + 1);
                const bottomValue = segmentValue * segmentIndex;
                const height = y(bottomValue) - y(topValue);

                return (
                    <Rect
                        key={`${index}-${segmentIndex}`}
                        x={x(index)}
                        y={y(topValue)}
                        width={bandwidth}
                        height={height}
                        fill={colors[segmentIndex]}
                        rx={4}
                        ry={0.3}
                    />
                );
            });
        });

    return (
        <View style={{ flexDirection: "column", padding: 16, marginTop: 90 }}>
            {/* === Graph 1 === */}
            <View style={{ height: 220, flexDirection: "row", marginBottom: 50 }}>
                <YAxis
                    data={data}
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill: "black", fontSize: 12 }}
                    numberOfTicks={6}
                    formatLabel={(value, index) =>
                        index === 0 ? "" : `${Math.round(value / 5) * 5}L`
                    }
                    min={-5}
                    max={25}
                />
                <View
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        backgroundColor: "white",
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={{ top: 10, bottom: 10 }}
                        spacingInner={0.3}
                        gridMin={0}
                        animate
                        yAccessor={({ item }) => item}
                        svg={{ fill: "transparent" }}
                    >
                        <RoundedBars />
                    </BarChart>
                    <XAxis
                        style={{ marginTop: 10 }}
                        data={data}
                        formatLabel={(value, index) => labels[index]}
                        svg={{ fontSize: 12, fill: "black" }}
                        scale={scale.scaleBand}
                    />
                </View>
            </View>

            {/* === Graph 2 === */}
            <View style={{ height: 220, flexDirection: "row" }}>
                <YAxis
                    data={data}
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill: "black", fontSize: 12 }}
                    numberOfTicks={6}
                    formatLabel={(value, index) =>
                        index === 0 ? "" : `${Math.round(value / 5) * 5}L`
                    }
                    min={-5}
                    max={25}
                />
                <View
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        backgroundColor: "white",
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={{ top: 10, bottom: 10 }}
                        spacingInner={0.3}
                        gridMin={0}
                        animate
                        yAccessor={({ item }) => item}
                        svg={{ fill: "transparent" }}
                    >
                        <SegmentedBars />
                    </BarChart>
                    <XAxis
                        style={{ marginTop: 10 }}
                        data={data}
                        formatLabel={(value, index) => labels[index]}
                        svg={{ fontSize: 12, fill: "black" }}
                        scale={scale.scaleBand}
                    />
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 15,
                    flexWrap: "wrap",
                }}
            >
                {categoryLabels.map((label, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 4,
                        }}
                    >
                        <View
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: colors[index],
                                marginRight: 6,
                            }}
                        />
                        <Text style={{ fontSize: 12 }}>{label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
