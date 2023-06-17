import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import coverImage from '../assets/cover.jpg';
import userProfile from '../assets/userimage.jpg';
import card from '../assets/card.jpeg';
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { addReview, canceltrip, pendingTrips, finishedTrips, editUserInfo } from '../redux/slices/UserSlice';
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import ip from '../config'






export const UserProfile = () => {

  //get user data
  const { user } = useSelector(state => state.UserSlice)

  const dispatch = useDispatch();

  //get trips
  const [tap, setTap] = useState("accepted")
  // const { accepted } = useSelector(state => state.UserSlice)
  const { finished } = useSelector(state => state.UserSlice)
  // const { pending } = useSelector(state => state.UserSlice)

  useEffect(() => {

    //console.log(user);
    // console.log(editUserInfo);

    dispatch(finishedTrips({ id: user._id }))
    // dispatch(editUserInfo({ id: user._id }))

    // dispatch(acceptedTrips({ id: user._id }))
    // dispatch(pendingTrips({ id: user._id }))

  }, []);

  function pend() {
    setTap("pending")
    // console.log(pending)
  }
  function accep() {
    setTap("accepted")
  }
  function prev() {
    setTap("finished")
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
          placeholder={user.name}
          placeholderTextColor="black"
          onChangeText={(e) => setName(e)}
        />
        <TextInput style={styles.modal__profile__input}
          placeholder={user.phone}
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
            name: editName || user.name,
            phone: editPhone || user.phone,
            address: user.address,
            img: image || user.img,
          };
    
          dispatch(editUserInfo(updatedUser));
          setVisibleModal(null);
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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };





  return (
    <ScrollView contentContainerStyle={styles.profile__container}>

      <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>

        {renderModalContent()}
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
      <View style={styles.profile__tabs}>
        <TouchableOpacity onPress={() => { accep }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Preovious Trips</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { pend }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Pending Trips</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { prev }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Finished Trips</Text></View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => {

        }}>
          <View style={styles.tabs__button}><Text style={styles.tabs__font__style}>Finished Trips</Text></View>
        </TouchableOpacity>
      </View>
      <View style={styles.profile__cards}>
      {/* {tap === 'pending' &&
        pending.map((item) => {
          return <View style={styles.card} key={item.id} data={{...item,tap:tap}}>
          <Image source={card} style={styles.profile__card__image} />
          <View style={styles.card__content}>
            <Text style={styles.card__text}>
              {item.name}
            </Text>
            <Text style={styles.card__text}>
              {item.email}
            </Text>
          </View>

          <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          <View style={styles.boat__loc}>
            <IIcon style={styles.icon__loc} name='location' size={10} />
            <Text style={styles.text__loc}>Port: El-Mahata</Text>
          </View>
        </View> ;
        })}

      {tap === 'accepted' &&
        accepted.map((item) => {
          return <View style={styles.card} key={item.id} data={{...item,tap:tap}}>
          <Image source={card} style={styles.profile__card__image} />
          <View style={styles.card__content}>
            <Text style={styles.card__text}>
              {item.name}
            </Text>
            <Text style={styles.card__text}>
              {item.email}
            </Text>
          </View>

          <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          <View style={styles.boat__loc}>
            <IIcon style={styles.icon__loc} name='location' size={10} />
            <Text style={styles.text__loc}>Port: El-Mahata</Text>
          </View>
        </View> ;
        })} */}

        {tap === 'finished' &&
          finished.map((item) => {
            return <View style={styles.card} key={item.id} data={{ ...item, tap: tap }}>
              <Image source={card} style={styles.profile__card__image} />
              <View style={styles.card__content}>
                <Text style={styles.card__text}>
                  {item.name}
                </Text>
                <Text style={styles.card__text}>
                  {item.hours}
                </Text>
              </View>

              <View style={styles.stars__rating}>
                <Icon name="star" size={10} color='yellow' />
                <Icon name="star" size={10} color='yellow' />
                <Icon name="star" size={10} color='yellow' />
                <Icon name="star" size={10} color='yellow' />
                <Icon name="star" size={10} color='yellow' />
              </View>
              <View style={styles.boat__loc}>
                <IIcon style={styles.icon__loc} name='location' size={10} />
                <Text style={styles.text__loc}>{item.status}</Text>
              </View>
            </View>;
          })}




        {/* <View style={styles.profile__cards}>
        <View style={styles.card}>
          <Image source={card} style={styles.profile__card__image} />
          <View style={styles.card__content}>
            <Text style={styles.card__text}>
              Feloka
            </Text>
            <Text style={styles.card__text}>
              200$
            </Text>
          </View>

          <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          <View style={styles.boat__loc}>
            <IIcon style={styles.icon__loc} name='location' size={10} />
            <Text style={styles.text__loc}>Port: El-Mahata</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={card} style={styles.profile__card__image} />
          <View style={styles.card__content}>
            <Text style={styles.card__text}>
              Feloka
            </Text>
            <Text style={styles.card__text}>
              200$
            </Text>
          </View>

          <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          <View style={styles.boat__loc}>
            <IIcon style={styles.icon__loc} name='location' size={10} />
            <Text style={styles.text__loc}>Port: El-Mahata</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={card} style={styles.profile__card__image} />
          <View style={styles.card__content}>
            <Text style={styles.card__text}>
              Feloka
            </Text>
            <Text style={styles.card__text}>
              200$
            </Text>
          </View>

          <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          <View style={styles.boat__loc}>
            <IIcon style={styles.icon__loc} name='location' size={10} />
            <Text style={styles.text__loc}>Port: El-Mahata</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={card} style={styles.profile__card__image} />
          <View style={styles.card__content}>
            <Text style={styles.card__text}>
              Feloka
            </Text>
            <Text style={styles.card__text}>
              200$
            </Text>
          </View>

          <View style={styles.stars__rating}>
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
            <Icon name="star" size={10} color='yellow' />
          </View>
          <View style={styles.boat__loc}>
            <IIcon style={styles.icon__loc} name='location' size={10} />
            <Text style={styles.text__loc}>Port: El-Mahata</Text>
          </View>
        </View> */}


      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
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

});

export default UserProfile