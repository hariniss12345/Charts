import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from "react-native";
import Card from "../ReusableComponents/Card";
import { useNavigation } from "@react-navigation/native";

export function AllOrders() {
    const navigation = useNavigation()
    const data = [
        {
            img1: require("../assets/images/img.jpg"),
            img2: require("../assets/images/NavySeal.jpg"),
            title: "Order Placed on 12 Jul, 2024",
            subtitle: "Delivery Expected by 20 Jul, 2024",
            amount: "\u20B93.14 L",
            button: 'Placed'
        },
        {
            img1: require("../assets/images/img.jpg"),
            img2: require("../assets/images/NavySeal.jpg"),
            title: "Order Placed on 12 Jul, 2024",
            subtitle: "Delivery Expected by 20 Jul, 2024",
            amount: "\u20B95 L",
            button: 'Placed'
        },
        {
            img1: require("../assets/images/img.jpg"),
            img2: require("../assets/images/NavySeal.jpg"),
            title: "Order Placed on 12 Jul, 2024",
            subtitle: "Delivery Expected by 20 Jul, 2024",
            amount: "\u20B92 L",
            button: 'Delivered'
        },
    ];

    const statusColors = {
        placed: '#00b7a2',
        delivered: '#7bcd12',
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollcontainer}>
                    <Text style={styles.text}>All Orders</Text>

                    {data.map((ele, index) => (
                        <Card key={index} style={{ borderColor: '#beddee', borderWidth: 1 }}>
                            <View style={styles.imageRow}>
                                <View style={styles.imageContainer}>
                                    <Image source={ele.img1} style={styles.image} />
                                </View>
                                <View style={[styles.imageContainer, { marginRight: 0 }]}>
                                    <Image source={ele.img2} style={styles.image} />
                                </View>
                                <View style={[
                                    styles.statusButton,
                                    { backgroundColor: statusColors[ele.button.toLowerCase()] || '#00b7a2' }
                                ]}>
                                    <Text style={styles.statusButtonText}>
                                        {ele.button.charAt(0).toUpperCase() + ele.button.slice(1)}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.title}>{ele.title}</Text>
                            <View style={styles.detailsRow}>
                                <Text style={styles.subtitle}>{ele.subtitle}</Text>
                                <Text style={styles.amount}>{ele.amount}</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('OrderDetails')}>
                                <Image source={require('../assets/icons/rightarrow.png')} style={styles.arrowIcon} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.actionRow}>
                                {ele.button.toLowerCase() === 'delivered' && (
                                    <>
                                        <TouchableOpacity
                                            style={styles.actionItem}
                                            onPress={() => Alert.alert("Reorder pressed")}
                                        >
                                            <Text style={styles.details}>REORDER</Text>
                                        </TouchableOpacity>
                                        <View style={styles.verticalLine} />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.actionItem}
                                    onPress={() => Alert.alert("View Details pressed")}
                                >
                                    <Text style={styles.details}>VIEW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.newOutletButton}
                        onPress={() => Alert.alert("Place New Order pressed")}
                    >
                        <Text style={styles.newOutletText}>Place New Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,

    },
    container: {
        paddingHorizontal: 10,
        flex: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 20,
    },
    imageRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
        borderColor: '#b5bbbe',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        overflow: 'hidden',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        resizeMode: 'contain',
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 2,
        color: '#0088c8',
    },
    amount: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 15
    },
    statusButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginTop: -50,
    },
    statusButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
        marginRight: 10,
        marginTop: 10,
    },
    details: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#0088c8',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        zIndex: 10,
    },
    newOutletButton: {
        backgroundColor: '#0088c8',
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 10,
    },
    newOutletText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollcontainer: {
        paddingBottom: 120,
    },
    arrowIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 5
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionItem: {
        paddingHorizontal: 10,
    },
    verticalLine: {
        width: 2,
        height: 20,
        backgroundColor: '#ccc',
        marginHorizontal: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
});
