import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';


export function Profile() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigation = useNavigation()

    const data = {
        username: "Aman Gupta",
        role: "Sales Associate",
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image
                        source={require("../assets/icons/profile.png")}
                        style={styles.profileImage}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{data.username}</Text>
                        <Text style={styles.role}>{data.role}</Text>
                        <TouchableOpacity
                            style={styles.edit}
                            onPress={() => navigation.navigate("EditProfile")}
                        >
                            <Text style={styles.editText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.linkText}>Terms & Conditions</Text>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                    <Text style={styles.linkText}>Logout</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 30,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    role: {
        fontSize: 14,
        color: "gray",
        marginVertical: 4,
    },
    edit: {
        backgroundColor: "#007ACC",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 6,
        alignSelf: "flex-start",
    },
    editText: {
        color: "white",
        fontWeight: "bold",
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        fontSize: 16,
        paddingVertical: 8,
        marginBottom: 8,
    },
    linkText: {
        fontSize: 16,
        marginVertical: 10,
    },
});
