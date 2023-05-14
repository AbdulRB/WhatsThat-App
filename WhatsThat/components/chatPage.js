import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Icon } from 'react-native-elements';
// import InvertibleScrollView from 'react-native-invertible-scroll-view';
import styles from '../style';

export default class ChatPageScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: {},
          chatID: "",
          currentUserID: "",
        }
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        this.state.chatID = await AsyncStorage.getItem("@currentChatID");
        this.state.currentUserID = await AsyncStorage.getItem("@user_id");
        this.getChat();
        // this.displayChat();
        // this.checkLoggedIn();
        // this.getChats();
        // this.sendMessage();
      });
    };

    componentWillUnmount() {
      this.unsubscribe();
    };

    getChat = async () => {
        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID, {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
                console.log("Fetched the current chat");
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
            //   isLoading: false,
              listData: responseJson
            })
          })
          .catch((error) => {
            console.log(error);
          })
    };

    setTime(timestamp) {
      const messageTime = new Date(timestamp * 1000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit' });
      return messageTime
    };

    displayChat() {      
        let chatData = this.state.listData;
        let chatList = chatData.messages;
        let chatArray = [];
        let currentUserID = this.state.currentUserID;
        const myInt = parseInt(currentUserID);

        if (chatData.messages?.length === 0) {
          return (
            <View>
              <Text style={styles.text}>No messages available</Text>
            </View>
          )
        }
        else {
          return (
              <View>
                {chatData.messages?.map((message, id) => {
                  if (message.author?.user_id === myInt) {
                    return (
                      <View key={id} style={styles.messageContain}>
                        <View style={styles.messageContainer}>
                          <Text style={styles.senderText}>{message.author?.first_name} {message.author?.last_name}</Text>
                          <Text style={styles.messageText}>{message.message}</Text>
                          <Text style={styles.senderText}>{this.setTime(message.timestamp)}</Text>                                 
                        </View>
                      </View>  
                    )
                  }
                  else {
                    return (
                      <View key={id}>
                        <View style={styles.messageContainer}>
                          <Text style={styles.senderText}>{message.author?.first_name} s {message.author?.last_name}</Text>
                          <Text style={styles.messageText}>{message.message}</Text>
                          <Text style={styles.senderText}>{this.setTime(message.timestamp)}</Text> 
                        </View>
                      </View>
                    )
                  }
                })}
              </View>
          )
        };   
    };

    render(){
        return (
          <View style={styles.chatContainer}>
            
            <View>
              <Header
                  containerStyle={{backgroundColor: '#fff', marginBottom: 30, paddingVertical: 20}}
                  leftComponent={
                    <Icon
                      name='arrow-back'
                      onPress={() => this.props.navigation.navigate("Chats")}
                      color='#000'
                    />
                  }
                  centerComponent={{ text: this.state.listData.name, style: { color: '#000', fontSize: 20, fontWeight: 'bold' } }}
                  rightComponent={
                    <Icon
                      name='settings'
                      onPress={() => this.props.navigation.navigate("Chat Information")}
                      color='#000'
                    />
                  }
                />
            </View>


              <View>
                  <Text>{this.displayChat()}</Text>
              </View>


          </View>
        )
      };
  };
