import React, {useState, useEffect, useContext} from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Button, TextComponent, Image } from 'react-native';
import colors from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase'
import firestore from '@react-native-firebase/firestore';
import {getAuth} from 'firebase/auth'
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { app, db } from '../firebase'
 


export default Profile = ({navigation}) => {

    const auth = getAuth();
    const user = auth.currentUser;
    let userId = user.uid;
    let [userData, setUserData] = useState({});
    
    const getUserData = async () => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data())

        if (docSnap.exists()) {
                // console.log("Document data in Profile:", docSnap.data());
            
            } else {
              // doc.data() will be undefined in this case
                console.log("No such document!");
        } 
    }

    useEffect(() => {
        getUserData();
    }, [])

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name='arrow-back-ios' size={18}/>
                </TouchableOpacity>
                <Text style={styles.detailText}>Profile</Text>
                <StatusBar style='dark'/>
        </View>

        <View style={styles.profileContainer}>
            <FontAwesome5 style={styles.userLogo} name='user-circle' color={'white'} size={80} />
            <View style={styles.textContainer}>
                {/* <Text style={styles.text1}>{userData.firstName} {userData.lastName}</Text> */}
                {/* <Text style={styles.text2}>{userData.email}</Text> */}
            </View>
            <MaterialIcons name='edit' size={26}  color={'white'} onPress={() => navigation.navigate('UpdateProfile')}/>
        </View>

        <View style={styles.infoContainer}>
        <View style={styles.leftInfo}>
            <Text style={styles.text}>Total Reports</Text>
            <View style={styles.leftCircle}>
                <Text style={styles.text}>0</Text>
            </View>
        </View>
        <View style={styles.rightInfo}>
            <Text style={styles.text}>Total Rewards</Text>
            <View style={styles.rightCircle}>
                <Text style={styles.text}>0</Text>
            </View>
        </View>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignOut}>
                    <Text style={styles.loginBtntxt}>Logout</Text>
        </TouchableOpacity>

        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%'
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
        marginHorizontal: 50,
        marginHorizontal: 105,
    },
    profileContainer: {
        backgroundColor: colors.blue,
        flexDirection: 'row',
        paddingHorizontal: 20,
        // paddingVertical: 30,
        
        paddingTop: 30,
        paddingBottom: 10,
    },
    userLogo: {
        marginTop: -10,
    },
    textContainer: {
        marginHorizontal: 12,
        paddingBottom: 40,
        // paddingRight: 4,
    },
    text1: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
    },
    text2: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
    },  
    infoContainer: {
        flexDirection: 'row',
        paddingVertical: 40,
    },
    rightInfo: {
        paddingLeft: 40,
        alignItems: 'center'
    },
    leftInfo: {
        borderRightWidth: 2,
        paddingLeft: 50,
        paddingRight: 40,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 10,
    },
    leftCircle: {
        marginTop: 20,
        marginBottom: 40,

    },
    rightCircle: {
        marginTop: 20,
    },
    loginBtn: {
        alignItems: 'center',
        height: 45,
        margin: 40,
        marginTop: 290,
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