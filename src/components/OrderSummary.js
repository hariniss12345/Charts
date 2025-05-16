import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import QuantitySelector from "../ReusableComponents/QuantitySelector";
import Card from "../ReusableComponents/Card";

export function OrderSummary() {
  const data = [
    { title: "Governor Choice", subtitle: "Arrack", description: "750ml (Pack of 6)" },
    { title: "Navy Seal", subtitle: "Arrack", description: "750ml (Pack of 6)" },
  ];

  const bill = [
    { label: "Item Total", value: "\u20B93,04,500" },
    { label: "Discount", value: "-\u20B910,000" },
    { label: "Tax", value: "\u20B920,000" },
    { label: "Bill Total", value: "\u20B93,14,500" },
  ];

  const obj = {
    route: ['ABC', 'BCA', 'CAB', 'DEF'],
    outlet: ['GHI', 'HIG', 'GIH', 'JKL'],
  };

  const [quantities, setQuantities] = useState({});
  const [showCardForRoute, setShowCardForRoute] = useState(false);
  const [showCardForOutlet, setShowCardForOutlet] = useState(false);

  const [routeInput, setRouteInput] = useState("");
  const [outletInput, setOutletInput] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState(obj.route);
  const [filteredOutlets, setFilteredOutlets] = useState(obj.outlet);

  const handleQuantityChange = (index, newQty) => {
    setQuantities((prev) => ({ ...prev, [index]: newQty }));
  };

  const onRouteInputChange = (text) => {
    setRouteInput(text);
    const filtered = obj.route.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRoutes(filtered);
    if (!showCardForRoute) setShowCardForRoute(true);
  };

  const onOutletInputChange = (text) => {
    setOutletInput(text);
    const filtered = obj.outlet.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOutlets(filtered);
    if (!showCardForOutlet) setShowCardForOutlet(true);
  };

  const selectRoute = (value) => {
    setRouteInput(value);
    setShowCardForRoute(false);
  };

  const selectOutlet = (value) => {
    setOutletInput(value);
    setShowCardForOutlet(false);
  };

  const renderOrderItem = ({ item, index }) => (
    <View key={index}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <QuantitySelector
          initialQuantity={quantities[index] || 0}
          onChange={(qty) => handleQuantityChange(index, qty)}
        />
      </View>
    </View>
  );

  const ListHeader = () => (
    <Card>
      <Text style={styles.heading}>Order Summary</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <QuantitySelector
            initialQuantity={quantities[index] || 0}
            onChange={(qty) => handleQuantityChange(index, qty)}
          />
        </View>
      ))}
      <Card style={{ backgroundColor: "#007ACC", marginTop: 16 }}>
        <Text style={{ color: "white" }}>
          12 Bottles of Budweiser Magnum Cans added with this product
        </Text>
      </Card>
    </Card>
  );

  const ListFooter = () => (
    <>
      <Card>
        <Text style={styles.billHeading}>Bill Summary</Text>
        {bill.map((item, idx) => {
          const isDiscount = item.label === "Discount";
          const isTotal = item.label === "Bill Total";
          return (
            <View key={idx} style={styles.billRow}>
              <Text
                style={[
                  styles.billLabel,
                  isDiscount && styles.discountText,
                  isTotal && styles.totalText,
                ]}
              >
                {item.label}
              </Text>
              <Text
                style={[
                  styles.billValue,
                  isDiscount && styles.discountText,
                  isTotal && styles.totalText,
                ]}
              >
                {item.value}
              </Text>
            </View>
          );
        })}
      </Card>

      <Card>
        <Text style={styles.heading}>Select an outlet</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Select your route"
            style={styles.inputWithIcon}
            placeholderTextColor="#999"
            value={routeInput}
            onChangeText={onRouteInputChange}
          />
          <TouchableOpacity
            onPress={() => setShowCardForRoute((prev) => !prev)}
            style={styles.inputIconTouchable}
          >
            <Image
              source={require("../assets/icons/Shape.png")}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        {showCardForRoute && (
          <Card style={{ padding: 10, marginBottom: 16, maxHeight: 150 }}>
            {filteredRoutes.length > 0 ? (
              <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 150 }}>
                {filteredRoutes.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => selectRoute(item)}
                    style={{ paddingVertical: 8 }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text>No routes found</Text>
            )}
          </Card>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Select outlet"
            style={styles.inputWithIcon}
            placeholderTextColor="#999"
            value={outletInput}
            onChangeText={onOutletInputChange}
          />
          <TouchableOpacity
            onPress={() => setShowCardForOutlet((prev) => !prev)}
            style={styles.inputIconTouchable}
          >
            <Image
              source={require("../assets/icons/Shape.png")}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        {showCardForOutlet && (
          <Card style={{ padding: 10, maxHeight: 150 }}>
            {filteredOutlets.length > 0 ? (
              <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 150 }}>
                {filteredOutlets.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => selectOutlet(item)}
                    style={{ paddingVertical: 8 }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text>No outlets found</Text>
            )}
          </Card>
        )}
      </Card>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={[]} // data is rendered manually in ListHeader
      keyExtractor={(item, index) => index.toString()}
      renderItem={null}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "black",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#555",
  },
  billHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 15,
    color: "#333",
  },
  billValue: {
    fontSize: 15,
    color: "#000",
  },
  discountText: {
    color: "#007ACC",
  },
  totalText: {
    fontWeight: "bold",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 12,
  },
  inputWithIcon: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 40,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  inputIconTouchable: {
    position: "absolute",
    right: 12,
    top: 14,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
