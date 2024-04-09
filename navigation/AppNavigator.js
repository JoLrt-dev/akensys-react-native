import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu1Screen from "../screens/Menu1Screen";
import Menu2Screen from "../screens/Menu2Screen";
import Menu3Screen from "../screens/Menu3Screen";
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu1" component={Menu1Screen} />
      <Tab.Screen name="Menu2" component={Menu2Screen} />
      <Tab.Screen name="Menu3" component={Menu3Screen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
