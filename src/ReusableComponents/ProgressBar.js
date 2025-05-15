import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({ label, value }) {
  const percentage = parseInt(value.replace("%", ""), 10) || 0;

  return (
    <View style={{ marginTop: 10 }}>
      <View style={[styles.row, { justifyContent: "flex-start" }]}>
        <View style={styles.targetAchievedContainer}>
          <Text style={styles.dataText}>{label}:</Text>
          <Text style={[styles.dataValue, { marginLeft: 5 }]}>{value}</Text>
        </View>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  targetAchievedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  dataText: { fontSize: 14, color: "#333" },
  dataValue: { fontSize: 14, color: "#555", fontWeight: "bold" },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 6,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "red",
    borderRadius: 5,
  },
});
