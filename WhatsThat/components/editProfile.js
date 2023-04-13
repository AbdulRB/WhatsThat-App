import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as EmailValidator from 'email-validator';
import ChatScreen from './chatHome';

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
            submitted: false,
            isLoading: true,
            listData: {}
        }
    }

    componentDidMount() {
        // this.unsubscribe = this.props.navigation.addListener('focus', () => {
        //   this.checkLoggedIn();
        // });
  
        this.getUserInformation();
        // this.setDetails();
      }

    getUserInformation = async () => {

        const currentUserId = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/" + currentUserId, {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
            //   console.log(currentUserId)
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

    }

    // extractUserFirstName = () => {
    //     // const currentFirstName = this.state.listData.first_name;
    //     // return currentFirstName;
    //     return this.state.listData.first_name;
    // }
    
    // extractUserLastName = () => {
    //     const currentLastName = this.state.listData.last_name;
    //     return currentLastName;
    // }

    // extractUserEmail = () => {
    //     const currentEmail = this.state.listData.email;
    //     return currentEmail;
    // }

    toSendUpdateInformation = async () => {
        this.setState({submitted: true})
        this.setState({error: ""})

        const currentUserId = await AsyncStorage.getItem('@user_id');
        let currentFirstName = this.state.listData.first_name;
        let currentLastName = this.state.listData.last_name;
        let currentEmail = this.state.listData.email;
        // const currentPassword

        const NAME_REGEX = new RegExp("^[a-zA-Z\s]*$")
        if(!NAME_REGEX.test(this.state.first_name)){
            this.setState({error: "Invalid first name, please try again..."})
            return;
        }
        else{
            currentFirstName = this.state.first_name;
        }

        if(!NAME_REGEX.test(currentLastName)){
            this.setState({error: "Invalid surname, please try again..."})
            return;
        }
        else{
            currentLastName = this.state.last_name;
        }

        if(!EmailValidator.validate(currentEmail)){
            this.setState({error: "Invalid email, please try again..."})
            return;
        }
        else{
            currentEmail = this.state.email;
        }

        let to_send = {
            first_name: "Terry",
            last_name: "James",
            email: "terry@test.com",
            password: "Burnage7863!",
        }

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
                // return response.json()
            }
            else if(response.status === 400){
                throw "Details could not be updated" + response.json;
            }
            else{
                throw "Something went wrong";
            }
        })
        .then(() => {
            console.log("Current user details updated")
            this.setState({"error": "User details updated"})
            this.setState({"submitted": false});
        })
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"submitted": false});
        })




        // validate the first name then compare and then send it off



        // if (this.state.first_name !== currentFirstName)
        // {
        //     this.setState({sendFirstName: })
        // }
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
                        <TouchableOpacity onPress={this.toSendUpdateInformation}>
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