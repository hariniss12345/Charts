import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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

function Dropdown({ options, selected, onSelect }) {
    const [visible, setVisible] = useState(false);

    const toggle = () => setVisible(!visible);
    const handleSelect = (item) => {
        onSelect(item);
        setVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={toggle} style={styles.card}>
                <Text style={styles.cardText}>{selected}</Text>
                <Image
                    source={
                        visible
                            ? require("../assets/icons/ChevronDown.png")
                            : require("../assets/icons/Shape.png")
                    }
                    style={styles.icon}
                />
            </TouchableOpacity>

            {visible && (
                <View style={styles.dropdownCard}>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleSelect(item)}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </>
    );
}

function DataRow({ data, labelStyle, valueStyle }) {
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

function ProgressBar({ label, value }) {
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
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007ACC",
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    cardText: { flex: 1, fontSize: 18, color: "white" },
    icon: { width: 30, height: 30, resizeMode: "contain", tintColor: "white" },
    dropdownCard: {
        marginTop: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        elevation: 3,
        paddingVertical: 5,
    },
    dropdownItem: { padding: 15 },
    dropdownText: { fontSize: 16 },
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
    targetAchievedContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
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
