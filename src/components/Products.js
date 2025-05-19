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
import QuantitySelector from "../ReusableComponents/QuantitySelector";
import Card from "../ReusableComponents/Card";
import { useNavigation } from "@react-navigation/native";


export function Products() {
    const navigation = useNavigation()
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

    const [quantity, setQuantity] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);

    const handleAddClick = () => {
        setIsAdded(true);
        setQuantity(1);
    };

    return (
        <ScrollView style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                    {data.title.map((item, index) => {
                        const firstSpaceIndex = item.indexOf(" ");
                        const firstWord = firstSpaceIndex !== -1 ? item.slice(0, firstSpaceIndex) : item;
                        const rest = firstSpaceIndex !== -1 ? item.slice(firstSpaceIndex + 1) : "";
                        const isSelected = selectedTitle === item;

                        return (<Card key={index} style={{ backgroundColor: selectedTitle === item ? "red" : "#E0E0E0", marginRight: 10, borderWidth: 0 }}>
                            <TouchableOpacity onPress={() => setSelectedTitle(item)} className="flex-col justify-center items-center px-3 py-2">
                                <Text style={{ fontWeight: '600', fontSize: 16, color: selectedTitle === item ? 'white' : 'black' }}>
                                    {firstWord}
                                </Text>
                                <Text style={{ fontWeight: '600', fontSize: 16, color: selectedTitle === item ? 'white' : 'black' }}>
                                    {rest}
                                </Text>

                            </TouchableOpacity>
                        </Card>

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
                            <Text style={styles.nameText}>{item}</Text>
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

                        {isAdded && (
                            <Text style={{ color: "#007ACC", marginTop: 10 }}>
                                Add 10 quantity to get a discount 10% on total item bill
                            </Text>
                        )}

                        {selectedTitle === "Free Products" && (
                            <Card style={{marginTop:10,backgroundColor:'#007ACC'}}>
                            <Text style={{ color: 'white' }}>
                                Get 12 Bottles of Budweiser Magnum Cans free with every 6 packs.
                            </Text>
                            </Card>
                        )}


                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('ViewDetails')}>
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
                                <QuantitySelector
                                    initialQuantity={0}
                                    onChange={(newQty) => setQuantity(newQty)}
                                />
                            )}
                        </View>
                    </Card>
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
        flexWrap: "wrap",
    },
    cardWrapper: {
        marginRight: 10,
    },
    selectedCard: {
        backgroundColor: "red",
    },
    firstLine: {
        color: "black",
        fontSize: 12,
        textAlign: "center",
    },
    secondLine: {
        color: "black",
        fontSize: 12,
        textAlign: "center",
    },
    selectedText: {
        color: "white",
    },
    nameItem: {
        marginHorizontal: 10,
        paddingBottom: 5,
        borderBottomWidth: 4,
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
    separator: {
        marginVertical: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: -1,
        marginLeft: 10
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inStockBadge: {
        backgroundColor: 'green',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    inStockText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },

});
