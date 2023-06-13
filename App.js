import { StyleSheet, Text, View } from 'react-native';
// import UserProfile from './Screens/UserProfile'
// import BoatOwnerProfile from './Screens/BoatOwnerProfile';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import HomeCards from './Screens/HomeCards';

// const Tab = createBottomTabNavigator();

import {Discreption} from './Screens/Discreption'
// import OnboardingScreen from './Screens/OnboardingScreen';
import LoginSignUp from './Screens/LoginSignUpScreen/LoginSignUp';
import Filter from './Screens/Filter';
import OnboardingScreen from './Screens/OnboardingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import BoatOwnerProfile from './Screens/BoatOwnerProfile';
import ContactUs from './Screens/ContactUs';


export default function App() {
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
            <Stack.Screen name='BoatOwnerProfile' component={BoatOwnerProfile} />
            </Stack.Navigator>
            <StatusBar style='light' />
            </NavigationContainer>
      </Provider>

  );
    <HomeCards />

//     <NavigationContainer>
//     <Tab.Navigator screenOptions={{
//           tabBarInactiveTintColor: '#6f6f6f',
//           tabBarActiveTintColor: '#00409f',
//           tabBarStyle: { backgroundColor: '#ffffff' },
//         }}>
    
//     <Tab.Screen 
//   name='Owner' 
//   component={BoatOwnerProfile}
//   options={{ tabBarIcon: ({ color }) => <Icon name="man" color={color} size={24} /> }}
// />

// <Tab.Screen 
//   name='User' 
//   component={UserProfile}
//   options={{ tabBarIcon: ({ color }) => <Icon name="man" color={color} size={24} /> }}
// />
//     </Tab.Navigator>
//   </NavigationContainer>
  
}

