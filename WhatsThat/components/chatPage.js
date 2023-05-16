import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Icon } from 'react-native-elements';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../style';

export default class ChatPageScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: {},
          chatID: "",
          currentUserID: "",
          // message: "",
        }

        this.message = React.createRef();
    }

    async componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        // this.checkLoggedIn();
      });

      this.state.chatID = await AsyncStorage.getItem("@currentChatID");
      this.state.currentUserID = await AsyncStorage.getItem("@user_id");
      this.message.current.value = "";
      this.getChat();
      this.displayChat();
      this.interval = setInterval(() => {
        this.getChat();
        this.displayChat();
      }, 3000);
    };

    componentWillUnmount() {
      this.unsubscribe();
      clearInterval(this.interval);
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
      const messageTime = new Date(timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit' });
      return messageTime
    };

    editMessageNavigate = async (messageID, currentMessage) => {
      // console.log(storedUserID);
      await AsyncStorage.setItem("@messageID", messageID);
      await AsyncStorage.setItem("@currentMessage", currentMessage);
      this.props.navigation.navigate("Edit Message");
    }

    displayChat() {
        let chatData = this.state.listData;
        const chatList = chatData.messages;
        let chatArray = chatData.messages;
        let currentUserID = this.state.currentUserID;
        const myInt = parseInt(currentUserID);

        if (Array.isArray(chatArray)) {
          const chatList = chatArray.reverse();
        };


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
                      <View key={id} style={styles.sendMessageContain}>
                        <View>
                          <TouchableOpacity onPress={() => {this.editMessageNavigate(message.message_id, message.message);}}>
                            <View style={styles.sendMessageContainer}>
                              <Text style={styles.senderText}>{message.author?.first_name} {message.author?.last_name}</Text>
                              <Text style={styles.messageText}>{message.message}</Text>
                              <Text style={styles.senderText}>{this.setTime(message.timestamp)}</Text>                                 
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>  
                    )
                  }
                  else {
                    return (
                      <View key={id} style={styles.recieveMessageContain}>
                        <View style={styles.recieveMessageContainer}>
                          <Text style={styles.senderText}>{message.author?.first_name} {message.author?.last_name}</Text>
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

    sendMessage = async () => {
      if(!this.message.current.value) {
        return;
      }
      
      let to_send = {
        message: this.message.current.value
      }
      
      return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID + "/message", {
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
            this.getChat();
            this.displayChat();
            this.message.current.value = "";
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

    handleTextChange = (text) => {
      // console.log('Text changed:', text);
      this.message.current.value = text;
    }

    render(){
        return (
          <View style={styles.chatContainer}>
            
            <View>
              <Header
                  containerStyle={{backgroundColor: '#fff', marginBottom: 10, paddingVertical: 20}}
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

              <View style={styles.content}>
                  <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}
                    showsVerticalScrollIndicator={false}>
                  <View >
                    <Text>{this.displayChat()}</Text>
                  </View>
                </ScrollView>
              </View>

              <View style={styles.footer}>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type a message..."
                  // value={this.message.current.value}
                  ref={this.message}
                  onChangeText={this.handleTextChange}
                  // defaultValue={this.state.message}
                />
                <TouchableOpacity style={styles.sendButton} onPress={this.sendMessage}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>

          </View>
        )
      };
  };
