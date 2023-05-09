import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class ContactsScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: [],
          addID: "",
        }

        this.getContacts = this.getContacts.bind(this);
        this.displayContacts = this.displayContacts.bind(this);
        this.addContacts = this.addContacts.bind(this);
        this.contactProfileNavigate = this.contactProfileNavigate.bind(this);
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getContacts();
          this.displayContacts();
      });
    }

    componentWillUnmount(){
      this.unsubscribe();
    }
    
    contactProfileNavigate = async (storedUserID) => {
      console.log(storedUserID);
      await AsyncStorage.setItem("@contactUserID", storedUserID);
      this.props.navigation.navigate("Contact Profile");
    }

    getContacts = async () => {
      const currentUserId = await AsyncStorage.getItem('@user_id');

      return fetch("http://localhost:3333/api/1.0.0/contacts/", {
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
    }

    addContacts = async () => {
      const currentUserId = await AsyncStorage.getItem('@user_id');

      return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.addID + "/contact", {
          method: 'POST',
          headers: {
               "X-Authorization": await AsyncStorage.getItem("@session_token")
          }
      })
      .then((response) => {
          if(response.status === 200){
            console.log("Contact added"); 
            // return response.json();
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
            isLoading: false,
            // listData: responseJson
          })
        })
        .catch((error) => {
          console.log(error);
        })
    };

    displayContacts() {
      let contactData = this.state.listData;

      return (
        <View style={styles.contactContainer}>
          {contactData.map((user, id) => {
            return (
              <View key={id} style={styles.contactDisplay}>
                <Text style={styles.buttonText}>{user.first_name + " " + user.last_name}</Text>
                
                <TouchableOpacity onPress={() => {this.contactProfileNavigate(user.user_id);}}>
                  <View style={styles.viewBtn}>
                    <Text style={styles.viewTextBtn}>View Contact</Text>
                  </View>
                </TouchableOpacity>

              </View>
            );
          })}
        </View>
      )
    };

    render(){

      if (!this.state.isLoading){
        return (          
          <View style={styles.container}>
            
            <View style={styles.addContainer}>
              <TextInput
                style={styles.profileTextBox}
                placeholder="ID"
                onChangeText={addID => this.setState({ addID })}
                defaultValue={this.state.addID}
              />
              <TouchableOpacity onPress={this.addContacts}>
                <View style={styles.addBtn}>
                  <Text style={styles.buttonText}>Add Contact</Text>
                </View>
              </TouchableOpacity>
            </View>

            
            <View>
              <Text>{this.displayContacts()}</Text>
            </View>


          </View>
        )
      }
    }
};
