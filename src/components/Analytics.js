import React from "react";
import { View, Text } from 'react-native'
import Dropdown from "../ReusableComponents/Dropdown";

export function Analytics() {
    const data = ['Daily', 'Monthly', 'Quarterly']
    return (
        <View>
            <Dropdown
                options={data}
                selected={selectedType}
                onSelect={setSelectedType}
                style={{ backgroundColor: '#007ACC' }}
                textStyle={{ color: 'white' }}
            />
        </View>
    )
}