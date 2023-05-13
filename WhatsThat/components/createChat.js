import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class CreateChatScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            chat_name: "",
            error: "", 
            submitted: false
        }
    };

    addChat = async () => {
        this.setState({ error: "" })

        if (!(this.state.chat_name)) {
            this.setState({ error: "Must enter a chat name, please try again..." })
            return;
        }

        let to_send = {
            name: this.state.chat_name
        }

        return fetch("http://localhost:3333/api/1.0.0/chat", {
            method: 'POST',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token"),
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => {   
            if(response.status === 201){
              console.log("Chat added");
              this.props.navigation.navigate("Chats");
            //   this.getChats();
            //   this.displayChats();
              // console.log(response.json());
            }
            else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }
            else{
                this.setState({error: "Unable to create chat, please try again..."});
                throw 'Something went wrong';
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({error: "Unable to create chat, please try again..."})
          })
      };

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <View style={styles.first_name}>
                        <Text style={styles.text}>Chat Name:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            placeholder="Enter a chat name..."
                            onChangeText={chat_name => this.setState({ chat_name })}
                            defaultValue={this.state.chat_name}
                        />
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>

                    <View style={styles.signup}>
                        <TouchableOpacity onPress={this.addChat}>
                            <View style={styles.applyBtn}>
                                <Text style={styles.buttonText}>Create</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};