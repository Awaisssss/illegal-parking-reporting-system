import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput, ScrollView, Button, TextComponent, Image, Keyboard } from 'react-native';
import colors from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Camera, CameraType } from 'expo-camera';
import { ImageBackground } from 'react-native';
import "firebase/compat/firestore";
import firebase from 'firebase/compat/app';
import { StatusBar } from 'expo-status-bar';
import { auth, firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// import firebase from "firebase/compat/app";
// import * as firebase from "firebase/compact/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getFirestore } from "firebase/firestore";
import { db } from '../firebase'
import { getDoc } from 'firebase/firestore';
import storage from '@react-native-firebase/storage';
import imagePlaceholder from '../assets/img/imagePlaceholder.jpg'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ActivityIndicator } from 'react-native-web';

export default MakeReport = ({navigation, photo, setPhoto}) => {
    // let imgSrc = '../assets/img/imagePlaceholder.jpg'
    // useEffect(() => {
    //     if(photo) {
    //         console.log("sdbajsbd",photo.uri)
    //         imgSrc = "data:image/jpg;base64," + photo.base64
     //     }
     // }, [photo])
//      //from
//      const storage = getStorage();
//      // Create the file metadata
//      /** @type {any} */
//      const metadata = {
//          contentType: 'jpg'
//         };
//         var uploadThis = photo
//         var src
//         var photoUri
//         if (photo)
//         {
//             photoUri = photo.uri
//             console.log('photouri', photoUri)
//         } 
//         else {console.log('no photouri')}
//         // Upload file and metadata to the object 'images/mountains.jpg'
                
//         if (photo){
//         const storageRef = ref(storage, 'reports/' + src);
//         console.log(typeof photoUri.uri);
//         const uploadTask = uploadBytesResumable(storageRef, photoUri, metadata);
    

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//     (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         // console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//         case 'paused':
//             console.log('Upload is paused');
//             break;
//         case 'running':
//             console.log('Upload is running');
//             console.log('photo url after running is:' + " " + photo.uri)

//             break;
//         }
//     }, 
//     (error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//         case 'storage/unauthorized':
//             // User doesn't have permission to access the object
//             break;
//         case 'storage/canceled':
//             // User canceled the upload
//             break;

//         // ...

//         case 'storage/unknown':
//             // Unknown error occurred, inspect error.serverResponse
//             break;
//         }
//     }, 
    // () => {
    //     // Upload completed successfully, now we can get the download URL
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //     });
    // }
//     );
// }
//     else
//     {console.log('no photo')}
//     //from
        // img = photo.uri
    const auth = getAuth();
    const user = auth.currentUser;
    let userId = user.uid;
    
    const getUserData = async () => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
                // console.log("Document data in makeReport:", docSnap.data());
            
            } else {
              // doc.data() will be undefined in this case
                console.log("No such document!");
        } 
    }
    // const [photo, setPhoto] = useState();
    const reportRef = firebase.firestore().collection('reports');
    const [addData, setAddData] = useState('');
    const [image, setImage] = useState();
    const [status, setStatus] = useState('pending')
    const [fbimage, setFbimage] = useState();
    const [location, setLocation] = useState('');
    const [numPlate, setNumPlate] = useState('');
    const [description, setDescription] = useState('');

    const [uploading, setUploading] = useState(false);


    ///
    // var url
    // const uploadImageFb = async () => {
    //     const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload = function() {
    //             resolve(xhr.response);
    //         };
    //         xhr.onerror = function() {
    //             reject(new TypeError('Network request failed'));
    //         };
    //     console.log('working')
    //         xhr.responseType = 'blob';
    //         xhr.open('GET', photo.uri, true);
    //         xhr.send(null);
    //     });
    //     console.log('hi', photo)
    //     console.log('hi2', blob)


    //     // const storageRef = ref(storage, 'reports/' + src);
    //     const ref = firebase.storage().ref().child(new Date().toISOString());
    //     const snapshot = ref.put(blob)
        
    //     snapshot.on(
    //         firebase.storage.TaskEvent.STATE_CHANGED,
    //         () => {
    //             setUploading(true);
    //         },
    //         (error) => {
    //             setUploading(false)
    //             console.log(error);
    //             blob.close()
    //             return
    //         },
    //         () => {
    //             snapshot.snapshot.ref.getDownloadURL().then(
    //                 (url) => {
    //                     setUploading(false)
    //                     console.log('download url: ', url);
    //                     setImage(url)
    //                     blob.close();
    //                     return url;
    //                 }
    //             );
    //         }
    //     );
    // };
    ///

    const addReport = async () => {
        // const test = photo.base64
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
        console.log('working')
            xhr.responseType = 'blob';
            xhr.open('GET', photo.uri, true);
            xhr.send(null);
        });
        // console.log('hi', photo)
        // console.log('hi2', blob)


        // const storageRef = ref(storage, 'reports/' + src);
        const ref = firebase.storage().ref().child(new Date().toISOString());
        const snapshot = ref.put(blob)
        console.log('image uploaded to firebase storage')

        snapshot.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                setUploading(true);
                
            },
            (error) => {
                setUploading(false)
                console.log(error);
                console.log('console error');
                blob.close()
                return
            }
            ,
            () =>
            {
                snapshot.snapshot.ref.getDownloadURL().then(
                    (url) => {
                        setUploading(false)
                        console.log('download url: ', url);
                        // console.log('1');
                        // setFbimage(url)
                        // console.log('2');
                        // setImage(url)
                        // blob.close();
                        // setFbimage(url)
                        // return url;
                        const data = { 
                            userId,
                            fbimage: url,
                            location,
                            numPlate,
                            description,
                            status,
                        };
                    reportRef
                    .add(data)
                    .then(() => {
                        // console.log('1')
                        // console.log('2')
            
                        setLocation(undefined),setNumPlate(undefined),setDescription(undefined), setPhoto(undefined);
                            console.log('report submitted!')
                            // console.log('dsvnasdn', photo)
                            Submittedalert()
                            Keyboard.dismiss()
                            // Alert.alert('Report submitted.')
                            // setPhoto(photo)
                        })
                        .catch((error)=>{
                            alert(error);
                            console.log('erorrrrrrrr')
                        })
                    }
                    ).then(() => {
                        // console.log('yhn', url)
                        
                })
            }
        );
        
        // console.log('download url in addReport: ', url);
        // const data = { 
        //     userId,
        //     fbimage,
        //     location,
        //     numPlate,
        //     description,
        // };
        // reportRef
        // .add(data)
        // .then(() => {
        //     // console.log('1')
        //     // console.log('2')

        //     setLocation(undefined),setNumPlate(undefined),setDescription(undefined);
        //         console.log('report submitted')
        //         // console.log('dsvnasdn', photo)
        //         Keyboard.dismiss()
        //         // Alert.alert('Report submitted.')
        //         Submittedalert()
        //         // setPhoto(photo)
        //     })
        //     .catch((error)=>{
        //         alert(error);
        //     })
    };

    const Submittedalert = () => {
        Alert.alert(
            "Report submitted",
            "Thankyou for reporting an illegally parked vehicle.",
            [
            { text: "OK", onPress:() => navigation.navigate('Home') }
            ]
        );
        setPhoto(null)
    };


    const CamAlert = () => {
        Alert.alert(
            "Camera permission",
            "Allow to access the camera",
            [
            {
                text: "Cancel",
                onPress: () => console.log("Canceled"),
                style: "cancel"
            },
            { text: "Allow", onPress:() => navigation.navigate('CamScreen') }
            ]
        );
    };

    const printLoc = (props) => {
        const loc = props.loc;
        console.log('photo url from MakeReport is : ', photo.uri)
    }

    function toggleCameraType() {
        setType((current) => (
        current === CameraType.back ? CameraType.front : CameraType.back
        ));
    }
    var Imgsource;
    if(photo){
        var Imgsource = photo.uri
        // console.log('img src',Imgsource)
    }else{
        // console.log('ntg')
        null
    }
    // console.log('img src out of if',Imgsource)
    
    return (
        <ScrollView>
        <KeyboardAvoidingView style={styles.container}>

        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
            {/* <Img/> */}
                <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name='arrow-back-ios' size={18}/>
                </TouchableOpacity>
                <Text style={styles.detailText}>Details</Text>
                <StatusBar style='dark'/>
            </View>

            {/* <TouchableOpacity style={styles.uploadConatiner} onPress={alert}>
                <Image source={imgSrc} style={styles.uploadImg} 
                value={image} onChangeText={(image) => setImage(image) } */}
                <TouchableOpacity style={styles.uploadConatiner} onPress={CamAlert}>
                {/* <Image source={{uri: photo ? "data:image/jpg;base64," + photo.base64 : 'http://bissauwelfaretrust.org/wp-content/uploads/2018/07/Placeholder.jpg' }} */}
                <Image source={{uri: photo ? "data:image/jpg;base64," + photo.base64 : 'http://bissauwelfaretrust.org/wp-content/uploads/2018/07/Placeholder.jpg' }}
                style={styles.uploadImg} 
                onChangeText={() => {setFbimage(photo), console.log('jdshaf')} }
                ></Image>
            {/* </Camera> */}
            </TouchableOpacity>

            <View style={styles.locationContainer}>
                <Text style={styles.locationText} onPress={printLoc}>Location</Text>
                <View style={styles.locationContainer2}>
                <Image source={require('../assets/img/location.png')} size={20} style={styles.locationImg} onPress={printLoc}/>
                <TextInput style={styles.input} onChangeText={(location) => setLocation(location)}
                value={location} placeholder='Enter your location'></TextInput>
                </View>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText} onPress={getUserData}>Description</Text>
                <TextInput style={styles.desInput1} onChangeText={(text) => setNumPlate(text)}
                        value={numPlate} placeholder='Enter number plate'></TextInput>
                <TextInput style={styles.desInput2} onChangeText={(text) => setDescription(text)}
                        value={description} multiline={true} placeholder='Any further comments?'></TextInput>
            </View>

            <TouchableOpacity style={styles.btn} onPress={addReport}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginTop: 20,
        borderBottomWidth: 3,
        paddingBottom: 15,
        borderColor: '#F7F8F9',
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
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 50,
        marginHorizontal: 105,
    },
    uploadConatiner: {
        marginHorizontal: 30,
        marginVertical: 25,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9eef1',
        // backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 30,
        
    },
    uploadImg: {
        // flex: 1,
        height: 180,
        width: '100%',
        resizeMode: 'contain',
    },
    uploadText: {
        fontSize: 22,
        paddingTop: 20,
        fontWeight: '600',
    },
    locationContainer: {
        paddingHorizontal: 30,
        borderTopWidth: 2,
        paddingTop: 15,
        borderColor: '#F7F8F9',
        borderBottomWidth: 2,
        paddingBottom: 15,
    },
    locationText: {
        fontSize: 20,
        fontWeight: '500'
    },
    locationContainer2: {
        flexDirection: 'row',
        marginTop: 15,
    },
    input: {
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        backgroundColor: colors.grey,
        margin: 10,
        height: 40,
        borderRadius: 8,
        borderColor: '#DADADA',
        borderWidth: 1,
    },
    locationImg: {
        resizeMode: 'contain',
        width: 50, 
        height: 50
    },
    descriptionContainer:{
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    descriptionText:{
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 15,
    },
    desInput1:{
        backgroundColor: colors.grey,
        borderRadius: 8,
        borderColor: '#DADADA',
        borderWidth: 1,
        height: 40,
        paddingHorizontal: 15,
    },
    desInput2:{
        marginTop: 15,
        backgroundColor: colors.grey,
        borderRadius: 8,
        borderColor: '#DADADA',
        borderWidth: 1,
        height: 110,
        paddingHorizontal: 15,
        textAlignVertical: "top",
        paddingTop: 10,
    },
    btn: {
        alignItems: 'center',
        height: 45,
        marginTop: 40,
        margin: 30,
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