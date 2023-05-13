import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class ChatScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: []
        }
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.checkLoggedIn();
        this.getChats();
        // this.sendMessage();
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    // getData = async () => {
    //   const value = await AsyncStorage.getItem('@session_token');
    //   return fetch("http://localhost:3333/api/1.0.0/search", {
    //     'headers': {
    //       'X-Authorization': value
    //     }
    //   })
    //   .then((response) => {
    //     if(response.status === 200){
    //       return response.json()
    //     }
    //     else if(response.status === 401){
    //       this.props.navigation.navigate("Login");
    //     }
    //     else{
    //       throw 'Something went wrong';
    //     }
    //   })
    //   .then((responseJson) => {
    //     this.setState({
    //       isLoading: false,
    //       listData: responseJson
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // };

    getChats = async () => {
      // const currentUserId = await AsyncStorage.getItem('@user_id');
      return fetch("http://localhost:3333/api/1.0.0/chat", {
          headers: {
               "X-Authorization": await AsyncStorage.getItem("@session_token")
              //  "Content-Type": "application/json"
          }
      })
      .then((response) => {
          if(response.status === 200){
            console.log("Chats fetched");
            return response.json();
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
          // console.log(responseJson)
      })
      .catch((error) => {
          console.log(error);
        })
    };

    addChat = async () => {
      let to_send = {
        name: "test"
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
            this.getChats();
            this.displayChats();
            // console.log(response.json());
          }
          else if(response.status === 401){
            this.props.navigation.navigate("Login");
          }
          else{
            //console.log(response);
            throw 'Something went wrong';
          }
        })
        .catch((error) => {
          console.log(error);
        })
    };

    sendMessage = async () => {
      let to_send = {
        message: "this is a test message"
      }
      
      return fetch("http://localhost:3333/api/1.0.0/chat/1/message", {
          method: 'POST',
          headers: {
               "X-Authorization": await AsyncStorage.getItem("@session_token"),
               "Content-Type": "application/json"
          },
          body: JSON.stringify(to_send)
      })
      .then((response) => {
          if(response.status === 200){
            console.log("Message Sent");
            this.getChats();
            this.displayChats();
            // console.log(response.json());
          }
          else if(response.status === 401){
            this.props.navigation.navigate("Login");
          }
          else{
            //console.log(response);
            throw 'Something went wrong';
          }
        })
        .catch((error) => {
          console.log(error);
        })
    };

    displayChats() {
      let chatData = this.state.listData;

      if (chatData.length === 0) {
        return (
          <View>
            <Text style={styles.text}>No Chats Created</Text>
          </View>
        )
      }
      else {
        return (
          <View >
            {chatData.map((chat, id) => {
              return (
                <View key={id} style={styles.chatNameDisplay}>
                  <Text style={styles.text}>{chat.name}</Text>
                  <Text style={styles.text}>{chat.last_message.message}</Text>
                  
                  {/* <TouchableOpacity onPress={() => {this.contactProfileNavigate(user.user_id);}}>
                    <View style={styles.viewBtn}>
                      <Text style={styles.viewTextBtn}>View Contact</Text>
                    </View>
                  </TouchableOpacity> */}
  
                </View>
              );
            })}
          </View>
        )
      }
    };
    
    checkLoggedIn = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      if (value == null) {
        this.props.navigation.navigate("Login");
      };
    };

    render(){
        return (
          <ScrollView>
          <View style={styles.container}>
              <Text>This is the chat home screen</Text>

              <View>
                <Text>{this.displayChats()}</Text>
              </View>

              <View>
                <TouchableOpacity onPress={this.addChat}>
                  <View style={styles.signUpBtn}>
                    <Text style={styles.buttonText}>Add chat</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>
          </ScrollView>

        )
      };
};
