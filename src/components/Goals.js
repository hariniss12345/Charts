import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Dropdown from "../ReusableComponents/Dropdown";
import DataRow from "../ReusableComponents/DataRow";
import ProgressBar from "../ReusableComponents/ProgressBar";
import Card from "../ReusableComponents/Card";

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
  {
    title: "Old Arrack Extra Strong",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    dataSets: [
      { label: "Target", value: "400 units" },
      { label: "Achieved", value: "150 units" },
    ],
    target: [{ label: "Target Achieved", value: "39%" }],
  },
  {
    title: "Rockland E5",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    dataSets: [
      { label: "Target", value: "500 units" },
      { label: "Achieved", value: "250 units" },
    ],
    target: [{ label: "Target Achieved", value: "50%" }],
  },
];

const overallData = {
  target: { label: 'Target', value: '1 Crore' },
  achieved: { label: 'Achieved', value: '50 Lakh' },
  progress: [{ label: 'Target Achieved', value: '50%' }]
};

const goalImages = {
  goal1: require("../assets/icons/goal1.png"),
  goal2: require("../assets/icons/goal2.png"),
};

const oldArrackImage = require("../assets/images/old_arrack.png"); 

export function Goals() {
  const [selectedType, setSelectedType] = useState("Monthly");

  const renderTargetCards = () => (
    <View style={styles.rowCards}>
      <Card style={[styles.halfCard, { backgroundColor: 'purple' }]}>
        <Image source={goalImages.goal1} style={styles.goalImage} />
        <DataRow
          data={[overallData.target]}
          labelStyle={[styles.dataText, { color: 'white' }]}
          valueStyle={[styles.dataValue, { color: 'white' }]}
        />
      </Card>
      <Card style={[styles.halfCard, { backgroundColor: 'green' }]}>
        <Image source={goalImages.goal2} style={styles.goalImage} />
        <DataRow
          data={[overallData.achieved]}
          labelStyle={[styles.dataText, { color: 'white' }]}
          valueStyle={[styles.dataValue, { color: 'white' }]}
        />
      </Card>
    </View>
  );

  const renderProductCards = () =>
    sampleData.map(({ title, subtitle, description, dataSets, target }, i) => (
      <Card key={i} style={styles.innerCard}>
        <View style={styles.titleRow}>
          <Image source={oldArrackImage} style={styles.productImage} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        <DataRow
          data={dataSets.map(({ label }) => ({ label, value: "" }))}
          labelStyle={styles.dataText}
          valueStyle={{ height: 0, opacity: 0 }}
        />
        <DataRow
          data={dataSets.map(({ value }) => ({ label: "", value }))}
          labelStyle={{ height: 0, opacity: 0 }}
          valueStyle={styles.dataValue}
        />

        {target?.map(({ label, value }, idx) => (
          <ProgressBar key={idx} label={label} value={value} />
        ))}
      </Card>
    ));

  return (
    <View style={styles.container}>
      <ScrollView>
        <Dropdown
          options={DROPDOWN_TYPES}
          selected={selectedType}
          onSelect={setSelectedType}
          style={{ backgroundColor: '#007ACC' }}
          textStyle={{ color: 'white' }}
        />

        <Card style={{ borderWidth: 0, marginTop: 20 }}>
          <Text style={styles.headerTitle}>Target VS Achievement</Text>
          {renderTargetCards()}
          {overallData.progress.map(({ label, value }, idx) => (
            <ProgressBar key={idx} label={label} value={value} />
          ))}
        </Card>

        <Card style={{ borderWidth: 0, marginTop: 20 }}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Product Target</Text>
            <Text style={styles.headerLink}>View All</Text>
          </View>
          {renderProductCards()}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  dataText: {
    fontSize: 14,
    color: "#333",
  },
  dataValue: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  headerLink: {
    fontSize: 14,
    color: '#007ACC',
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfCard: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 0,
    alignItems: 'center',
  },
  innerCard: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 0,
  },
  goalImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
    marginRight: 80,
  },
});
