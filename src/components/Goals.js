import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Dropdown from "../ReusableComponents/Dropdown";
import DataRow from "../ReusableComponents/DataRow";
import ProgressBar from "../ReusableComponents/ProgressBar";

const DROPDOWN_TYPES = ['Quarterly', 'Monthly', 'Annually'];

const sampleData = [
  {
    title: "Old Arrack Original",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    dataSets: [
      { label: "Target", value: "300 units" },
      { label: "Achieved", value: "220 units" },
    ],
    target: [{ label: "Target Achieved", value: "73%" }],
  },
];

export function Goals() {
  const [selectedType, setSelectedType] = useState("Monthly");

  return (
    <View style={styles.container}>
      <Dropdown
        options={DROPDOWN_TYPES}
        selected={selectedType}
        onSelect={setSelectedType}
      />

      <View style={styles.dataCard}>
        {sampleData.map(({ title, subtitle, description, dataSets, target }, i) => (
          <View key={i} style={{ marginBottom: 15 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>

            <DataRow
              data={dataSets.map(({ label }) => ({ label, value: "" }))}
              labelStyle={styles.dataText}
              valueStyle={{ display: "none" }}
            />
            <DataRow
              data={dataSets.map(({ value }) => ({ label: "", value }))}
              labelStyle={{ display: "none" }}
              valueStyle={styles.dataValue}
            />

            {target?.map(({ label, value }, i) => (
              <ProgressBar key={i} label={label} value={value} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 20 },
  dataCard: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 5 },
  description: { fontSize: 14, color: "#666", marginBottom: 10 },
  dataText: { fontSize: 14, color: "#333" },
  dataValue: { fontSize: 14, color: "#555", fontWeight: "bold" },
});
