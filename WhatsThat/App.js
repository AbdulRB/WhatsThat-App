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
import EditProfilePictureScreen from './components/editPicture';
import UpdatePicture from './components/updatePicture';
import HomeScreen from './components/homePage';
import ContactProfileScreen from './components/contactProfile';
import BlockedContactScreen from './components/blockedList';
import BlockedProfileScreen from './components/blockedProfile';


const AuthTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const MainTabNav = () => {
  return (
    <AuthTab.Navigator
      initialRouteName='Contacts'
      screenOptions={{headerShown: false}}>
      <AuthTab.Screen name="Chats" component={ChatScreen} />
      <AuthTab.Screen name="Contacts" component={ContactsScreen} />
      <AuthTab.Screen name="Settings" component={SettingsScreen} />
    </AuthTab.Navigator>
  );
};

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
          initialRouteName="Tab Nav"
          >
          <AuthStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
          <AuthStack.Screen name="Tab Nav" component={MainTabNav} options={{headerShown: false}} />
          <AuthStack.Screen name="Edit Profile" component={EditProfileScreen} />
          <AuthStack.Screen name="Edit Profile Picture" component={EditProfilePictureScreen} />
          <AuthStack.Screen name="Update Picture" component={UpdatePicture} />
          <AuthStack.Screen name="Contact Profile" component={ContactProfileScreen} />
          <AuthStack.Screen name="Blocked Contacts" component={BlockedContactScreen} />
          <AuthStack.Screen name="Blocked Profile" component={BlockedProfileScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  };
};
