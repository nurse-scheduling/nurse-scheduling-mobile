import React from "react";
import Login from "./src/pages/Login.tsx";
import { createStackNavigator } from "@react-navigation/stack";

export default function AuthStack() {
  const RedirectStack = createStackNavigator();
  return (
    <RedirectStack.Navigator>
      <RedirectStack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      >
        {() => <Login />}
      </RedirectStack.Screen>
    </RedirectStack.Navigator>
  );
}
