import React, { Component } from 'react';
import { Camera, CameraType, onCameraReady, CameraPictureOptions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';

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
            <View style={styles.pictureContainer}>
                <Camera type={type} ref={ref => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <View>
                            <TouchableOpacity style={styles.pictureBtn} onPress={toggleCameraType}>
                                <Text style={styles.pictureBtnText}>Flip Camera</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.pictureBtn} onPress={takePhoto}>
                                <Text style={styles.pictureBtnText}>Take Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }
};