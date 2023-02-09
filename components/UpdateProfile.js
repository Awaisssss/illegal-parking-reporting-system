import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, SafeAreaView,Alert, Button, Image } from 'react-native';
import colors from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import "firebase/compat/firestore";
import firebase from 'firebase/compat/app';


export default UpdateProfile = ({navigation}) => {

    const auth = getAuth();
    const user = auth.currentUser;
    // console.log('user: ', user)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    if (user !== null) {
        user.providerData.forEach((profile) => {
        // console.log(" Current user's UID: " + user.uid);
        // console.log(" Current user's Email: " + profile.email);
        });
    }

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred)
    }

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }


    const onChangePasswordPress = () => {
        reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
            Alert.alert("Password was changed");
            handleSignOut()
        }).catch((error) => { console.log(error.message);
            alert(error)});
        }).catch((error) => { console.log(error.message)
            alert(error)});
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.navigate('Profile')}>
                    <MaterialIcons name='arrow-back-ios' size={18}/>
                </TouchableOpacity>
                <Text style={styles.detailText}>Update profile</Text>
                <StatusBar style='dark'/>
        </View>
            <View style={styles.updateProfile}>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                        <TextInput placeholder='First name' 
                        // onChangeText={text => setCurrentPassword(text)} 
                        // onChangeText={(text) => setLastName(text)}
                        // value={lastName}
                        ></TextInput>
                </View>
                <View style={styles.input}>
                        <TextInput placeholder='Last name' 
                        // onChangeText={text => setCurrentPassword(text)} 
                        // onChangeText={(text) => setLastName(text)}
                        // value={lastName}
                        ></TextInput>
                </View>
                <View style={styles.input}>
                        <TextInput placeholder='Current Password' autoCapitalize="none" secureTextEntry={true}
                        onChangeText={text => setCurrentPassword(text)} 
                        // onChangeText={(text) => setLastName(text)}
                        // value={lastName}
                        ></TextInput>
                </View>
                <View style={styles.input}>
                        <TextInput placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
                        onChangeText={text => setNewPassword(text)} 
                        // onChangeText={(text) => setLastName(text)}
                        // value={lastName}
                        ></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={onChangePasswordPress}>
            <Text style={styles.loginBtntxt}>Update</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%'
    },
    updateProfile: {
        marginTop: 20,
        marginBottom:20,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginTop: 10,
        borderBottomWidth: 1,
        paddingBottom: 15,
        borderColor: '#F7F8F9',
        backgroundColor: colors.blue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10
    },
    backIconContainer: {
        backgroundColor: '#F7F8F9',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        paddingLeft: 6,
        borderWidth: 2,
        borderColor: '#F7F8F9',
        borderRadius: 10,
    },
    detailText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        // marginHorizontal: 50,
        marginHorizontal: 70,
        },
    input: {
        textAlign: 'center',
        padding: 10,
        paddingLeft: 20,
        backgroundColor: colors.grey,
        margin: 10,
        height: 50,
        borderRadius: 8,
        borderColor: '#DADADA',
        borderWidth: 1,
    },
    inputContainer: {
        marginLeft: 15,
        marginRight: 15,
    },
    loginBtn: {
        alignItems: 'center',
        height: 45,
        marginTop: 30,
        margin: 40,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: "#5570f1",
        borderColor: '#5570f1',

    },  
    loginBtntxt: {
        color: 'white',
        fontSize: 20,
    },
})