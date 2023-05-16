import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Icon } from 'react-native-elements';
import styles from '../style';

export default class EditMessageScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: {},
          chatID: "",
          currentUserID: "",
          chatName: "",
          error: "",
          messageID: "",
          message: "",
          success: "",
        }
    }

    async componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        // this.displayChat();
        // this.checkLoggedIn();
        // this.getChats();
        // this.sendMessage();
      });

      this.state.chatID = await AsyncStorage.getItem("@currentChatID");
      this.getChatInformation();
      this.state.currentUserID = await AsyncStorage.getItem("@user_id");
      this.state.messageID = await AsyncStorage.getItem("@messageID");
      this.state.message = await AsyncStorage.getItem("@currentMessage");
    };

    componentWillUnmount() {
      this.unsubscribe();
    };


    getChatInformation = async () => {
        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID, {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
                console.log("Fetched the chat Information");
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
              listData: responseJson
            })
          })
          .catch((error) => {
            console.log(error);
          })
    };


    updateMessage = async () => {
        this.setState({error: ""});
        this.setState({success: ""});
        
        if(this.state.message === ""){
            this.setState({error: "Must enter an updated message"});
            return;
        }

        let to_send = {
            message: this.state.message,
        }

        // let to_send = this.setUserInformation.to_send;

        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID + "/message/" + this.state.messageID, {
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
                // this.getUserInformation();
            }
            else if(response.status === 400){
                throw "Invalid name, please try again";
            }
            else{
                throw "Something went wrong";
            }
        })
        .then(() => {
            console.log("Message updated")
            this.setState({"success": "Message updated"})
            // this.setState({"submitted": false});
        })
        .catch((error) => {
            this.setState({"error": error})
            // this.setState({"submitted": false});
        })
    }

    navigateTest() {
      this.props.navigation.navigate("Chat Page");
    }

    removeMessage = async () => {
        this.setState({ error: "" })
        
        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID + "/message/" + this.state.messageID, {
            method: 'DELETE',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              console.log("Message removed from chat");
              this.navigateTest();
            //   console.log(response.json());
            }
            else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }
            else{
              throw 'Something went wrong';
            }
          })
          .catch((error) => {
            console.log(error);
          })
    };

    render(){
        return (
          <View style={styles.container}>


            <View style={styles.email}>
                <Text style={styles.text}>Message:</Text>
                <TextInput style={styles.profileTextBox}
                        placeholder={this.state.message}
                        onChangeText={message => this.setState({ message })}
                        defaultValue={this.state.message}
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
                <TouchableOpacity onPress={this.updateMessage}>
                    <View style={styles.applyBtn}>
                        <Text style={styles.buttonText}>Update Message</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.signup}>
                <TouchableOpacity onPress={this.removeMessage}>
                    <View style={styles.applyBtn}>
                        <Text style={styles.buttonText}>Delete Message</Text>
                    </View>
                </TouchableOpacity>
            </View>

          </View>
        )
      };
  };
