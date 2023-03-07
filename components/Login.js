import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, View, SafeAreaView,TextInput, TouchableOpacity, KeyboardAvoidingView , Button, ScrollView } from 'react-native';
import colors from '../assets/colors';
import { auth } from '../firebase';
import 'expo-dev-client';
import "firebase/compat/firestore";
import firebase from 'firebase/compat/app';

import {useRef} from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


export default Login = ({navigation}) => {

    // const [phone, setPhone] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')
    const [code, setCode] = useState();
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    // const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("Home")
        }
        })
    
        return unsubscribe
    }, [])

    // const handleLogin = () => {
    //     auth
    //     .signInWithEmailAndPassword(phone, password)
    //     .then(userCredentials => {
    //         const user = userCredentials.user;
    //         console.log('Logged in with:', user.email);
    //         console.log('Logged in')
    //     })
    //     .catch(error => alert(error.message))
    // }
    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(phone, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        // navigation.navigate('login')
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
        // navigation.navigate('ForgotPass')
      };

      const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          code
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            // Do something with the results here
            console.log(result);
          });
      }

    return (
        // <ScrollView>
        // <KeyboardAvoidingView style={styles.container}> 

        <SafeAreaView style={styles.container}>
        <View>
        <Text style={styles.welcomeText}>
            Welcome back!{'\n'}Glad to see you, again.
        </Text>
        <Text style={styles.subText}>
            Please login to continue using our App.
        </Text>
        </View>

        <View style={styles.inputContainer}>
            <View style={styles.input}>
                <TextInput placeholder='Please enter your phone number' 
                // onBlurCapture={() => setInputFocused(true)}
                // value={ +91 } 
                // keyboardType="email-address"
                // onChangeText={text => setPhone(text)} 
                // autoCapitalize="none"
                onChangeText={setPhoneNumber}
                // onFocus="document.getElementsByClassName('footerW2').style.display='none'"
                keyboardType="phone-pad"
                autoCompleteType="tel"
                // keyboardType='number-pad' 
                >+91</TextInput>
            </View>

            <View style={styles.input}>
                <TextInput placeholder='Please enter OTP'
                // onFocus={() => setInputFocused(true)}
                // value={ password } 
                // onChangeText={text => setPassword(text)} 
                // secureTextEntry 
                onChangeText={setCode}
                keyboardType="number-pad"
                >
                </TextInput>
            </View>
        </View>

        {/* <View style={styles.forgotText} >
            <Text onPress={() => navigation.navigate('ForgotPass')}>Forgot password?</Text>
        </View> */}

        {/* <TouchableOpacity style={styles.loginBtn} 
        // onPress={() => navigation.navigate('Home')}
        // onPress={handleLogin}
        onPress={onLoginPress}
        >
        <Text style={styles.loginBtntxt}>Login</Text>
        </TouchableOpacity>
         */}

        <TouchableOpacity style={styles.loginBtn} 
        // onPress={() => navigation.navigate('Home')}
        // onPress={handleLogin}
        onPress={sendVerification}
        >
        <Text style={styles.loginBtntxt}>sendVerification</Text>
        </TouchableOpacity>

        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options}/>

        <TouchableOpacity style={styles.loginBtn} 
        // onPress={() => navigation.navigate('Home')}
        // onPress={handleLogin}
        onPress={confirmCode}
        >
        <Text style={styles.loginBtntxt}>verifyOTP</Text>
        </TouchableOpacity>
        
            <View style={styles.footerW2}>
            {/* <Text>{inputFocused ? null : "Didn't recieve code?"}</Text> */}
            <Text>Didn't recieve code?</Text>
            <Text style={styles.regText} 
            onPress={sendVerification}
            >
            Resend.</Text>
            </View>
        </SafeAreaView>
        // </KeyboardAvoidingView>
        // </ScrollView>
         
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingTop: 50,
        margin: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 50,
        justifyContent: 'center',
        textAlign: 'center'
    },
    subText: {
        fontSize: 18,
        marginTop: 60,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '300',
        marginBottom: 20,
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
    forgotText: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10,
    },
    
    loginBtn: {
        alignItems: 'center',
        height: 45,
        marginTop: 30,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: "#5570f1",
        borderColor: '#5570f1',
    },  
    loginBtntxt: {
        color: 'white',
        fontSize: 20,
    },
    footerW2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        right: 50,
        left: 50,
        bottom: 10
    },
    regText: {
        marginHorizontal: 5,
        color: colors.blue,
    }
})


// input: {
//     backgroundColor: colors.grey,
//     flex: 1,
//     marginTop: 20,
//     borderRadius: 10,
//     paddingLeft: 20,
//     fontSize: 16,
// },
// forgot: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginLeft: 230,
//     marginTop: 10,
//     fontWeight: '300',
// },