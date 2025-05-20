import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";

// Dummy DataRow component - replace with your actual DataRow
const DataRow = ({ data }) => (
  <View style={{ flexDirection: "row", marginTop: 8 }}>
    {data.map((item, idx) => (
      <View key={idx} style={{ marginRight: 15 }}>
        <Text style={{ fontWeight: "bold" }}>{item.label}:</Text>
        <Text>{item.value}</Text>
      </View>
    ))}
  </View>
);

// Dummy QuantitySelector - replace with your actual component
const QuantitySelector = ({ initialQuantity, onChange }) => {
  const [qty, setQty] = useState(initialQuantity);

  const increment = () => {
    setQty(qty + 1);
    onChange(qty + 1);
  };

  const decrement = () => {
    if (qty > 0) {
      setQty(qty - 1);
      onChange(qty - 1);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={decrement} style={styles.qtyButton}>
        <Text style={styles.qtyButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 10 }}>{qty}</Text>
      <TouchableOpacity onPress={increment} style={styles.qtyButton}>
        <Text style={styles.qtyButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const PRODUCTS = [
  {
    title: "Governor Choice",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    image: require("../assets/images/old_arrack.png"), 
    dataSets: [
      { label: "MRP", value: "\u20B94,000" },
      { label: "PTR", value: "\u20B93,280" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "113" },
    ],
  },
  {
    title: "Ceylon Arrack",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    image: require("../assets/images/old_arrack.png"),
    dataSets: [
      { label: "MRP", value: "\u20B93,852" },
      { label: "PTR", value: "\u20B93,200" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "200" },
    ],
  },
  {
    title: "Burmah Premium",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    image: require("../assets/images/old_arrack.png"),
    dataSets: [
      { label: "MRP", value: "\u20B94,080" },
      { label: "PTR", value: "\u20B93,350" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "23" },
    ],
  },
  {
    title: "Ron Barceló",
    subtitle: "Rum",
    description: "750ml (Pack of 6)",
    image: require("../assets/images/old_arrack.png"),
    dataSets: [
      { label: "MRP", value: "\u20B94,980" },
      { label: "PTR", value: "\u20B93,880" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "30" },
    ],
  },
];

const YourComponent = ({ navigation }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("Free Products");

  const handleAddClick = () => {
    setIsAdded(true);
    setQuantity(1);
  };

  return (
    <View style={{ padding: 15 }}>
      {PRODUCTS.map((item, index) => (
        <Card key={index} style={styles.card}>
          <View style={styles.productRow}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.inStockBadge}>
                  <Text style={styles.inStockText}>In Stock</Text>
                </View>
              </View>
              <Text style={styles.productSubtitle}>{item.subtitle}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
              <DataRow data={item.dataSets} />
            </View>
          </View>

          {isAdded && (
            <Text style={styles.discountInfo}>
              Add 10 quantity to get a discount 10% on total item bill
            </Text>
          )}

          {selectedTitle === "Free Products" && (
            <Card style={styles.freeCard}>
              <Text style={styles.freeCardText}>
                Get 12 Bottles of Budweiser Magnum Cans free with every 6 packs.
              </Text>
            </Card>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("ViewDetails")}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>

            {!isAdded ? (
              <TouchableOpacity
                style={[styles.actionButton, styles.addButton]}
                onPress={handleAddClick}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <QuantitySelector
                initialQuantity={quantity}
                onChange={(newQty) => setQuantity(newQty)}
              />
            )}
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    padding: 15,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  productInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inStockBadge: {
    backgroundColor: "green",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  inStockText: {
    color: "white",
    fontSize: 12,
  },
  productSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  productDesc: {
    fontSize: 14,
    marginTop: 4,
  },
  discountInfo: {
    color: "red",
    marginTop: 10,
    fontWeight: "600",
  },
  freeCard: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    padding: 10,
  },
  freeCardText: {
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1e90ff",
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  qtyButton: {
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default YourComponent;
