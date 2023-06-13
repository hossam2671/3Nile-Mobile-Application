import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './Screens/UserProfile'
import { StatusBar } from 'expo-status-bar';


import HomeCards from './Screens/HomeCards';



import {Discreption} from './Screens/Discreption'

import LoginSignUp from './Screens/LoginSignUpScreen/LoginSignUp';
import Filter from './Screens/Filter';
import OnboardingScreen from './Screens/OnboardingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BoatOwnerProfile from './Screens/BoatOwnerProfile';
import ContactUs from './Screens/ContactUs';
import { Provider } from 'react-redux'
import { Store } from './redux/Store';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <Provider store={Store}>
            <NavigationContainer>
            <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#72039a' },

      }}>
            <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
            <Stack.Screen name='BoatOwnerProfile' component={BoatOwnerProfile} />
            <Stack.Screen name='ContactUs' component={ContactUs} />
            <Stack.Screen name='Descreption' component={Discreption} />
            <Stack.Screen name='Filter' component={Filter} />
            <Stack.Screen name='HomeCards' component={HomeCards} />
            <Stack.Screen name='LoginSignUp' component={LoginSignUp} />
            </Stack.Navigator>
            <StatusBar style='light' />
            </NavigationContainer>
      </Provider>

  ); 
}

