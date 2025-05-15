import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Dropdown({ options, selected, onSelect }) {
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

const styles = StyleSheet.create({
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
});
