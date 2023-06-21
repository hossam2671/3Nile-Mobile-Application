import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ip from '../config'
import * as ImagePicker from 'expo-image-picker';
import Cards from './Cards';

import Icona from 'react-native-vector-icons/Ionicons';
import IIcon from 'react-native-vector-icons/MaterialIcons';
// Tab ICons...
import home from '../assets/home.png';
import accept from '../assets/accept.png';
import pendingg from '../assets/pending.png';
import finishedd from '../assets/end.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/userimage.jpg';
import cardboat from '../assets/Nile.jpg'
import boat from '../assets/Nile.jpg';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { addReview, canceltrip, pendingTrips, finishedTrips, editUserInfo, acceptedTrips } from '../redux/slices/UserSlice';

//modal
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NewUserProfile() {
    //get user data
    const { user } = useSelector(state => state.UserSlice)
    const [userState , setUserState] = useState(user)
    const dispatch = useDispatch();


    //modal

    const [visibleModal, setVisibleModal] = useState(null);
    const [editName, setName] = useState("")
    const [editPhone, setPhone] = useState("")
    const [image, setImage] = useState(`http://${ip}:5000/${user.img}`);

    const renderButton = (text, onPress) => (
        <View style={styles.book_fixToText}>
          <TouchableOpacity style={styles.book_bookBtn} onPress={onPress}>
            <Text style={styles.book_btn}>{text}</Text>
            <Icon name="arrow-right" color={'#000'} size={15} style={styles.book_arrow} />
          </TouchableOpacity>
        </View>
    );

    const renderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.select}>

                <Text style={styles.edit__text}>Edit your Details</Text>


                <TextInput style={styles.modal__input}
                    placeholder={userState.name}
                    placeholderTextColor="#0000006a"
                    onChangeText={(e) => {setName(e) ; console.log(editName)}}
                />
                <TextInput style={styles.modal__input}
                    placeholder={userState.phone}
                    placeholderTextColor="0000006a"
                    onChangeText={(e) => setPhone(e)}

                />


            </View>




            {renderButton('Apply', () => {
                const updatedUser = {
                    name: editName || userState.name,
                    phone: editPhone || userState.phone,
                    id: user._id
                };

                dispatch(editUserInfo({ updatedUser })).then((res) => { 
                    setVisibleModal(false)
                    console.log(res.payload.data,"ggfdfhfdhhsfdfhdfhdsfhdfhdfhdsfhdsfhd")
                    setUserState(res.payload.data)
                })
            })}

        </View>
    );

    //edit Image

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
            setImage(result.uri);
        }
    };



    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);

    // Animated Properties...

    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;


    const [tap, setTap] = useState("accepted")
    const { accepted } = useSelector(state => state.UserSlice)
    const { finished } = useSelector(state => state.UserSlice)
    const { pending } = useSelector(state => state.UserSlice)



    useEffect(() => {



        dispatch(finishedTrips({ id: user._id }))


        dispatch(acceptedTrips({ id: user._id }))
        dispatch(pendingTrips({ id: user._id }))
        console.log(pending)

    }, []);
    const TabButton = ({ currentTab, setCurrentTab, title, icon, onPress }) => {
        return (
            
            <TouchableOpacity onPress={onPress}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 8,
                        backgroundColor: currentTab === title ? "white" : "transparent",
                        paddingLeft: 13,
                        paddingRight: 35,
                        borderRadius: 8,
                        marginTop: 15,
                    }}
                >
                    <Image
                        source={icon}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: currentTab === title ? "#0c8df7" : "white",
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            paddingLeft: 15,
                            color: currentTab === title ? "#0c8df7" : "white",
                        }}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    function cancel(id){
        // console.log("first")
        // dispatch(pendingTrips({id:user._id})) 
         dispatch(canceltrip(id)).then(() =>dispatch(pendingTrips({id:user._id})) )
    }
 //rating
 const [rating , setRating] = useState(0)
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
  

} 

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>

                {renderModalContent()}
            </Modal>

            <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                <Image source={{ uri: image }} style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    marginTop: 8
                }}></Image>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
                }}>{user.name}</Text>

                <TouchableOpacity>
                    <Text style={{
                        marginTop: 6,
                        color: 'white'
                    }}>{user.phone}</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {
                        // Tab Bar Buttons....
                    }

                    <TabButton
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        title="Home"
                        icon={home}
                        onPress={() => {
                            console.log("first");
                            setCurrentTab("Home")
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 1,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            Animated.timing(offsetValue, {
                                // YOur Random Value...
                                toValue: showMenu ? 0 : 200,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
                            Animated.timing(closeButtonOffset, {
                                // YOur Random Value...
                                toValue: !showMenu ? -30 : 0,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            setShowMenu(!showMenu);

                        }}
                    />
                    <TabButton
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        title="Accept"
                        icon={accept}
                        onPress={() => {
                            setTap("accepted")
                            console.log(tap)
                            setCurrentTab("Accept")
                         
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 1,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            Animated.timing(offsetValue, {
                                // YOur Random Value...
                                toValue: showMenu ? 0 : 200,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
                            Animated.timing(closeButtonOffset, {
                                // YOur Random Value...
                                toValue: !showMenu ? -30 : 0,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            setShowMenu(!showMenu);

                        }}
                    />
                    <TabButton
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        title="Pending"
                        icon={pendingg}
                        onPress={() => {
                            setTap("pending")
                            console.log(tap)
                            setCurrentTab("Pending")
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 1,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            Animated.timing(offsetValue, {
                                // YOur Random Value...
                                toValue: showMenu ? 0 : 200,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
                            Animated.timing(closeButtonOffset, {
                                // YOur Random Value...
                                toValue: !showMenu ? -30 : 0,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            setShowMenu(!showMenu);

                        }}
                    />
                    <TabButton
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        title="Finished"
                        icon={finishedd}
                        onPress={() => {
                            setTap("finished")
                            console.log(tap)
                            setCurrentTab("Finished")
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 1,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            Animated.timing(offsetValue, {
                                // YOur Random Value...
                                toValue: showMenu ? 0 : 200,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
                            Animated.timing(closeButtonOffset, {
                                // YOur Random Value...
                                toValue: !showMenu ? -30 : 0,
                                duration: 300,
                                useNativeDriver: true
                            })
                                .start()
    
                            setShowMenu(!showMenu);
                        }}
                    />
                    {/* {TabButton(currentTab, setCurrentTab, "Accept", accept)} */}
                    {/* {TabButton(currentTab, setCurrentTab, "Pending", pending)} */}
                    {/* {TabButton(currentTab, setCurrentTab, "Finished", finished)} */}

                </View>

                <View>
                    {/* {TabButton(currentTab, setCurrentTab, "LogOut", logout)} */}
                    <TabButton
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        title="Logout"
                        icon={logout}
                        onPress={() => {
                            setTap("logout")
                            AsyncStorage.removeItem("user")
                            setCurrentTab("Logout")
                        }}
                    />
                </View>

            </View>

            {
                // Over lay View...
            }

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: -20,
                borderRadius: showMenu ? 15 : 0,
                // Transforming View...
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }}>

                {
                    // Menu Button...
                }

                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <TouchableOpacity onPress={() => {
                        // Do Actions Here....
                        // Scaling the view...
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 1,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(offsetValue, {
                            // YOur Random Value...
                            toValue: showMenu ? 0 : 200,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(closeButtonOffset, {
                            // YOur Random Value...
                            toValue: !showMenu ? -30 : 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        setShowMenu(!showMenu);
                    }}>

                        <Image source={showMenu ? close : menu} style={{
                            width: 20,
                            height: 20,
                            tintColor: 'black',
                            marginTop: 40,

                        }}></Image>

                    </TouchableOpacity>

                    <Image source={photo} style={{
                        width: '100%',
                        height: 190,
                        borderRadius: 20,
                        marginTop: 5
                    }}></Image>

                    <Image source={{ uri: image }} style={{
                        width: 90,
                        height: 90,
                        borderRadius: 50,
                        bottom: 45,
                        left: 165,
                    }}></Image>

                    <TouchableOpacity
                        isVisible={visibleModal === 1}
                        onPress={() => { setVisibleModal(1) }}>
                        <View style={styles.edit__button}><Text style={styles.edit__button__style}>+ Edit</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { pickImage() }}>
                        <Icon name="camera" size={20} color="#0c8df7" style={styles.icon__button} />
                    </TouchableOpacity>



<View style={{paddingBottom: 300}}>

                    {
  tap == "pending" && (
    <FlatList
      data={pending}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.card__box}>
                <View style={styles.card__image}>
                    <Image source={cardboat} style={styles.cardboat__img} />
                </View>
                <View style={styles.card__content}>
                    <Text style={styles.card__name}>Feloka</Text>
                    <Icona name="location" size={13} style={styles.loc__icon} />
                    <Text style={styles.card__location}>Port: MAC</Text>
                    <IIcon name="date-range" size={13} />
                    <Text style={styles.card__date}>27 June 2023</Text>
                    <Text style={styles.card__price}>200$</Text>
                    <TouchableOpacity onPress={() => cancel(item._id)}>
                        <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>x Cancel</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
      )}
    />
  )
  
}
{
  tap == "finished" && (
    <FlatList
      data={finished}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.card__box}>
                <View style={styles.card__image}>
                    <Image source={cardboat} style={styles.cardboat__img} />
                </View>
                <View style={styles.card__content}>
                    <Text style={styles.card__name}>Feloka</Text>
                    <Icona name="location" size={13} style={styles.loc__icon} />
                    <Text style={styles.card__location}>Port: MAC</Text>
                    <IIcon name="date-range" size={13} />
                    <Text style={styles.card__date}>27 June 2023</Text>
                    <Text style={styles.card__price}>200$</Text>
                    
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
      )}
    />
  )
  
}
{
  tap == "accepted" && (
    <FlatList
      data={accepted.data}
      renderItem={({ item }) => (
        <View style={styles.card__box}>
                <View style={styles.card__image}>
                    <Image source={cardboat} style={styles.cardboat__img} />
                </View>
                <View style={styles.card__content}>
                    <Text style={styles.card__name}>Feloka</Text>
                    <Icona name="location" size={13} style={styles.loc__icon} />
                    <Text style={styles.card__location}>Port: MAC</Text>
                    <IIcon name="date-range" size={13} />
                    <Text style={styles.card__date}>27 June 2023</Text>
                    <Text style={styles.card__price}>200$</Text>
                    <TouchableOpacity onPress={() => {cancel(item.id)}}>
                        <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>x Cancel</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
      )}
    />
  )
  
}
</View>
            

                </Animated.View>

            </Animated.View>
        </ScrollView>
    );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (

        <TouchableOpacity onPress={() => {
            if (title == "LogOut") {
                // Do your Stuff...
            } else {
                setCurrentTab(title)
            }
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 15
            }}>

                <Image source={image} style={{
                    width: 25, height: 25,
                    tintColor: currentTab == title ? "#0c8df7" : "white"
                }}></Image>

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#0c8df7" : "white"
                }}>{title}</Text>

            </View>
        </TouchableOpacity>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c8df7',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // marginBottom:100,
    },

    edit__button: {
        width: 80,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#0c8df7',
        left: 320,
        bottom: 80,
    },

    edit__button__style: {
        fontSize: 15,
        fontWeight: 600,
        top: 7,
        textAlign: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal__input: {
        width: 300,
        height: 50,
        borderBottomColor: '#17171769',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        borderBottomWidth: 1,
    },
    icon__button: {
        bottom: 170,
        left: 231,
    },

    card__box: {
        marginLeft:60,
        elevation: 4,
        width: 300,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#878585',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom:150
    },
    card__image:{
        width: 270,
        height: 120,
        alignItems: 'center',
        borderRadius: 20,
        left: 15,
        top: 20,
    },
    cardboat__img: {
        width: 270,
        height: 120,
        borderRadius: 10,
    },
    card__content:{
        top: 40,
        left: 15,
    },
    card__name: {
        fontSize: 20,
        fontWeight: 600,
        bottom: 15,
    },
    card__location:{
        bottom: 18,
        left: 16,
    },
    card__date:{
        bottom: 17,
        left: 16,
    },
    card__price:{
        fontSize: 20,
        fontWeight: 600,
    },
    cancel__button:{
        width: 70,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        left: 200,
        bottom: 27,
        
    },
    cancel__button__text:{
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
    },
    book_fixToText: {
        // height: 100,
        // width: 45,
        backgroundColor: '#0c8df7',
        borderRadius: 55,
        marginTop: 30,
      },
      book_bookBtn: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        height: 50,
        paddingTop: 15,
      },
      book_btn: {
        color: '#ffffff',
        fontWeight: 600,
        fontSize: 20,
        paddingLeft: 20,
        marginTop: -17,
      },
      book_arrow: {
        color: '#000000',
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 10,
        marginTop: -15,
        marginRight:20,
      },
      add__boat__close__icon:{
        fontSize: 20,
        fontWeight: 600,
        left: 200,
      },
      edit__text:{
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        alignItems: 'center',
      }
});

export default NewUserProfile