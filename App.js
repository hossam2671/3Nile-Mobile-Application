import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './Screens/UserProfile'
import React, { useEffect } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeCards from './Screens/HomeCards';



import {Discreption} from './Screens/Discreption'

import LoginSignUp from './Screens/LoginSignUpScreen/LoginSignUp';
import Filter from './Screens/Filter';
import OnboardingScreen from './Screens/OnboardingScreen';

import { NavigationContainer } from '@react-navigation/native';
import BoatOwnerProfile from './Screens/BoatOwnerProfile';
import ContactUs from './Screens/ContactUs';
import { Provider } from 'react-redux'
import { Store } from './redux/Store';
import { Modals } from  './Screens/modals/Modals';
import Swvl from './Screens/Swvl';

import { TouchableOpacity } from 'react-native-gesture-handler';

import BottomNavBar from './BottomNavBar'
import NewBoatOwnerProfile from './Screens/NewBoatOwnerProfile';
// For ignore Errors
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()
// For ignore Errors End
import * as Notifications from 'expo-notifications';
import io from 'socket.io-client';
import ip from './config'

const socket = io(`http://${ip}:5000`);

export default function App() {
  useEffect(() => {


    socket.on('Owner-accepted-Trip', (data) => {
      console.log("vnxcmvnbmcxv")
      const { message, status, _id } = data.notification;

      Notifications.scheduleNotificationAsync({
        content: {
          title: "status",
          body: "message",
        },
      })})
    registerForPushNotificationsAsync();
  }, []);
  
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;
  
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      finalStatus = newStatus;
      console.log(":dddddd")
    }
  
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notifications!');
      return;
    }
  
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token,"cxzcxvcx"); // You can save the token to your backend for later use
  };
  const Stack = createNativeStackNavigator();

  return (

    // <Appp />
    
    // <HomeCards />

  //   <NavigationContainer>
    //  <Stack.Navigator screenOptions={{
    //     headerStyle: { backgroundColor: '#ffffff' },

    //   }}>
    //     <Stack.Screen options={{ headerShown: false }} name='splash' component={Splash} />
    //     <Stack.Screen options={{ headerShown: false }} name='HomeCards' component={BottomNavigatTab}></Stack.Screen>

    //   </Stack.Navigator>
  // </NavigationContainer>
  
      <Provider store={Store}>
            <NavigationContainer>
            <Stack.Navigator screenOptions={{
              
        headerStyle: { },

      }}>
            
            <Stack.Screen name='OnboardingScreen 'options={{ headerShown: false }} component={OnboardingScreen} />

            <Stack.Screen name='BoatOwnerProfile' options={{ headerShown: true }} component={BoatOwnerProfile} />
            <Stack.Screen name='ContactUs' options={{ headerShown: true }} component={ContactUs} />
            <Stack.Screen name='Discreption'  options={{ headerShown: true }}component={Discreption} />
            <Stack.Screen name='Filter' options={{ headerShown: true }} component={Filter} />
            {/* <Stack.Screen name='HomeCards' component={HomeCards} /> */}
            <Stack.Screen name='LoginSignUp'  options={{ headerShown: false }} component={LoginSignUp} />
            <Stack.Screen name='NewOwner'  options={{ headerShown: false }} component={NewBoatOwnerProfile} />
            <Stack.Screen name='swvl'  component={Swvl} />
            <Stack.Screen options={{ headerShown: false }} name='HomeCards' component={BottomNavBar}></Stack.Screen>

            </Stack.Navigator>
            <StatusBar style='dark' />
            </NavigationContainer>
      </Provider>

  ); 
}

