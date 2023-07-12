import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import UserProfile from './Screens/UserProfile'
import React, { useEffect,useState,useRef } from 'react'
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
import io from 'socket.io-client';
import ip from './config'
const socket = io(`http://${ip}:5000`);
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
const theme = {
...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    myOwnProperty: true,
    primary: '#0c8df7',
    backdrop: '#fbfbfb87',
    secondaryContainer:'#0c8df737',
    onPrimaryContainer: "#0c8df7",
    surface: "rgb(255, 255, 255)",
    onSurface: "#0c8df7",
    onSecondaryContainer: "#ffffff",
    surfaceVariant:"#0c8df720", 
  },
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    const handleOwnerAcceptedTrip = (data) => {
      // Display the received data as a notification

      sendNotification(data);
    };
    let id = AsyncStorage.getItem('user')
    console.log(id,"czxcxzzcczx")
    if(id){
      socket.on('Owner-accepted-Trip', handleOwnerAcceptedTrip);
      return () => {
        socket.off('Owner-accepted-Trip', handleOwnerAcceptedTrip);
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  
  }, []);
  
  const sendNotification = async (data) => {
    console.log(data, "Owner-accepted-Trip");
    const content = {
      title: 'Trip Notification',
      body: data.notification.message,
      AudioListener: true,
    };
  
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: null,
      sound: true,
       
    
    });
  
  
  }
  const Stack = createNativeStackNavigator();

  return (

    <PaperProvider theme={theme}>
      
     


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
      </PaperProvider>  

  ); 
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: '948c6fa2-9315-4d14-a100-af95bf6d713b' })).data;
    console.log(token,"Token");

    // Expo Push Notification Tool 
    // Email & Passsword --> keroloskhairyy@gmail.com
    // Run With --> npx expo start
    
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}