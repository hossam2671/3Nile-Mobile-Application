import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './Screens/UserProfile'
import React from 'react'

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



export default function App() {

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

