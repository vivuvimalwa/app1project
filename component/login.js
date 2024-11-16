import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  // Import the auth object

export default function LoginForm({ navigation }) {


    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('home')
            }
        })
        return unsubscribed
    }, [])

    // Handle form submission
    const handleRegister = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredentials) => {
                console.log('Register in with:', userCredentials.user.email);
                // Optionally navigate or perform other actions
                navigation.replace('login')
            })
            .catch((error) => alert(error.message));
    };
    const handleLogin = (values, { resetForm }) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('logged in with:', user.email);
                resetForm()

            })
            .catch(error => alert(error.message))
    };
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLogin}

            >
                {({ handleBlur, handleChange, handleSubmit, values }) => (
                    <View style={styles.container1}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            placeholder="Enter your email"
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        <Text style={styles.label}>Password:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Enter your password"
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            value={values.password}
                        />
                        <View style={[styles.buttonlogin, { backgroundColor: '#038cfc' }]}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text style={styles.textbutton}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.buttonlogin, { backgroundColor: '#ffff' }]}>
                            <TouchableOpacity onPress={() => handleRegister(values)}>
                                <Text style={[styles.textbutton, { color: '#038cfc' }]}>Register</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </Formik>
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
    },
    container1: {
        paddingHorizontal: 15,
        shadowColor: '#000',
        elevation: 10,
        padding: 35,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    buttonlogin: {
        width: '80%',
        marginLeft: '10%',
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#038cfc',
        borderWidth: 1,
    },
    textbutton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});
