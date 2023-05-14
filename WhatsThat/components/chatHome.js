import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
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
        // this.checkLoggedIn();
        this.getChats();
        this.displayChats();
        // this.sendMessage();
      });
    };

    componentWillUnmount() {
      this.unsubscribe();
    };

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

    sendMessage = async () => {
      let to_send = {
        message: "this is the last message"
      }
      
      return fetch("http://localhost:3333/api/1.0.0/chat/2/message", {
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

    chatPageNavigate = async (currentChatID) => {
      // console.log(storedUserID);
      await AsyncStorage.setItem("@currentChatID", currentChatID);
      this.props.navigation.navigate("Chat Page");
    }

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
                  
                  <TouchableOpacity onPress={() => {this.chatPageNavigate(chat.chat_id);}}>
                    <View style={styles.viewBtn}>
                      <Text style={styles.viewTextBtn}>View Chat</Text>
                    </View>
                  </TouchableOpacity>
  
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

    createChatNavigate = () => {
      this.props.navigation.navigate("Create Chat");
    };

    render(){
        return (
          <View style={styles.container}>
              
              <View>
                <TouchableOpacity onPress={this.createChatNavigate}>
                  <View style={styles.settingButtons}>
                    <Text style={styles.buttonText}>New Conversation</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View>
                  <Text>{this.displayChats()}</Text>
                </View>
              </ScrollView>

              {/* <InvertibleScrollView inverted
              ref={ref => { this.scrollView = ref; }}
              onContentSizeChange={() => {
              this.scrollView.scrollTo({y: 0, animated: true});
              }}>
               <View>
                  <Text>{this.displayChats()}</Text>
                </View>
              </InvertibleScrollView> */}

          </View>
        )
      };
};
