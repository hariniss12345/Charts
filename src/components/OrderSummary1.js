import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Pressable,
} from "react-native";
import Card from "../ReusableComponents/Card";
import { useNavigation } from "@react-navigation/native";

export function OrderSummary1({ route }) {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const totalAmount = route.params;

    const bill = [
        { label: "Item Total", value: "\u20B93,04,500" },
        { label: "Discount", value: "-\u20B910,000" },
        { label: "Tax", value: "\u20B920,000" },
        { label: "Bill Total", value: `\u20B9${totalAmount}` },
    ];

    const paymentMethods = [
        { method: "Credit line", subtitle: "₹3,00,000" },
        { method: "Payment Gateway" },
        { method: "Cash on Delivery" }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Card style={styles.card}>
                    <Text style={styles.heading}>Choose a payment method</Text>
                    {paymentMethods.map((item, index) => (
                        <Card key={index} style={{ borderColor: '#f6f6f6', backgroundColor: '#f6f6f6f', marginBottom: 8 }}>
                            <Pressable
                                style={styles.radioOption}
                                onPress={() => setSelectedMethod(item.method)}
                            >
                                <View style={styles.radioCircle}>
                                    {selectedMethod === item.method && (
                                        <View style={styles.radioInnerCircle} />
                                    )}
                                </View>
                                <View style={styles.methodRow}>
                                    <Text style={styles.radioLabel}>{item.method}</Text>
                                    {item.subtitle && (
                                        <Text style={styles.methodValue}>{item.subtitle}</Text>
                                    )}
                                </View>

                            </Pressable>
                        </Card>
                    ))}
                </Card>

                <Card style={styles.card}>
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

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.footerLeft}>
                    <Text style={styles.totalAmount}>₹{totalAmount}</Text>
                    <Text style={styles.inclTaxesText}>Incl. of taxes</Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        !selectedMethod && { backgroundColor: "#ccc" },
                    ]}
                    onPress={() =>
                        navigation.navigate("OrderConfirmation", {
                            totalAmount,
                            selectedMethod,
                        })
                    }
                    disabled={!selectedMethod}
                >
                    <Text style={styles.paymentButtonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    heading: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    billHeading: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: '#4A4A4A'
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
    footerContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    footerLeft: {
        flexDirection: "column",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    inclTaxesText: {
        fontSize: 12,
        color: "#555",
    },
    paymentButton: {
        backgroundColor: "#0088C8",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    paymentButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#007ACC",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    radioInnerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#007ACC",
    },
    radioLabel: {
        fontSize: 16,
        color: "#333",
    },
    subtitleText: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
    card: {
        borderColor: '#B5D9EC',
        borderWidth: 1
    },
    methodRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    methodValue: {
        fontSize: 14,
        color: "#000",
    },

});
