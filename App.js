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
import  NotiFincation  from './Screens/Notification';
import Notification from './Screens/Notification';


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
        headerRight: () => <NotiFincation />, 
      }}>
            
            <Stack.Screen name='OnboardingScreen 'options={{ headerShown: false }} component={OnboardingScreen} />

            <Stack.Screen name='BoatOwnerProfile' options={{ headerShown: true,headerRight: () => <NotiFincation />, }} component={BoatOwnerProfile} />
            <Stack.Screen name='ContactUs' options={{ headerShown: true,headerRight: () => <NotiFincation />, }} component={ContactUs} />
            <Stack.Screen name='Discreption'  options={{ headerShown: true,headerRight: () => <NotiFincation />, }}component={Discreption} />
            <Stack.Screen name='Filter' options={{ headerShown: true,headerRight: () => <NotiFincation />, }} component={Filter} />
            {/* <Stack.Screen name='HomeCards' component={HomeCards} /> */}
            <Stack.Screen name='LoginSignUp'  options={{ headerShown: false }} component={LoginSignUp} />
            <Stack.Screen name='NewOwner'   options={{ headerShown: true,headerRight: () => <NotiFincation />, }} component={NewBoatOwnerProfile} />
            <Stack.Screen name='swvl'  component={Swvl}  options={{ headerShown: true,headerRight: () => <NotiFincation />, }}/>
            <Stack.Screen
        name="HomeCards"
        component={BottomNavBar}
        options={{
          headerRight: () => <Notification />,
          headerShown: false,
        }}
      />
            <Stack.Screen
            name="Notification"
            component={NotiFincation}
            options={{
              headerShown: true,
            }}
          />
            </Stack.Navigator>
            <StatusBar style='dark' />
            </NavigationContainer>
      </Provider>

  ); 
}

