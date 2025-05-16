import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import QuantitySelector from "../ReusableComponents/QuantitySelector";
import Card from "../ReusableComponents/Card";



export function OrderSummary() {
    const data = [
        {
            title: "Governor Choice",
            subtitle: "Arrack",
            description: "750ml (Pack of 6)",
        },
        {
            title: "Navy Seal",
            subtitle: "Arrack",
            description: "750ml (Pack of 6)",
        },
    ];

    const bill = [
        { label: "Item Total", value: "\u20B93,04,500" },
        { label: "Discount", value: "-\u20B910,000" },
        { label: "Tax", value: "\u20B920,000" },
        { label: "Bill Total", value: "\u20B93,14,500" },
    ];

    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (index, newQty) => {
        setQuantities((prev) => ({ ...prev, [index]: newQty }));
    };

    return (
        <View style={styles.container}>
          <Card>
                <Text style={styles.heading}>Order Summary</Text>
                {data.map((ele, index) => (
                    <View key={index}>
                        <View style={styles.row}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{ele.title}</Text>
                                <Text style={styles.subtitle}>{ele.subtitle}</Text>
                                <Text style={styles.description}>{ele.description}</Text>
                            </View>
                            <QuantitySelector
                                initialQuantity={quantities[index] || 0}
                                onChange={(qty) => handleQuantityChange(index, qty)}
                            />
                        </View>
                    </View>
                ))}
                <Card style={{backgroundColor:'#007ACC'}}>
                <Text style={{color:'white'}}>12 Bottles of Budweiser Magnum Cans added with this product</Text>
                </Card>
            </Card>

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
                    />
                    <Image
                        source={require('../assets/icons/Shape.png')}
                        style={styles.inputIcon}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Select outlet"
                        style={styles.inputWithIcon}
                        placeholderTextColor="#999"
                    />
                    <Image
                        source={require('../assets/icons/Shape.png')}
                        style={styles.inputIcon}
                    />
                </View>
            </Card>
        </View>
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
        marginBottom: 20,
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
        position: 'relative',
        marginBottom: 12,
    },
    inputWithIcon: {
        height: 48,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 10,
        paddingLeft: 12,
        paddingRight: 40,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#000',
    },
    inputIcon: {
        position: 'absolute',
        right: 12,
        top: 14,
        width: 20,
        height: 20,
        objectFit: 'contain',
    },
});
