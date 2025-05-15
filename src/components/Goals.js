import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const dropDown = {
    type: ['Quarterly', 'Monthly', 'Annually']
};

const data = [
    {
        title: 'Old Arrack Original',
        subtitle: 'Arrack',
        description: '750ml (Pack of 6)',
        dataSets: [
            { label: 'Target', value: '300 units' },
            { label: 'Achieved', value: '220 units' }
        ],
        target: [
            { label: 'Target Achieved', value: '73%' }
        ]
    }
];

export function Goals() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState("Monthly");


    const handleToggleDropdown = useCallback(() => {
        setShowDropdown(prev => !prev);
    }, []);

    const handleSelect = useCallback((item) => {
        setSelectedType(item);
        setShowDropdown(false);
    }, []);

    const getPercentage = useCallback((percentString) => {
        return parseInt(percentString.replace('%', ''), 10) || 0;
    }, []);

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={handleToggleDropdown} style={styles.card}>
                <Text style={styles.cardText}>{selectedType}</Text>
                {showDropdown ? (
                    <Image
                        source={require('../assets/icons/ChevronDown.png')}
                        style={styles.icon}
                    />
                ) : (
                    <Image
                        source={require('../assets/icons/Shape.png')}
                        style={styles.icon}
                    />
                )}
            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdownCard}>
                    {dropDown.type.map((item) => (
                        <TouchableOpacity key={item} onPress={() => handleSelect(item)} style={styles.dropdownItem}>
                            <Text style={styles.dropdownText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.dataCard}>
                {data.map((ele, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                        <Text style={styles.title}>{ele.title}</Text>
                        <Text style={styles.subtitle}>{ele.subtitle}</Text>
                        <Text style={styles.description}>{ele.description}</Text>

                        {/* Labels row */}
                        <View style={styles.row}>
                            {ele.dataSets.map((d, i) => (
                                <Text key={i} style={[styles.dataText, styles.flexItem]}>
                                    {d.label}
                                </Text>
                            ))}
                        </View>

                        {/* Values row */}
                        <View style={styles.row}>
                            {ele.dataSets.map((d, i) => (
                                <Text key={i} style={[styles.dataValue, styles.flexItem]}>
                                    {d.value}
                                </Text>
                            ))}
                        </View>

                        {ele.target && ele.target.map((t, i) => {
                            const percentage = getPercentage(t.value);
                            return (
                                <View key={i} style={{ marginTop: 10 }}>
                                    <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                                        <View style={styles.targetAchievedContainer}>
                                            <Text style={styles.dataText}>{t.label}:</Text>
                                            <Text style={[styles.dataValue, { marginLeft: 5 }]}>{t.value}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.progressBarBackground}>
                                        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007ACC',
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    cardText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    dropdownCard: {
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 3,
        paddingVertical: 5,
    },
    dropdownItem: {
        padding: 15,
    },
    dropdownText: {
        fontSize: 16,
    },
    dataCard: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 20,
        marginTop: 30,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    flexItem: {
        flex: 1,
        textAlign: 'flex-start',
    },
    dataText: {
        fontSize: 14,
        color: '#333',
    },
    dataValue: {
        fontSize: 14,
        color: '#555',
        fontWeight: 'bold',
    },
    targetAchievedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 6,
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'red',
        borderRadius: 5,
    },
});
