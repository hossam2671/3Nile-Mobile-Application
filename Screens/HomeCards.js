import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import bk from '../assets/ice-3_cleanupp_auto_x2.jpg'
import boat from '../assets/ice-3-removebg-preview.png'

const HomeCards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.home__cards}>
        <Image source={bk} style={styles.bk__style} />
      </View>
      <View style={styles.card__content}>
        <Text style={styles.card__text}>Hi this is my category, Hi this is my category, Hi this is my category</Text>
        <TouchableOpacity onPress={() => {

        }}>
          <View style={styles.card__button}><Text style={styles.card__botton__text}>See more</Text></View>
        </TouchableOpacity>
      </View>
      <View>
        <Image source={boat} resizeMode='contain' style={styles.boat__style} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  home__cards:{
    marginTop: 200,
    width: 350,
    height: 180,
  },
  bk__style:{
    width: 355,
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  boat__style:{
    width: 430,
    top: -420,
    left: 25,
  },
  card__content:{
    backgroundColor: 'rgba(25, 25, 25, 0.162)',
    width: 355,
    height: 120,
    left: 3,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card__text:{
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 17,
    top: -15
  },
  card__button:{
    width: 80,
    height: 30,
    backgroundColor: '#114B5F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
  },
  card__botton__text:{
    textAlign: 'center',
  }

})
export default HomeCards