import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu1Screen from "../screens/Menu1Screen";
import Menu2Screen from "../screens/Menu2Screen";
import Menu3Screen from "../screens/Menu3Screen";

const Tab = createBottomTabNavigator();

const AppNavigator = ({ token }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu1">
        {(props) => <Menu1Screen {...props} token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Menu2">
        {(props) => <Menu2Screen {...props} token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Menu3">
        {(props) => <Menu3Screen {...props} token={token} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
