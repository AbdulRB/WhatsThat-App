import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class ContactsScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: []
        }

        this.getContacts = this.getContacts.bind(this);
        this.displayContacts = this.displayContacts.bind(this);
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        
          this.getContacts();
          this.displayContacts();
          // console.log("triggered");
          // this.getProfilePicture();
      });
    }

    componentWillUnmount(){
      this.unsubscribe();
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

    displayContacts() {
      let contacts = this.state.listData;

      if (contacts = " "){
        return false
      }
      else {
        return contacts;
      }
    }

    render(){

      if (!this.state.isLoading){
        return (          
          <View style={styles.container}>
            
            <View>
              <TouchableOpacity>
                <View style={styles.addBtn}>
                  <Text style={styles.buttonText}>Add Contact</Text>
                </View>
              </TouchableOpacity>
            </View>

            this.displayContacts();










          </View>
        )
      }

    }
};


// const styles = StyleSheet.create({
//     container: {
//       container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: '#dcf4f5',
//     },
//     },
//     formContainer: {
  
//     },
//     first_name:{
//       marginBottom: 5
//     },
//     last_name:{
//       marginBottom: 5
//     },
//     email:{
//       marginBottom: 5
//     },
//     password:{
//       marginBottom: 10
//     },
//     signUpBtn:{
  
//     },
//     signup:{
//       justifyContent: "center",
//       textDecorationLine: "underline"
//     },
//     button: {
//       marginBottom: 30,
//       backgroundColor: '#2196F3'
//     },
//     buttonText: {
//       textAlign: 'center',
//       padding: 20,
//       color: 'white'
//     },
//     error: {
//         color: "red",
//         fontWeight: '900'
//     }
//   });