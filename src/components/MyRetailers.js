import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import Card from '../ReusableComponents/Card'

export function MyRetailers() {
    const data = [
        {
            img: require('../assets/icons/retailers.png'),
            name: 'Kapruka',
            address: 'No. 147, Kottawa Road, Nugegoda, Sri Lanka',
            phone_no: '+91 9876532110',
            route: 'Nugegoda'
        },
        {
            img: require('../assets/icons/retailers.png'),
            name: 'Wine World (Main Store)',
            address: 'No. 102 and 104, Kumaran Ratnam Road, Colombo 00200, Sri Lanka',
            phone_no: '+91 9876532110',
            route: 'Kumaran Ratnam Road'
        },
        {
            img: require('../assets/icons/retailers.png'),
            name: 'Victory Stores',
            address: 'George R. De Silva Mawatha, Colombo 01300, Sri Lanka',
            phone_no: '+91 9876532110',
            route: 'De Silva Mawatha'
        }
    ]

    const type = ['Recently Added', 'Past Retailers']
    const [selectedItem, setSelectedItem] = useState('Recently Added');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.text}>My Retailers</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={[styles.row, { marginTop: 40 }]}>
                        {type.map((item, index) => (
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

                {data.map((ele, index) => (
                    <Card style={styles.card} key={index}>
                        <View style={styles.retailerContainer}>
                            <View style={styles.rowContainer}>
                                <Image source={ele.img} style={styles.img} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{ele.name}</Text>
                                    <Text style={styles.address}>{ele.address}</Text>
                                </View>
                            </View>

                            <Text style={styles.space}>
                                Phone no: <Text style={styles.boldText}>{ele.phone_no}</Text>
                            </Text>
                            <Text style={styles.space}>
                                Route: <Text style={styles.boldText}>{ele.route}</Text>
                            </Text>

                            <View style={styles.separator} />
                            <Text style={styles.viewDetails}>View Details</Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.newOutletButton}>
                    <Text style={styles.newOutletText}>New Outlet</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        overflow: 'visible'
    },
    scrollContent: {
        paddingBottom: 100,
    },
    text: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    retailerContainer: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    address: {
        fontSize: 14,
        color: '#555',
    },
    card: {
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#b5d9ec',
        borderWidth: 1,
        marginTop: 20,
        paddingBottom: -10
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 10,
        marginTop:-1
    },
    viewDetails: {
        fontWeight: 'bold',
        color: '#0088c8',
        fontSize: 16,
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        zIndex: 10
    },
    newOutletButton: {
        backgroundColor: '#0088c8',
        paddingVertical: 12,
        paddingHorizontal: 130,
        borderRadius: 10,
    },
    newOutletText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    space: {
        paddingTop: 10,
        paddingBottom: 5
    },
    img: {
        width: 45,
        height: 45
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
        marginLeft: 10,
    },
    nameItem: {
        paddingVertical: 5,
        marginRight: 20,
    },
    selectedNameItem: {
        borderBottomColor: "#007ACC",
        borderBottomWidth: 5,
        paddingBottom: 5,
        marginLeft:10
    },
    nameText: {
        fontSize: 17,
        color: "black",
        paddingHorizontal: 20,
    },
});
