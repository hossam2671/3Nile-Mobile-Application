import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
import coverImage from '../assets/cover.jpg';
import userProfile from '../assets/userimage.jpg'
import Icon from 'react-native-vector-icons/Fontisto';
import IconI from 'react-native-vector-icons/Ionicons';

export const BoatOwnerProfile = () => {
  
    return (
      <ScrollView contentContainerStyle={styles.profile__container}>
        <View>
          <Image source={coverImage} style={styles.profile__cover__image} />
        </View>
        <View>
          <Image source={userProfile} style={styles.profile__user__image} />
        </View>

        <View style={styles.user__profile__info__left}>
          <Text style={styles.text__align__center}>Fatma Khalil</Text>
          <Text style={styles.text__align__center}>fatma@iti.com</Text>
        </View>
        <View style={styles.user__profile__info__right}>
          <Button
            title="Edit Profile"
            onPress={() => {
              // Handle button press
            }}
            style={styles.button}
          />
          <Button
            title="Add Boat"
            onPress={() => {
              // Handle button press
            }}
            style={styles.button}
          />
        </View>
        <View style={styles.border__bottom}>
        </View>
        <View style={styles.profile__tabs}>
          <TouchableOpacity onPress={() => {

          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Preovious Trips</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Pending Trips</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Favourite Trips</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Finished Trips</Text></View>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={false}>
          
          {/* <View style={styles.card__style}>
            <View style={styles.cards__Image}>
              <Image source={coverImage} style={styles.card__image__style} />
            </View>
            <View style={styles.card__text__details}>
              <Text style={styles.boat__name__price}>Feloka</Text>
              <Text style={styles.boat__name__price}>200$</Text>
            </View>
            <View >
              <Text style={styles.card__trip__details}>5 People are going</Text>

              <View style={styles.date__icon}>
                <Icon style={styles.social__icon} name="date" size={15} />
              </View>
              <View style={styles.location__icon}>
                <IconI style={styles.social__iconi} name="location-outline" size={15} />
              </View>

              <View style={styles.date__text}>
                <Text style={styles.card__text__with__icon}>30 June 2023 / 6:00 pm</Text>
              </View>

              <View style={styles.location__text}>
                <Text style={styles.card__text__with__icon}>El-Mahata, Aswan</Text>
              </View>

              <View style={styles.border__bottom__dooted}>
              </View>

            </View>

          </View>

          <View style={styles.card__style}>
            <View style={styles.cards__Image}>
              <Image source={coverImage} style={styles.card__image__style} />
            </View>
            <View style={styles.card__text__details}>
              <Text style={styles.boat__name__price}>Feloka</Text>
              <Text style={styles.boat__name__price}>200$</Text>
            </View>
            <View >
              <Text style={styles.card__trip__details}>5 People are going</Text>

              <View style={styles.date__icon}>
                <Icon style={styles.social__icon} name="date" size={15} />
              </View>
              <View style={styles.location__icon}>
                <IconI style={styles.social__iconi} name="location-outline" size={15} />
              </View>

              <View style={styles.date__text}>
                <Text style={styles.card__text__with__icon}>30 June 2023 / 6:00 pm</Text>
              </View>

              <View style={styles.location__text}>
                <Text style={styles.card__text__with__icon}>El-Mahata, Aswan</Text>
              </View>

              <View style={styles.border__bottom__dooted}>
              </View>

            </View>

          </View> */}

          {/* <View style={styles.card__style}>
            <View style={styles.cards__Image}>
              <Image source={coverImage} style={styles.card__image__style} />
            </View>
            <View style={styles.card__text__details}>
              <Text style={styles.boat__name__price}>Feloka</Text>
              <Text style={styles.boat__name__price}>200$</Text>
            </View>

            <Text style={styles.peoples__details}>5 People are going</Text>

            <View style={styles.date__icon}>
              <Icon style={styles.social__icon} name="date" size={15} />
            </View>
            <View style={styles.location__icon}>
              <IconI style={styles.social__iconi} name="location-outline" size={15} />
            </View>

            <View style={styles.date__text}>
              <Text style={styles.card__text__with__icon}>30 June 2023 / 6:00 pm</Text>
            </View>

            <View style={styles.location__text}>
              <Text style={styles.card__text__with__icon}>El-Mahata, Aswan</Text>
            </View>

            <View style={styles.border__bottom__dooted}>
            </View>

          </View> */}
        </ScrollView>
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
  profile__container: {
    // margin: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile__cover__image: {
    width: 420,
    height: 170,
    borderRadius: 20,
    top: 35,
  },
  profile__user__image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    right: 130,
    bottom: 10,
  },
  user__profile__info__left: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 210,
    textAlign: 'center',
    top: 6,
    left: -23,
  },
  user__profile__info__right: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginLeft: 205,
    bottom: 80,
    textAlign: 'center',
  },
  text__align__center: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 600,
  },
  border__bottom: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    width: '90%',
    alignItems: 'center',
    bottom: 60,
  },
  profile__tabs: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    bottom: 35,
  },
  tabs__font__style: {
    fontSize: 10,
    fontWeight: 600,
  },
  tabs__button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  
});

export default BoatOwnerProfile;