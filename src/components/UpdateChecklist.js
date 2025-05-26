import React, { use, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Card from '../ReusableComponents/Card';
import { useNavigation } from '@react-navigation/native';

export function UpdateChecklist() {
    const navigation = useNavigation()
    const [checkedItems, setCheckedItems] = useState({});

    const data = [
        {
            img: require('../assets/images/cooler.png'),
            title: 'Cooler',
            quantity: { label: 'Quantity', value: 2 },
        },
        {
            img: require('../assets/images/posters.png'),
            title: 'Posters',
            quantity: { label: 'Quantity', value: 5 },
        },
        {
            img: require('../assets/images/shelf.png'),
            title: 'Shelf Strips',
            quantity: { label: 'Quantity', value: 1 },
        },
    ];

    const toggleCheckbox = (title) => {
        setCheckedItems((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.heading}>Rockland Merchandise</Text>

                {data.map((ele, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <View style={styles.row}>
                            <Image source={ele.img} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{ele.title}</Text>
                                <Text style={styles.quantity}>
                                    {ele.quantity.label}: {ele.quantity.value}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => toggleCheckbox(ele.title)}
                                style={styles.checkbox}
                            >
                                <Image
                                    source={
                                        checkedItems[ele.title]
                                            ? require('../assets/icons/Checkmark_Square.png')
                                            : require('../assets/icons/checkbox.png')
                                    }
                                    style={styles.checkboxImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("UpdateChecklist1")}>
                        <Text style={styles.buttonText}>Update Checklist</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10,
    },
    card: {
        borderColor: '#B5D9EC',
        borderWidth: 1
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#DBDBDB',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    quantity: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    checkbox: {
        paddingLeft: 10,
    },
    checkboxImage: {
        width: 24,
        height: 24,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 90,
        borderRadius: 8,
        borderColor: '#B5D9EC',
        borderWidth: 1
    },
    buttonText: {
        color: '#0088C8',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
