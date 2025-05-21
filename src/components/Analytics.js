import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Dropdown from "../ReusableComponents/Dropdown";
import Card from "../ReusableComponents/Card";
import { BarChart, XAxis } from "react-native-svg-charts";
import { Rect } from "react-native-svg";

export function Analytics() {
  const [selectedType, setSelectedType] = useState("Daily");
  const options = ["Daily", "Monthly", "Quarterly"];
  const colors = ["#87CEEB", "#007ACC", "#6699cc"];

  const dataByType = {
    Daily: {
      time: "12h 30m",
      label: "Daily Average",
      description: "Average time you spent per day on all tasks.",
    },
    Monthly: {
      time: "320h",
      label: "Monthly Average",
      description: "Average time you spent per month on all tasks.",
    },
    Quarterly: {
      time: "980h",
      label: "Quarterly Average",
      description: "Average time you spent per quarter on all tasks.",
    },
  };

  const chartData = {
    Daily: {
      data: [17, 20, 13, 25, 22, 10],
      labels: ["27 Jun", "28 Jun", "29 Jun", "30 Jun", "1 Jul", "Today"],
    },
    Monthly: {
      data: [120, 140, 100, 160],
      labels: ["Feb", "Mar", "Apr", "May"],
    },
    Quarterly: {
      data: [300, 450, 400],
      labels: ["Q1", "Q2", "Q3"],
    },
  };

  const { data, labels } = chartData[selectedType];
  const { time, label, description } = dataByType[selectedType];

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
    { label: "Total Distance", title: "traveled", value: "34 km 30 m" },
    { label: "Total Time", title: "traveled", value: "24 h 30 m" },
  ];

  const obj = {
    percentage: ["50%", "68%", "\u20B92.3K"],
    type: ["Coverage", "Productivity", "Incentives"],
  };

  const renderTravelCards = () => (
    <View style={styles.cardRow}>
      {travelData.map(({ label, title, value }, index) => (
        <Card
          key={index}
          style={[
            styles.travelCard,
            { backgroundColor: index === 0 ? "#6a0dad" : "#007ACC" },
          ]}
        >
          <Text style={styles.cardText}>{label}</Text>
          <Text style={[styles.cardText, { marginTop: 3 }]}>{title}</Text>
          <Text style={styles.cardValue}>{value}</Text>
        </Card>
      ))}
    </View>
  );

  const renderPercentageCards = () => (
    <View style={styles.cardRow}>
      {obj.percentage.map((percent, index) => (
        <Card
          key={index}
          style={[styles.percentCard, { backgroundColor: colors[index] }]}
        >
          <Text style={styles.percentText}>{percent}</Text>
          <Text style={styles.percentLabel}>{obj.type[index]}</Text>
        </Card>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Dropdown
        options={options}
        selected={selectedType}
        onSelect={setSelectedType}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
      />

      <Card style={styles.summaryCard}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.descriptionText}>{description}</Text>

        <View style={styles.chartContainer}>
          <BarChart
            style={{ flex: 1 }}
            data={data}
            svg={{ fill: "transparent" }}
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
            svg={{ fontSize: 12, fill: "gray" }}
          />
        </View>
      </Card>

      {renderTravelCards()}
      {renderPercentageCards()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dropdown: {
    backgroundColor: "#007ACC",
  },
  dropdownText: {
    color: "white",
  },
  summaryCard: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 20,
    borderWidth: 0,
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007ACC",
  },
  labelText: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "gray",
    marginTop: 5,
    textAlign: "center",
  },
  chartContainer: {
    height: 150,
    width: "100%",
    marginTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  travelCard: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    alignItems: "flex-start",
    borderWidth: 0,
  },
  cardText: {
    fontSize: 14,
    color: "white",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "white",
  },
  percentCard: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 1,
  },
  percentText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  percentLabel: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});
