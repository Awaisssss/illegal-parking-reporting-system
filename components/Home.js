import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../assets/colors';
import { app, auth, db } from '../firebase'
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import { useScrollToTop } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {getAuth} from 'firebase/auth'
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
// import storage from '@react-native-firebase/storage';


Feather.loadFont();


export default Home = ({navigation}) => {  

    // useEffect(() => {
        // }, [])
        
        // const reference = storage().ref('https://www.computerhope.com/jargon/j/jpg.png');
        
        // var user = firebase.auth().currentUser;
        const auth = getAuth();
        const user = auth.currentUser;
        let userId = user.uid;
        let [userData, setUserData] = useState({});
        
        const getUserData = async () => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            setUserData(docSnap.data())
            
            if (docSnap.exists()) {
                console.log("Document data in HomeJs:", docSnap.data());
                // console.log("Document data in HomeJsadnsajds:", docSnap.firstName);
            } else {
                // doc.data() will be undefined in this case
                
                console.log("No such document!");
            } 
        }
        
        // getUserData();

        useEffect(() => {
            getUserData();
        }, [])

        var userkaname
        // console.log('above if', userkaname)
        getName();
        function getName(){
        if (userData){
            userkaname = userData.firstName;
            console.log('nasdca', userkaname);
            return userkaname;
        };
        }
        console.log('above if', userkaname)

    
    if (user != null) {
        // firstName = user.firstName;
        // lastName = user.lastName;
        // displayName = user.lastName;
        email = user.email;
        uid = user.id;  
    }

    // console.log('user credentials are:  ' + firstName, lastName, email, userId,)

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerWrapper}>
                <View style={styles.headerLeft}>
                    <FontAwesome5 style={styles.userLogo} name='user-circle' color={'white'} size={40} onPress={() => navigation.navigate('Profile')}/>
                    <Text style={styles.userText} onPress={() => navigation.navigate('Profile')}>Welcome {userkaname} 
                    {/* {userData.firstName} */}
                    </Text>
                    <StatusBar style='light'/>
                </View>

                <View style={styles.headerRight}>
                    <MaterialIcons style={styles.logoutLogo} name='logout' color={'white'} size={26} onPress={() => navigation.navigate('Login')}/>
                    <Text style={styles.logoutText} onPress={handleSignOut} >Logout</Text>
                </View>
            </View>

            <View style={styles.homeMiddleView}>
                <Text style={styles.homeText}>Report illegally parked vehicle in 30 seconds {'\n'} or less</Text>
            </View>
 
            <View style={styles.footerWrapper}>
                <View>
                    <Entypo style={styles.walletLogo} name='wallet' color={'white'} size={60} />
                </View>

                <View style={styles.cameraContainer}  >
                    <FontAwesome5 style={styles.cameraLogo} onPress={() => navigation.navigate('MakeReport')} name='camera' color={'white'} size={60} />
                </View>

                <View>
                <FontAwesome5 style={styles.footerUserLogo} name='user-circle' color={'white'} size={55} onPress={() => navigation.navigate('Profile')}/>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        paddingTop: 40,
        paddingHorizontal: 30,
        paddingBottom: 22,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#5570F1',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    userLogo: {
        paddingRight: 10,
        rotationY: 90,
    },
    logoutLogo: {
        rotation: 180,
        paddingHorizontal: 10,
    },
    userText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    homeMiddleView: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeText: {
        justifyContent: 'center',
        fontSize: 28,
        padding: 20,
        textAlign: 'center',
        paddingTop: 229,
        color: '#3F3E3E',
    },
    footerWrapper: {
        paddingTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#5570F1',
        justifyContent: 'space-around',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    cameraContainer: {
        position: 'relative',
        backgroundColor: '#5570F1',
        bottom: 60,
        width: 110,
        height: 110,
        borderRadius: 180 / 2,
        shadowColor: "#fff",
        shadowOffset: {
	width: 6,
	height: 6,
},
shadowOpacity: 0.55,
shadowRadius: 14.78,
elevation: 9,
    },
    cameraLogo: {
        position: 'relative',
        bottom: -20,
        left: 25,
        borderColor: 'white',
    },
});