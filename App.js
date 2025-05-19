import React from "react";
import {View,ScrollView} from 'react-native'
import { BarCharts } from "./src/components/BarChart";
import { DoughnutChart } from "./src/components/DoughnutChart";
import { Goals  } from "./src/components/Goals";
import { EditProfile, Profile } from "./src/components/EditProfile";
import { Products } from "./src/components/Products";
import { OrderSummary } from "./src/components/OrderSummary";

export default function App(){
  return (
    <View>
      <ScrollView>
      {/* <BarCharts/>
      <DoughnutChart/> */}
      {/* <Goals/> */}
      <EditProfile/>
      {/* <Products/> */}
      {/* <OrderSummary/>  */}
      </ScrollView>
    </View>
  )
}