import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Icon } from 'react-native-elements';
import styles from '../style';

export default class ContactsScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: [],
          addID: "",
          error: "",
          search: "",
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
          this.setState({ error: "" });
          this.setState({search: "", addID: ""})
      });
    }

    componentWillUnmount(){
      this.unsubscribe();
    }
    
    contactProfileNavigate = async (storedUserID) => {
      // console.log(storedUserID);
      await AsyncStorage.setItem("@contactUserID", storedUserID);
      this.props.navigation.navigate("Contact Profile");
    }

    getContacts = async () => {
      // const currentUserId = await AsyncStorage.getItem('@user_id');

      return fetch("http://localhost:3333/api/1.0.0/contacts", {
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

    addContacts = async () => {
      var hasNumber = /\d/; 
      this.setState({ error: "" })

      if (!(this.state.addID)) {
          this.setState({ error: "Must enter a User ID" });
          // console.log(Number.isInteger(this.state.addID));
          return;
      }

      if(!(hasNumber.test(this.state.addID))) {
        this.setState({ error: "Must enter a valid User ID" })
        return;
      }
      
      return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.addID + "/contact", {
          method: 'POST',
          headers: {
               "X-Authorization": await AsyncStorage.getItem("@session_token")
          }
      })
      .then((response) => {
          if(response.status === 200){
            console.log("Contact added");
            this.getContacts();
            this.displayContacts();
            console.log(response.json());
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

      if (contactData.length === 0) {
        return (
          <View>
            <Text style={styles.text}>No Contacts Added</Text>
          </View>
        )
      }
      else {
        return (
          <View style={styles.contactContainer}>
            {contactData.map((user, id) => {
              return (
                // <View key={id} style={styles.contactDisplay}>
                //   <Text style={styles.buttonText}>{user.first_name + " " + user.last_name}</Text>
                //   <Text style={styles.buttonText}>{user.email}</Text>
                  
                //   <View style={styles.viewBtnContain}>
                //     <TouchableOpacity onPress={() => {this.contactProfileNavigate(user.user_id);}}>
                //       <View style={styles.viewBtn}>
                //         <Text style={styles.viewTextBtn}>View Contact</Text>
                //       </View>
                //     </TouchableOpacity>
                //   </View>
                // </View>
                <View key={id}>
                  <TouchableOpacity style={styles.contact}>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{user.first_name + " " + user.last_name}</Text>
                      <Text style={styles.contactEmail}>{user.email}</Text>
                    </View>
                        <TouchableOpacity onPress={() => {this.contactProfileNavigate(user.user_id);}}>
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

      if (!this.state.isLoading){
        return (
          // <ScrollView>
            <View style={styles.container}>

              <View style={styles.addIDContainer}>
                <TextInput
                  style={styles.addIDTextBox}
                  placeholder="Enter a User ID..."
                  onChangeText={addID => this.setState({ addID })}
                  defaultValue={this.state.addID}
                />
                <View>
                  <TouchableOpacity onPress={this.addContacts}>
                    <View style={styles.addIDBtn}>
                      <Text style={styles.addIDButtonText}>Add Contact</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.searchIDContainer}>
                <TextInput
                  style={styles.searchIDTextBox}
                  placeholder="Search by Name, Email, ID..."
                  onChangeText={search => this.setState({ search })}
                  defaultValue={this.state.search}
                />
                <View>
                  <TouchableOpacity>
                    <View style={styles.searchIDBtn}>
                      <Text style={styles.searchIDButtonText}>Search</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* <>
                {this.state.error &&
                  <Text style={styles.error}>{this.state.error}</Text>
                }
              </> */}
              
              <ScrollView showsVerticalScrollIndicator={false}> 
                <View>
                  <Text>{this.displayContacts()}</Text>
                </View>
              </ScrollView>

            </View>
          // </ScrollView>        
        )
      }
    }
};
