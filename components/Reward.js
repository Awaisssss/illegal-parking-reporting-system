import React, {useState, useRef, useEffect} from 'react';
import { Text,FlatList, StyleSheet, View, SafeAreaView, Image, TextInput, Alert, ScrollView, Button, ActivityIndicator } from 'react-native';
import colors from '../assets/colors';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { async } from '@firebase/util';
import {getAuth} from 'firebase/auth'
import { doc } from 'firebase/firestore';
import { app, db } from '../firebase'
import { getDoc } from 'firebase/firestore';


// import { FlatList } from 'react-native-web';
// import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';



export default Reward = ({navigation}) => {

    // const [isRedeemable, setIsRedeemable] = useState(false)
    // let isRedeemable = true;

    const [allCoupons, setAllCoupons] = useState([])
    const [redeemedCoupons, setRedeemedCoupons] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState('allCoupons');
    const reportsRef = firebase.firestore().collection('coupons')
  
    const allCouponsPress = () => {
        setActiveButton('allCoupons'); 
    };

      const redeemedCouponsPress = () => {
        setActiveButton('redeemedCoupons'); 
      };

      const renderCoupons = () => {
        if (activeButton === 'allCoupons') {
          return (
            <View style={styles.View} >
                    <ScrollView>

                {isLoading ? (<ActivityIndicator size='large' color='#5570F1'/>) : 
                (
                    <View style={styles.bigCouponContainer}>
                    {allCoupons.map((item, index) => (
                        <View key={index}> 
                        <View style={styles.couponContainer}>
                        
                        <View style={styles.couponLeft}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                </View>
                <View style={styles.couponRight}>
                {/* {coupons.map(item => ( */}
                {/* <Text style={styles.couponCompany} key={item.id}>{item.companyName}</Text> */}
                <Text style={styles.couponCompany} >{item.companyName}</Text>
                {/* ))} */}
                <Text style={styles.couponOffer}>{item.description}</Text>
                <TouchableOpacity style={[styles.redeemBtn]} >
                <Text style={styles.redeemText}>
                    {item.couponPoints} points
                </Text>
                </TouchableOpacity>
                </View>
            </View>
                </View> 
                ))}
            </View>
                )
            }
            </ScrollView>
            </View>
          );
        } else {
          return (
            <View style={styles.View} >
                    <ScrollView>

                {isLoading ? (<ActivityIndicator size='large' color='#5570F1'/>) : 
                (
                    <View style={styles.bigCouponContainer}>
                    {redeemedCoupons.map((item, index) => (
                        <View key={index}> 
                        <View style={styles.couponContainer}>
                        
                        <View style={styles.couponLeft}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                </View>
                <View style={styles.couponRight}>
                {/* {coupons.map(item => ( */}
                {/* <Text style={styles.couponCompany} key={item.id}>{item.companyName}</Text> */}
                <Text style={styles.couponCompany} >{item.companyName}</Text>
                {/* ))} */}
                <Text style={styles.couponOffer}>{item.description}</Text>
                <TouchableOpacity style={[styles.redeemBtn]} >
                <Text style={styles.redeemText}>
                    {item.couponPoints} points
                </Text>
                </TouchableOpacity>
                </View>
            </View>
                </View> 
                ))}
            </View>
                )
            }
            </ScrollView>
            </View>
          );
        }
      };

      const [profilePoints, setProfilePoints] = useState(null);
      useEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const userPoints = doc.data().points;
              console.log('psafdpasmdfsnd: ', userPoints );
              setProfilePoints(userPoints);
            }
            
        });
        return () => {
            unsubscribe();
        };
    }, []);
    console.log('psafdpasmdfsnd poinsansda: ', profilePoints );

    const auth = getAuth();
    const user = auth.currentUser;
    let userId = user.uid;
    
    useEffect(() => {
        const fetchAllCoupons = async() => {
            try {
                    const allCouponsList = [];
                    await firebase.firestore().collection('coupons').where('redeemable', '==', true)
                    .get()
                    .then((querySnapshot) => {
                        // console.log('total: ' + querySnapshot.size);
                        querySnapshot.forEach(doc => {
                        const {companyName, couponPoints, image, description} = doc.data();
                        allCouponsList.push({
                            id: doc.id,
                            companyName,
                            couponPoints,
                            image,
                            description,
                        })
                    })
                    
                })
                
                    setAllCoupons(allCouponsList);
                    setLoading(false);

                // console.log('all coupppps: ', allCouponsList);
                }
                catch(e) {
                    console.log(e)
                }
            }
            fetchAllCoupons();
        }, [allCoupons])

        useEffect(() => {
            const fetchRedeemedCoupons = async() => {
                try {
                        const redeemedCouponslist = [];
                        await firebase.firestore().collection('coupons').where('redeemable', '==', false)
                        .get()
                        .then((querySnapshot) => {
                            // console.log('total: ' + querySnapshot.size);
                            querySnapshot.forEach(doc => {
                            const {companyName, couponPoints, image, description} = doc.data();
                            redeemedCouponslist.push({
                                id: doc.id,
                                companyName,
                                couponPoints,
                                image,
                                description,
                            })
                        })
                        
                    })
                    
                        setRedeemedCoupons(redeemedCouponslist);
                        setLoading(false);
    
                    // console.log('redeemed coupppps: ', redeemedCouponslist);
                    }
                    catch(e) {
                        console.log(e)
                    }
                }
                fetchRedeemedCoupons();
            }, [redeemedCoupons])
        
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name='arrow-back-ios' size={18}/>
                </TouchableOpacity>
                <Text style={styles.detailText}>Rewards</Text>
                <StatusBar style='dark'/>
            </View> 

            <View style={styles.balanceView}>
                <Text style={styles.balanceText}>
                    YOUR BALANCE
                </Text>
                <Text style={styles.balancePoints}>
                    {profilePoints}  
                    <Text style={styles.pointsText}> points</Text>
                </Text>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity><Text style={[styles.tabsText, activeButton === 'allCoupons' && styles.activeTabsButton]} onPress={allCouponsPress}>All coupons</Text></TouchableOpacity>
                <Text style={styles.tabsText}>|</Text>
                <TouchableOpacity><Text style={[styles.tabsText, activeButton === 'redeemedCoupons' && styles.activeTabsButton]} onPress={redeemedCouponsPress}>Redeemed coupons</Text></TouchableOpacity>
            </View>

                {renderCoupons()}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabs: {
        // flex: 1,
        justifyContent: 'space-evenly',
        paddingVertical: 4,
        flexDirection: 'row',
    },
    tabsText: {
        letterSpacing: 1.5,
        fontSize: 20,
        fontWeight: '500',
        // color: colors.blue,
        color: 'grey',
    },
    activeTabsButton: {
        color: colors.blue,
    },
    View:{
        flex: 1,
        flexDirection: 'column',
    },
    bigCouponContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        
        // paddingTop: '5%'
    },
    headerWrapper: {
        paddingTop: 40,
        paddingHorizontal: 30,
        paddingBottom: 18,
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
    balanceView:{
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopWidth: 1,
        borderColor: 'white',
        paddingTop: 8,
        paddingBottom: 6,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    balanceText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 3,
    },
    balancePoints: {
        color: 'white',
        fontSize: 38,
        fontWeight: '700',
        letterSpacing: 2,
    },
    pointsText: {
        fontSize: 25,
        fontWeight: '400',
        letterSpacing: 1,
    },
    couponContainer: {
        // flexDirection: 'column',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      couponLeft: {
        // backgroundColor: 'red',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderColor: 'lightgrey',
        
        // borderWidth: 1,
        // borderRadius: 10,
        
        borderRightWidth: 2,
      },
      couponRight: {
        // backgroundColor: 'yellow',
        height: 100,
        width: 200,
        paddingLeft: 8,
      },
      image: {
        width: 70,
        resizeMode: 'contain',
        height: 80,
        marginRight: 16,
        justifyContent: 'center',
        alignSelf: 'center',
      },
      couponCompany: {
        fontSize: 22,
        fontWeight: '900',
        color: 'grey',
        letterSpacing: 2,
      },
      couponOffer: {
        fontSize: 16,
        color: 'grey',
        fontWeight: '600',
      },
      redeemBtn: {
        width: 100,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 8,
        height: 30,
        },
        redeemText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
        // backgroundColor: isRedeemable ? 'red' : 'grey',
        },
      
})


