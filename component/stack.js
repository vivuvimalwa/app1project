import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import LoginForm from "./login";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "./firebase";

export default function MyStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                component={LoginForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    headerRight: () => (
                        <View style={styles.round}>
                            <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 24 }}>
                                {auth.currentUser?.email[0].toLocaleUpperCase()}
                            </Text>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    round: {
        top: 0,
        right: 0,
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: '#0b83e6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginRight: 10, // Add some margin to adjust the position inside the header
    },
});
