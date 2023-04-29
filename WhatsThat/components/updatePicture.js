// import React, { Component } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as EmailValidator from 'email-validator';
// import ChatScreen from './chatHome';
// import { Base64 } from 'js-base64';

import React, { Component } from 'react';
import { Camera, CameraType, onCameraReady, CameraPictureOptions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdatePicture({navigation}) {
    // function editPictureNavigate(){
    //     this.props.navigation.navigate("Edit Profile Picture")
    // }
    
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);

    Camera.requestCameraPermissionsAsync();

    function toggleCameraType(){
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        console.log("Camera: ", type)
    }

    async function takePhoto(){
        if(camera){
            const options = {quality: 0.5, base64: true, onPictureSaved: (data) => sendToServer(data)}
            const data = await camera.takePictureAsync(options)
        }
    }

    async function sendToServer(data){
        let currentUserId = await AsyncStorage.getItem('@user_id');

        let res = await fetch(data.uri);
        let blob = await res.blob()

        console.log(currentUserId)

        return fetch('http://localhost:3333/api/1.0.0/user/'+ currentUserId + '/photo', {
            method: "POST",
            headers: {
                "X-Authorization": await AsyncStorage.getItem("@session_token"),
                "Content-Type": "image/png"
            },
            body: blob
        })
        .then((response) => {
            if(response.status === 200){
                console.log("Image updated")
                navigation.navigate("Edit Profile Picture");
            }
            else{
                throw "Something went wrong"
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    if(!permission || !permission.granted){
        return(<Text>Camera permission denied</Text>)
    }
    else{
        return(
            <View style={styles.container}>
                <Camera type={type} ref={ref => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <View>
                            <TouchableOpacity style={styles.signUpBtn} onPress={toggleCameraType}>
                                <Text style={styles.buttonText}>Flip Camera</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.signUpBtn} onPress={takePhoto}>
                                <Text style={styles.buttonText}>Take Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcf4f5',
    },
    buttonContainer: {
        marginTop: 600
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
        marginHorizontal: 100,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 20
    },
    signup: {
        justifyContent: "center",
        marginTop: 20
    },
    button: {
        marginBottom: 30,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        paddingVertical: 10
    },
    error: {
        marginTop: 25,
        color: "red",
        fontWeight: '500',
        fontSize: 15
    }
});