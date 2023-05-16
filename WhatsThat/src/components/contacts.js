import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
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
          success: "",
          searchedContacts: [],
        }

        this.getContacts = this.getContacts.bind(this);
        this.displayContacts = this.displayContacts.bind(this);
        this.addContacts = this.addContacts.bind(this);
        this.contactProfileNavigate = this.contactProfileNavigate.bind(this);
    };

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getContacts();
          this.displayContacts();
          this.setState({ error: "" });
          this.setState({search: "", addID: ""})
      });
    };

    componentWillUnmount(){
      this.unsubscribe();
    };
    
    contactProfileNavigate = async (storedUserID) => {
      await AsyncStorage.setItem("@contactUserID", storedUserID);
      this.props.navigation.navigate("Contact Profile");
    };

    searchContacts = async () => {
      if (this.state.search === "") {
        return
      }

      return fetch("http://localhost:3333/api/1.0.0/search/" + "?q="+ this.state.search + "&search_in=contacts", {
          headers: {
               "X-Authorization": await AsyncStorage.getItem("@session_token")
          }
      })
      .then((response) => {
          if(response.status === 200){
            console.log("Contacts searched");
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
            searchedContacts: responseJson
          })
        })
        .catch((error) => {
          console.log(error);
        })
    };

    getContacts = async () => {
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
          }
          else if(response.status === 401){
            this.props.navigation.navigate("Login");
          }
          else if(response.status === 404){
            this.setState({error: "User does not exist"});
          }
          else{
            this.setState({error: "Cannot add yourself"});
            throw 'Something went wrong';
          }
        })
        .then((response) => {
          this.setState({
            isLoading: false,
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
            <Text style={styles.emptyTitle}>No Contacts Added</Text>
          </View>
        )
      }
      else {
        return (
          <View style={styles.contactContainer}>
            {contactData.map((user, id) => {
              return (
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

    displaySearchedContacts() {
      let searchData = this.state.searchedContacts;

      if (searchData.length === 0) {
        return;
      }
      else {
        return (
          <View style={styles.contactContainer}>
            {searchData.map((user, id) => {
              return (
                <View key={id}>
                  <TouchableOpacity style={styles.contact}>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{user.given_name + " " + user.family_name}</Text>
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

    handleSearchText = (text) => {
      this.setState({"search": text});
      this.searchContacts();
    };

    render(){
        return (
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
                  placeholder="Search by Name or Email..."
                  onChangeText={(text) => this.handleSearchText(text)}
                  defaultValue={this.state.search}
                />
              </View>

              <>
                {this.state.error &&
                  <Text style={styles.addError}>{this.state.error}</Text>
                }
              </>

              {this.state.search ? (
              <ScrollView showsVerticalScrollIndicator={false}> 
              <View>
                <Text>{this.displaySearchedContacts()}</Text>
              </View>
            </ScrollView>
              ) : ( 
              <ScrollView showsVerticalScrollIndicator={false}> 
              <View>
                <Text>{this.displayContacts()}</Text>
              </View>
            </ScrollView>
              )}

            </View>      
        )
    };
};
