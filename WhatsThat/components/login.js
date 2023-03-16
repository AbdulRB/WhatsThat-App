import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as EmailValidator from 'email-validator';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "arbabar@test.com",
            password: "Hello123!",
            error: "",
            submitted: false
        }

        this._login = this._login.bind(this)
    }

    _login = async () => {
        this.setState({ submitted: true })
        this.setState({ error: "" })

        if (!(this.state.email && this.state.password)) {
            this.setState({ error: "Must enter email and password, please try again..." })
            return;
        }

        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ error: "Invalid email, please try again..." })
            return;
        }

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
                    this.setState({ error: "Invalid email or password, please try again..." })
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

                    this.props.navigation.navigate("Tab Nav");
                }
                catch {
                    throw "Something went wrong"
                }

            })
            .catch((error) => {
                console.log(error)
            })

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
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>

                    <View style={styles.login}>
                        <TouchableOpacity onPress={this._login}>
                            <View style={styles.loginBtn}>
                                <Text style={styles.buttonText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signup}>
                        <TouchableOpacity onPress={this._signUpNavigate}>
                            <View style={styles.signUpBtn}>
                                <Text style={styles.buttonText}>Need an account?</Text>
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
        marginHorizontal: 40,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 30
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
    login: {
        justifyContent: "center",
        marginTop: 50
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