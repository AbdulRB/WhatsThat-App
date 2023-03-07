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
            error: "", 
            submitted: false
        }

        this._signup = this._signup.bind(this)
    }

    _signup = () => {
        this.setState({submitted: true})
        this.setState({error: ""})

        if(!(this.state.first_name && this.state.last_name && this.state.email && this.state.password)){
            this.setState({error: "Must enter required fields"})
            return;
        }

        const NAME_REGEX = new RegExp("^[a-zA-Z\s]*$")
        if(!NAME_REGEX.test(this.state.first_name)){
            this.setState({error: "Must enter a valid first name"})
            return;
        }

        if(!NAME_REGEX.test(this.state.last_name)){
            this.setState({error: "Must enter a valid surname"})
            return;
        }

        if(!EmailValidator.validate(this.state.email)){
            this.setState({error: "Must enter a valid email"})
            return;
        }

        const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(!PASSWORD_REGEX.test(this.state.password)){
            this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
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
                throw 'Failed validation';
            }
            else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            console.log("User created with ID: ", responseJson)
            this.props.navigation.navigate("Login");
        })
        .catch((error) => {
            console.log(error)
        })

        // console.log("Button clicked: " + this.state.first_name + " " + this.state.last_name + " " + this.state.email + " " + this.state.password)
        // console.log("Validated and ready to send to the API")

    }

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <View style={styles.first_name}>
                        <Text>First Name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%"}}
                            placeholder="Enter first name"
                            onChangeText={first_name => this.setState({first_name})}
                            defaultValue={this.state.first_name}
                        />

                        <>
                            {this.state.submitted && !this.state.first_name &&
                                <Text style={styles.error}>*First Name is required</Text>
                            }
                        </>
                    </View>

                    <View style={styles.last_name}>
                        <Text>Surname:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%"}}
                            placeholder="Enter surname"
                            onChangeText={last_name => this.setState({last_name})}
                            defaultValue={this.state.last_name}
                        />

                        <>
                            {this.state.submitted && !this.state.last_name &&
                                <Text style={styles.error}>*Surname is required</Text>
                            }
                        </>
                    </View>
                    
                    
                    <View style={styles.email}>
                        <Text>Email:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%"}}
                            placeholder="Enter email"
                            onChangeText={email => this.setState({email})}
                            defaultValue={this.state.email}
                        />

                        <>
                            {this.state.submitted && !this.state.email &&
                                <Text style={styles.error}>*Email is required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.password}>
                        <Text>Password:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%"}}
                            placeholder="Enter password"
                            onChangeText={password => this.setState({password})}
                            defaultValue={this.state.password}
                            secureTextEntry
                        />

                        <>
                            {this.state.submitted && !this.state.password &&
                                <Text style={styles.error}>*Password is required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.signUpBtn}>
                        <TouchableOpacity onPress={this._signup}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
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