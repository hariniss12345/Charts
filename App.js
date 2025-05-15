import React from "react";
import {View,ScrollView} from 'react-native'
import { BarCharts } from "./src/components/BarChart";
import { DoughnutChart } from "./src/components/DoughnutChart";
import { Goals  } from "./src/components/Goals";
import { Profile } from "./src/components/Profile";
import { Products } from "./src/components/Products";

export default function App(){
  return (
    <View>
      <ScrollView>
      {/* <BarCharts/>
      <DoughnutChart/> */}
      {/* <Goals/> */}
      {/* <Profile/> */}
      <Products/>
      </ScrollView>
    </View>
  )
}