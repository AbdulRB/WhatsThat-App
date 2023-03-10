import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SettingsScreen extends Component {

    constructor(props){
        super(props);

        // this.state = {
        //     email: "",
        //     password: "",
        //     error: "", 
        //     submitted: false
        // }

        this._logout = this._logout.bind(this)
    }

    async _logout(){
        console.log("Logout")

        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: "POST",
            headers: {
                "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then(async (response) => {
            if(response.status === 200){
                await AsyncStorage.removeItem("@session_token")
                await AsyncStorage.removeItem("@user_id")
                this.props.navigation.navigate("Login")
            }
            else if(response.status === 401){
                console.log("Unauthorised")
                await AsyncStorage.removeItem("@session_token")
                await AsyncStorage.removeItem("@user_id")
                this.props.navigation.navigate("Login")
            }
            else{
                throw "Something went wrong"
            }
        })
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"submitted": false});
        })

    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.signUpbtn}>
                        <TouchableOpacity onPress={this._logout}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </> */}
                </View>
            </View>
        )
    }



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "80%",
      alignItems: "stretch",
      justifyContent: "center"
    },
    formContainer: {
  
    },
    email:{
      marginBottom: 5
    },
    password:{
      marginBottom: 10
    },
    loginbtn:{
  
    },
    signUpbtn:{
  
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