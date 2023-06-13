import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import {Discreption} from './Screens/Discreption'
=======
// import OnboardingScreen from './Screens/OnboardingScreen';
import LoginSignUp from './Screens/LoginSignUpScreen/LoginSignUp';
=======
import Filter from './Screens/Filter';
>>>>>>> Stashed changes

>>>>>>> Stashed changes
export default function App() {
  return (
    
    <View style={styles.container}>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <Discreption></Discreption>
=======
      <Filter/>
      <StatusBar style="auto" />
>>>>>>> Stashed changes
    </View>
  );
=======
    <Text>Open up App.js to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>

  )
>>>>>>> Stashed changes
}

const styles = StyleSheet.create({
  container: {
  
  },
});
