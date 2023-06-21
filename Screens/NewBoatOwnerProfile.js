import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ip from '../config'
import * as ImagePicker from 'expo-image-picker';
import Picker from '@react-native-picker/picker'
import Cards from './Cards';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Icona from 'react-native-vector-icons/Ionicons';
import IIcon from 'react-native-vector-icons/MaterialIcons';
// Tab ICons...
import home from '../assets/home.png';
import allboatsI from '../assets/allboat.png';
import prevI from '../assets/prev.jpg';
import reqI from '../assets/req.png';
import currI from '../assets/current.png';
import swvlI from '../assets/swvli.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import * as FileSystem from 'expo-file-system';
// Photo
import photo from '../assets/userimage.jpg';
import cardboat from '../assets/Nile.jpg'
import boat from '../assets/Nile.jpg';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { ownerUpdateInfo, SwvlDetails, getOwnerBoats, getOwnerCurrentTrips, getOwnerPreviousTrips, getOwnerRequests, addBoat, ownerAcceptTrip, ownerCancelTrip, ownerFinishTrip, updateImage } from '../redux/slices/UserSlice';
import { SelectList } from 'react-native-dropdown-select-list'
//modal
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { set } from 'react-native-reanimated';


function NewBoatOwnerProfile() {
    const [selected, setSelected] = React.useState("");
    const [type, setType] = React.useState("");
    const [boatName, setBoatName] = useState("")
    const [boatDescription, setBoatDescriprionName] = useState("")
    const [boatPrice, setBoatPrice] = useState(0)
    const [ownerReqs, setOwnerReqs] = useState([])
    const [allBoats, setAllBoats] = useState([])
    const [prevBoats, setPrevBoats] = useState([])
    const [currBoats, setCurrBoats] = useState([])
    const data = [
        { key: 'KFC', value: 'KFC' },
        { key: 'MAC', value: 'MAC' },
        { key: 'Mahta', value: 'Mahta' },
    ];
    const types = [
        { key: 'shera3', value: 'shera3' },
        { key: 'swvl', value: 'swvl' },
        { key: 'Dahabiya', value: 'Dahabiya' },
        { key: 'Felucca', value: 'Felucca' },
        { key: 'Houseboat', value: 'Houseboat' },
    ];
    //get boatOwner data
    const { boatOwner } = useSelector(state => state.UserSlice)

    const [boatOwnerState, setboatOwnerState] = useState(boatOwner)
    const dispatch = useDispatch();


    //modal

    const [visibleModal, setVisibleModal] = useState(null);
    const [addvisibleModal, setAddVisibleModal] = useState(null);

    const [editboatOwnerName, setEditboatOwnerName] = useState("")
    const [editeditboatOwnerPhone, setEditboatOwnerPhone] = useState("")
    const [image, setImage] = useState(`http://${ip}:5000/${boatOwner.img}`);
    function namy(e) {
        setBoatName(e)
        console.log(e)
    }
    function price(e) {
        setBoatPrice(e)
        console.log(e)
    }
    function description(e) {
        setBoatDescriprionName(e)
        console.log(e)
    }
    function submit() {
        console.log("first")
        dispatch(addBoat({id:boatOwner._id,name:boatName,description:boatDescription,price:boatPrice,portName:selected,type:type}))
        .then((res)=>{
            dispatch(getOwnerBoats(boatOwner._id)).then((res)=>{
                setAllBoats(res)
            })
        })
        setAddVisibleModal(0)
    }

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
                    placeholder={boatOwnerState.name}
                    placeholderTextColor="#0000006a"
                    onChangeText={(e) => {
                        setEditboatOwnerName(e);
                        console.log(editboatOwnerName)
                    }}
                />
                <TextInput style={styles.modal__profile__input}
                    placeholder={boatOwnerState.phone}
                    placeholderTextColor="0000006a"
                    onChangeText={(e) => setEditboatOwnerPhone(e)}

                />


            </View>




            {renderButton('Apply', () => {
                

                dispatch(ownerUpdateInfo({ boatOwnerId:boatOwner._id , name:editboatOwnerName , phone:editeditboatOwnerPhone })).then((res) => {
                    setVisibleModal(false)
                    console.log(res.payload.data, "ggfdfhfdhhsfdfhdfhdsfhdfhdfhdsfhdsfhd")
                    setboatOwnerState(res.payload.data)
                })
            })}

        </View>
    );

    //add boat modal

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().required('Name is required'),
    //     description: Yup.string().max(300, 'must be lower then 20').required('Description is required'),
    //     price: Yup.required('Price is required'),
    //     port: Yup.string.required('Port is required'),
    //     type: Yup.string().required('Type is required')
    // });



    // const formik = useFormik({
    //     initialValues: {
    //         name: '',
    //         description: '',
    //         price: '',
    //     },
    //     // validationSchema,
    //     onSubmit: (values) => {
    //          console.log({...values,port:selected,type:type});
    //         dispatch(addBoat({...values,port:selected,type:type}))
    //     },
    // });

    const addBoatrenderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.apply__button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    const addBoatrenderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.select}>
                <Text style={styles.edit__text}>Add Boat</Text>

                <TextInput
                    name="name"
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={'#0000006a'}
                    onChangeText={(e) => namy(e)}

                    value={boatName}
                />


                <TextInput
                    name="description"
                    style={styles.input}
                    placeholder="Description"
                    placeholderTextColor={'#0000006a'}
                    onChangeText={(e) => description(e)}

                    value={boatDescription}
                />


                <TextInput
                    name="price"
                    style={styles.input}
                    placeholder="Price"
                    onChangeText={(e) => price(e)}

                    value={boatPrice}
                    keyboardType="numeric"
                />


                <SelectList
                    // onSelect={formik.handleChange('port')}
                    name="port"
                    //   value={formik.values.port}
                    setSelected={setSelected}
                    fontFamily='lato'
                    data={data}
                    arrowicon={<Icon name="chevron-down" size={12} color={'black'} />}
                    //   searchicon={<Icon name="search" size={12} color={'black'} />} 
                    search={false}
                    boxStyles={{ borderRadius: 0 }} //override default styles
                    defaultOption={{ key: 'KFC', value: 'KFC' }}   //default selected option
                />

                <SelectList
                    // onSelect={formik.handleChange('port')}
                    name="type"
                    //   value={formik.values.port}
                    setSelected={setType}
                    fontFamily='lato'
                    data={types}
                    arrowicon={<Icon name="chevron-down" size={12} color={'black'} />}
                    //   searchicon={<Icon name="search" size={12} color={'black'} />} 
                    search={false}
                    boxStyles={{ borderRadius: 0 }} //override default styles
                    defaultOption={{ key: 'shera3', value: 'shera3' }}   //default selected option
                />
                {/* <Picker
                    // selectedValue={formik.values.port}
                    // onValueChange={formik.handleChange('port')}
                    // onBlur={formik.handleBlur('port')}
                >
                    <Picker label="Select port" value="" />
                    <Picker label="Port 1" value="KFC" />
                    <Picker label="Port 2" value="MAC" />
                    <Picker label="Port 3" value="El-Mahata" />

                </Picker> */}
                {/* {formik.touched.port && formik.errors.port ? (
                    <Text style={styles.error}>{formik.errors.port}</Text>
                ) : null} */}

                {/* <Picker
                    // selectedValue={formik.values.type}
                    // onValueChange={formik.handleChange('type')}
                    // onBlur={formik.handleBlur('type')}
                >
                    <Picker label="Select port" value="" />
                    <Picker label="type 1" value="shera3" />
                    <Picker label="type 2" value="Type2" />
                    <Picker label="type 3" value="Type3" />

                </Picker> */}
                {/* {formik.touched.type && formik.errors.type ? (
                    <Text style={styles.error}>{formik.errors.type}</Text>
                ) : null} */}

                {/* <TouchableOpacity
                    onPress={() => { pickBoatImage() }}>
                    <View style={styles.add__boat__image__button}><Text style={styles.add__boat__image__button__text}>Add Image</Text></View>
                </TouchableOpacity> */}

            </View>
            {addBoatrenderButton('Apply', submit)}
        </View>
    );
    //add image for boat
    const pickBoatImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

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
            const fileInfo = await FileSystem.getInfoAsync(result.uri);
    const imageUriParts = result.uri.split('.');
    const fileExtension = imageUriParts[imageUriParts.length - 1];
    const formData = new FormData();
    formData.append('image', {
      uri: result.uri,
      name: `image.${fileExtension}`,
      type: fileInfo.mimeType,
    });
    console.log(formData)
            setImage(result.uri);
            dispatch(updateImage({
                id:boatOwner._id,
                img: formData
            }))
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
    const { ownerBoats } = useSelector(state => state.UserSlice)
    const { ownerPreviousTrips } = useSelector(state => state.UserSlice)
    const { ownerRequestsTrips } = useSelector(state => state.UserSlice)
    const { ownerCurrentTrips } = useSelector(state => state.UserSlice)
    const { ownerSwvlTrip } = useSelector(state => state.UserSlice)

    useEffect(() => {

        dispatch(getOwnerBoats(boatOwner._id)).then((first)=>{
            setAllBoats(first)
        })
        dispatch(getOwnerPreviousTrips(boatOwner._id)).then((first)=>{
            setPrevBoats(first)
        })
        dispatch(getOwnerRequests(boatOwner._id)).then((first) =>    {
            console.log(first,"iiiiiiiiiii")
            setOwnerReqs(first)
            
        })
        dispatch(getOwnerCurrentTrips(boatOwner._id)).then((first)=>{
            setCurrBoats(first)
        })
        dispatch(SwvlDetails(boatOwner._id))
        console.log(ownerRequestsTrips,"checkreq")
       

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

    function cancel(id) {
        dispatch(pendingTrips({ id: boatOwner._id }))
        dispatch(canceltrip(id)).then(() => dispatch(pendingTrips({ id: boatOwner._id })))
    }
    

    return (
        <SafeAreaView style={styles.container}>

            <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>

                {renderModalContent()}
            </Modal>

            <Modal isVisible={addvisibleModal === 1} style={styles.bottomModal}>

                {addBoatrenderModalContent()}
            </Modal>

            <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                <Image source={{ uri: image }} style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    marginTop: 80
                }}></Image>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
                }}>{boatOwner.name}</Text>

                <TouchableOpacity>
                    <Text style={{
                        marginTop: 6,
                        color: 'white'
                    }}>{boatOwner.phone}</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 40 }}>
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
                        title="All Boats"
                        icon={allboatsI}
                        onPress={() => {
                            console.log(ownerReqs.payload.data)
                            setTap("allBoats")
                            console.log(tap)
                            setCurrentTab("All Boats")

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
                        title="Previous Trips"
                        icon={prevI}
                        onPress={() => {
                            setTap("prev")
                            console.log(tap)
                            setCurrentTab("Previous Trips")
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
                        title="Owner Requests"
                        icon={reqI}
                        onPress={() => {
                            setTap("req")
                            console.log(tap)
                            setCurrentTab("Owner Requests")
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
                        title="Current Trips"
                        icon={currI}
                        onPress={() => {
                            setTap("curr")
                            console.log(tap)
                            setCurrentTab("Current Trips")
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
                        title="Swvl Details"
                        icon={swvlI}
                        onPress={() => {
                            setTap("req")
                            console.log(tap)
                            setCurrentTab("Swvl Details")
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
                            console.log(tap)
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
                paddingVertical: 20,
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

                    <TouchableOpacity
                        isVisible={visibleModal === 1}
                        onPress={() => { setAddVisibleModal(1) }}>
                        <View style={styles.add__boat__button}><Text style={styles.add__boat__button__style}>+ Add Boat</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { pickImage() }}>
                        <Icon name="camera" size={20} color="#0c8df7" style={styles.icon__button} />
                    </TouchableOpacity>



                    {
                        tap == "req" && (
                            <FlatList
                                data={ownerReqs.payload.data}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.card__box}>
                                        <View style={styles.card__image}>
                                            <Image source={cardboat} style={styles.cardboat__img} />
                                        </View>
                                        <View style={styles.card__content}>
                                            <Text style={styles.card__name}>{item._id}</Text>
                                            <Icona name="location" size={13} style={styles.loc__icon} />
                                            <Text style={styles.card__location}>{item.bo }</Text>
                                            <IIcon name="date-range" size={13} />
                                            <Text style={styles.card__date}>27 June 2023</Text>
                                            <Text style={styles.card__price}>200$</Text>
                                            <TouchableOpacity onPress={() => { dispatch(ownerAcceptTrip(item._id)).then((res)=>{
                                                dispatch(getOwnerRequests(boatOwner._id)).then((res)=>{
                                                    setOwnerReqs(res)
                                                    
                                                    dispatch(getOwnerCurrentTrips(boatOwner._id)).then((res)=>{
                                                        console.log(res,"ggggggggggggggggggggggggg")
                                                        setCurrBoats(res)
                                                    })
                                                })
                                            }) ; console.log("first")
                                            
                                            }}>
                                                <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>Accept</Text></View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { dispatch(ownerCancelTrip(item._id)).then((res)=>{
                                                dispatch(getOwnerRequests(boatOwner._id)).then((res)=>{
                                                    setOwnerReqs(res)
                                                })
                                            }) ; console.log("first")
                                            
                                            }}>
                                                <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>cancel</Text></View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        )

                    }
                    {
                        tap == "allBoats" && (
                            <FlatList
                                data={allBoats.payload.data}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.card__box}>
                                        <View style={styles.card__image}>
                                            <Image source={cardboat} style={styles.cardboat__img} />
                                        </View>
                                        <View style={styles.card__content}>
                                            <Text style={styles.card__name}>{item._id}</Text>
                                            <Icona name="location" size={13} style={styles.loc__icon} />
                                            <Text style={styles.card__location}>Port: MAC</Text>
                                            <IIcon name="date-range" size={13} />
                                            <Text style={styles.card__date}>27 June 2023</Text>
                                            <Text style={styles.card__price}>200$</Text>                                           
                                        </View>
                                        {
                                            item.category == "swvl" && 
                                            <TouchableOpacity onPress={() => { 
                                            
                                            }}>
                                                <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>add swvl</Text></View>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )}
                            />
                        )

                    }
                    {
                        tap == "prev" && (
                            <FlatList
                                data={prevBoats.payload.data}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.card__box}>
                                        <View style={styles.card__image}>
                                            <Image source={cardboat} style={styles.cardboat__img} />
                                        </View>
                                        <View style={styles.card__content}>
                                            <Text style={styles.card__name}>{item._id}</Text>
                                            <Icona name="location" size={13} style={styles.loc__icon} />
                                            <Text style={styles.card__location}>Port: MAC</Text>
                                            <IIcon name="date-range" size={13} />
                                            <Text style={styles.card__date}>27 June 2023</Text>
                                            <Text style={styles.card__price}>200$</Text>                                           
                                        </View>
                                        {
              item.rate &&
            <StarRating
            key={item._id}
            disabled={false}
            maxStars={5}
            rating={item.rate.rating}
            // selectedStar={(rating) => handleRatingChange(item._id, rating , item.boatId._id)}
            starSize={20}
            fullStarColor="#ffc107"
            emptyStarColor="#e4e5e9"
            ></StarRating>
            }
                                    </View>
                                )}
                            />
                        )

                    }
                    {
                        tap == "curr" && (
                            <FlatList
                                data={currBoats.payload.data}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.card__box}>
                                        <View style={styles.card__image}>
                                            <Image source={cardboat} style={styles.cardboat__img} />
                                        </View>
                                        <View style={styles.card__content}>
                                            <Text style={styles.card__name}>{item._id}</Text>
                                            <Icona name="location" size={13} style={styles.loc__icon} />
                                            <Text style={styles.card__location}>Port: MAC</Text>
                                            <IIcon name="date-range" size={13} />
                                            <Text style={styles.card__date}>27 June 2023</Text>
                                            <Text style={styles.card__price}>200$</Text>                                           
                                        </View>
                                        <TouchableOpacity onPress={() => { dispatch(ownerFinishTrip(item._id)).then((res)=>{
                                           dispatch(getOwnerRequests(boatOwner._id)).then((res)=>{
                                            setCurrBoats(res)
                                           })
                                                dispatch(getOwnerPreviousTrips(boatOwner._id)).then((res)=>{
                                                    setPrevBoats(res)
                                                })
                                            }) ; console.log("first")
                                            
                                            }}>
                                                <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>finish</Text></View>
                                            </TouchableOpacity>
                                    </View>
                                )}
                            />
                        )

                    }
                 


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
    icon__button: {
        bottom: 170,
        left: 231,
    },
    // cards__container: {

    // },

    card__box: {
        marginLeft: 60,
        elevation: 4,
        width: 300,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#878585',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 15
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
        width: 70,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        left: 200,
        bottom: 27,

    },
    cancel__button__text: {
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
    },
    add__boat__button: {
        width: 85,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        left: 200,
        bottom: 27,
    },
    add__boat__button__style: {
        fontSize: 15,
        fontWeight: 600,
    },
    add__boat__image__button: {
        width: 85,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
    },
    add__boat__image__button__text: {
        fontSize: 15,
        fontWeight: 600,
    }

});

export default NewBoatOwnerProfile