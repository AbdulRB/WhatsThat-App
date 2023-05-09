import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class SettingsScreen extends Component {

    constructor(props){
        super(props);

        // this.state = {
        //     email: "",
        //     password: "",
        //     error: "", 
        //     submitted: false
        // }

        this.logout = this.logout.bind(this)
    }

    editProfileNavigate = () => {
        this.props.navigation.navigate("Edit Profile")
    }

    editProfilePictureNavigate = () => {
        this.props.navigation.navigate("Edit Profile Picture")
    }

    async logout(){
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

                    <View>
                        <TouchableOpacity onPress={this.editProfileNavigate}>
                            <View style={styles.settingButtons}>
                                <Text style={styles.buttonText}>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.editProfilePictureNavigate}>
                            <View style={styles.settingButtons}>
                                <Text style={styles.buttonText}>Edit Profile Picture</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity>
                            <View style={styles.settingButtons}>
                                <Text style={styles.buttonText}>View Blocked List</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.logout}>
                            <View style={styles.settingButtons}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
};