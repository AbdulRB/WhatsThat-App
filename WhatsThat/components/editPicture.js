import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as EmailValidator from 'email-validator';
import ChatScreen from './chatHome';
import { Base64 } from 'js-base64';

export default class EditProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

            error: "", 
            submitted: false,
            isLoading: true,
            listData: {}
        }
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
          
            console.log("triggered");
            this.getProfilePicture();
        });
      }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getProfilePicture = async () => {
        const currentUserId = await AsyncStorage.getItem('@user_id');

        return fetch('http://localhost:3333/api/1.0.0/user/'+ currentUserId + '/photo', {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <View style={styles.first_name}>
                        <Text style={styles.text}>First Name:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder={this.state.listData.first_name}
                            onChangeText={first_name => this.setState({ first_name })}
                            defaultValue={this.state.first_name}
                        />
                    </View>

                    <View style={styles.last_name}>
                        <Text style={styles.text}>Surname:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder={this.state.listData.last_name}
                            onChangeText={last_name => this.setState({ last_name })}
                            defaultValue={this.state.last_name}
                        />
                    </View>


                    <View style={styles.email}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder={this.state.listData.email}
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

                    <View style={styles.password}>
                        <Text style={styles.text}>Confirm Password:</Text>
                        <TextInput
                            style={styles.textBox}
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

                    <View style={styles.signup}>
                        <TouchableOpacity onPress={this.updateUserInformation}>
                            <View style={styles.signUpBtn}>
                                <Text style={styles.buttonText}>Apply Changes</Text>
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
    first_name: {
        marginBottom: 7
    },
    last_name: {
        marginBottom: 7
    },
    email: {
        marginBottom: 7
    },
    password: {
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