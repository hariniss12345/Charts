import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import DataRow from "../ReusableComponents/DataRow";

export function Products() {
    const data = {
        title: [
            "All Products",
            "Frequently Brought Products",
            "Focus Products",
            "New Products",
            "Offers & Promotion",
            "Free Products",
        ],
        name: ["Arrack", "Brandy", "Gin", "Whisky", "Rum"],
    };

    const product = [
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
    ];

    const [quantity, setQuantity] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddClick = () => {
        setIsAdded(true);
        setQuantity(1);
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        } else {
            setIsAdded(false);
            setQuantity(0);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                    {data.title.map((item, index) => {
                        const firstSpaceIndex = item.indexOf(" ");
                        const firstWord = firstSpaceIndex !== -1 ? item.slice(0, firstSpaceIndex) : item;
                        const rest = firstSpaceIndex !== -1 ? item.slice(firstSpaceIndex + 1) : "";
                        return (
                            <View key={index} style={styles.card}>
                                <Text style={styles.firstLine}>{firstWord}</Text>
                                <Text style={styles.secondLine}>{rest}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[styles.row, { marginTop: 40 }]}>
                    {data.name.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedItem(item)}
                            style={[
                                styles.nameItem,
                                selectedItem === item && styles.selectedNameItem,
                            ]}
                        >
                            <Text style={styles.nameText}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.separator} />

            <View style={styles.searchCard}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={require("../assets/icons/Search.png")}
                        style={styles.icon}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 16, color: "#333" }}>Search</Text>
                </View>
            </View>

            <View style={{ marginTop: 30 }}>
                {product.map((item, index) => (
                    <View key={index} style={styles.productCard}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productSubtitle}>{item.subtitle}</Text>
                        <Text style={styles.productDesc}>{item.description}</Text>
                        <DataRow data={item.dataSets} />

                        {isAdded && (
                            <Text style={{ color: "#007ACC", marginTop: 10 }}>
                                Add 10 quantity to get a discount 10% on total item bill
                            </Text>
                        )}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.buttonText}>View Details</Text>
                            </TouchableOpacity>

                            {!isAdded ? (
                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: '#007ACC' }]}
                                    onPress={handleAddClick}
                                >
                                    <Text style={[styles.buttonText, { color: 'white' }]}>Add</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={handleDecrement}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{quantity}</Text>
                                    <TouchableOpacity onPress={handleIncrement}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#D3D3D3",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginRight: 10,
        width: 120,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    firstLine: {
        color: "black",
        fontSize: 12,
    },
    secondLine: {
        color: "black",
        fontSize: 12,
        textAlign: "center",
    },
    nameItem: {
        marginHorizontal: 10,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    selectedNameItem: {
        borderBottomColor: '#007ACC',
    },
    nameText: {
        fontSize: 16,
        color: "black",
        paddingHorizontal: 20,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: "black",
    },
    searchCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        elevation: 3,
        marginTop: 20,
    },
    productCard: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 4,
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
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 140,
    },
    buttonText: {
        fontSize: 14,
        color: "#007ACC",
        fontWeight: "600",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: "#007ACC",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
    },
    quantityButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007ACC",
        paddingHorizontal: 8,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    separator: {
        marginVertical: 15,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
    },
});
