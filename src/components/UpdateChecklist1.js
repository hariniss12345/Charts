import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Modal } from "react-native";
import Dropdown from "../ReusableComponents/Dropdown";
import Card from "../ReusableComponents/Card";
import { useNavigation } from "@react-navigation/native";

export function UpdateChecklist1() {
    const navigation = useNavigation();

    const data = ["Cooler", "Posters", "Shelf Strips"];

    const defaultChecklist = [
        {
            title: 'Cooler Cleanliness',
            img: require('../assets/icons/Dismiss_Square.png'),
            active: false
        },
        {
            title: 'Display of Rockland Products',
            img: require('../assets/icons/Dismiss_Square.png'),
            active: false
        },
        {
            title: 'Correct Placement of Price Tags',
            img: require('../assets/icons/Dismiss_Square.png'),
            active: false
        }
    ];

    const [merchandiseSections, setMerchandiseSections] = useState([]);
    const [showCard, setShowCard] = useState(false);

    const handleAddClick = () => {
        if (merchandiseSections.length < data.length) {
            setMerchandiseSections(prev => [
                ...prev,
                {
                    selectedItem: "Select",
                    checklist: [...defaultChecklist],
                }
            ]);
        }
    };

    const handleDropdownSelect = (index, value) => {
        const updatedSections = [...merchandiseSections];
        updatedSections[index].selectedItem = value;
        if (value === "Cooler") {
            updatedSections[index].checklist = [...defaultChecklist];
        } else {
            updatedSections[index].checklist = [];
        }
        setMerchandiseSections(updatedSections);
    };

    const toggleChecklistItem = (sectionIndex, itemIndex) => {
        const updatedSections = [...merchandiseSections];
        const checklist = updatedSections[sectionIndex].checklist;
        checklist[itemIndex].active = !checklist[itemIndex].active;
        setMerchandiseSections(updatedSections);
    };

    const isAnyChecklistItemActive = merchandiseSections.some(section =>
        section.checklist?.some(item => item.active)
    );

    const handleSaveClick = () => {
        if (isAnyChecklistItemActive) {
            setShowCard(true);
        }
    };

    const closeCard = () => {
        setShowCard(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.heading}>Rockland Merchandise Checklist</Text>

                    {merchandiseSections.map((section, index) => (
                        <View key={index} style={styles.dropdownContainer}>
                            <Text style={styles.label}>Merchandise Type</Text>
                            <Dropdown
                                options={data}
                                selected={section.selectedItem}
                                onSelect={(value) => handleDropdownSelect(index, value)}
                            />

                            {section.selectedItem === "Cooler" && (
                                <>
                                    <Text style={styles.subHeading}>Checklist</Text>
                                    {section.checklist.map((item, itemIndex) => (
                                        <View key={itemIndex} style={styles.row}>
                                            <Text style={styles.itemText}>{item.title}</Text>
                                            <View style={styles.iconGroup}>
                                                <TouchableOpacity onPress={() => toggleChecklistItem(index, itemIndex)}>
                                                    <Image
                                                        source={
                                                            item.active
                                                                ? require('../assets/icons/checkbox.png')
                                                                : require('../assets/icons/Checkmark_Square.png')
                                                        }
                                                        style={styles.icon}
                                                    />
                                                </TouchableOpacity>
                                                <Image source={item.img} style={styles.icon} />
                                            </View>
                                        </View>
                                    ))}

                                    <Text style={styles.subHeading}>Images</Text>
                                    <Card>
                                        <View style={styles.cardContent}>
                                            <Image
                                                source={require('../assets/icons/camera.png')}
                                                style={styles.cardIcon}
                                            />
                                            <Text style={styles.cardText}>Click to capture a photo</Text>
                                            <Text style={styles.cardText}>
                                                It is mandatory to update for attendance purpose.
                                            </Text>
                                        </View>
                                    </Card>
                                </>
                            )}
                        </View>
                    ))}

                    <TouchableOpacity
                        style={[
                            styles.addButton,
                            merchandiseSections.length >= data.length && styles.addButtonDisabled
                        ]}
                        onPress={handleAddClick}
                        disabled={merchandiseSections.length >= data.length}
                    >
                        <View style={styles.row}>
                            <Image
                                source={require('../assets/icons/add.png')}
                                style={[
                                    styles.add,
                                    merchandiseSections.length >= data.length && { tintColor: '#ccc' }
                                ]}
                            />
                            <Text
                                style={[
                                    styles.buttonText,
                                    merchandiseSections.length >= data.length && { color: '#ccc' }
                                ]}
                            >
                                Add Merchandise
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            isAnyChecklistItemActive && styles.saveButtonActive
                        ]}
                        onPress={handleSaveClick}
                        activeOpacity={isAnyChecklistItemActive ? 0.7 : 1}
                    >
                        <Text style={[
                            styles.saveText,
                            isAnyChecklistItemActive && styles.saveTextActive
                        ]}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={showCard}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={closeCard}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.centeredCard}>
                            <Text style={styles.cardTitle}>Merchandise Details Updated</Text>
                            <Text style={styles.cardDescription}>
                                Your Rockland merchandise information has been submitted. You will get the updated list.
                            </Text>
                            <Image source={require('../assets/icons/solid_check.png')} style={styles.cardIconSmall} />
                            <TouchableOpacity
                                style={styles.cardContinueButton}
                                onPress={() => navigation.navigate("UpdateChecklist")}
                            >
                                <Text style={styles.cardContinueText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingBottom: 80,
        marginHorizontal: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 30
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 30,
    },
    addButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 8,
        alignSelf: 'center',
        borderColor: '#B5D9EC',
        borderWidth: 1,
        marginTop: 20,
    },
    addButtonDisabled: {
        borderColor: '#ccc',
        backgroundColor: '#f5f5f5'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    iconGroup: {
        flexDirection: 'row',
        gap: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 8,
    },
    add: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: '#0088C8',
    },
    buttonText: {
        color: '#0088C8',
        fontSize: 16,
        fontWeight: '500',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    cardIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    cardText: {
        textAlign: 'center',
        marginBottom: 4,
    },
    saveButton: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 140,
        borderRadius: 8,
        alignSelf: 'center',
        borderColor: '#B5BBBE',
        borderWidth: 1,
    },
    saveButtonActive: {
        backgroundColor: '#0088C8',
        borderColor: '#0088C8',
    },
    saveText: {
        color: '#B5BBBE',
        fontSize: 16,
        fontWeight: '600',
    },
    saveTextActive: {
        color: 'white',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    cardContinueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#0088C8',
        borderRadius: 10,
        paddingHorizontal: 80,
        paddingVertical: 10,
    },
    cardIconSmall: {
        width: 50,
        height: 50,
        marginRight: 8,
        marginLeft: 10
    },
    cardContinueText: {
        fontWeight: '600',
        marginTop: 8,
        color: 'white',
        fontSize: 16
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredCard: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
