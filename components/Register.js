import React, {useState, useRef} from 'react';
import { Text, StyleSheet, View, SafeAreaView,TextInput, Alert, ScrollView, Button } from 'react-native';
import colors from '../assets/colors';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";


export default Register = ({navigation}) => {

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // const [email, setEmail] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [userImg, setuserImg] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    const handleSignup = () => {
        if (password !== cPassword) {
            alert("Oops! passwords doesn't match!")
            return
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const uid = userCredentials.user.uid
                const data = {
                    id: uid,
                    email,
                    firstName,
                    lastName,
                    userImg,
                };
            // navigation.navigate("ForgotPass")
            // AccountAddedAlert();
            const usersRef = firebase.firestore().collection('users')
            usersRef
            .doc(uid) 
            .set(data)
            // navigation.navigate("ForgotPass")
            .then(() => {
                    console.log('Account added1')
                    // navigation.navigate("Login", {user})
                    console.log('Account added2')
                })
                .catch((error) => {
                    // alert(error)
                });
            // const user = userCredentials.user;
            // console.log(user.email)
            // console.log('Account added')
        })
        .catch(error => alert(error.message));
                    // navigation.navigate("ForgotPass")   
    }

    const AccountAddedAlert = () => {
        Alert.alert(
            "Account added successfully!",
            "Please login to use our app.",
            [
            { text: "OK", onPress:() => navigation.navigate('Login') }
            ]
        );
        // setPhoto(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.register}>
                <Text style={styles.regtex}>
                Register
                </Text>
            </View>
            <ScrollView> 
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <TextInput placeholder='First Name' 
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                        ></TextInput>
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder='Last Name' 
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                        ></TextInput>
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder='Email Address' value={ email } autoCapitalize="none"
                        //  keyboardType="email-address"
                        onChangeText={text => setEmail(text)} 
                        ></TextInput>
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder='Password' secureTextEntry
                        value={ password } 
                        onChangeText={text => setPassword(text)} 
                        ></TextInput>
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder='Confirm Password' secureTextEntry
                        onChangeText={(text) => setCPassword(text)}
                        value={cPassword}
                        ></TextInput>
                    </View>

                </View>

                <TouchableOpacity style={styles.regBtn} onPress={handleSignup} 
                // onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.regBtntxt} >Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    register:{
        alignItems: 'center', 
        marginTop: 120,
        marginBottom:20,
    },

    regtex:{
        fontSize: 40,
        fontWeight: '600',

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

    regBtn: {
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: "#5570f1",
    borderColor: '#5570f1',
    marginTop: 20,
    },

    regBtntxt: {
    color: 'white',
    },
})


