import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Dropdown from "../ReusableComponents/Dropdown";

const data = {
    type: ["Mr", "Mrs"],
};

export function EditProfile() {
    const [salutation, setSalutation] = useState("");

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/icons/profile.png")}
                    style={styles.profileImage}
                />
                <Image
                    source={require("../assets/icons/plus.png")}
                    style={styles.plusIcon}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Salutation</Text>
                <Dropdown
                    options={data.type}
                    selected={salutation || "Select"}
                    onSelect={setSalutation}
                    style={styles.dropdown}
                    textStyle={styles.dropdownButtonText}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput placeholder="Enter first name" style={styles.input} />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput placeholder="Enter last name" style={styles.input} />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    style={styles.input}
                />
            </View>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 230,
        marginTop: 20,
    },
    plusIcon: {
        width: 30,
        height: 30,
        position: "absolute",
        right: 120,
        bottom: 5,
        marginRight: 120,
    },
    formGroup: {
        marginBottom: 15,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    dropdownButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: "black",
    },
    saveButton: {
        backgroundColor: "white",
        marginTop: 150,
        marginHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
    },
    saveButtonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },

});
