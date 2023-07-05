import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import  { useRef } from 'react';
import { ResizeMode, Video } from 'expo-av'
import * as Animatable from 'react-native-animatable';


// import bk from '../assets/ice-3_cleanupp_auto_x2.jpg'
// import boat from '../assets/ice-3-removebg-preview.png'
import bk from '../assets/ady.jpg'
import bkk from '../assets/adytoww.jpg'
import bkkk from '../assets/viplll.jpg'
import boat from '../assets/home1.jpeg'

import Iconn from "react-native-vector-icons/FontAwesome"
import { notify } from '../redux/slices/UserSlice';
const HomeCards = (props) => {
  const vid = React.useRef(null);
  let [viewed, setViewed] = useState(false)
  function hello() {
    props.navigation.navigate('Filter')
  }
  const scrollViewRef = useRef(null);

  const scrollToSection = (y) => {
    scrollViewRef.current.scrollTo({ y, animated: true });
  };
  useEffect(()=>{
   

  },[])
  return (
    <ScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
     
   
<View style={styles.vidio_con}>
  <Image source={boat} style={styles.vidio_con} />
  <View style={styles.vidio_con_header}>
  <Text style={styles.vidio_con_header_text}>Embark on a River Journey, Where History Unfolds </Text>
    <Text style={styles.vidio_con_header_text_bottom}>Embark on a River Journey, Where History Unfolds </Text>
    <TouchableOpacity style={styles.bookBtn}  onPress={()=>scrollToSection(700)}>
                  
   <Icon name="arrowdown" color={'#000'} size={30} style={styles.arrow} />
   </TouchableOpacity>
  </View>
       
        </View>
      
     




     <View style={styles.container} >
     <View>
   
        <View style={styles.card__content}>
        <View style={styles.home__cards}>
        <Image source={bk} style={styles.bk__style} />
        </View>
          <Text style={styles.card__text_h}> 3Nile </Text>
          <Text style={styles.card__text}>sailing boat or yacht is a boat that has sails. Wind blows against the sails, pushing the boat through the water.</Text>
          <TouchableOpacity onPressIn={() => {
             props.navigation.navigate('Filter', { num: 1 });
          }}>
            <View style={styles.card__button}>  
            <Iconn name="arrow-right" color={'#000'} size={20} style={styles.book_arrow} />
       
             </View>
          </TouchableOpacity>
        </View>
      
      </View>

    

{/* nnnnnnnnnnnnnnnnnnnnnnnnnn */}
   

      <View style={styles.home__cards_container}>

        <View style={styles.card__content}>
        <View style={styles.home__cards}>
        <Image source={bkkk} style={styles.bk__style} />
      </View>
      <Text style={styles.card__text_h}> 3Nile VIP </Text>
      <Text style={styles.card__text}>sailing boat or yacht is a boat that has sails. Wind blows against the sails, pushing the boat through the water.</Text>
          <TouchableOpacity onPressIn={() => {
            props.navigation.navigate('Filter', { num: 2 })
          }}>
            <View style={styles.card__button}>
               <Iconn name="arrow-right" color={'#000'} size={20} style={styles.book_arrow} />
               </View>
          </TouchableOpacity>
        </View>
    
      </View>




      <View>
 

        <View style={styles.card__content}>
        <View style={styles.home__cards}>
        <Image source={bkk} style={styles.bk__style} />
     
      </View>
      <Text style={styles.card__text_h}> 3Nile Bus </Text>
      <Text style={styles.card__text}>sailing boat or yacht is a boat that has sails. Wind blows against the sails, pushing the boat through the water.</Text>
          <TouchableOpacity onPressIn={() => {
            props.navigation.navigate('Filter', { num: 3 })
          }}>
            <View style={styles.card__button}>  
             <Iconn name="arrow-right" color={'#000'} size={20} style={styles.book_arrow} />
             </View>
          </TouchableOpacity>
        </View>
  
        <View>
         
        </View>



      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  vidio_con:{
    width:510,
    height:690,

  },
  vidio_con_header:{
    position: 'absolute',
    top:420,
    width:360,
    height:240,
    backgroundColor:"#056e9e83",
    left:45,
    borderRadius:40,
  },
  vidio_con_header_text:{
    fontSize:33,
    padding:20,
    textAlign:"left",
    color:"white",
    lineHeight:39,
    paddingTop:30,
    width:338,
    paddingLeft:40,
  },
  vidio_con_header_text_bottom:{
    color:"white",
    // padding:5,
    fontSize:16,
    textAlign:"center",
    width:330,
    paddingLeft:60,
  },
  container:{
    alignItems: 'center',
    paddingBottom:50,
  },
  // home__cards_container:{
  //   display:"flex",
  //   flexDirection:"column",
  //   marginBottom: 300,
  //   width: 350,
  //   height: 180,
  //   marginTop:200,
  //   paddingBottom:120,
  // },
  home__cards: {
    // marginTop: 90,
    width: 350,
    height: 180,
    left:42,
    bottom:80,
    // marginLeft:10,
    // marginBottom: 50,
    // position:"absolute",
    // position:"relative",
  },
  bk__style: {
    width: 275,
    height: 190,
    borderRadius: 40,
    // backgroundColor: 'rgba(117, 183, 236, 0.562)',
    // borderTopRightRadius: 10,
    // position:"relative",
    // top:-380,
    // position:"absolute",
    // position:"relative",
    // bottom:300,
  },
  boat__style: {
    width: 430,
    left: 10,
    // bottom:-410,
    // top: 300,
   
  },
  card__content: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 365,
    height: 340,
    // left: 10,
    borderRadius: 20,
    // borderTopLeftRadius: 20,
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopRadius:70,
    // position:"absolute",
    top:90,
    borderColor:"#b1aeae",
borderWidth:1,
marginBottom:130,
marginTop:130,
  },card__text_h:{
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    bottom:50,
    color:"#0391e4",
  },
  card__text: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 20,
    bottom:40,
    // top: 30,
  },
  card__button: {
    width: 60,
    height: 60,
    backgroundColor: "#0391e4",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: -33,
    color:"#04b7ee",
    left:110,
  },
  card_botton_text: {
    textAlign: 'center',
    color:"#0069f3",
  },
  homeVBtn: {
    color: 'red',
     top: -100, 
     left: 200,
      fontSize: 30

  },


arrow: {
    color: "#0391e4",
    backgroundColor:"#fff",
    borderRadius:50,
    width:50,
    height:50,
    padding:10,
    left:320,
    bottom:10,

},

book_arrow: {
  color:"#0391e4",
  backgroundColor: "#fff",
  borderRadius: 50,
  width: 40,
  height: 40,
  padding: 10,
  // marginTop: 10,
},


})
export default HomeCards