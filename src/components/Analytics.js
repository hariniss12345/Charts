import React, { useState } from "react";
import { View, Text } from 'react-native';
import Dropdown from "../ReusableComponents/Dropdown";
import Card from "../ReusableComponents/Card";
import { BarChart, XAxis } from "react-native-svg-charts";
import { Rect } from "react-native-svg";

export function Analytics() {
    const [selectedType, setSelectedType] = useState("Daily");
    const options = ['Daily', 'Monthly', 'Quarterly'];

    const colors = ['#87CEEB', '#007ACC', '#6699cc']; 

    const dataByType = {
        Daily: {
            time: "12h 30m",
            label: "Daily Average",
            description: "Average time you spent per day on all tasks."
        },
        Monthly: {
            time: "320h",
            label: "Monthly Average",
            description: "Average time you spent per month on all tasks."
        },
        Quarterly: {
            time: "980h",
            label: "Quarterly Average",
            description: "Average time you spent per quarter on all tasks."
        }
    };

    const { time, label, description } = dataByType[selectedType];

    const data = [17, 20, 13, 25, 22, 10];
    const labels = ["27 Jun", "28 Jun", "29 Jun", "30 Jun", "1 Jul", "Today"];

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

    const travelData = [
        { label: 'Total Distance', title: 'traveled', value: '34 km 30 m' },
        { label: 'Total Time', title: 'traveled', value: '24 h 30 m' }
    ];

    const obj = {
        percentage: ['50%', '68%', '\u20B92.3K'],
        type: ['coverage', 'Productivity', 'Incentives']
    }

    return (
        <View style={{ padding: 20 }}>
            <Dropdown
                options={options}
                selected={selectedType}
                onSelect={setSelectedType}
                style={{ backgroundColor: '#007ACC' }}
                textStyle={{ color: 'white' }}
            />

            <Card style={{ marginTop: 20, alignItems: 'center', paddingVertical: 20, borderWidth: 0 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#007ACC' }}>{time}</Text>
                <Text style={{ fontSize: 18, marginTop: 5, fontWeight: 'bold' }}>{label}</Text>
                <Text style={{ color: 'gray', marginTop: 5, textAlign: 'center' }}>{description}</Text>

                <View style={{ height: 150, width: '100%', marginTop: 20 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        svg={{ fill: 'transparent' }}
                        contentInset={{ top: 10, bottom: 10 }}
                        spacingInner={0.3}
                        animate
                        yAccessor={({ item }) => item}
                    >
                        <RoundedBars />
                    </BarChart>
                    <XAxis
                        style={{ marginTop: 10 }}
                        data={data}
                        formatLabel={(value, index) => labels[index]}
                        contentInset={{ left: 15, right: 15 }}
                        svg={{ fontSize: 12, fill: 'gray' }}
                    />
                </View>
            </Card>

            <View style={{ flexDirection: 'row', justifyContent: 'space-etween', marginTop: 20 }}>
                {travelData.map(({ label, title, value }, index) => (
                    <Card
                        key={index}
                        style={{
                            flex: 1,
                            marginHorizontal: 5,
                            paddingVertical: 20,
                            alignItems: 'flex-start',
                            backgroundColor: index === 0 ? '#6a0dad' : '#007ACC',
                            borderWidth: 0
                        }}
                    >
                        <Text style={{ fontSize: 14, color: 'gray', color: 'white', }}>{label}</Text>
                        <Text style={{ fontSize: 14, color: 'gray', marginTop: 3, color: 'white' }}>{title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, color: 'white' }}>
                            {value}
                        </Text>
                    </Card>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                {obj.percentage.map((percent, index) => (
                    <Card
                        key={index}
                        style={{
                            flex: 1,
                            marginHorizontal: 5,
                            paddingVertical: 20,
                            alignItems: 'flex-start',
                            backgroundColor: '#6a0dad',  
                            borderWidth: 0,
                            borderRadius: 10,
                            paddingHorizontal: 1,
                            alignItems: 'center',
                            backgroundColor: colors[index]
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{percent}</Text>
                        <Text style={{ fontSize: 16, color: 'white', marginTop: 5 }}>{obj.type[index]}</Text>
                    </Card>
                ))}
            </View>

        </View>
    );
}
