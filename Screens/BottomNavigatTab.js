// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import IIcon from 'react-native-vector-icons/Entypo';
// import HomeCards from './HomeCards';
// import Filter from './Filter';
// import Discreption from './Discreption';
// import UserProfile from './UserProfile';


// const Tab = createBottomTabNavigator();

// function BottomNavigatTab() {
//   return <Tab.Navigator 
  
 
//   screenOptions={{
//     tabBarInactiveTintColor: '#999696',
//     tabBarActiveTintColor: '#00409f',
//     tabBarStyle: { backgroundColor: '#ffffff' },
//     headerShown: false, 
//   }}>

    // <Tab.Screen
    //   name='home'
    //   component={HomeCards}
    //   options={{ tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} /> }}
    // />

//     <Tab.Screen
//       name='search'
//       component={Filter}
//       options={{ tabBarIcon: ({ color }) => <Icon name="search" color={color} size={24} /> }}
//     />

//     <Tab.Screen
//       name='User'
//       component={UserProfile}
//       options={{ tabBarIcon: ({ color }) => <Icon name="user" color={color} size={24} /> }}
//     />

//     <Tab.Screen
//       name='Disc'
//       component={Discreption}
//       options={{ tabBarIcon: ({ color }) => <IIcon name="chat" color={color} size={24} /> }}
//     />

//   </Tab.Navigator>
// }

// export default BottomNavigatTab