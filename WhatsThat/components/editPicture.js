import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';


export default class EditPictureScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

            error: "", 
            submitted: false,
            isLoading: true,
            photo: ""
        }
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
          
            console.log("triggered");
            this.getProfilePicture();
        });
      }

    componentWillUnmount(){
        this.unsubscribe();
    }


    cameraScreenNavigate = () => {
        this.props.navigation.navigate("Update Picture")
    }

    reloadNavigation = () => {
        this.componentDidMount
    }

    getProfilePicture = async () => {
        let currentUserId = await AsyncStorage.getItem('@user_id');

        return fetch('http://localhost:3333/api/1.0.0/user/'+ currentUserId + '/photo', {
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
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.formContainer}>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>

                    <Image
                        source={{
                            uri: this.state.photo
                        }}
                        style={styles.imageStyle}
                    />


                    <View>
                        <TouchableOpacity onPress={this.reloadNavigation}>
                            <View style={styles.signUpBtn}>
                                <Text style={styles.buttonText}>Update</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.cameraScreenNavigate}>
                            <View style={styles.signUpBtn}>
                                <Text style={styles.buttonText}>Update Picture</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    imageStyle: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginBottom: 80
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#dcf4f5',
    },
    formContainer: {
        marginTop: 70
    },
    buttonContainer: {
        marginTop: 80
    },
    text: {
        fontSize: 17,
        marginBottom: 10
    },
    textBox: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%",
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    signUpBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 30
    },
    signup: {
        justifyContent: "center",
        marginTop: 40
    },
    button: {
        marginBottom: 30,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 10
    },
    error: {
        marginTop: 25,
        color: "red",
        fontWeight: '500',
        fontSize: 15
    }
});