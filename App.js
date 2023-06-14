import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './Screens/UserProfile'
import BoatOwnerProfile from './Screens/BoatOwnerProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomNavigatTab from './Screens/BottomNavigatTab';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeCards from './Screens/HomeCards';
import {Discreption} from './Screens/Discreption'
// import OnboardingScreen from './Screens/OnboardingScreen';
import LoginSignUp from './Screens/LoginSignUpScreen/LoginSignUp';
import Filter from './Screens/Filter';
import OnboardingScreen from './Screens/OnboardingScreen';
import Splash from './Screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <HomeCards />

    <NavigationContainer>
     <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },

      }}>
        <Stack.Screen options={{ headerShown: false }} name='splash' component={Splash} />
        <Stack.Screen options={{ headerShown: false }} name='HomeCards' component={BottomNavigatTab}></Stack.Screen>

      </Stack.Navigator>
  </NavigationContainer>
  )
}

