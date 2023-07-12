import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { IconButton,RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { register , login } from '../../redux/slices/UserSlice';
import { useSelector } from "react-redux";
import Iconnnnnn from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image as Img,
  Pressable,
  Touchable,
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
import succ from './succsses.png'
import errorImage from './error.png'



const LoginSignUp = (props) => {
  // const succ = require('../../assets/succsses.png');
  // const errorImage = require('../../assets/error.png');


  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, SetLoginMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [LoginStatus,SetLoginStatus] = useState(null);

  const { user } = useSelector(state => state.UserSlice)
  const { boatOwner } = useSelector(state => state.UserSlice)
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(()=>{

  },[loginMessage])

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
    dispatch(register({radiovalue:checked , email:regEmail , name:regName , password:regPassword})).then((res) => {

      if(res.payload.status===400){
        setModalVisible(true)
        SetLoginStatus(false)
        SetLoginMessage(res.payload.message)
        // openErrorModal()
        setTimeout(()=>{
          // closeErrorModal() 
          imagePosition.value = 0;
          
          setModalVisible(false)
        },2000)
      }
      else if (res.payload.status===200){
        SetLoginStatus(true)
        SetLoginMessage(res.payload.message)
        setModalVisible(true)
        // openSuccussfullModal()
        setTimeout(()=>{
          if (isRegistering) {
            runOnJS(setIsRegistering)(false);
          }
          // closeSuccussfullmodal() 
          setModalVisible(false)
        },2000)
     
      }
     
      setRegEmail("")
      setRegPassword("")
    })
   
  }
  function loginn(){
   
    // console.log(logEmail,logPassword)
    dispatch(login({email:logEmail,password:logPassword}))
    .then((res)=>{
        console.log(res.payload,"fghdfshfsd")
        SetLoginMessage(res.payload.data ? res.payload.data.message:"Welcome Back")
        SetLoginStatus(res.payload.data ? false : true)
      if(res.payload.data===400){
        // SetLoginStatus(false)

        setModalVisible(true)
        setTimeout(()=>{
          setModalVisible(false)
        },2000)
      }

      else if(res.payload.data !==400){
        console.log(res.payload,"res.payloadasdsayload")

        // SetLoginStatus(true)
        setModalVisible(true)
        console.log(LoginStatus)
        // SetLoginMessage("Welcome Back")

          setTimeout(()=>{

            if(res.payload.user){

              setModalVisible(false)

              // SetLoginMessage("Welcome Back")
              setLoggedIn(true)
              props.navigation.navigate('HomeCards')
            }
            else if(res.payload.boatOwner){
                // SetLoginMessage("Welcome Back")

              setModalVisible(false)

              props.navigation.navigate('NewOwner')
              
            }
            else{

              // SetLoginMessage(res.payload.data.message)

              // SetLoginStatus(true)
              setModalVisible(true)

              
              
            }
            setModalVisible(false)
            
          

          },1000)
        }
  
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (

      <>
 
          

    <Animated.View  style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          {/* Image  */}
      <Image
          href={require("./logincopy.jpg")}
          width={width}
          height={height +120}
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
      <Modal  visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
    
        {/* <Text>BarCode :{swvlRecit.TripDetails.bookingBarcode}</Text> */}
        <View style={styles.modalContainer_card_con}>
        <IconButton
        icon={() => <Iconnnnnn name="close" size={20} color="#999999" style={{marginLeft:20,zIndex:1000}} />}
        
        
        style={{marginLeft:-300}}
        onPress={() => setModalVisible(false)}
      />
       <Img source={LoginStatus?succ:errorImage} style={styles.succ} />
         <Text style={styles.modaltitle}>{loginMessage}</Text>
       

  
      
         
    
     
      </View>
    </Modal>
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
            placeholderTextColor="#b6b6b6"
            style={styles.textInput}
            onChangeText={(e) => setLogEmail(e)}
              value={logEmail}
          />
        )}
        {!isRegistering && (
        <TextInput
            placeholder="Password"
            placeholderTextColor="#b6b6b6"
            style={styles.textInput}
            onChangeText={(e) => setLogPassword(e)}
              value={logPassword}
          />
        )}


               {isRegistering && (


            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#b6b6b6"
              style={styles.textInput}
              name="name"
              onChangeText={(e) => setRegName(e)}
               value={regName}
            />
          )}
        {isRegistering && (
 <TextInput
  placeholder="Email"
  placeholderTextColor="#b6b6b6"
  style={styles.textInput}
  name="email"
  onChangeText={(e) => setRegEmail(e)}
      value={regEmail}
/>

        )}
              {isRegistering && (
          <TextInput
          name="password"
            placeholder="Password"
            placeholderTextColor="#b6b6b6"
            style={styles.textInput}
            onChangeText={(e) =>{setRegPassword(e)}}
            value={regPassword}
          />
          )}
   
    

{isRegistering && (
  <>
  
<View style={styles.radios}>
  <View  style={styles.radios_user}>
   <Text style={styles.radios_user_text}>User</Text>
      <RadioButton
      color="#0a79e1fc"
        value="user"
        status={ checked === 'user' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('user')}
        />
        </View  >
        <View style={styles.radios_owner}>
         <Text style={styles.radios_user_text}>Boat Owner</Text>
      <RadioButton
        color="#0a79e1fc"
        value="boatOwner"
        status={ checked === 'boatOwner' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('boatOwner')}
      />
    </View>
    </View>
    </>
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
    </>
  );
};

export default LoginSignUp;
