import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantitySelector = ({
    initialQuantity = 0,
    onChange = () => {},
}) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity); // in case parent updates initial quantity
    }, [initialQuantity]);

    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        onChange(newQty);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            onChange(newQty);
        }
    };

    return (
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecrement} disabled={quantity === 0}>
                <Text style={[styles.quantityButton, quantity === 0 && styles.disabledButton]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement}>
                <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
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
        marginHorizontal: 8,
    },
    disabledButton: {
        opacity: 0.4,
    },
});

export default QuantitySelector;
