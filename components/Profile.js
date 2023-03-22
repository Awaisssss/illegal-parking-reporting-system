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
import firebase from 'firebase/compat/app'; 


export default Profile = ({navigation}) => {

    const auth = getAuth();
    const user = auth.currentUser;
    let userId = user.uid;
    const [count, setCount] = useState()
    const [totalPoints, SetTotalPoints] = useState()
    // const [profilePoints, setProfilePoints] = useState()
    //
        useEffect(() => {
        console.log("top uid " + userId);
        firebase.firestore().collection('reports')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
    // Process the query results here
            const count = querySnapshot.size;
            setCount(count)
            console.log(`Number of documents: ${count}`);
            // querySnapshot.forEach(documentSnapshot => {
                // console.log('hi');
                // const totalPoints = querySnapshot.docs.reduce((acc, doc) => {
                //     const points = doc.data().points || 0; // handle missing points field
                //     return acc + points;
                    
                //   }, 0);
                  //
                //   console.log("userdata " + JSON.stringify(documentSnapshot.data()));
                //   SetTotalPoints(totalPoints)
                //   console.log(`Total points: ${totalPoints}`);
                // });
            });
}, []);

    //
    // getUserReports();
    const [UserReports, setUserReports] = useState([])
    const reportsRef = firebase.firestore().collection('reports').where('userId', '==', userId)
    // const getUserReports = async () => {
    useEffect(() => {
        reportsRef
        .onSnapshot(
            querySnapshot => {
                // const UserReports = []
                querySnapshot.forEach((doc) => {
                    const {description, userId } = doc.data()
                    
                    UserReports.push({
                        id: doc.id,
                        description,
                        userId,
                    })
                        setUserReports(UserReports)
                    })
                    console.log('hamamama ' + JSON.stringify(UserReports));
            }
            )
        }, [])
    // };
    //
    let [userData, setUserData] = useState({});
    
    const [userPoints, setUserPoints] = useState(0);

    const getUserData = async () => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        setUserPoints(docSnap.data().points);
        console.log(userPoints);

        if (docSnap.exists()) {
                // console.log("Document data in Profile:", docSnap.data());
            
            } else {
              // doc.data() will be undefined in this case
                // console.log("No such document!");
                console.log("current user's uid: " + user.uid);
        } 
    }
    //
    // const objectsRef = db.collection('objects');
    // objectsRef.get().then((querySnapshot) => {
    
    //   // calculate total points
    //   const totalPoints = querySnapshot.docs.reduce((acc, doc) => {
    //     const { points } = doc.data();
    //     return acc + points;
    //   }, 0);
    
    //   // log total points
    //   console.log(`Total points: ${totalPoints}`);
    // })
    //

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
    
    const [allReports, setAllReports] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllReports = async() => {
            try {
                    const allReportsList = [];
                    await firebase.firestore().collection('reports').where('userId', '==', userId)
                    .get()
                    .then((querySnapshot) => {
                        // console.log('total: ' + querySnapshot.size);
                        querySnapshot.forEach(doc => {
                        const {status, fbimage, createdAt} = doc.data();
                        allReportsList.push({
                            id: doc.id,
                            status,
                            fbimage,
                            createdAt: doc.createdAt,
                        })
                    })
                    
                })
                
                    setAllReports(allReportsList);
                    setLoading(false);

                console.log('all reports: ', allReportsList);
                }
                catch(e) {
                    console.log(e)
                }
            }
            fetchAllReports();
        }, [allReports])

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name='arrow-back-ios' size={18}/>
                </TouchableOpacity>
                <Text style={styles.detailText}>Profile</Text>
                <StatusBar style='dark'/>
        </View>

        <View style={styles.userContainer}>
        <Text style={styles.userText}>Current User: {user.phoneNumber}</Text>
        </View>

        {/* <View style={styles.profileContainer}> */}
            {/* <FontAwesome5 style={styles.userLogo} name='user-circle' color={'white'} size={80} /> */}
            {/* <View style={styles.textContainer}> */}
                {/* <Text style={styles.text1}>{userData.firstName} {userData.lastName}</Text> */}
                {/* <Text style={styles.text2}>{userData.email}</Text> */}
            {/* </View> */}
            {/* <MaterialIcons name='edit' size={26}  color={'white'} onPress={() => navigation.navigate('UpdateProfile')}/> */}
        {/* </View> */}

        <View style={styles.infoContainer}>
        <View style={styles.leftInfo}>
            <Text style={styles.text}>Total Reports</Text>
            <View style={styles.leftCircle}>
                <Text style={styles.text}>
                    <Text style={styles.innerText}>
                    {count}
                    </Text>
                    </Text>
            </View>
        </View>
        <View style={styles.middleInfo}></View>
        <View style={styles.rightInfo}>
            <Text style={styles.text}>Total Rewards</Text>
            <View style={styles.rightCircle}>
                <Text style={styles.text}>
                <Text style={styles.innerText}>
                    {userPoints}
                    </Text>
                    </Text>
            </View>
        </View>
        </View>

        {/* <View style={styles.reportsVIew}>
            <Text style={styles.yourReports}>Your reports -</Text>
            <ScrollView>

            <View style={styles.reportsInnerVIew}>
            {allReports.map((report) => (
                <View key={report.id}>
                <View style={styles.reportsVeryInnerVIew} elevation={5}>
                <Image style={styles.reportImage} source={{uri: report.fbimage}}/>
                <View style={styles.mainText}>
                    <Text style={styles.titleText}>Reported on</Text>
                    <Text style={styles.timeText}>{report.createdAt}</Text>
                </View>
                <View style={styles.mainText}>
                    <Text style={styles.titleText}>Status</Text>
                    <Text style={styles.statusText}>{report.status}</Text>
                </View>
                </View>
            </View>
            ))}
            </View>
            </ScrollView>
        </View> */}

        <View style={styles.logoutView}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSignOut}>
                    <Text style={styles.loginBtntxt}>Logout</Text>
        </TouchableOpacity>
        </View>

        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    mainText:{
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: '600'

    },
    statusText: {
        // justifyContent: 'center',
        fontSize: 18,
        alignSelf: 'center',
        paddingVertical: 15,
        // backgroundColor: 'red'
        // paddingVertical: 20,
    },

    timeText: {
        // justifyContent: 'center',
        fontSize: 18,
        alignSelf: 'center',
        paddingVertical: 15,
        // backgroundColor: 'red'
        // paddingVertical: 20,
    },
    // imageView: {
    //     height: 40,
    //     width: 40,
    //     backgroundColor: 'yellow',
    // },
    yourReports: {
        fontSize: 26,
        fontWeight: '700',
        paddingLeft: 30,
    },
    reportsVeryInnerVIew: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        // paddingVertical: 20,
        // height: 100,
        marginVertical: 20,
        // backgroundColor: 'yellow',
        shadowColor: "#000000",
    shadowOpacity: 0.8,
    // shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    }
        
    },
    reportImage:{
        width: 100,
        resizeMode: 'contain',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        borderRadius: 20,
    },
    reportsInnerVIew: {
        // backgroundColor: 'yellow',
        // flexDirection: 'row',
        flexDirection: 'column',
        // paddingVertical: 20, 
    },
    reportsVIew: {
        flex: 1,
        flexDirection: 'column',
        // borderWidth: 2,
        marginTop: 20,
        // justifyContent: 'space-between',
        // flexDirection: 'row',
    },
    middleInfo: {
        borderRightWidth: 3,
        borderColor: 'lightgrey',
    },
    innerText: {
        fontSize: 40,
        fontWeight: '500',
    },
    userText:{
        fontSize: 22,
        color: 'white',
        fontWeight: '600',
    },
    userContainer: {
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingBottom: 20,

    },
    container: {
        flex: 1,
        // paddingTop: '5%'
    },
    headerWrapper: {
        paddingTop: 40,
        paddingHorizontal: 30,
        paddingBottom: 22,
        flexDirection: 'row',
        // justifyContent: 'center',
        backgroundColor: '#5570F1',
        // borderBottomEndRadius: 20,
        // borderBottomStartRadius: 20,
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
        // paddingVertical: 20,
        paddingTop: 20,
        justifyContent: 'space-evenly',
        // backgroundColor: 'yellow',

    },
    rightInfo: {
        // paddingLeft: 40,
        alignItems: 'center'
    },
    leftInfo: {
        // paddingLeft: 50,
        // paddingRight: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 5,
    },
    leftCircle: {
        marginTop: 10,
        marginBottom: 10,

    },
    rightCircle: {
        marginTop: 10,
        marginBottom: 10,

    },
    loginBtn: {
        alignItems: 'center',
        height: 45,
        margin: 40,
        // marginTop: 290,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: "#5570f1",
        borderColor: '#5570f1',
    },  
    loginBtntxt: {
        color: 'white',
        fontSize: 20,
    },
    logoutView: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        // marginTop: 20,
        // backgroundColor: 'red',
    },
})