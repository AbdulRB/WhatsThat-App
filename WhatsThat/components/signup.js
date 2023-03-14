import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import * as EmailValidator from 'email-validator';

import LoginScreen from './login';

export default class SignUpScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "", 
            submitted: false
        }

        this._signup = this._signup.bind(this)
    }

    _signup = () => {
        this.setState({submitted: true})
        this.setState({error: ""})

        if(!(this.state.first_name && this.state.last_name && this.state.email && this.state.password && this.state.confirmPassword)){
            this.setState({error: "Must enter required fields, please try again..."})
            return;
        }

        const NAME_REGEX = new RegExp("^[a-zA-Z\s]*$")
        if(!NAME_REGEX.test(this.state.first_name)){
            this.setState({error: "Invalid first name, please try again..."})
            return;
        }

        if(!NAME_REGEX.test(this.state.last_name)){
            this.setState({error: "Invalid surname, please try again..."})
            return;
        }

        if(!EmailValidator.validate(this.state.email)){
            this.setState({error: "Invalid email, please try again..."})
            return;
        }

        const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(!PASSWORD_REGEX.test(this.state.password)){
            this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
            return;
        }

        if(this.state.password !== this.state.confirmPassword){
            this.setState({error: "Passwords do not match, please try again..."})
            return;
        }


        let to_send = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }

        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
            }
            else if(response.status === 400){
                throw "Email already exists or password isn't  strong enough";
            }
            else{
                throw "Something went wrong";
            }
        })
        .then((responseJson) => {
            console.log("User created with ID: ", responseJson)
            this.setState({"error": "User added successfully"})
            this.setState({"submitted": false});
            this.props.navigation.navigate("Login")
        })
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"submitted": false});
        })

        // console.log("Button clicked: " + this.state.first_name + " " + this.state.last_name + " " + this.state.email + " " + this.state.password)
        // console.log("Validated and ready to send to the API")

    }

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <View style={styles.first_name}>
                        <Text style={styles.text}>First Name:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter first name..."
                            onChangeText={first_name => this.setState({first_name})}
                            defaultValue={this.state.first_name}
                        />
                    </View>

                    <View style={styles.last_name}>
                        <Text style={styles.text}>Surname:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter surname..."
                            onChangeText={last_name => this.setState({last_name})}
                            defaultValue={this.state.last_name}
                        />
                    </View>
                    
                    
                    <View style={styles.email}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter email..."
                            onChangeText={email => this.setState({email})}
                            defaultValue={this.state.email}
                        />
                    </View>
            
                    <View style={styles.password}>
                        <Text style={styles.text}>Password:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter password..."
                            onChangeText={password => this.setState({password})}
                            defaultValue={this.state.password}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.password}>
                        <Text style={styles.text}>Confirm Password:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Re-enter password..."
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            defaultValue={this.state.confirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
            
                    <View style={styles.signup}>
                        <TouchableOpacity onPress={this._signup}>
                            <View style={styles.signUpBtn}>
                                <Text style={styles.buttonText}>Sign Up</Text>
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
    text: {
        fontSize: 17,
        marginBottom: 10
    },
    textBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    first_name:{
      marginBottom: 7
    },
    last_name:{
      marginBottom: 7
    },
    email:{
      marginBottom: 7
    },
    password:{
      marginBottom: 10
    },
    signUpBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 30
    },
    signup: {   
        justifyContent: "center",
        marginTop: 20
    },
    button: {
        marginBottom: 30,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 10
    },
    error: {
        marginTop: 25,
        color: "red",
        fontWeight: '500',
        fontSize: 15
    }
  });