import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< Updated upstream
import {Discreption} from './Screens/Discreption'
=======
// import OnboardingScreen from './Screens/OnboardingScreen';
import LoginSignUp from './Screens/LoginSignUpScreen/LoginSignUp';

>>>>>>> Stashed changes
export default function App() {
  return (
    
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Discreption></Discreption>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
