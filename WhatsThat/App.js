import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';  

import LoginScreen from './components/login';
import SignUpScreen from './components/signup';
import ChatScreen from './components/chatHome';
import SettingsScreen from './components/settings';
import ContactsScreen from './components/contacts';
import EditProfileScreen from './components/editProfile';
import HomeScreen from './components/homePage';

const AuthTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const MainTabNav = () => {
  return (
    <AuthTab.Navigator
      initialRouteName='Settings'
      screenOptions={{headerShown: false}}>
      <AuthTab.Screen name="Chats" component={ChatScreen} />
      <AuthTab.Screen name="Contacts" component={ContactsScreen} />
      <AuthTab.Screen name="Settings" component={SettingsScreen} />
    </AuthTab.Navigator>
  );
}

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        {/* <AuthTab.Navigator
          screenOptions={{
            headerShown: true
          }}
        >     
            <AuthTab.Screen name="Login" component={LoginScreen} />
            <AuthTab.Screen name="Sign Up" component={SignUpScreen} />
            <AuthTab.Screen name="Chat Home" component={ChatScreen} />
            <AuthTab.Screen name="Contacts" component={ContactsScreen} />
            <AuthTab.Screen name="Settings" component={SettingsScreen} />
        </AuthTab.Navigator> */}

        <AuthStack.Navigator
          initialRouteName="Home"
          >
          <AuthStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
          <AuthStack.Screen name="Tab Nav" component={MainTabNav} options={{headerShown: false}} />
          <AuthStack.Screen name="Edit Profile" component={EditProfileScreen} />
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
