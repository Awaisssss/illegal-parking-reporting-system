import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MakeReport from './MakeReport';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function App({navigation, setPhoto, photo}) {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  // const [photo, setPhoto] = useState('');

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    console.log('photo clicked')
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    // let uploadPhoto = async () => {
    //   let options = {
    //     quality: 1,
    //     base64: true,
    //     exif: false
    //   };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    // console.log('asndask',newPhoto)
    setPhoto(newPhoto);
  };

  // if (photo) {
  //   let sharePic = () => {
  //     shareAsync(photo.uri).then(() => {
  //       setPhoto(undefined)
  //       console.log(imgLocation)
  //     });
  //   };
  
  

    //setPhoto(photo.uri);
    // console.log('photo url: ', photoUrl)

    let uploadPhoto = () => {
      // console.log('photo url from camScreen is:' + " " + photo.uri)
      // console.log(photo.uri)
      navigation.replace('MakeReport')
      // console.log('navigated to MakeReport')
    }

    let location = () => {
      console.log('photo url on discard:' + " " + photo.uri)
      // console.log('ndasjan',photoUrl)
    }

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        console.log('photo saved')
        setPhoto(undefined);  
      });
    };

  if(!photo){
    return (
      <Camera style={styles.container} ref={cameraRef}>
        <MaterialCommunityIcons name='circle-slice-8' color={'white'} size={60} onPress={takePic} style={styles.clickBtn}/> 
        <StatusBar style='dark'/>
      </Camera>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
      
          {/* <Image style={styles.preview} className='MakeReport' loc='source' source={{ uri: "data:image/jpg;base64," + photo.base64 }} /> */}
          <Image style={styles.preview} className='MakeReport' loc='source' source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          {/* <MakeReport loc='source'/> */}
  
          
          {/* <Button title="Share" /> */}
          {/* {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined} */}
          <View style={styles.actionBtnContainer} >
          <Button style={styles.uploadBtn} title="Upload" 
          // onPress={() => navigation.navigate('MakeReport')}
          onPress={uploadPhoto}
          ></Button>
          <Button title="Discard" 
          // onPress={location}
          onPress={() => setPhoto(undefined)}
          />
          </View>
      
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  clickBtn: {
    position: 'absolute',
    bottom: 100,
  },
  actionBtnContainer: {
    backgroundColor: 'black',
    alignContent: 'space-around',
    paddingBottom: 30,
    width: '100%',
  }, 
  uploadBtn: {
    paddingBottom: 10,
  }
  
});