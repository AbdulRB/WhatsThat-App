import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class SettingsScreen extends Component {

    constructor(props){
        super(props);

        this.logout = this.logout.bind(this)
    };

    editProfileNavigate = () => {
        this.props.navigation.navigate("Edit Profile");
    };

    editProfilePictureNavigate = () => {
        this.props.navigation.navigate("Edit Profile Picture");
    };

    viewBlockedContactsNavigate = () => {
        this.props.navigation.navigate("Blocked Contacts");
    };

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
                const keys = await AsyncStorage.getAllKeys();
                await AsyncStorage.multiRemove(keys);
                this.props.navigation.navigate("Login")
            }
            else if(response.status === 401){
                console.log("Unauthorised")
                const keys = await AsyncStorage.getAllKeys();
                await AsyncStorage.multiRemove(keys);
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
    };

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
                        <TouchableOpacity onPress={this.viewBlockedContactsNavigate}>
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
    };
};