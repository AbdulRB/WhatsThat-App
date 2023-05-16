import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#dcf4f5',
    },
    pictureContainer: {
        flex: 1,
        backgroundColor: '#dcf4f5',
    },
    formContainer: {
        marginTop: 80
    },
    error: {
        marginTop: 25,
        color: "red",
        fontWeight: '500',
        fontSize: 15
    },
    homeTitle: {
        paddingTop: 130,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 45,
        fontWeight: 'bold',
    },
    emptyTitle: {
        paddingTop: 130,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 40,
        justifyContent: 'center'
    },
    homeLoginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        marginHorizontal: 60,
        padding: 10,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
    },
    homeSignUpBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginHorizontal: 60,
        marginBottom: 40,
        padding: 10,
        backgroundColor: '#15b0b3',
        borderRadius: 7
    },
    homeButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    text: {
        fontSize: 17,
        marginBottom: 10
    },
    loginEmail: {
        marginVertical: 30
    },
    loginPassword: {
        marginBottom: 10
    },
    loginTextBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    signup: {   
        justifyContent: "center",
        marginTop: 20
    },
    login: {
        justifyContent: "center",
        marginTop: 50
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 30
    },
    signUpBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingVertical: 10
    },
    first_name:{
      marginBottom: 7
    },
    last_name:{
      marginBottom: 7
    },
    email:{
      marginBottom: 7
    },
    password:{
      marginBottom: 10
    },
    signupTextBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    settingButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 30
    },
    profileTextBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    applyBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 30
    },
    imageStyle: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginBottom: 80
    },
    buttonContainer: {
        marginTop: 600
    },
    pictureBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 100,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginTop: 20
    },
    pictureBtnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        paddingVertical: 10
    },
    addBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
        padding: 1,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 0, 
    },
    contactDisplay: {
        flexDirection: 'row',
        textAlign: 'left',
        backgroundColor: '#63adf7',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        alignContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    addContainer: {
        flexDirection: 'row',
        flexBasis: 'auto',
        marginTop: 20,
        marginBottom: 20,
    },
    addTextBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    contactText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'capitalize',
    },
    contactContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewBtn: {
        backgroundColor: '#8628eb',
        borderRadius: 5,
    },
    viewBtnContain: {
        marginLeft: 50,
    },
    viewTextBtn: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    contactImageStyle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginVertical: 20
    },
    chatNameDisplay: {
        textAlign: 'left',
        backgroundColor: '#63adf7',
        padding: 15,
        marginBottom: 20,
        alignContent: 'center',
    },
    messageDisplay: {
        flexDirection: 'column-reverse',
        textAlign: 'left',
        backgroundColor: '#a5f0d2',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        alignContent: 'center',
    },
    messageNameDisplay: {
        textAlign: 'left',
        backgroundColor: '#63adf7',
        padding: 15,
        marginBottom: 20,
        alignContent: 'center',
    },
    sendMessageContain: {
        paddingLeft: 200,
    },
    recieveMessageContain: {
        paddingRight: 200,
    },
    listContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
    },
    recieveMessageContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        width: 180,
    },
    sendMessageContainer: {
        backgroundColor: '#a5f0d2',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        width: 180,
    },
    messageText: {
        fontSize: 16,
        color: 'black',
    },
    senderText: {
        fontSize: 12,
        color: '#8b8f8d',
        marginTop: 4,
        alignSelf: 'flex',
        
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#dcf4f5',
    },
    columnReverse: {
        flexDirection: 'column-reverse',
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        width: 345,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 7,
      },
      contactInfo: {
        flex: 1,
        paddingRight: 16,
        marginLeft: 10,
      },
      contactName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      contactEmail: {
        fontSize: 16,
        color: '#666',
      },
      newContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      footer: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f9f9f9',
        marginTop: 20,

      },
      messageInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
      },
      sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      content: {
        flexDirection: 'column-reverse',
        height: 673,
        justifyContent: 'center',
        alignItems: 'center',        
      },
    addIDContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 8,
    },
    addIDBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 0, 
        paddingHorizontal: 20,
    },
    addIDTextBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    addIDButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        paddingVertical: 10
    },
    searchIDContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 8,
    },
    searchIDBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 0, 
        paddingHorizontal: 20,
    },
    searchIDTextBox: {
        height: 40, 
        borderWidth: 1, 
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
        width: "100%", 
        backgroundColor: '#f5f7f7',
        fontSize: 16
    },
    searchIDButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        paddingVertical: 10
    },
    addError: {
        marginBottom: 20,
        color: "red",
        fontWeight: '500',
        fontSize: 15
    },
    addSuccess: {
        marginBottom: 20,
        color: "green",
        fontWeight: '500',
        fontSize: 15
    },
    success: {
        marginTop: 25,
        color: "green",
        fontWeight: '500',
        fontSize: 15
    },
    applyNameBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        padding: 5,
        backgroundColor: '#15b0b3',
        borderRadius: 7,
        marginBottom: 30,
    },
    chatInfoContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: '#dcf4f5',
    },
    chatContactContainer: {
        height: 250,
        marginBottom: 30,
    },
    addIDChatContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        marginLeft: 8,
    },

});