import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import colors from '../assets/colors';

export default FirstPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/img/home_img.png')} style={styles.heroImg}/>
        </View>
        <Text style={styles.heroText}>Snap Illegal Parking</Text>
        <Text style={styles.heroText2}>Reporting illegally parked vehicle{'\n'}just got easier.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>
                Get Started
            </Text>
        </TouchableOpacity>
        </SafeAreaView>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        
    },
    imgContainer:{
        height: 300,
        marginTop: 60,
    },
    heroImg:{
        flex: 1,
        marginLeft: 5,
        width: 380,
        resizeMode: 'contain'
    },
    heroText: {
        fontSize: 40,
        lineHeight: 50,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 60,
    },
    heroText2: {
        marginTop: 60,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    btn: {
        alignItems: 'center',
        height: 45,
        marginTop: 70,
        margin: 80,
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: "#5570f1",
        borderColor: '#5570f1',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    }
    })