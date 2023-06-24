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
    <TouchableOpacity style={styles.bookBtn}  onPress={()=>scrollToSection(700)}>
                  
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
   

      <View style={styles.home__cards_container}>
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
    height:690,

  },
  vidio_con_header:{
    position: 'absolute',
    top:420,
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
    paddingBottom:120,
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
    marginTop: 90,
    width: 350,
    height: 180,
    marginLeft:10,
    marginBottom: 150,
 
  },
  bk__style: {
    width: 355,
    height: 310,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position:"relative",
  },
  boat__style: {
    width: 430,
    left: 10,
    // bottom:-410,
    // top: 300,
   
  },
  card__content: {
    backgroundColor: 'rgba(241, 241, 241, 1)',
    width: 365,
    height: 220,
    // left: 15,
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopRadius:70,
    position:"absolute",
    top:300,
//     borderBottomColor:"black",
// borderBottomWidth:1,

  },
  card__text: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 17,
    top: 30,
  },
  card__button: {
    width: 80,
    height: 80,
    backgroundColor: '#0481e7',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: -135,
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