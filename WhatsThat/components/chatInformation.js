import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Icon } from 'react-native-elements';
import styles from '../style';

export default class ChatInfoScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: {},
          chatID: "",
          currentUserID: "",
          chatName: "",
          error: "",
          addMemberID: "",
        }
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        this.state.chatID = await AsyncStorage.getItem("@currentChatID");
        this.getChatInformation();


        // this.state.currentUserID = await AsyncStorage.getItem("@user_id");
        // this.displayChat();
        // this.checkLoggedIn();
        // this.getChats();
        // this.sendMessage();
      });
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


    updateChatName = async () => {
        this.setState({error: ""})
        
        if(this.state.chatName === ""){
            this.setState({error: "Must enter a new value for name"});
            return;
        }

        let to_send = {
            name: this.state.chatName,
        }

        // let to_send = this.setUserInformation.to_send;

        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID, {
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
            console.log("Current chat name updated")
            this.setState({"error": "Chat name updated"})
            // this.setState({"submitted": false});
        })
        .catch((error) => {
            this.setState({"error": error})
            // this.setState({"submitted": false});
        })
    }

    displayChatMembers() {      
        let chatData = this.state.listData;

        return (
            <View style={styles.contactContainer}>
              {chatData.members?.map((member, id) => {
                return (
                //   <View key={id} style={styles.contactDisplay}>
                //     <Text style={styles.buttonText}>{member.first_name + " " + member.last_name}</Text>
                    
                //     <View style={styles.viewBtnContain}>
                //       <TouchableOpacity onPress={() => {}}>
                //         <View style={styles.viewBtn}>
                //           <Text style={styles.viewTextBtn}>Remove</Text>
                //         </View>
                //       </TouchableOpacity>
                //     </View>

                //   </View>
                <ScrollView  key={id}>
                <TouchableOpacity style={styles.contact}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{member.first_name + " " + member.last_name}</Text>
                  <Text style={styles.contactEmail}>{member.email}</Text>
                </View>
                <TouchableOpacity>
                  <Icon name="close" color="#FF0000" />
                </TouchableOpacity>
              </TouchableOpacity>
                </ScrollView>


                );
              })}
            </View>
          )
    }; 


    addMember = async () => {
        var hasNumber = /\d/; 
        this.setState({ error: "" })
  
        if (!(this.state.addMemberID)) {
            this.setState({ error: "Must enter a User ID" });
            console.log(Number.isInteger(this.state.addMemberID))
            return;
        }
  
        if(!(hasNumber.test(this.state.addMemberID))) {
          this.setState({ error: "Must enter a valid User ID" })
          return;
        }
        
        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID + "/user/" + this.state.addMemberID, {
            method: 'POST',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              console.log("Member added to chat");
              this.getChatInformation();
              this.displayChatMembers();
            //   console.log(response.json());
            }
            else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }
            else{
              throw 'Something went wrong';
            }
          })
          .then((response) => {
            this.setState({
            //   isLoading: false,
              // listData: responseJson
            })
          })
          .catch((error) => {
            console.log(error);
          })
      };


    render(){
        return (
          <View style={styles.container}>


            <View style={styles.email}>
                <Text style={styles.text}>Chat Name:</Text>
                <TextInput style={styles.profileTextBox}
                        placeholder={this.state.listData.name}
                        onChangeText={chatName => this.setState({ chatName })}
                        defaultValue={this.state.chatName}
                        />
            </View>

            <>
                {this.state.error &&
                    <Text style={styles.error}>{this.state.error}</Text>
                }
            </>

            <View style={styles.signup}>
                <TouchableOpacity onPress={this.updateChatName}>
                    <View style={styles.applyBtn}>
                        <Text style={styles.buttonText}>Apply Changes</Text>
                    </View>
                </TouchableOpacity>
            </View>



            <View>
                <Text style={styles.text}>Group Participants</Text>
                    <Text>{this.displayChatMembers()}</Text>
   
                
            </View>   
              
              <View style={styles.addContainer}>
                <TextInput
                  style={styles.profileTextBox}
                  placeholder="ID"
                  onChangeText={addMemberID => this.setState({ addMemberID })}
                  defaultValue={this.state.addMemberID}
                />
                <TouchableOpacity onPress={this.addMember}>
                  <View style={styles.addBtn}>
                    <Text style={styles.buttonText}>Add Member</Text>
                  </View>
                </TouchableOpacity>
              </View>

            <View style={styles.signup}>
                <TouchableOpacity onPress={this.Leave}>
                    <View style={styles.applyBtn}>
                        <Text style={styles.buttonText}>Leave Group</Text>
                    </View>
                </TouchableOpacity>
            </View>


          </View>
        )
      };
  };
