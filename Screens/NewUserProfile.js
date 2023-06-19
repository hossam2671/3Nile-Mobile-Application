import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ip from '../config'
import * as ImagePicker from 'expo-image-picker';


// Tab ICons...
import home from '../assets/home.png';
import accept from '../assets/accept.png';
import pending from '../assets/pending.png';
import finished from '../assets/end.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/userimage.jpg';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { addReview, canceltrip, pendingTrips, finishedTrips, editUserInfo, acceptedTrips } from '../redux/slices/UserSlice';

//modal
import Modal from "react-native-modal";


function NewUserProfile() {
    //get user data
    const { user } = useSelector(state => state.UserSlice)

    const dispatch = useDispatch();

    //modal
    const [visibleModal, setVisibleModal] = useState(null);
    const [editName, setName] = useState("")
    const [editPhone, setPhone] = useState("")
    const [image, setImage] = useState(`http://${ip}:5000/${user.img}`);

    const renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.apply__button}>
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


            </View>




            {renderButton('Apply', () => {
                const updatedUser = {
                    name: editName || user.name,
                    phone: editPhone || user.phone,
                };

                dispatch(editUserInfo({updatedUser})).then((res)=>{
                    setVisibleModal(false)
        
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
    
        if (!result.cancelled) {
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

    return (
        <SafeAreaView style={styles.container}>

            <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>

                {renderModalContent()}
            </Modal>

            <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                <Image source={{uri : image}} style={{
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

                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Accept", accept)}
                    {TabButton(currentTab, setCurrentTab, "Pending", pending)}
                    {TabButton(currentTab, setCurrentTab, "Finished", finished)}

                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
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

                    <Image source={{uri: image}} style={{
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

                    <TouchableOpacity onPress={() => {pickImage()}}>
                    <Icon name="camera" size={20} color="#0c8df7" style={styles.icon__button}/>
                    </TouchableOpacity>



                </Animated.View>

            </Animated.View>

        </SafeAreaView>
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
    },

    edit__button: {
        width: 80,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#0c8df7',
        left: 320,
        bottom: 80,
    },

    edit__button__style: {
        fontSize: 20,
        left: 10,
        top: 5,
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

    apply__button: {
        width: 70,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
    },
    icon__button:{
        bottom: 170,
        left: 231,
    }

});

export default NewUserProfile