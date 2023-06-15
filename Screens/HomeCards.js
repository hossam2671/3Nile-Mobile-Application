import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';


import { ResizeMode, Video } from 'expo-av'
import * as Animatable from 'react-native-animatable';

// import bk from '../assets/ice-3_cleanupp_auto_x2.jpg'
// import boat from '../assets/ice-3-removebg-preview.png'
import bk from '../assets/bkk.jpeg'
import boat from '../assets/boatt.png'


const HomeCards = (props) => {
  const vid = React.useRef(null);
  let [viewed, setViewed] = useState(false)
  function hello() {
    props.navigation.navigate('Filter')
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>


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
          source={require('../assets/homeV.mp4')
          }

          style={{ height: 700 }}
        />
        {/* {viewed &&

          <Animatable.Text iterationDelay={5} style={styles.homeVBtn} animation="slideInDown" iterationCount={Infinity} direction="alternate">go!</Animatable.Text>

        } */}
   <TouchableOpacity onPressIn={() => {
            console.log("first");
            props.navigation.navigate('Filter', { num: 1 });
          }}>
            <View style={styles.card__button}>
              <Text style={styles.card__button__text}>See more</Text>
            </View>
          </TouchableOpacity>


        <View style={styles.home__cards}>
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
        </View>
      </View>

      <View>
        <Image source={boat} resizeMode='contain' style={styles.boat__style} />
      </View> 
      <View style={styles.home__cards}>
        <Image source={bk} style={styles.bk__style} />
      </View>
      <View style={styles.card__content}>
        <Text style={styles.card__text}>Hi tdsadsadsa is my category, Hi this is my category, Hi this is my category</Text>
        <TouchableOpacity onPress={() => {

        }}>
          <View style={styles.card__button}><Text style={styles.card__botton__text}>See more</Text></View>
        </TouchableOpacity>
      </View>
      <View>
        <Image source={boat} resizeMode='contain' style={styles.boat__style} />
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
        <View>
          <Image source={boat} resizeMode='contain' style={styles.boat__style} />
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
          <Image source={boat} resizeMode='contain' style={styles.boat__style} />
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
    alignItems: 'center',
  },
  home__cards: {
    marginTop: 200,
    width: 350,
    height: 180,
  },
  bk__style: {
    width: 355,
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  boat__style: {
    width: 430,
    top: -420,
    left: 25,
  },
  card__content: {
    backgroundColor: 'rgba(25, 25, 25, 0.162)',
    width: 355,
    height: 120,
    left: 3,
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
    top: -15
  },
  card__button: {
    width: 80,
    height: 30,
    backgroundColor: '#114B5F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
  },
  card__botton__text: {
    textAlign: 'center',
  },
  homeVBtn: {
    color: 'red', top: -100, left: 200, fontSize: 30

  }

})
export default HomeCards