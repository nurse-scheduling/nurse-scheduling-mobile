import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "./src/pages/HomePage.tsx";
import HomeIcon from "./src/assets/icons/HomeIcon.tsx";
import ShiftSelect from "./src/pages/ShiftSelect.tsx";
import ChangeShiftRequest from "./src/pages/ChangeShiftRequest.tsx";
import MyProfile from "./src/pages/MyProfile.tsx";
import ShiftSelectIcon from "./src/assets/icons/ShiftSelectIcon.tsx";
import React, {useContext} from "react";
import ChangeShiftRequestIcon from "./src/assets/icons/ChangeShiftRequestIcon.tsx";
import ProfileIcon from "./src/assets/icons/ProfileIcon.tsx";
import Login from "./src/pages/Login.tsx";
import {AuthContext} from "./src/contexts/AuthContext.tsx";

const Tabs = createBottomTabNavigator();

type HomeStackParamList = {
HomePageScreen: undefined,
}
type ShiftSelectStackParamList = {
ShiftSelectScreen:undefined,
}
type ChangeShiftParamList = {
MyShifts:undefined,
ChangeShiftRequestScreen: undefined,
}

type ProfileStackParamList = {
MyProfileScreen:undefined,
}
const HomePageStack = createStackNavigator<HomeStackParamList>();
const ShiftSelectStack = createStackNavigator<ShiftSelectStackParamList>();
const ChangeShiftStack = createStackNavigator<ChangeShiftParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const HomePageStackScreen = () => (
    <HomePageStack.Navigator>
        <HomePageStack.Screen
            name="HomePageScreen"
            component={HomePage}
            options={{
                headerShown: false,
            }}
        />
    </HomePageStack.Navigator>
);
const ShiftSelectStackScreen = () => (
    <ShiftSelectStack.Navigator>
        <ShiftSelectStack.Screen
            name="ShiftSelectScreen"
            component={ShiftSelect}
            options={{
                headerShown: false,
            }}
        />
    </ShiftSelectStack.Navigator>
);

const ChangeShiftStackScreen = () => (
    <ChangeShiftStack.Navigator>
        <ChangeShiftStack.Screen
            name="ChangeShiftRequestScreen"
            component={ChangeShiftRequest}
            options={{
                headerShown: false,
            }}
        />
    </ChangeShiftStack.Navigator>
);

const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            name="MyProfileScreen"
            component={MyProfile}
            options={{
                headerShown: false,
            }}
        />
    </ProfileStack.Navigator>
);

export default function Main() {
    const {isAuth} = useContext(AuthContext);
    return (
        !isAuth? <Login/>:
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#F5F6FA",
                    borderTopWidth: 0,
                },
            }}
        >
            <Tabs.Screen
                name="HomePage"
                component={HomePageStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <HomeIcon color={color}  />
                    ),
                }}
            />
            <Tabs.Screen
                name="ShiftSelect"
                component={ShiftSelectStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <ShiftSelectIcon color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ChangeShiftRequest"
                component={ChangeShiftStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <ChangeShiftRequestIcon color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="MyProfile"
                component={ProfileStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <ProfileIcon color={color} />
                    ),
                }}/>
        </Tabs.Navigator>
    )
}
