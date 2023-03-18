import * as React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useRef, useEffect } from 'react';

// Appearance.set({ colorScheme: 'light' });

import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import FirstPage from './components/FirstPage';
import MakeReport from './components/MakeReport';
import Profile from './components/Profile';
import CamScreen from './components/CamScreen';
import UpdateProfile from './components/UpdateProfile';
import Reward from './components/Reward'
// import OTP from './components/OTP';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [photo, setPhoto] = useState();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: {
          backgroundColor: '#ffffff'
        } 
      }}>
      <Stack.Screen name="FirstPage" component={FirstPage} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
      <Stack.Screen name="Login" component={Login} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
        <Stack.Screen name="Register" component={Register} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
      <Stack.Screen name="CamScreen" options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }}>
          {(props) => <CamScreen {...props} photo={photo} setPhoto={setPhoto} />}
        </Stack.Screen>
      <Stack.Screen name="Profile" component={Profile} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
        <Stack.Screen name="Home" component={Home} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
        <Stack.Screen name="Reward" component={Reward} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
        <Stack.Screen name="MakeReport" options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }}>
          {(props) => <MakeReport {...props} photo={photo} setPhoto={setPhoto} />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ cardStyle: {
                backgroundColor: 'white',
                opacity: 1,
            },
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};