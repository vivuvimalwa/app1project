import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from './firebase'
import { useEffect } from "react";

export default function Home({ navigation }) {

    useEffect(() => {
        // Check if the user is authenticated
        if (!auth.currentUser) {
            navigation.replace('login');  // Redirect to login if not authenticated
        }
    }, []);


    const handleSingOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('login')
            })
            .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleSingOut} >
                <Text style={{ color: '#ffff', fontWeight: '500' }}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#0b83e6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },

})