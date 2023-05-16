import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';  

import LoginScreen from './src/components/login'
import SignUpScreen from './src/components/signup';
import ChatScreen from './src/components/chatHome';
import SettingsScreen from './src/components/settings';
import ContactsScreen from './src/components/contacts';
import EditProfileScreen from './src/components/editProfile';
import EditProfilePictureScreen from './src/components/editPicture';
import UpdatePicture from './src/components/updatePicture';
import HomeScreen from './src/components/homePage';
import ContactProfileScreen from './src/components/contactProfile';
import BlockedContactScreen from './src/components/blockedList';
import BlockedProfileScreen from './src/components/blockedProfile';
import CreateChatScreen from './src/components/createChat';
import ChatPageScreen from './src/components/chatPage';
import ChatInfoScreen from './src/components/chatInformation';
import EditMessageScreen from './src/components/editMessage';

const AuthTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const MainTabNav = () => {
  return (
    <AuthTab.Navigator
      initialRouteName="Chats"
      screenOptions={{headerShown: false, unmountOnBlur: true}}>
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
          initialRouteName="Home"
          screenOptions={{
            unmountOnBlur: true,
          }}
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
          <AuthStack.Screen name="Create Chat" component={CreateChatScreen} />
          <AuthStack.Screen name="Chat Page" component={ChatPageScreen} options={{headerShown: false}} />
          <AuthStack.Screen name="Chat Information" component={ChatInfoScreen} />
          <AuthStack.Screen name="Edit Message" component={EditMessageScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  };
};
