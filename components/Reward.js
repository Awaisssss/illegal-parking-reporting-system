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
// import { FlatList } from 'react-native-web';
// import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';



export default Reward = ({navigation}) => {

    // const [isRedeemable, setIsRedeemable] = useState(false)
    // let isRedeemable = true;

    const [coupons, setCoupons] = useState([])
    const [isLoading, setLoading] = useState(true);
    const reportsRef = firebase.firestore().collection('coupons')
    // const getUserReports = async () => {
    // useEffect(() => {
    //     reportsRef
    //     .onSnapshot(
    //         querySnapshot => {
    //             // const UserReports = []
    //             querySnapshot.forEach((doc) => {
    //                 const {description, couponPoints, image, companyName, } = doc.data()
                    
    //                 coupons.push({
    //                     companyName,
    //                     couponPoints,
    //                     description,
    //                     image,
    //                 })
    //                     setCoupons(coupons)
    //                 })
    //                 console.log('coupons: ' + JSON.stringify(coupons));
    //                 // console.log('typecoupons: ' + typeof(coupons));

    //         }
    //         )
    //     }, [])
    
    useEffect(() => {
        const fetchCoupons = async() => {
            try {
                    const list = [];
                    await firebase.firestore().collection('coupons')
                    .get()
                    .then((querySnapshot) => {
                        // console.log('total: ' + querySnapshot.size);
                        querySnapshot.forEach(doc => {
                        const {companyName, couponPoints, image, description} = doc.data();
                        list.push({
                            id: doc.id,
                            companyName,
                            couponPoints,
                            image,
                            description,
                        })
                    })
                    
                })
                
                    setCoupons(list);
                    setLoading(false);

                console.log('coupppps: ', list);
                }
                catch(e) {
                    console.log(e)
                }
            }
            fetchCoupons();
        }, [])
        
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
                    200  
                    <Text style={styles.pointsText}> points</Text>
                </Text>
            </View>

                <View style={styles.View} >
                {isLoading ? (<ActivityIndicator size='large' color='#5570F1'/>) : 
                (
                        <View style={styles.bigCouponContainer}>
                    {coupons.map((item, index) => (
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
</View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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


