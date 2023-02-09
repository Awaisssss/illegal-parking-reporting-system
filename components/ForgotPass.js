import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView,TextInput, ScrollView, Button } from 'react-native';
import colors from '../assets/colors';
import { TouchableOpacity } from 'react-native';

export default ForgotPass = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.forgotpass}>
                Forgot Password?
                </Text>
                <Text style={styles.forgotpasstxt}>
                Don't worry! it occurs. Please enter the phone number linked with your account.
                </Text>

            </View>
            <View style={styles.input}>
                <TextInput placeholder='Enter your Phone Number' keyboardType='number-pad'></TextInput>
            </View>
                <TouchableOpacity style={styles.sendcodeBtn}>
                    <Text style={styles.sendcodetxt}>Send Code</Text>
                </TouchableOpacity>

                <View style={styles.rempass}>
                    <Text>
                        Remember password? 
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.logintxt} onPress={() => navigation.navigate('Login')}>
                            Login
                        </Text>
                    </TouchableOpacity> 
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 150,
        marginHorizontal: 10,
    },

    forgotpass: {
        fontSize: 35,
        fontWeight:'600',
        paddingLeft: 10,
        marginBottom: 12,
    },

    forgotpasstxt: {
        marginTop: 10,
        fontSize: 18,
        marginHorizontal: 10,
        color: '#8391A1',
        marginBottom: 20,
    },

    input: {
        textAlign: 'center',
        padding: 10,
        paddingLeft: 20,
        backgroundColor: colors.grey,
        margin: 15,
        height: 50,
        borderRadius: 8,
        borderColor: '#DADADA',
        borderWidth: 1,
        backgroundColor: '#F7F8F9',
    },

    sendcodeBtn: {
        marginHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "#5570f1",
        borderColor: '#5570f1',
        height: 50,
        alignItems: 'center',
        paddingTop: 12,
        borderRadius: 8,
    },

sendcodetxt: {
        color: 'white',
},

        rempass: {
        flexDirection: 'row',
        justifyContent: 'center', 
        position: 'absolute', 
        right: 50,
        left: 50,
        bottom: 30,
        },
        
        logintxt: {
        color: '#5570f1',
        fontWeight: '600',
        marginLeft: 5,
}
    
})