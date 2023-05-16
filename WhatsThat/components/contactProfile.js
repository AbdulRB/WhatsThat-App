import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

export default class ContactProfileScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
          isLoading: true,
          listData: {},
          addID: "",
          usersID: "",
          photo: "",
          first_name: "",
          last_name: "",
          email: "",
        }
    }

    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        this.state.usersID = await AsyncStorage.getItem("@contactUserID");
        this.getProfilePicture();
        this.getUserInformation();
      });
    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    getProfilePicture = async () => {
        return fetch('http://localhost:3333/api/1.0.0/user/'+ this.state.usersID + '/photo', {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) =>{
            if(response.status === 200){
                return response.blob()
            }
            else{
                throw "Something went wrong"
            }
        })
        .then((resBlob) => {
            let data = URL.createObjectURL(resBlob);

            this.setState({
                photo: data,
                isLoading: false
            })
        })
        .catch((err) => {
            console.log(err)
        })
    };

    getUserInformation = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.usersID, {
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
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
              isLoading: false,
              listData: responseJson
            })
          })
          .catch((error) => {
            console.log(error);
          })
    };

    displayContacts() {
        this.state.first_name = this.state.listData.first_name;
        this.state.last_name = this.state.listData.last_name;
        this.state.email = this.state.listData.email;
        const defaultValue = this.state.first_name && this.state.last_name ? `${this.state.first_name} ${this.state.last_name}` : '';
        
        return (
            <View style={styles.container}>
                    <View style={styles.first_name}>
                        <Text style={styles.text}>Name:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            defaultValue={defaultValue}
                            editable={false}
                        />
                    </View>
                    
                    <View style={styles.last_name}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            defaultValue={this.state.email}
                            editable={false}
                        />
                    </View>


                    <View style={styles.email}>
                        <Text style={styles.text}>ID:</Text>
                        <TextInput
                            style={styles.profileTextBox}
                            defaultValue={this.state.usersID}
                            editable={false}
                        />
                    </View>
            </View>
          )
    }

    deleteContacts = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.usersID+ "/contact", {
            method: 'DELETE',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              console.log("Contact deleted");
              this.props.navigation.navigate("Contacts");
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

      blockContacts = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.usersID+ "/block", {
            method: 'POST',
            headers: {
                 "X-Authorization": await AsyncStorage.getItem("@session_token")
            }
        })
        .then((response) => {
            if(response.status === 200){
              console.log("Contact blocked");
              this.props.navigation.navigate("Contacts");
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
    
    render(){
        return(
            <View style={styles.container}>
                <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
                    <Image
                        source={{
                            uri: this.state.photo
                        }}
                        style={styles.contactImageStyle}
                    />

                    <Text>{this.displayContacts()}</Text>

                    <TouchableOpacity style={styles.pictureBtn} onPress={this.deleteContacts}>
                        <Text style={styles.pictureBtnText}>Delete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.pictureBtn} onPress={this.blockContacts}>
                        <Text style={styles.pictureBtnText}>Block</Text>
                    </TouchableOpacity>                    
            </View>
        )
    }
};
