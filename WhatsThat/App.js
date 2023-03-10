import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './components/login';
import SignUpScreen from './components/signup';
import ChatScreen from './components/chatHome';
import SettingsScreen from './components/settings';

const AuthStack = createBottomTabNavigator();

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
          screenOptions={{
            headerShown: true
          }}
        >     
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
            <AuthStack.Screen name="Chat Home" component={ChatScreen} />
            <AuthStack.Screen name="Settings" component={SettingsScreen} />
          </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
