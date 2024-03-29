import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import styles from '../style';

export default class BlockedContactScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: [],
          addID: "",
          usersID: "",
          photo: "",
          first_name: "",
          last_name: "",
          email: "",
        };

        this.getBlockedContacts = this.getBlockedContacts.bind(this);
        this.displayContacts = this.displayContacts.bind(this);
        this.blockedProfileNavigate = this.blockedProfileNavigate.bind(this);
    };

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        this.getBlockedContacts();
        this.displayContacts();
      });
    };

    componentWillUnmount(){
      this.unsubscribe();
    };

    blockedProfileNavigate = async (blockProfileID) => {
        await AsyncStorage.setItem("@blockedUserID", blockProfileID);
        this.props.navigation.navigate("Blocked Profile");
    };

    getBlockedContacts = async () => {  
        return fetch("http://localhost:3333/api/1.0.0/blocked/", {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              console.log("Contacts fetched");
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
              isLoading: false,
              listData: responseJson
            })
          })
          .catch((error) => {
            console.log(error);
          })
      };

      displayContacts() {
        let blockedData = this.state.listData;

        if (blockedData.length === 0) {
          return (
            <View>
              <Text style={styles.emptyTitle}>No Blocked Contacts</Text>
            </View>
          )
        }
        else {
          return (
            <View style={styles.contactContainer}>
              {blockedData.map((user, id) => {
                return (
                  <View key={id}>
                  <TouchableOpacity style={styles.contact}>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{user.first_name + " " + user.last_name}</Text>
                      <Text style={styles.contactEmail}>{user.email}</Text>
                    </View>
                        <TouchableOpacity onPress={() => {this.blockedProfileNavigate(user.user_id);}}>
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

    render(){
        return(
            <View style={styles.container}>

              <ScrollView>
                <View>
                  <Text>{this.displayContacts()}</Text>
                </View>
              </ScrollView>

            </View>


        )
    };
};
