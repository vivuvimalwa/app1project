import React, { useEffect } from "react";
import {  Text, View, Image } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

function Welcomescreen() {
    const image = require('../assets/fonts/plate.png');
    const amberColor = '#f59e0b';
    const whiteOpacity = 'rgba(255, 255, 255, 0.2)';

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);
    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = withSpring(hp(5));
        ring2padding.value = withSpring(hp(5.5));
        setTimeout(() => navigation.navigate('Home'), 2500);
    }, []);

    const ring1Style = useAnimatedStyle(() => ({
        padding: ring1padding.value,
    }));

    const ring2Style = useAnimatedStyle(() => ({
        padding: ring2padding.value,
    }));

    return (
       
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: amberColor }}>

<StatusBar style="light"  backgroundColor="#f59e0b"/>
<Animated.View style={[{ backgroundColor: whiteOpacity, borderRadius: 9999 }, ring2Style]}>
    <Animated.View style={[{ backgroundColor: whiteOpacity, borderRadius: 9999 }, ring1Style]}>
        <Image source={image} style={{ width: hp(20), height: hp(20) }} />
    </Animated.View>
</Animated.View>
<View style={{ alignItems: 'center', marginTop: 20 }}>
    <Text style={{ fontSize: hp(7), color: 'white', fontWeight: 'bold' }}>Foody</Text>
    <Text style={{ color: 'white', fontSize: hp(2), fontWeight: '500', letterSpacing: 1.5 }}>Food is always right</Text>
</View>
</View>
    
        
    );
}

export default Welcomescreen;



