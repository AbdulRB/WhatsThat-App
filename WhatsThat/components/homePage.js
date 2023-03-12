import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';

export default class HomeScreen extends Component {

    _loginNavigate = () => {
        this.props.navigation.navigate("Login")
    }

    _signUpNavigate = () => {
        this.props.navigation.navigate("Sign Up")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>WhatsThat</Text>

                <TouchableOpacity onPress={this._loginNavigate}>
                    <View style={styles.loginBtn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._signUpNavigate}>
                    <View style={styles.signUpBtn}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>

            </View>


        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#dcf4f5',
    },
    title: {
        paddingTop: 130,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 45,
        fontWeight: 'bold',
    },
    formContainer: {

    },
    first_name: {
        marginBottom: 5
    },
    last_name: {
        marginBottom: 5
    },
    email: {
        marginBottom: 5
    },
    password: {
        marginBottom: 10
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        marginHorizontal: 60,
        padding: 10,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
    },
    signUpBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginHorizontal: 60,
        marginBottom: 40,
        padding: 10,
        backgroundColor: '#15b0b3',
        borderRadius: 7
    },
    signup: {
        justifyContent: "center",
        textDecorationLine: "underline"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        padding: 30,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    error: {
        color: "red",
        fontWeight: '900'
    }
});