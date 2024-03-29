import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as EmailValidator from 'email-validator';
import { Base64 } from 'js-base64';
import styles from '../style';

export default class EditProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sendFirstName: "",
            sendLastName: "",
            sendEmail: "",
            
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",

            error: "",
            success: "",
            submitted: false,
            isLoading: true,
            listData: {}
        }
    };

    componentDidMount() {
        this.getUserInformation();
      };

    getUserInformation = async () => {
        const currentUserId = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/" + currentUserId, {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
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
    };

    updateUserInformation = async () => {
        this.setState({submitted: true})
        this.setState({error: ""})

        let currentFirstName = this.state.listData.first_name;
        let currentLastName = this.state.listData.last_name;
        let currentEmail = this.state.listData.email;
        let securePassword = await AsyncStorage.getItem('currentPassword');
        let currentPassword = Base64.decode(securePassword);

        const NAME_REGEX = new RegExp("^[a-zA-Z\s]*$")
        if(this.state.first_name === ""){
            currentFirstName = this.state.listData.first_name;
        }
        else if(!NAME_REGEX.test(this.state.first_name)){
            this.setState({error: "Invalid first name, please try again..."})
            return;
        }
        else{
            currentFirstName = this.state.first_name;
        }

        if(this.state.last_name === ""){
            currentLastName = this.state.listData.last_name;
        }
        else if(!NAME_REGEX.test(this.state.last_name)){
            this.setState({error: "Invalid surname, please try again..."})
            return;
        }
        else{
            currentLastName = this.state.last_name;
        }

        if(this.state.email === ""){
            currentEmail = this.state.listData.email;
        }
        else if(!EmailValidator.validate(this.state.email)){
            this.setState({error: "Invalid email, please try again..."})
            return;
        }
        else{
            currentEmail = this.state.email;
        }

        const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(this.state.password === ""){
            currentPassword = await AsyncStorage.getItem('currentPassword');
        }
        else if(!PASSWORD_REGEX.test(this.state.password)){
            this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
            return;
        }
        if(this.state.password !== this.state.confirmPassword){
            this.setState({error: "Passwords do not match, please try again..."})
            return;
        }
        else{
            currentPassword = this.state.password;
        }

        let to_send = {
            first_name: currentFirstName,
            last_name: currentLastName,
            email: currentEmail,
            password: currentPassword,
        }
        const currentUserId = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/" + currentUserId, {
            method: 'PATCH',
            headers: {
                'X-Authorization': await AsyncStorage.getItem("@session_token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => {
            if(response.status === 200){
                this.getUserInformation();
            }
            else if(response.status === 400){
                throw "Invalid details, please try again";
            }
            else{
                throw "Something went wrong";
            }
        })
        .then(() => {
            console.log("Current user details updated")
            this.setState({"success": "User details updated"});
            this.setState({"submitted": false});
        })
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"submitted": false});
        })
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <View style={styles.first_name}>
                        <Text style={styles.text}>First Name:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            placeholder={this.state.listData.first_name}
                            onChangeText={first_name => this.setState({ first_name })}
                            defaultValue={this.state.first_name}
                        />
                    </View>

                    <View style={styles.last_name}>
                        <Text style={styles.text}>Surname:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            placeholder={this.state.listData.last_name}
                            onChangeText={last_name => this.setState({ last_name })}
                            defaultValue={this.state.last_name}
                        />
                    </View>


                    <View style={styles.email}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            placeholder={this.state.listData.email}
                            onChangeText={email => this.setState({ email })}
                            defaultValue={this.state.email}
                        />
                    </View>

                    <View style={styles.password}>
                        <Text style={styles.text}>Password:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            placeholder="Enter password..."
                            onChangeText={password => this.setState({ password })}
                            defaultValue={this.state.password}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.password}>
                        <Text style={styles.text}>Confirm Password:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            placeholder="Re-enter password..."
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            defaultValue={this.state.confirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>

                    <>
                        {this.state.success &&
                            <Text style={styles.success}>{this.state.success}</Text>
                        }
                    </>

                    <View style={styles.signup}>
                        <TouchableOpacity onPress={this.updateUserInformation}>
                            <View style={styles.applyBtn}>
                                <Text style={styles.buttonText}>Apply Changes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
};