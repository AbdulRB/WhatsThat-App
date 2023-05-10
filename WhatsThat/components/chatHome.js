import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChatScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: []
        }
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.checkLoggedIn();
      });

      this.getData();
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    getData = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://localhost:3333/api/1.0.0/search", {
        'headers': {
          'X-Authorization': value
        }
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        }
        else if(response.status === 401){
          this.props.navigation.navigate("Login");
        }
        else{
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }

    checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      if (value == null) {
        this.props.navigation.navigate("Login");
      }
    };

    render(){

      if (!this.state.isLoading){
        return (
          <View style={styles.container}>
              <Text>This is the chat home screen</Text>
          </View>
        )
      }

    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#dcf4f5',
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