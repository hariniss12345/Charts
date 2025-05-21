import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DataRow from "../ReusableComponents/DataRow";
import QuantitySelector from "../ReusableComponents/QuantitySelector";
import Card from "../ReusableComponents/Card";


const CATEGORY_TITLES = [
  "All Products",
  "Frequently Brought Products",
  "Focus Products",
  "New Products",
  "Offers & Promotion",
  "Free Products",
];

const PRODUCT_NAMES = ["Arrack", "Brandy", "Gin", "Whisky", "Rum"];

const PRODUCTS = [
  {
    title: "Governor Choice",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
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
    dataSets: [
      { label: "MRP", value: "\u20B93,852" },
      { label: "PTR", value: "\u20B93,200" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "200" },
    ],
  },
  {
    title: "Double Distilled",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    dataSets: [
      { label: "MRP", value: "\u20B93,852" },
      { label: "PTR", value: "\u20B93,200" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "200" },
    ],
  },
  {
    title: "Navy Seal",
    subtitle: "Arrack",
    description: "750ml (Pack of 6)",
    dataSets: [
      { label: "MRP", value: "\u20B93,852" },
      { label: "PTR", value: "\u20B93,200" },
      { label: "Margin", value: "13.78%" },
      { label: "Stock", value: "200" },
    ],
  },
];

export function Products() {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [quantities, setQuantities] = useState({});

  const handleAddClick = (index) => {
    setQuantities((prev) => ({ ...prev, [index]: 1 }));
  };

  const handleQuantityChange = (index, newQty) => {
    setQuantities((prev) => ({ ...prev, [index]: newQty }));
  };

  const calculateTotalAmount = () => {
    return PRODUCTS.reduce((total, item, index) => {
      const qty = quantities[index] || 0;
      if (qty > 0) {
        const ptr = parseInt(item.dataSets[1].value.replace(/[^\d]/g, ""));
        return total + ptr * qty;
      }
      return total;
    }, 0);
  };

  const renderCategoryButton = (item, index) => {
    const firstSpace = item.indexOf(" ");
    const first = firstSpace !== -1 ? item.slice(0, firstSpace) : item;
    const rest = firstSpace !== -1 ? item.slice(firstSpace + 1) : "";
    const isSelected = selectedTitle === item;

    return (
      <Card
        key={index}
        style={[
          styles.cardWrapper,
          isSelected && styles.selectedCard
        ]}
      >
        <TouchableOpacity onPress={() => setSelectedTitle(item)} style={styles.cardTouchable}>
          <Text style={[styles.cardText, isSelected && styles.selectedText]}>{first}</Text>
          <Text style={[styles.cardText, isSelected && styles.selectedText]}>{rest}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View>
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {CATEGORY_TITLES.map(renderCategoryButton)}
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.row, { marginTop: 40 }]}>
          {PRODUCT_NAMES.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedItem(item)}
              style={[
                styles.nameItem,
                selectedItem === item && styles.selectedNameItem,
              ]}
            >
              <Text style={styles.nameText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.separator} />

      <View style={styles.searchCard}>
        <View style={styles.searchRow}>
          <Image
            source={require("../assets/icons/Search.png")}
            style={styles.icon}
          />
          <Text style={styles.searchText}>Search</Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        {PRODUCTS.map((item, index) => (
          <Card key={index} style={{ marginBottom: 15 }}>
            <View style={styles.titleRow}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <View style={styles.inStockBadge}>
                <Text style={styles.inStockText}>In Stock</Text>
              </View>
            </View>
            <Text style={styles.productSubtitle}>{item.subtitle}</Text>
            <Text style={styles.productDesc}>{item.description}</Text>
            <DataRow data={item.dataSets} />

            {quantities[index] >= 10 && (
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

              {quantities[index] ? (
                <QuantitySelector
                  initialQuantity={1}
                  onChange={(newQty) => handleQuantityChange(index, newQty)}
                />
              ) : (
                <TouchableOpacity
                  style={[styles.actionButton, styles.addButton]}
                  onPress={() => handleAddClick(index)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
 {Object.values(quantities).some(qty => qty >= 1) && (
  <View style={styles.footer}>
    <View style={{ flex: 1 }}>
      <Text style={styles.footerAmount}>₹{calculateTotalAmount()}</Text>
      <Text style={styles.inclTaxText}>Incl. of taxes</Text>
    </View>
    <TouchableOpacity style={styles.proceedButton} onPress={()=>navigation.navigate('OrderSummary')} >
      <Text style={styles.proceedButtonText}>Proceed</Text>
    </TouchableOpacity>
  </View>
)}


    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 20,marginBottom:70},
  row: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  cardWrapper: {
    marginRight: 10,
    backgroundColor: "#E0E0E0",
    borderWidth: 0,
  },
  selectedCard: { backgroundColor: "red" },
  cardTouchable: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardText: {
    fontWeight: "600",
    fontSize: 16,
    color: "black",
  },
  selectedText: { color: "white" },
  nameItem: {
    marginHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
  },
  selectedNameItem: {
    borderBottomColor: "#007ACC",
  },
  nameText: {
    fontSize: 16,
    color: "black",
    paddingHorizontal: 20,
  },
  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    marginTop: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "black",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  productSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  productDesc: {
    fontSize: 13,
    color: "#666",
    marginVertical: 6,
  },
  discountInfo: {
    color: "#007ACC",
    marginTop: 10,
  },
  freeCard: {
    marginTop: 10,
    backgroundColor: "#007ACC",
  },
  freeCardText: {
    color: "white",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inStockBadge: {
    backgroundColor: "green",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  inStockText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007ACC",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 140,
  },
  buttonText: {
    fontSize: 14,
    color: "#007ACC",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#007ACC",
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  separator: {
    marginVertical: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: -1,
    marginLeft: 10,
  },
  totalAmountContainer: {
    marginTop: 30,
    marginBottom: 50,
    padding: 20,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007ACC",
    textAlign: "center",
  },
 footer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  backgroundColor: "#fff",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  borderTopWidth: 1,
  borderColor: "#ccc",
},

footerAmount: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
},

inclTaxText: {
  fontSize: 12,
  color: "#555",
  marginTop: 4,
},

proceedButton: {
  backgroundColor: "#007ACC",
  paddingVertical: 10,
  paddingHorizontal: 40,
  borderRadius: 12,
},

proceedButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},

});
