import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from '../component1/stack';
import { SafeAreaView, View } from "react-native";
import StatusBar from '../component1/statusbar'
export default function Index() {
    return (
   
                  <DrawerNavigator />
       
    );
}
