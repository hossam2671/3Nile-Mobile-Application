import React, { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { register , login } from '../../redux/slices/UserSlice';
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import Video from 'react-native-video';
import video from './boat.mp4';
import styles from "./LoginStyles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
const LoginSignUp = (props) => {
  const { user } = useSelector(state => state.UserSlice)
  const { boatOwner } = useSelector(state => state.UserSlice)
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 1.5, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(900, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };
  const dispatch = useDispatch();
  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };
  const [checked, setChecked] = React.useState('user');

  // // register
  // let signUpSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .min(10, 'must be moro than 10')
  //     .email()
  //     .required('must be required'),
  //   password: Yup.string().min(8, 'must be lower then 20').required('must be lower then 20'),
  //   name: Yup.string().min(3, 'at least 20 caracter').required('must be more then 3'),
  //   // username: Yup.string().min(3, "must be moro than 10").required("must be more then 3"),
  //   // password: Yup.string().min(8, "must be lower then 20").
  //   // required("must be lower then 20 & more than 8"),
  // });

  // const regFormik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //     name: '',
  //     // username:"",
  //     // password:"",
  //   },
  //   validationSchema: signUpSchema,
  //   onSubmit: (values) => {
  //     console.log("Submitting form:", values);
    
  //     if (Object.keys(regFormik.errors).length > 0) {
  //       console.log("Validation errors:", regFormik.errors);
  //     } else {
  //       console.log("Dispatching register action:", { ...values, radiovalue: checked });
  //       dispatch(register({ ...values, radiovalue: checked }));
  //     }
  //   },
  // });
  const [regName , setRegName] =useState("")
  const [regEmail , setRegEmail] =useState("")
  const [regPassword , setRegPassword] =useState("")
  const [logPassword , setLogPassword] =useState("")
  const [logEmail , setLogEmail] =useState("")
  function registerr(){
    console.log(regEmail)
    dispatch(register({radiovalue:checked , email:regEmail , name:regName , password:regPassword})).then(() => {
      setRegEmail("")
      setRegName("")
      setRegPassword("")
    })
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  }
  function loginn(){
    console.log(logEmail,logPassword)
    dispatch(login({email:logEmail,password:logPassword})).then(()=>{
      setLogEmail("")
      setLogPassword("")
      if(user){
        props.navigation.navigate('HomeCards')
      }
      else if(boatOwner){
        props.navigation.navigate('BoatOwnerProfile')

      }
      
    })
  }
  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          {/* Image  */}
      <Image
          href={require("./ound.jpg")}
          width={width + 100}
          height={height + 100}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clipPathId)"
          /> 
          
        </Svg>
       
      
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
        >
          <Text
            style={{ color: "white", fontSize: 20, lineHeight: 30 }}
            onPress={() => ((imagePosition.value = 1))}
          >
            X
          </Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
        {!isRegistering && (
        <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(e) => setLogEmail(e)}
              value={logEmail}
          />
        )}
        {!isRegistering && (
        <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(e) => setLogPassword(e)}
              value={logPassword}
          />
        )}
        
        {isRegistering && (
 <TextInput
  placeholder="Email"
  placeholderTextColor="black"
  style={styles.textInput}
  name="email"
  onChangeText={(e) => setRegEmail(e)}
      value={regEmail}
/>
        )}
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
              name="name"
              onChangeText={(e) => setRegName(e)}
               value={regName}
            />
          )}
          {isRegistering && (
          <TextInput
          name="password"
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(e) =>{setRegPassword(e)}}
            value={regPassword}
          />
          )}

{isRegistering && (
<View style={styles.radios}>
   <Text>User</Text>
      <RadioButton
        value="user"
        status={ checked === 'user' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('user')}
        />
         <Text>Boat Owner</Text>
      <RadioButton
        value="boatOwner"
        status={ checked === 'boatOwner' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('boatOwner')}
      />
    </View>
)}
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
          {isRegistering && (
  <Pressable
    onPress={() => {
      registerr() // Call handleSubmit as a function
     formButtonScale.value = withSequence(withSpring(1), withSpring(1));
    }}
  >
    <Text style={styles.buttonText}>REGISTER</Text>
  </Pressable>
)}
          {!isRegistering && (
            <Pressable
              onPress={() =>{
                loginn()
                formButtonScale.value = withSequence(withSpring(1), withSpring(1));
              }
            }
            >
              <Text style={styles.buttonText}>
                 LOG IN
              </Text>
            </Pressable>
          )}
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default LoginSignUp;
