import React from "react";
import {View,ScrollView} from 'react-native'
import { BarCharts } from "./src/components/BarChart";
import { DoughnutChart } from "./src/components/DoughnutChart";

export default function App(){
  return (
    <View>
      <ScrollView>
      <BarCharts/>
      <DoughnutChart/>
      </ScrollView>
    </View>
  )
}