import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DataRow({ data, labelStyle, valueStyle }) {
  return (
    <View style={styles.row}>
      {data.map(({ label, value }, i) => (
        <View key={i} style={styles.flexItem}>
          <Text style={[styles.dataText, labelStyle]}>{label}</Text>
          <Text style={[styles.dataValue, valueStyle]}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  flexItem: {
    flex: 1,
    textAlign: "left",
  },
  dataText: { fontSize: 14, color: "#333" },
  dataValue: { fontSize: 14, color: "#555", fontWeight: "bold" },
});
