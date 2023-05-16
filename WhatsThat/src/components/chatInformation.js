import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
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
          addError: "",
          success: "",
          creatorID: "",
        }
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        this.state.chatID = await AsyncStorage.getItem("@currentChatID");
        this.getChatInformation();
        this.state.currentUserID = await AsyncStorage.getItem("@user_id");
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
      this.setState({ addError: ""});
      this.setState({ error: ""});
      this.setState({ success: ""});
        
        if(this.state.chatName === ""){
            this.setState({error: "Must enter a new value for name"});
            return;
        };

        let to_send = {
            name: this.state.chatName,
        };

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
            this.setState({"success": "Chat name updated"})
            // this.setState({"submitted": false});
        })
        .catch((error) => {
            this.setState({"error": error})
        })
    };

    displayChatMembers() {      
        let chatData = this.state.listData;
        let currentUserID = this.state.currentUserID;
        const myInt = parseInt(currentUserID);

        this.state.creatorID = chatData.creator?.user_id;

        if (chatData.creator?.user_id === myInt) {
           return (
            <View style={styles.contactContainer}>
              {chatData.members?.map((member, id) => {
                return (
                <ScrollView  key={id}>
                    <TouchableOpacity style={styles.contact}>
                      <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{member.first_name + " " + member.last_name}</Text>
                      <Text style={styles.contactEmail}>{member.email}</Text>
                      </View>
                          <TouchableOpacity onPress={() => this.removeMember(member.user_id)}>
                            <Icon name="close" color="#FF0000" />
                          </TouchableOpacity>
                    </TouchableOpacity>
                </ScrollView>
                );
              })}
            </View>
          )
          }
          else {
        return (
            <View style={styles.contactContainer}>
              {chatData.members?.map((member, id) => {
                return (
                <ScrollView  key={id} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.contact}>
                    <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{member.first_name + " " + member.last_name}</Text>
                    <Text style={styles.contactEmail}>{member.email}</Text>
                    </View>
                    </TouchableOpacity>
                </ScrollView>
                );
              })}
            </View>
          )
          };  
    }; 

    addMember = async () => {
        var hasNumber = /\d/; 
        this.setState({ addError: "" });
        this.setState({ error: "" });
        this.setState({ success: "" });
  
        if (!(this.state.addMemberID)) {
            this.setState({ addError: "Must enter a User ID" });
            return;
        };
  
        if(!(hasNumber.test(this.state.addMemberID))) {
          this.setState({ addError: "Must enter a valid User ID" })
          return;
        };
        
        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID + "/user/" + this.state.addMemberID, {
            method: 'POST',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              this.setState({addError: ""});
              console.log("Member added to chat");
              this.getChatInformation();
              this.displayChatMembers();
            }
            else if(response.status === 400 || response.status === 404){
              this.setState({addError: "Contact already added or does not exist"});
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

      removeMember = async (removeID) => {
        this.setState({ error: "" })
        
        return fetch("http://localhost:3333/api/1.0.0/chat/" + this.state.chatID + "/user/" + removeID, {
            method: 'DELETE',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              console.log("Member removed from chat");
              if (removeID !== this.state.currentUserID) {
                this.getChatInformation();
                this.displayChatMembers();
              }
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

      removeSelf = async (removeID) => {
        this.removeMember(removeID);
        this.props.navigation.navigate("Chats");
      };


    render(){
        return (
          <View style={styles.chatInfoContainer}>

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

            <>
                {this.state.success &&
                    <Text style={styles.success}>{this.state.success}</Text>
                }
            </>

            <View style={styles.signup}>
                <TouchableOpacity onPress={this.updateChatName}>
                    <View style={styles.applyNameBtn}>
                        <Text style={styles.buttonText}>Apply Changes</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.text}>Group Participants:</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.chatContactContainer}>{this.displayChatMembers()}</Text>
                </ScrollView>
            </View>   

              <View style={styles.addIDChatContainer}>
                <TextInput
                  style={styles.addIDTextBox}
                  placeholder="Enter a User ID..."
                  onChangeText={addMemberID => this.setState({ addMemberID })}
                  defaultValue={this.state.addMemberID}
                />
                <View>
                  <TouchableOpacity onPress={this.addMember}>
                    <View style={styles.addIDBtn}>
                      <Text style={styles.addIDButtonText}>Add Contact</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <>
                {this.state.addError &&
                    <Text style={styles.error}>{this.state.addError}</Text>
                }
              </>

            <View style={styles.signup}>
                <TouchableOpacity onPress={() => this.removeSelf(this.state.currentUserID)}>
                    <View style={styles.applyBtn}>
                        <Text style={styles.buttonText}>Leave Group</Text>
                    </View>
                </TouchableOpacity>
            </View>

          </View>
        )
      };
  };
