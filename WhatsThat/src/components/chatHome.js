import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import styles from '../style';

export default class ChatScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: []
        }
    };

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        // this.checkLoggedIn();
        // this.getChats();
        // this.displayChats();
        // this.sendMessage();
      });
      this.getChats();
      this.displayChats();
      this.interval = setInterval(() => {
        this.getChats();
        this.displayChats();
      }, 5000);
    };

    componentWillUnmount() {
      clearInterval(this.interval);
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

    chatPageNavigate = async (currentChatID) => {
      // console.log(storedUserID);
      await AsyncStorage.setItem("@currentChatID", currentChatID);
      this.props.navigation.navigate("Chat Page");
    };

    displayChats() {
      let chatData = this.state.listData;

      if (chatData.length === 0) {
        return (
          <View>
            <Text style={styles.emptyTitle}>No Chats Created</Text>
          </View>
        )
      }
      else {
        return (
          <View >
            {chatData.map((chat, id) => {
              return (
                <View key={id}>
                <TouchableOpacity style={styles.contact} onPress={() => {this.chatPageNavigate(chat.chat_id);}}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{chat.name}</Text>
                    <Text style={styles.contactEmail}>{chat.last_message.message}</Text>
                  </View>
                      <TouchableOpacity onPress={() => {this.chatPageNavigate(chat.chat_id);}}>
                        <Icon name="arrow-forward-ios" color="black" />
                      </TouchableOpacity>
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

              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text>{this.displayChats()}</Text>
                </View>
              </ScrollView>
              
          </View>
        )
      };
};
