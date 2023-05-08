import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import styles from '../style';

export default class HomeScreen extends Component {

    loginNavigate = () => {
        this.props.navigation.navigate("Login")
    }

    signUpNavigate = () => {
        this.props.navigation.navigate("Sign Up")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.homeTitle}>WhatsThat</Text>

                <TouchableOpacity onPress={this.loginNavigate}>
                    <View style={styles.homeLoginBtn}>
                        <Text style={styles.homeButtonText}>Login</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.signUpNavigate}>
                    <View style={styles.homeSignUpBtn}>
                        <Text style={styles.homeButtonText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>

            </View>


        )
    }
};
