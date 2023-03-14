import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ContactsScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: []
        }
    }

    render(){

      if (this.state.isLoading){
        return (
          <View style={styles.container}>
              <Text>This is the contacts screen</Text>
          </View>
        )
      }

    }

}


const styles = StyleSheet.create({
    container: {
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#dcf4f5',
    },
    },
    formContainer: {
  
    },
    first_name:{
      marginBottom: 5
    },
    last_name:{
      marginBottom: 5
    },
    email:{
      marginBottom: 5
    },
    password:{
      marginBottom: 10
    },
    signUpBtn:{
  
    },
    signup:{
      justifyContent: "center",
      textDecorationLine: "underline"
    },
    button: {
      marginBottom: 30,
      backgroundColor: '#2196F3'
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white'
    },
    error: {
        color: "red",
        fontWeight: '900'
    }
  });