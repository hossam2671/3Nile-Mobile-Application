import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView , FlatList } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import coverImage from '../assets/cover.jpg';
import userProfile from '../assets/userimage.jpg'
import Icon from 'react-native-vector-icons/Fontisto';
import IconI from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import ip from '../config'
import { SwvlDetails, getOwnerBoats, getOwnerCurrentTrips, getOwnerPreviousTrips, getOwnerRequests } from '../redux/slices/UserSlice';

export const BoatOwnerProfile = () => {
  const { boatOwner } = useSelector(state => state.UserSlice)
  const { ownerBoats } = useSelector(state => state.UserSlice)
  const { ownerPreviousTrips } = useSelector(state => state.UserSlice)
  const { ownerRequestsTrips } = useSelector(state => state.UserSlice)
  const { ownerCurrentTrips } = useSelector(state => state.UserSlice)
  const { ownerSwvlTrip } = useSelector(state => state.UserSlice)
  const [tap , setTap] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOwnerBoats(boatOwner._id))
    dispatch(getOwnerPreviousTrips(boatOwner._id))
    dispatch(getOwnerRequests(boatOwner._id))
    dispatch(getOwnerCurrentTrips(boatOwner._id))
    dispatch(SwvlDetails(boatOwner._id))
    // console.log(ownerRequestsTrips,"lkjgkldjglljglkfjkljljkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjk")

    


  }, []);
    return (
      <ScrollView contentContainerStyle={styles.profile__container}>
        <View>
          <Image source={coverImage} style={styles.profile__cover__image} />
        </View>
        <View>
          <Image source={{uri: `http://${ip}:5000/${boatOwner.img}`}} style={styles.profile__user__image} />
        </View>

        <View style={styles.user__profile__info__left}>
          <Text style={styles.text__align__center}>{boatOwner.name}</Text>
          <Text style={styles.text__align__center}>{boatOwner.email}</Text>
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
              setTap("boats")
              console.log(tap)
              console.log(ownerBoats)
            }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>boats</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setTap("requests")
            console.log(tap)
            console.log(ownerRequestsTrips)
          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Requests</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setTap("accepted")
            console.log(tap)
            console.log(ownerCurrentTrips)
          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Accepted</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setTap("finished")
            console.log(tap)
            console.log(ownerPreviousTrips)
            
          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Finished Trips</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            
            setTap("swvl")
            console.log(tap)
          }}>
            <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>SWVL Trips</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.cards_con}>
{
  tap == "accepted" && (
    <>
    
    <FlatList
      data={ownerCurrentTrips.data}
      renderItem={({ item }) => (
        <View style={styles.card_con}>
            <Image
            style={styles.card_con_img}
              width={170}
              height={170}
              source={{
                uri: `http://${ip}:5000/${item.boatId.images[0]}`,
              }}
            />

            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_name}>{item.boatId.name}</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_price}>{item.price}</Text>
       
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_port}>{item.boatId.type}</Text>
              </View>
              <View style={styles.card_con_info_row}>
               <Icon  name='anchor' size={18} color={'#166582'} />
                <Text style={styles.card_con_info_row_type}> {item.boatId.portName} </Text>
             
              </View>
            </View>
          </View>
      )}
    />
    </>
  )
  
}
{
  tap == "finished" && (
    <>
    
    <FlatList
      data={ownerPreviousTrips.data}
      renderItem={({ item }) => (
        <View style={styles.card_con}>
            <Image
            style={styles.card_con_img}
              width={170}
              height={170}
              source={{
                uri: `http://${ip}:5000/${item.boatId.images[0]}`,
              }}
            />

            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_name}>{item.boatId.name}</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_price}>{item.price}</Text>
       
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_port}>{item.boatId.type}</Text>
              </View>
              <View style={styles.card_con_info_row}>
               <Icon  name='anchor' size={18} color={'#166582'} />
                <Text style={styles.card_con_info_row_type}> {item.boatId.portName} </Text>
             
              </View>
            </View>
          </View>
      )}
    />
    </>
  )
  
}
</View>
        </ScrollView>
    );
  }


const styles = StyleSheet.create({
  profile__container: {
    // margin: 10,
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
  icon__loc: {
    fontSize: 13,
  },
  text__loc: {
    fontSize: 13,
    bottom: 1,
  },
  stars__rating: {
    display: 'flex',
    flexDirection: 'row',
    top: -70,
    right: -5,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal__profile__input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    width: 270,
    height: 40,
    padding: 5,
  },
  button: {
    backgroundColor: '#d94242',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  edit__text: {
    fontSize: 20,
    fontWeight: 600,
    padding: 10,
    textAlign: 'center',
  },
  cards:{
    marginBottom:60
  },
  filter_input_con:{
 
  borderColor:'black',
  borderWidth:1,
  margin:20,
  
  },
  chips_con:{
  width:450,
  },


  card_con_img:{
  // margin:20,
borderTopLeftRadius:20,
borderBottomLeftRadius:20,  
 height:150,
    width:160,
   
  },

  chisp:{
  margin:10,
  backgroundColor:'#fff',
  borderRadius:20,
  borderWidth:1,
  },
  card_con:{
  
  width:410,
  paddingTop:5,
  paddingBottom:5,
  // borderWidth:1,
  margin:20,
  display: 'flex',
  flexDirection:'row',
  borderRadius:7,
  justifyContent:"center",
  },
  card_con_info:{
  shadowOffset:{width: -2, height: 4},  
  shadowColor:'#e0d6d6',  
  shadowOpacity:0.9,  
  shadowRadius:10,  
  borderTopRightRadius:20,
  borderBottomRightRadius:20,
  borderTopWidth:1,
  borderTopColor:'#c8c8c8',
  borderBottomWidth:1,
  borderBottomColor:'#c8c8c8',
  borderRightWidth:1,
  borderRightColor:'#c8c8c8',
  },
  card_con_info_row_name:{
    fontSize:20,
    color:'#1c5d73',
    paddingTop:6,
  },
  card_con_info_row_price:{
    fontSize:14,
    color:'#979797',
  
  },
  card_con_info_row_port:{
    fontSize:17,
    color:'#8a8a8a',
  },
  card_con_info_row_type:{
    paddingLeft:20,
    fontSize:14,
   
  },
  card_con_info_row:{
  width:200,
  display: 'flex',
  flexDirection:'row',
paddingTop:10,
  
  paddingLeft:30,
  },
});

export default BoatOwnerProfile;