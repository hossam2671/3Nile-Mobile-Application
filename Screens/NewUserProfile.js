import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ip from '../config'
import * as ImagePicker from 'expo-image-picker';
import Cards from './Cards';
import axios from 'axios';
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
import succ from '../assets/succsses.png'
import errorImage from '../assets/error.png'
//modal
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate, formatTime } from '../functions';
import io from 'socket.io-client';

const socket = io(`http://${ip}:5000`);

function NewUserProfile(props) {
    //get user data
    const { user } = useSelector(state => state.UserSlice)
    const [userState, setUserState] = useState(user)
    const dispatch = useDispatch();


    //modal

    const [visibleModal, setVisibleModal] = useState(null);
    const [editName, setName] = useState("")
    const [editPhone, setPhone] = useState("")
    const [image, setImage] = useState(`http://${ip}:5000/${user.img}`);

    const [isFormValid, setIsFormValid] = useState(false);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleUpdate = () => {

        if (editName.trim() === '') {
            setNameError('Please enter your name');
            return;
          }
        
        if (editPhone.trim() === '') {
            setPhoneError('Please enter your phone number');
            return;
          }
      
        const updatedUser = {
          name: editName || userState.name,
          phone: editPhone || userState.phone,
          id: user._id,
        };
      
        dispatch(editUserInfo({ updatedUser })).then((res) => {
          setVisibleModal(false);
          console.log(res.payload.data, "ggfdfhfdhhsfdfhdfhdsfhdfhdfhdsfhdsfhd");
          setUserState(res.payload.data);
        });
      };
      
      const renderButton = (text) => (
        <View style={styles.book_fixToText}>
          <TouchableOpacity
            style={[
              styles.book_bookBtn,
              { opacity: isFormValid ? 1 : 0.5 },
            ]}
            disabled={!isFormValid}
            onPress={handleUpdate}
          >
            <Text style={styles.book_btn}>{text}</Text>
            <Icon name="arrow-right" color={"#000"} size={15} style={styles.book_arrow} />
          </TouchableOpacity>
        </View>
      );
      
      const renderModalContent = () => (
        <View style={styles.modalContent}>
          <View style={styles.select}>
            <Text style={styles.edit__text}>Edit your Details</Text>
            <Text style={styles.edit__close__icon} onPress={() => setVisibleModal(false)}>
              X
            </Text>
      
            <TextInput
              style={styles.modal__input}
              placeholder="Your Name"
              placeholderTextColor="#0000006a"
              onChangeText={(e) => {
                if (e.trim().length === 0) {
                    setIsFormValid(false);
                    setNameError('Please enter your name');
                } else {
                    setIsFormValid(true);
                    setNameError('');
                }
              
                
                setName(e)}
            }
            />
            {nameError ? (
                    <Text style={styles.error__message}>{nameError}</Text>
                ) : null}

            <TextInput
              style={styles.modal__input}
              placeholder="Your Phone"
              placeholderTextColor="#0000006a"
              onChangeText={(e) =>{ 
                if (e.trim().length === 0) {
                    setIsFormValid(false);
                    setPhoneError('Please enter your phone');
                } else {
                    setIsFormValid(true);
                    setPhoneError('');
                }
                
                setPhone(e)}
              }
            />
            {phoneError ? (
                    <Text style={styles.error__message}>{phoneError}</Text>
                ) : null}
          </View>

      
          {renderButton("Apply")}
        </View>
      );

    const [editImageModal, setEditImageModal] = useState(0)
    const EditImageModal = () => (
        <View style={styles.modalContent}>
        <Image source={succ} style={styles.succ} />

            <Text style={styles.text}>Your Image Changed successfully </Text>
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
            console.log("firkst")
            const uriParts = result.uri.split('.');
            const fileExtension = uriParts[uriParts.length - 1];
            const timestamp = Date.now();
            setImage(result.uri);
            const formData = new FormData();
            formData.append('img', {
                uri: result.uri,
                name: `image_${timestamp}.${fileExtension}`,
                type: `image/${fileExtension}`,
            });

            const response = await axios.put(`http://${ip}:5000/user/editImage/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(() => {
                setEditImageModal(1)
                setTimeout(() => {
                    setEditImageModal(0)
                }, 3000)
            });
        }
    };

    // edit info start 


    const [editModal, setEditModal] = useState(0)
    const editInfoModal = () => (
        
        <View style={styles.modalContent}>
        <Image source={succ} style={styles.succ} />

            <Text style={styles.text}>Your Information Changed successfully </Text>
        </View>
    );

    // edit info end 

    const [editCoverModal, setEditCoverModal] = useState(0)
    const EditCoverModal = () => (
        <View style={styles.modalContent}>
        <Image source={succ} style={styles.succ} />

            <Text style={styles.text}>Your Cover Image Changed successfully </Text>
        </View>
    );

    //edit cover image

    const [coverImage, setCoverImage] = useState(`http://${ip}:5000/${user.coverImg}`)


    const pickCoverImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const uriParts = result.uri.split('.');
            const fileExtension = uriParts[uriParts.length - 1];
            const timestamp = Date.now();
            setCoverImage(result.uri);
            const formData = new FormData();
            formData.append('img', {
                uri: result.uri,
                name: `image_${timestamp}.${fileExtension}`,
                type: `image/${fileExtension}`,
            });

            const response = await axios.put(`http://${ip}:5000/user/editCover/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(() => {
                setEditCoverModal(1)
                setTimeout(() => {
                    setEditCoverModal(0)

                }, 3000)
            });
        }
    };



    const [currentTab, setCurrentTab] = useState("Pending");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);

    // Animated Properties...

    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;


    const [tap, setTap] = useState("Pending")
    const [daaata, setData] = useState([])
    const { accepted } = useSelector(state => state.UserSlice)
    const { finished } = useSelector(state => state.UserSlice)
    const { pending } = useSelector(state => state.UserSlice)


    console.log(accepted, "axxcc");
    useEffect(() => {

        socket.on('trip-request-accepted', (data) => {
            dispatch(acceptedTrips({ id: user._id }))
            dispatch(pendingTrips({ id: user._id }))
            dispatch(finishedTrips({ id: user._id }))

        })
        socket.on('Owner-finished-Trip', (data) => {
            dispatch(acceptedTrips({ id: user._id }))

            dispatch(finishedTrips({ id: user._id }))


        })

        if(tap===null || tap === "Pending" || tap === ""){
            setTap("Pending");
        }
        dispatch(finishedTrips({ id: user._id }))


        dispatch(acceptedTrips({ id: user._id }))
        dispatch(pendingTrips({ id: user._id }))
        // console.log(pending)

    }, [currentTab,tap]);
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
                        paddingRight: 75,
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

    function cancel(id) {
        // console.log("first")

        dispatch(canceltrip(id)).then(() =>


            dispatch(pendingTrips({ id: user._id })).then((res) => {
                console.log(res.payload.data, "vcxvxcvcx");
                setData(res.payload.data)
            })


        )

    }
    //rating
    const [rating, setRating] = useState(0)
    const handleRatingChange = (itemId, newRating, boatId) => {
        console.log('New rating:', newRating);
        console.log('Item ID:', itemId);


        const updatedFinished = finished.map((item) => {
            if (item._id === itemId) {
                setRating(newRating)
                dispatch(addReview({ boatId: boatId, clientId: user._id, tripId: itemId, rate: newRating })).then(() => {
                    dispatch(finishedTrips({ id: user._id }))
                })
            }
        })


    }

    return (
        <ScrollView


            contentContainerStyle={styles.container}>

            <Modal


                isVisible={visibleModal === 1} style={styles.bottomModal}>

                {renderModalContent()}
            </Modal>

            <Modal
                key="modal9"

                isVisible={editCoverModal === 1} style={styles.bottomModal}>

                {EditCoverModal()}
            </Modal>
            <Modal
            key="modal4"

            isVisible={editModal === 1} style={styles.bottomModal}>

            {editInfoModal()}
        </Modal>
            <Modal
                key="modal5"

                isVisible={editImageModal === 1} style={styles.bottomModal}>

                {EditImageModal()}
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

                    {/* <TabButton
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
                    /> */}
                    <TabButton
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        title="Pending"
                        icon={pendingg}
                        onPress={() => {
                            dispatch(pendingTrips({ id: user._id })).then((res) => {
                                console.log(res.payload.data, "vcxvxcvcx");
                                setData(res.payload.data)
                                console.log(daaata, "ddddddddczxxz")

                            })

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
                        title="Accepted"
                        icon={accept}
                        onPress={() => {
                            dispatch(acceptedTrips({ id: user._id })).then((res) => {
                                console.log(res.payload.data, "dsadsadcxz");
                                setData(res.payload.data)
                            })
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
                        title="Finished"
                        icon={finishedd}
                        onPress={() => {
                            dispatch(finishedTrips({ id: user._id })).then((res) => {
                                console.log(res.payload.data, "xcxcvbcxvbcvb")
                                setData(res.payload.data)
                            })

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

                            setCurrentTab("Logout")
                            props.navigation.navigate("LoginSignUp")
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
                    <View
                        style={{
                            width: '100%',
                            height: 200,
                            marginBottom: 50
                        }} >


                        <Image source={{uri : coverImage}} style={{
                            width: '100%',
                            height: 150,
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

                        <TouchableOpacity onPress={() => { pickCoverImage() }}>
                            <Icon name="camera" size={20} style={styles.cover__icon__button} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            isVisible={visibleModal === 1}
                            onPress={() => { setVisibleModal(1) }}>
                            <View style={styles.edit__button}><Text style={styles.edit__button__style}>+ Edit</Text></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { pickImage() }}>
                            <Icon name="camera" size={20} style={styles.icon__button} />
                        </TouchableOpacity>

                    </View>

                    

                    <View style={{ marginBottom: 350 }}>

                        {
                            tap === "pending" && (


                                

                                <FlatList

                                    style={{ marginBottom: 250 }}
                                    data={pending}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.card__box}>
                                            <View style={styles.card__image}>
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item.boatId.images[0]}`,
                                                }} style={styles.cardboat__img} />
                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.boatId.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.boatId.portName}</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{formatDate(item.startTime)}  At   {formatTime(item.startTime)} </Text>

                                                <Text style={styles.card__price}>{item.price} LE</Text>
                                                <TouchableOpacity onPress={() =>



                                                    cancel(item._id)}>

                                                    <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>Cancel</Text></View>
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
                                    style={{
                                        marginBottom: 250
                                    }}
                                    data={finished}
                                    keyExtractor={(item) => item?._id}
                                    renderItem={({ item }) => (
                                        <View style={styles?.card__box}>
                                            <View style={styles?.card__image}>
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item?.boatId?.images[0]}`,
                                                }} style={styles?.cardboat__img} />
                                            </View>
                                            <View style={styles?.card__content}>
                                                <Text style={styles?.card__name}>{item?.boatId?.name}</Text>
                                                <Icona name="location" size={13} style={styles?.loc__icon} />
                                                {/* <Text style={styles?.card__location}>{item.boatId.portName}</Text> */}
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{formatDate(item.startTime)}  At   {formatTime(item.startTime)} </Text>
                                                <Text style={styles?.card__price}>{item?.price}LE</Text>

                                            </View>
                                            {
                                                !item?.rate ?
                                                    <View
                                                        style={styles?.card__Rate}

                                                    >
                                                        <StarRating
                                                            key={item?._id}
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={item?.rating}
                                                            selectedStar={(rating) => handleRatingChange(item?._id, rating, item?.boatId?._id)}
                                                            starSize={15}
                                                            fullStarColor="orange"
                                                            emptyStarColor="#e4e5e9"


                                                        />


                                                    </View>

                                                    :

                                                    <View


                                                        style={styles?.card__Rate}
                                                    >
                                                        <StarRating

                                                            key={item?._id}
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={item?.rate?.rating}
                                                            // selectedStar={(rating) => handleRatingChange(item._id, rating , item.boatId._id)}
                                                            starSize={15}
                                                            fullStarColor="orange"
                                                            emptyStarColor="#e4e5e9"
                                                        />
                                                    </View>
                                            }
                                        </View>
                                    )}
                                />
                            )

                        }
                        {
                            tap == "accepted" && (
                                < FlatList
                                    style={{
                                        marginBottom: 250
                                    }}
                                    data={accepted}
                                    renderItem={({ item }) => (
                                        <View style={styles.card__box}>
                                            <View style={styles.card__image}>
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item.boatId.images[0]}`,
                                                }} style={styles.cardboat__img} />
                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.boatId.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.boatId.portName}</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{formatDate(item.startTime)}  At   {formatTime(item.startTime)} </Text>
                                                <Text style={styles.card__price}>{item.price}LE</Text>
                                                {/* <TouchableOpacity onPress={() => {cancel(item.id)}}>
                        <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>Finish</Text></View>
                    </TouchableOpacity> */}
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
        borderRadius: 50,
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
        color: '#fff'
    },
    modalContent: {
        backgroundColor: '#f8f8f8',
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
        bottom: 180,
        left: 239,
        color: 'white',
    },

    cover__icon__button: {
        bottom: 225,
        left: 380,
        color: 'white',
    },

    card__box: {
        marginLeft: 60,
        elevation: 4,
        width: 300,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 50
    },
    card__image: {
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
    card__content: {
        top: 40,
        left: 15,
    },
    card__name: {
        fontSize: 20,
        fontWeight: 600,
        bottom: 15,
    },
    card__location: {
        bottom: 18,
        left: 16,
    },
    card__date: {
        bottom: 17,
        left: 16,
    },
    card__price: {
        fontSize: 20,
        fontWeight: 600,
    },
    cancel__button: {
        width: 60,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        left: 200,
        bottom: 47,
        borderRadius: 90,
        color: "white",

    },
    cancel__button__text: {
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
        color: "white",
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
        padding: 12,
        marginTop: -13,
        marginRight: 10,
    },
    add__boat__close__icon: {
        fontSize: 20,
        fontWeight: 600,
        left: 200,
    },
    edit__text: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        alignItems: 'center',
    },
    card__Rate: {
        justifyContent: 'center',
        width: 100,

        borderRadius: 50,
        marginTop: 20,
        marginLeft: 160,
    },
    succ:{
        width:100,
        height:100,
    
      },
      text:{
        fontSize:20,
        paddingTop:20,
      },
      edit__close__icon:{
        bottom: 27,
        left: 300,
        fontSize: 20,
        fontWeight: 600,
    },
    error__message: {
        color: 'red',
    },
});

export default NewUserProfile