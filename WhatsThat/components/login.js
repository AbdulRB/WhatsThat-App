import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as EmailValidator from 'email-validator';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            submitted: false
        }

        this._login = this._login.bind(this)
    }

    _login = async () => {
        this.setState({ submitted: true })
        this.setState({ error: "" })

        if (!(this.state.email && this.state.password)) {
            this.setState({ error: "Must enter email and password" })
            return;
        }

        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ error: "Must enter valid email" })
            return;
        }

        // const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        // if(!PASSWORD_REGEX.test(this.state.password)){
        //     this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
        //     return;
        // }

        let to_send = {
            email: this.state.email,
            password: this.state.password,
        }

        return fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                else if (response.status === 400) {
                    this.setState({ error: "Invalid email or password" })
                    throw 'Invalid email or password';

                }
                else {
                    throw 'Something went wrong';
                }
            })
            .then(async (responseJson) => {
                console.log(responseJson)
                try {
                    await AsyncStorage.setItem("@user_id", responseJson.id);
                    await AsyncStorage.setItem("@session_token", responseJson.token);

                    this.setState({ "submitted": false });

                    this.props.navigation.navigate("Chat Home");
                }
                catch {
                    throw "Something went wrong"
                }

            })
            .catch((error) => {
                console.log(error)
            })


        // console.log("Button clicked: " + this.state.email + " " + this.state.password)
        // console.log("Validated and ready to send to the API")

    }

    _signUpNavigate = () => {
        this.props.navigation.navigate("Sign Up")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.email}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter email..."
                            onChangeText={email => this.setState({ email })}
                            defaultValue={this.state.email}
                        />

                        {/* <>
                            {this.state.submitted && !this.state.email &&
                                <Text style={styles.error}>*Email is required</Text>
                            }
                        </> */}
                    </View>

                    <View style={styles.password}>
                        <Text style={styles.text}>Password:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder="Enter password..."
                            onChangeText={password => this.setState({ password })}
                            defaultValue={this.state.password}
                            secureTextEntry
                        />

                        {/* <>
                            {this.state.submitted && !this.state.password &&
                                <Text style={styles.error}>*Password is required</Text>
                            }
                        </> */}
                    </View>

                    <View style={styles.loginbtn}>
                        <TouchableOpacity onPress={this._login}>
                            <View style={styles.loginBtn}>
                                <Text style={styles.buttonText}>Login</Text>
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
        padding: 24,
        backgroundColor: '#dcf4f5',
    },
    formContainer: {
        marginTop: 100
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
    text: {
        fontSize: 17,
        marginBottom: 10
    },
    email: {
        marginVertical: 30
    },
    password: {
        marginBottom: 10
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginHorizontal: 50,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 20
    },
    signUpbtn: {

    },
    signup: {
        justifyContent: "center",
        textDecorationLine: "underline"
    },
    button: {
        marginBottom: 30,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    error: {
        color: "red",
        fontWeight: '900'
    }
});