import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class HomeScreen extends Component {

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', async () => {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        });
      };
  
    componentWillUnmount(){
        this.unsubscribe();
    };
    
    loginNavigate = () => {
        this.props.navigation.navigate("Login");
    };

    signUpNavigate = () => {
        this.props.navigation.navigate("Sign Up");
    };

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
    };
};
