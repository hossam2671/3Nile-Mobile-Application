import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';


import { ResizeMode, Video } from 'expo-av'
import * as Animatable from 'react-native-animatable';

// import bk from '../assets/ice-3_cleanupp_auto_x2.jpg'
// import boat from '../assets/ice-3-removebg-preview.png'
import bk from '../assets/homecardimg.png'
import boat from '../assets/boatt.png'


const HomeCards = (props) => {
  const vid = React.useRef(null);
  let [viewed, setViewed] = useState(false)
  function hello() {
    props.navigation.navigate('Filter')
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
     
   
<View style={styles.vidio_con}>
        <Video
          ref={vid}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isMuted
          onLoad={() => {
            setTimeout(() => {
              setViewed(true)
              console.log("first")
              
            }, 5000)
          }}
          isLooping
          source={require('../assets/home.mp4')
          }

          style={{ height: 700,}}
        />
        </View>
        {/* {viewed &&

          <Animatable.Text iterationDelay={5} style={styles.homeVBtn} animation="slideInDown" iterationCount={Infinity} direction="alternate">go!</Animatable.Text>

        } */}
 


        {/* <View style={styles.home__cards}>
          <Image source={bk} style={styles.bk__style} />
        </View>
        <View style={styles.card__content}>
          <Text style={styles.card__text}>Hi this is my category, Hi this is my category, Hi this is my category</Text>
          <TouchableOpacity onPressIn={() => {
            console.log("first");
            props.navigation.navigate('Filter', { num: 1 });
          }}>
            <View style={styles.card__button}>
              <Text style={styles.card__button__text}>See more</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Image source={boat} resizeMode='contain' style={styles.boat__style} />
        </View> */}
     




     <View style={styles.container}>
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



{/* 22222222222222222222222 */}
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
    // width:200,
    height:700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

  }

})
export default HomeCards