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

    editProfileNavigate = () => {
        this.props.navigation.navigate("Edit Profile")
    }

    editProfilePictureNavigate = () => {
        this.props.navigation.navigate("Edit Profile Picture")
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
                this.props.navigation.navigate("Home")
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

                    <View style={styles.editProfileBtn}>
                        <TouchableOpacity onPress={this.editProfileNavigate}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.editProfileBtn}>
                        <TouchableOpacity onPress={this.editProfilePictureNavigate}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Edit Profile Picture</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.logoutBtn}>
                        <TouchableOpacity onPress={this._logout}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
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
    formContainer: {
        marginTop: 80
    },
    email:{
      marginBottom: 5
    },
    password:{
      marginBottom: 10
    },
    loginbtn:{
  
    },
    logoutBtn:{
  
    },
    editProfileBtn:{

    },
    signup:{
      justifyContent: "center",
      textDecorationLine: "underline"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 10
    },
    error: {
        color: "red",
        fontWeight: '900'
    }
  });