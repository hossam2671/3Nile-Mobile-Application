import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView, TextInput , FlatList, Pressable , SafeAreaView} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import coverImage from '../assets/cover.jpg';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { addReview, canceltrip, pendingTrips, finishedTrips, editUserInfo , acceptedTrips } from '../redux/slices/UserSlice';
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import ip from '../config'

import StarRating from 'react-native-star-rating';







export const UserProfile = () => {
  const [rating , setRating] = useState(0)

  const [disabled,setDisabled] = useState(false)


  const handleRatingChange = (itemId, newRating,boatId) => {
    console.log('New rating:', newRating);
    console.log('Item ID:', itemId);
  

    const updatedFinished = finished.map((item) => {
      if (item._id === itemId) {
        setRating(newRating)
        dispatch(addReview({boatId:boatId,clientId:user._id,tripId:itemId,rate:newRating})).then(()=>{
          dispatch(finishedTrips({id:user._id}))
        })
    }})
  

}  ;
  


  //get user data
  const { user } = useSelector(state => state.UserSlice)

  const dispatch = useDispatch();

  //get trips
  const [tap, setTap] = useState("accepted")
  const { accepted } = useSelector(state => state.UserSlice)
  const { finished } = useSelector(state => state.UserSlice)
  const { pending } = useSelector(state => state.UserSlice)

  useEffect(() => {



    dispatch(finishedTrips({ id: user._id }))


    dispatch(acceptedTrips({ id: user._id }))
    dispatch(pendingTrips({ id: user._id }))


  }, []);

  function pend() {
    setTap("pending")
     console.log(tap)
  }
  function accep() {
    setTap("accepted")
    console.log(tap)
  }
  function prev() {
    setTap("finished")
    console.log(tap)
  }
  function cancel(id){
    dispatch(pendingTrips({id:user._id})) 
    dispatch(canceltrip(id)).then(() =>dispatch(pendingTrips({id:user._id})) )
  }

  //modal
  const [visibleModal, setVisibleModal] = useState(null);
  const [editName, setName] = useState("")
  const [editPhone, setPhone] = useState("")
  const [image, setImage] = useState(`http://${ip}:5000/${user.img}`);


  const renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text >{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.select}>

        <Text style={styles.edit__text}>Edit your Details</Text>


        <TextInput style={styles.modal__profile__input}
          placeholder="name"
          placeholderTextColor="black"
          onChangeText={(e) => setName(e)}
        />
        <TextInput style={styles.modal__profile__input}
          placeholder="phone"
          placeholderTextColor="black"
          onChangeText={(e) => setPhone(e)}

        />

        <TextInput style={styles.modal__profile__input}
          placeholder={user.address ? user.address : "Address"}
          placeholderTextColor="black"
          onChangeText={(e) => {
            console.log(e)
          }
          }

        />


     <Button title="Pick an image from camera roll" onPress={pickImage} />



      </View>




      {renderButton('Apply', () => {
           const updatedUser = {
            id:  user._id,
            name: editName || user.name,
            phone: editPhone || user.phone,
            address: user.address,
            img: image || user.img,
          };
            console.log(updatedUser,"Ussssss")
          dispatch(editUserInfo(updatedUser)).then(()=>{
            setVisibleModal(0);
            setEditModal(1)
          });
          ; setVisibleModal(null)
      })}

    </View>
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0]);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };



  function rate(boatId,tripId , ratingValue){
    console.log(boatId,tripId , ratingValue)
    setRating(ratingValue)
    console.log("first")

      setDisabled(!disabled)

   }

   const [editModal , setEditModal] = useState(0)
    const editInfoModal = () => (
        <View style={styles.modalContent}>
            <Text>Your Information has Changed successfully </Text>
        </View>
    );
    const [editImageModal , setEditImageModal] = useState(0)
    const EditImageModal = () => (
        <View style={styles.modalContent}>
            <Text>Your Image has Changed successfully </Text>
        </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.profile__container}>

      <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>

        {renderModalContent()}
      </Modal>

      <Modal isVisible={editModal === 1} style={styles.bottomModal}>

                {editInfoModal()}
      </Modal>

      <Modal isVisible={editImageModal === 1} style={styles.bottomModal}>

        {EditImageModal()}
      </Modal>

      <View>
        <Image source={coverImage} style={styles.profile__cover__image} />
      </View>
      <View>
        <Image source={{ uri:image}} style={styles.profile__user__image} />
      </View>

      <View style={styles.user__profile__info__left}>
        <Text style={styles.text__align__center}>{user.name}</Text>
        <Text style={styles.text__align__center}>{user.phone}</Text>
      </View>
      <View style={styles.user__profile__info__right}>
        <TouchableOpacity
          isVisible={visibleModal === 1}
          style={styles.button}
          onPress={() => {
            setVisibleModal(1);
          }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.border__bottom}>
      </View>
      <View >
        <TouchableOpacity onPress={() => { accep }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style} onPress={accep}>accepted Trips</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { pend }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style } onPress={pend}>Pending Trips</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { prev }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style} onPress={prev}>Finished Trips</Text></View>
        </TouchableOpacity>
        

<View style={styles.cards_con}>
{
  tap == "pending" && (
    <FlatList
      data={pending}
      renderItem={({ item }) => (
        <View style={styles.card__box}>
                <View style={styles.card__image}>
                    <Image source={cardboat} style={styles.cardboat__img} />
                </View>
                <View style={styles.card__content}>
                    <Text style={styles.card__name}>{item.boatId.name}</Text>
                    <Icon name="location" size={13} style={styles.loc__icon} />
                    <Text style={styles.card__location}>{item.boatId.portName}</Text>
                    <IIcon name="date-range" size={13} />
                    <Text style={styles.card__date}>27 June 2023</Text>
                    <Text style={styles.card__price}>{item.price}$</Text>
                </View>
            </View>
      )}
    />
  )
  
}
{
  tap == "accepted" && (
    <FlatList
      data={accepted}
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
            <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          </View>
      )}
    />
  )
  
}
{
  tap === "finished" && (
    <FlatList
      data={finished}
      keyExtractor={(item) => item._id}
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
              <Icon name='anchor' size={18} color={'#166582'} />
              <Text style={styles.card_con_info_row_type}>{item.boatId.portName}</Text>
            </View>
            {
              !item.rate ?
            <StarRating
              key={item._id}
              disabled={false}
              maxStars={5}
              rating={item.rating}
              selectedStar={(rating) => handleRatingChange(item._id, rating , item.boatId._id)}
              starSize={20}
              fullStarColor="#ffc107"
              emptyStarColor="#e4e5e9"
            /> : <StarRating
            key={item._id}
            disabled={false}
            maxStars={5}
            rating={item.rate.rating}
            // selectedStar={(rating) => handleRatingChange(item._id, rating , item.boatId._id)}
            starSize={20}
            fullStarColor="#ffc107"
            emptyStarColor="#e4e5e9"
          />
            }
          </View>
        </View>
      )}
    />
  )
}

</View>





      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  
  radio:{
    display:"none"
  },
  star:{
    height: 25,
	width: '100%'
  },
  card: {
    height: 190
  },
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
    bottom: 30,
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
    bottom: 10,
  },
  profile__tabs: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
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
  profile__cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // alignItems:"flex-start",

  },
  profile__card__image: {
    width: 190,
    height: 170,
    borderRadius: 20,
    marginTop: 20,
  },
  card__content: {
    backgroundColor: 'rgba(0, 0, 0, 0.434)',
    height: 50,
    bottom: 50,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card__text: {
    fontSize: 15,
    fontWeight: 400,
    padding: 5,
  },
  boat__loc: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    bottom: 84,
    left: 80,
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
  button: {
  padding: 10,
  margin: 16,
  justifyContent: 'center',
  alignItems: 'center',
  color:'#ffffff',
  backgroundColor: '#d0d0d0',
  borderRadius:2
  },
  modalContent: {
  backgroundColor: '#ffffff',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius:60,
  borderTopLeftRadius:60,
  },
  bottomModal: {
  justifyContent: 'flex-end',
  margin: 0,

  },
  customBarStyle:{
    justifyContent: 'center',
    flexDirection:"row",
    marginTop:30,
  },
  starImgFilled:{
    width:40,
    height:40,
    resizeMode:"cover"
  }

});

export default UserProfile