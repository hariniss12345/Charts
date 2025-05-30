import React from "react";
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Profile } from "./src/components/Profile";
import { EditProfile } from "./src/components/EditProfile";
import { BarCharts } from "./src/components/BarChart";
import { DoughnutChart } from "./src/components/DoughnutChart";
import { Goals } from "./src/components/Goals";
import { Products } from "./src/components/Products";
import { OrderSummary } from "./src/components/OrderSummary";
import { Analytics } from "./src/components/Analytics";
import { ViewDetails } from "./src/components/ViewDetails";
import { MyRetailers } from "./src/components/MyRetailers";
import { AllOrders } from "./src/components/AllOrders";
import { OrderDetails } from "./src/components/OrderDetails";
import { UpdateChecklist } from "./src/components/UpdateChecklist";
import { UpdateChecklist1 } from "./src/components/UpdateChecklist1";
import { OrderSummary1 } from "./src/components/OrderSummary1";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />  */}
          {/* <Stack.Screen name="Products" component={Products}/>
          <Stack.Screen name="ViewDetails" component={ViewDetails}/>  */}
          {/* <Stack.Screen name="MyRetailers" component={MyRetailers}/> */}
          {/* <Stack.Screen name="AllOrders" component={AllOrders}/>
          <Stack.Screen name="OrderDetails" component={OrderDetails}/> */}
          <Stack.Screen name="UpdateChecklist" component={UpdateChecklist} />
          <Stack.Screen name="UpdateChecklist1" component={UpdateChecklist1} />
          {/* <Stack.Screen name="OrderSummary" component={OrderSummary}/>
          <Stack.Screen name="OrderSummary1" component={OrderSummary1} /> */}

        </Stack.Navigator>
      </NavigationContainer>

      {/* <BarCharts /> */}
      {/* <DoughnutChart /> */}
      {/* <Goals />  */}

      {/* <OrderSummary /> */}
      {/* <Analytics/> */}
    </View>
  );
}
