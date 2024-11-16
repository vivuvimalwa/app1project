import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from "react-native";
import Welcomescreen from '../component1/welcomescreen';
import HomeScreen from '../component1/home';
import  RecipeDetail from './Recipedetail'
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');
const Stack = createStackNavigator()

function DrawerNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Welcomescreen"
            screenOptions={{
                drawerStyle: {
                    width: width, // Set drawer width to full screen
                },
                headerShown: false // Hide the header
            }}
        >
            <Stack.Screen name="Welcomescreen" component={Welcomescreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
    );
}   

export default DrawerNavigator;

{/*
    
    <Stack.Navigator
            initialRouteName="Welcomescreen"
            screenOptions={{
                drawerStyle: {
                    width: width, // Set drawer width to full screen
                },
                headerShown: false // Hide the header
            }}
        >
            <Stack.Screen name="Welcomescreen" component={Welcomescreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
    
    */}