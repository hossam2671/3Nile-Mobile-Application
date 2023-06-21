import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import  { useRef } from 'react';
import { ResizeMode, Video } from 'expo-av'
import * as Animatable from 'react-native-animatable';

// import bk from '../assets/ice-3_cleanupp_auto_x2.jpg'
// import boat from '../assets/ice-3-removebg-preview.png'
import bk from '../assets/homecardimg.png'
import boat from '../assets/login.jpg'


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
  return (
    <ScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
     
   
<View style={styles.vidio_con}>
  <Image source={boat} style={styles.vidio_con} />
  <View style={styles.vidio_con_header}>
  <Text style={styles.vidio_con_header_text}>Embark on a River Journey, Where History Unfolds </Text>
    <Text style={styles.vidio_con_header_text_bottom}>Embark on a River Journey, Where History Unfolds </Text>
    <TouchableOpacity style={styles.bookBtn}  onPress={()=>scrollToSection(800)}>
                  
   <Icon name="arrowdown" color={'#000'} size={30} style={styles.arrow} />
   </TouchableOpacity>
  </View>
       
        </View>
      
     




     <View style={styles.container} >
        <View>
      <View style={styles.home__cards}>
          <Image source={bk} style={styles.bk__style} />
        </View>
        <View style={styles.card__content}>
          <Text style={styles.card__text}>Hi this 22222ory, Hi this is my category, Hi this is my category</Text>
          <TouchableOpacity onPressIn={() => {
             props.navigation.navigate('Filter', { num: 1 });
          }}>
            <View style={styles.card__button}><Text style={styles.card__botton__text}>See more</Text></View>
          </TouchableOpacity>
        </View>

      </View>

    

{/* nnnnnnnnnnnnnnnnnnnnnnnnnn */}
   

      <View>
      <View style={styles.home__cards}>
          <Image source={bk} style={styles.bk__style} />
        </View>
        <View style={styles.card__content}>
          <Text style={styles.card__text}>Hi this 22222ory, Hi this is my category, Hi this is my category</Text>
          <TouchableOpacity onPressIn={() => {
            props.navigation.navigate('Filter', { num: 2 })
          }}>
            <View style={styles.card__button}><Text style={styles.card__botton__text}>See more</Text></View>
          </TouchableOpacity>
        </View>
     
      </View>




      <View>
      <View style={styles.home__cards}>
          <Image source={bk} style={styles.bk__style} />
       
        </View>

        <View style={styles.card__content}>
          <Text style={styles.card__text}>Hi this is my category, Hi this is my category, Hi this is my category</Text>
          <TouchableOpacity onPressIn={() => {
            props.navigation.navigate('Filter', { num: 3 })
          }}>
            <View style={styles.card__button}><Text style={styles.card__botton__text}>See more</Text></View>
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
    height:800,

  },
  vidio_con_header:{
    position: 'absolute',
    top:480,
    width:360,
    height:240,
    backgroundColor:"#64646483",
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
    paddingBottom:20,
  },
  home__cards: {
    marginTop: 50,
    width: 350,
    height: 180,
    marginLeft:20,

  },
  bk__style: {
    width: 355,
    height: 210,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    
  },
  boat__style: {
    width: 430,
    left: 10,
    // bottom:-410,
    // top: 300,
   
  },
  card__content: {
    backgroundColor: 'rgba(25, 25, 25, 0.162)',
    width: 355,
    height: 150,
    left: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card__text: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 17,
    // top: -,
  },
  card__button: {
    width: 80,
    height: 30,
    backgroundColor: '#114B5F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 19,
    color:"white",
  },
  card__botton__text: {
    textAlign: 'center',
    color:"white",
  },
  homeVBtn: {
    color: 'red',
     top: -100, 
     left: 200,
      fontSize: 30

  },


arrow: {
    color: '#0566cd',
    backgroundColor:"#fff",
    borderRadius:50,
    width:50,
    height:50,
    padding:10,
    left:320,
    bottom:10,

},




})
export default HomeCards