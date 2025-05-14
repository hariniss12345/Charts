import React from 'react';
import { View, Text as RNText } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Circle, Text } from 'react-native-svg';

export function DoughnutChart() {
  const data = [
    {
      key: 1,
      amount: 20,
      svg: { fill: 'red', stroke: 'none' },
      label: 'Rockland',
    },
    {
      key: 2,
      amount: 80,
      svg: { fill: '#87CEEB', stroke: 'none' },
      label: 'Other Competitors',
    },
  ];

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const DoughnutCenter = ({ centerX, centerY }) => (
    <G>
      <Circle cx={centerX} cy={centerY} r={50} fill="white" />
    </G>
  );

  const Labels = ({ slices }) =>
    slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      const percentage = ((data.amount / total) * 100).toFixed(0);

      return (
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={14}
          fontWeight="bold"
        >
          {percentage}%
        </Text>
      );
    });

  const Legend = () => (
    <View style={{ marginRight: 20 }}>
      {data.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: item.svg.fill,
              marginRight: 8,
            }}
          />
          <RNText style={{ fontSize: 14 }}>{item.label}</RNText>
        </View>
      ))}
    </View>
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 200 }}>
      <Legend />
      <PieChart
        style={{ height: 200, width: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        padAngle={0}
        outerRadius={'100%'}
        innerRadius={'50%'}
        startAngle={0}
        endAngle={Math.PI * 2}
      >
        <DoughnutCenter />
        <Labels />
      </PieChart>
    </View>
  );
}
