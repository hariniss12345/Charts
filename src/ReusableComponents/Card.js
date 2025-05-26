import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children, style }) => {
    return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#007ACC',
        
    },
});

export default Card;
