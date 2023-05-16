import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../style';
import * as EmailValidator from 'email-validator';

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
            submitted: false,
            success: "",
        }

        this.signup = this.signup.bind(this)
    }

    signup = () => {
        this.setState({submitted: true});
        this.setState({error: ""});

        if(!(this.state.first_name && this.state.last_name && this.state.email && this.state.password && this.state.confirmPassword)){
            this.setState({error: "Must enter required fields, please try again..."})
            return;
        };

        const NAME_REGEX = new RegExp("^[a-zA-Z\s]*$")
        if(!NAME_REGEX.test(this.state.first_name)){
            this.setState({error: "Invalid first name, please try again..."})
            return;
        };

        if(!NAME_REGEX.test(this.state.last_name)){
            this.setState({error: "Invalid surname, please try again..."})
            return;
        };

        if(!EmailValidator.validate(this.state.email)){
            this.setState({error: "Invalid email, please try again..."})
            return;
        };

        const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(!PASSWORD_REGEX.test(this.state.password)){
            this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
            return;
        };

        if(this.state.password !== this.state.confirmPassword){
            this.setState({error: "Passwords do not match, please try again..."})
            return;
        };


        let to_send = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        };

        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => {
            if(response.status === 201){
                this.setState({first_name: "", last_name: "", email: "", password: "", confirmPassword: ""});
                this.setState({success: "User created successfully"});
                return response.json()
            }
            else if(response.status === 400){
                throw "Email already exists or password isn't strong enough";
            }
            else{
                throw "Something went wrong";
            }
        })
        .then((responseJson) => {
            console.log("User created with ID: ", responseJson)
            this.setState({"submitted": false,
            "first_name": "",
            "last_name": "",
            "email": "",
            "password": "",
            "confirmPassword": ""
        });
            this.props.navigation.navigate("Login")
        })
        .catch((error) => {
            this.setState({"error": error});
            this.setState({"submitted": false});
        })
    };

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <View style={styles.first_name}>
                        <Text style={styles.text}>First Name:</Text>
                        <TextInput
                            style={styles.signupTextBox}
                            placeholder="Enter first name..."
                            onChangeText={first_name => this.setState({first_name})}
                            value={this.state.first_name}
                        />
                    </View>

                    <View style={styles.last_name}>
                        <Text style={styles.text}>Surname:</Text>
                        <TextInput
                            style={styles.signupTextBox}
                            placeholder="Enter surname..."
                            onChangeText={last_name => this.setState({last_name})}
                            value={this.state.last_name}
                        />
                    </View>
                    
                    
                    <View style={styles.email}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.signupTextBox}
                            placeholder="Enter email..."
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>
            
                    <View style={styles.password}>
                        <Text style={styles.text}>Password:</Text>
                        <TextInput
                            style={styles.signupTextBox}
                            placeholder="Enter password..."
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.password}>
                        <Text style={styles.text}>Confirm Password:</Text>
                        <TextInput
                            style={styles.signupTextBox}
                            placeholder="Re-enter password..."
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            value={this.state.confirmPassword}
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
                        <TouchableOpacity onPress={this.signup}>
                            <View style={styles.signUpBtn}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
};