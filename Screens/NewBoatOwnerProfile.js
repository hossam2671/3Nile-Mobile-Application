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
import allboatsIT from '../assets/allboat.png';
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
import { ownerUpdateInfo, SwvlDetails, getOwnerBoats, getOwnerCurrentTrips, getOwnerPreviousTrips, getOwnerRequests, addBoat, ownerAcceptTrip, ownerCancelTrip, ownerFinishTrip, fireSwvl, ownerSwvl, logoutt, OwnerdeleteBoat } from '../redux/slices/UserSlice';
import { SelectList } from 'react-native-dropdown-select-list'
//modal
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimePickerModal } from 'react-native-paper-dates';
import { DatePickerModal } from 'react-native-paper-dates';



//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { set } from 'react-native-reanimated';
import axios from 'axios';


function NewBoatOwnerProfile(props) {
    const [boatImages, setBoatImages] = useState([]);
    const pickBoatImages = async () => {
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
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );
    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])
    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            console.log({ hours, minutes });
            setTime(`${hours} - ${minutes}`)
        },
        [setVisible]
    );
    const [selected, setSelected] = React.useState("");
    const [type, setType] = React.useState("");
    const [boatName, setBoatName] = useState("")
    const [boatDescription, setBoatDescriprionName] = useState("")
    const [boatPrice, setBoatPrice] = useState(0)
    const [ownerReqs, setOwnerReqs] = useState([])
    const [allBoats, setAllBoats] = useState([])
    const [prevBoats, setPrevBoats] = useState([])
    const [currBoats, setCurrBoats] = useState([])
    const [swvlTrips, setSwvlTrips] = useState([])
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
    // add swvl
    const [boatId, setBoatId] = useState(0)
    const [time, setTime] = useState("")
    const [targetPlace, setTargetPlace] = useState("")
    const [swvlPrice, setSwvlPrice] = useState(0)
    const [swvlType, setSwvlType] = useState("")

    // end add swvl

    //modal

    const [visibleModal, setVisibleModal] = useState(null);
    const [addvisibleModal, setAddVisibleModal] = useState(null);
    const [swVlvisibleModal, setswVlVisibleModal] = useState(null);


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
    async function submit() {
        const formData = new FormData();
        const timestamp = Date.now();

        boatImages.forEach((image, index) => {
            const uriParts = image.split('.');
            const fileExtension = uriParts[uriParts.length - 1];
            const imageName = `image_${timestamp}_${index}.${fileExtension}`;

            formData.append('images', {
                uri: image,
                name: imageName,
                type: `image/${fileExtension}`,
            });
        });

        formData.append('id', boatOwner._id);
        formData.append('name', boatName);
        formData.append('description', boatDescription);
        formData.append('price', boatPrice);
        formData.append('portName', selected);
        formData.append('type', type);
        console.log(formData)
        try {
            let res = await axios.post(`http://${ip}:5000/boatOwner/addBoatt`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((ress) => {
                setAllBoats(ress.data)
                setAddBoatModal(1)
                setTimeout(() => {
                    setAddBoatModal(0)

                }, 3000)
            });




            // dispatch(addBoat({id:boatOwner._id,name:boatName,description:boatDescription,price:boatPrice,portName:selected,type:type}))
            // .then((res)=>{
            //     dispatch(getOwnerBoats(boatOwner._id)).then((res)=>{
            //
            //     })
            // })

            setAddVisibleModal(0);
        } catch (error) {
            // Handle error here
            console.error(error);
        }
    }
    function fire() {
        dispatch(fireSwvl({ boatId: boatId, time: time, port: swvlType, targetPlace: targetPlace, date: date, priceForTrip: swvlPrice }))
        setswVlVisibleModal(0)
    }

    function closeModal() {
        setVisibleModal(false)
    }

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
                    placeholder={boatOwner.name}
                    placeholderTextColor="#0000006a"
                    onChangeText={(e) => {
                        setEditboatOwnerName(e);
                        console.log(editboatOwnerName)
                    }}
                />
                <TextInput style={styles.modal__input}
                    placeholder={boatOwner.phone ? boatOwner.phone : "Your Phone"}
                    placeholderTextColor="0000006a"
                    onChangeText={(e) => setEditboatOwnerPhone(e)}

                />


            </View>




            {renderButton('Apply', () => {


                dispatch(ownerUpdateInfo({ boatOwnerId: boatOwner._id, name: editboatOwnerName, phone: editeditboatOwnerPhone })).then((res) => {
                    setVisibleModal(false)
                    console.log(res.payload.data, "ggfdfhfdhhsfdfhdfhdsfhdfhdfhdsfhdsfhd")
                    setboatOwnerState(res.payload.data)
                    setEditModal(1)
                    setTimeout(() => {
                        setEditModal(0)
                    }, 3000)
                })
            })}

        </View>
    );

    //add boat modal


    const addBoatrenderButton = (text, onPress) => (
        <View style={styles.book_fixToText}>
            <TouchableOpacity style={styles.book_bookBtn} onPress={onPress}>
                <Text style={styles.book_btn}>{text}</Text>
                <Icon name="arrow-right" color={'#000'} size={15} style={styles.book_arrow} />
            </TouchableOpacity>
        </View>
    );

    const addBoatrenderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.select}>
                <Text style={styles.add__boat__text}>Add Boat</Text>

                {/* <Text style={styles.add__boat__close__icon} onPress={closeModal()}>X</Text> */}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                    style={styles.upload__image__button}
                    onPress={() => { pickBoatImage() }}>
                        <Text><Icon name="upload" color={'#0c8df7'} size={15} style={styles.upload__image__icon} /> Upload Image</Text>
                    </TouchableOpacity>
                    <View style={styles.boatImages}>
                        {boatImages &&
                            boatImages.map((item, index) => (
                                <>
                                    <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
                                    <TouchableOpacity style={{ right: 15 }} onPress={() => {
                                        boatImages.splice(index, 1);
                                        setBoatImages([...boatImages]);
                                    }}>
                                        <Text>X</Text>
                                    </TouchableOpacity>
                                </>
                            ))
                        }
                    </View>
                </View>
                <TextInput
                    name="name"
                    style={styles.modal__input}
                    placeholder="Name"
                    placeholderTextColor={'#0000006a'}
                    onChangeText={(e) => namy(e)}

                    value={boatName}
                />


                <TextInput
                    name="description"
                    style={styles.modal__input}
                    placeholder="Description"
                    placeholderTextColor={'#0000006a'}
                    onChangeText={(e) => description(e)}

                    value={boatDescription}
                />


                <TextInput
                    name="price"
                    style={styles.modal__input}
                    placeholder="Price"
                    onChangeText={(e) => price(e)}

                    value={boatPrice}
                    keyboardType="numeric"
                />

                <View style={styles.modal__dropdown}>
                    <SelectList
                        name="port"
                        style={styles.modal__dropdown__item}
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
                        name="type"
                        style={styles.modal__dropdown__item}
                        setSelected={setType}
                        fontFamily='lato'
                        data={types}
                        arrowicon={<Icon name="chevron-down" size={12} color={'black'} />}
                        //   searchicon={<Icon name="search" size={12} color={'black'} />} 
                        search={false}
                        boxStyles={{ borderRadius: 0 }} //override default styles
                        defaultOption={{ key: 'shera3', value: 'shera3' }}   //default selected option
                    />
                </View>

            </View>
            {addBoatrenderButton('Apply', submit)}
        </View>
    );
    const [editModal, setEditModal] = useState(0)
    const editInfoModal = () => (
        <View style={styles.modalContent}>
            <Text>Your Information has Changed successfully </Text>
        </View>
    );



    const [editImageModal, setEditImageModal] = useState(0)
    const EditImageModal = () => (
        <View style={styles.modalContent}>
            <Text>Your Image has Changed successfully </Text>
        </View>
    );


    const [addBoatModal, setAddBoatModal] = useState(0)
    const AddBoatModal = () => (
        <View style={styles.modalContent}>
            <Text>Your boat has been Added successfully </Text>
        </View>
    );


    const [deleteBoatModal, setDeleteBoatModal] = useState(0)
    const DeleteBoatModal = () => (
        <View style={styles.modalContent}>
            <Text>Your boat has been Deleted </Text>
        </View>
    );
    //SWVL Modal

    const SwvlModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.select}>
                <Text style={styles.add__boat__text}>Add Boat</Text>
                {/* <Text style={styles.add__boat__close__icon} onPress={closeModal()}>X</Text> */}

                <TextInput
                    name="target"
                    style={styles.modal__input}
                    placeholder="Target place"
                    placeholderTextColor={'#0000006a'}
                    onChangeText={(e) => setTargetPlace(e)}
                    value={targetPlace}
                />


                <TextInput
                    name="price"
                    style={styles.modal__input}
                    placeholder="Price"
                    placeholderTextColor={'#0000006a'}
                    onChangeText={(e) => setSwvlPrice(e)}
                    required={true}
                    value={swvlPrice}
                />



                <View style={styles.modal__dropdown}>
                    <SelectList
                        name="port"
                        style={styles.modal__dropdown__item}
                        setSelected={setSwvlType}
                        fontFamily='lato'
                        data={data}
                        arrowicon={<Icon name="chevron-down" size={12} color={'black'} />}
                        //   searchicon={<Icon name="search" size={12} color={'black'} />} 
                        search={false}
                        boxStyles={{ borderRadius: 0 }}
                        defaultOption={{ key: 'KFC', value: 'KFC' }}
                    />

                    <SafeAreaProvider>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                                Pick single date
                            </Button>
                            <DatePickerModal
                                locale="en"
                                mode="single"
                                visible={open}
                                onDismiss={onDismissSingle}
                                date={date}
                                onConfirm={onConfirmSingle}
                            />
                        </View>
                    </SafeAreaProvider>
                    <SafeAreaProvider>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
                                Pick time
                            </Button>
                            <TimePickerModal
                                visible={visible}
                                onDismiss={onDismiss}
                                onConfirm={onConfirm}
                                hours={12}
                                minutes={14}
                            />
                        </View>
                    </SafeAreaProvider>
                </View>

            </View>
            {addBoatrenderButton('Apply', fire)}
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
            const newImages = [...boatImages, result.uri].slice(0, 9);
            setBoatImages(newImages);
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
            const uriParts = result.uri.split('.');
            const fileExtension = uriParts[uriParts.length - 1];
            const timestamp = Date.now();
            setImage(result.uri);
            const formData = new FormData();
            formData.append('img', {
                uri: image,
                name: `image_${timestamp}.jpeg`,
                type: `image/${fileExtension}`,
            });

            const response = await axios.put(`http://${ip}:5000/boatOwner/editImage/${boatOwner._id}`, formData, {
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



    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);

    // Animated Properties...

    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;


    const [tap, setTap] = useState("")
    const { ownerBoats } = useSelector(state => state.UserSlice)
    const { ownerPreviousTrips } = useSelector(state => state.UserSlice)
    const { ownerRequestsTrips } = useSelector(state => state.UserSlice)
    const { ownerCurrentTrips } = useSelector(state => state.UserSlice)
    const { ownerSwvlTrip } = useSelector(state => state.UserSlice)

    useEffect(() => {

        dispatch(getOwnerBoats(boatOwner._id)).then((first) => {
            setAllBoats(first.payload.data)
            setTap("allBoats")
        })
        dispatch(getOwnerPreviousTrips(boatOwner._id)).then((first) => {
            setPrevBoats(first)
        })
        dispatch(getOwnerRequests(boatOwner._id)).then((first) => {
            console.log(first, "iiisadiiiiiiii")
            setOwnerReqs(first)

        })
        dispatch(getOwnerCurrentTrips(boatOwner._id)).then((first) => {
            setCurrBoats(first)
        })
        dispatch(ownerSwvl(boatOwner._id)).then((first) => {
            console.log(first.payload.data, "hoho@gmail.com")
            setSwvlTrips(first)
        })
        console.log(ownerRequestsTrips, "checkreq")


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
                            tintColor: currentTab === title ? "#0c8df7" : "#fdfdfd",
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

            <Modal
                key="modal1"
                isVisible={visibleModal === 1} style={styles.bottomModal}>

                {renderModalContent()}
            </Modal>

            <Modal

                key="modal2"
                isVisible={addvisibleModal === 1} style={styles.bottomModal}>

                {addBoatrenderModalContent()}
            </Modal>

            <Modal
                key="modal3"
                isVisible={swVlvisibleModal === 1} style={styles.bottomModal}>

                {SwvlModalContent()}
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


            <Modal
                key="modal6"

                isVisible={addBoatModal === 1} style={styles.bottomModal}>

                {AddBoatModal()}
            </Modal>

            <Modal
                key="modal7"

                isVisible={deleteBoatModal === 1} style={styles.bottomModal}>

                {DeleteBoatModal()}
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
                        icon={allboatsIT}
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

                            dispatch(getOwnerRequests(boatOwner._id)).then((first) => {
                                console.log(first, "iiisadiiiiiiii")
                                setOwnerReqs(first)
                            })
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
                            setTap("Swvl")
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
                            props.navigation.navigate("LoginSignUp")
                        }}
                    />
                </View>

            </View>



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
                        borderColor: "black",
                        borderWidth: 1,
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
                        <Icon name="camera" size={20} color="#7c7d7e" style={styles.icon__button} />
                    </TouchableOpacity>

                    <View style={{marginBottom:760 , bottom: 80}}>
                        {
                            tap == "req" && (
                                <FlatList
                                    data={ownerReqs.payload.data}
                                    // contentContainerStyle={{ paddingBottom: 200 }}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.card__box}>
                                            <View style={styles.card__image}>
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item?.boatId?.images[0]}`
                                                }} style={styles.cardboat__img} />
                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.boatId.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.price} EGP</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{item.boatId.type}</Text>
                                                <Text style={styles.card__price}>{item.boatId.portName}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    dispatch(ownerAcceptTrip(item._id)).then((res) => {
                                                        dispatch(getOwnerRequests(boatOwner._id)).then((res) => {
                                                            setOwnerReqs(res)

                                                            dispatch(getOwnerCurrentTrips(boatOwner._id)).then((res) => {
                                                                console.log(res, "ggggggggggggggggggggggggg")
                                                                setCurrBoats(res)
                                                            })
                                                        })

                                                    }); console.log("first")

                                                }}>
                                                    <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>Accept</Text></View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    dispatch(ownerCancelTrip(item._id)).then((res) => {
                                                        dispatch(getOwnerRequests(boatOwner._id)).then((res) => {
                                                            setOwnerReqs(res)
                                                        })
                                                    }); console.log("first")

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
                                style={{ marginBottom: 20 }}
                                    data={allBoats}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.card__box}>
                                            <View style={styles.card__image}>
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item?.images[0]}`
                                                }} style={styles.cardboat__img} />



                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.price}</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{item.type}</Text>
                                                <Text style={styles.card__price}>{item.portName}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                dispatch(OwnerdeleteBoat({ ownerId: boatOwner._id, id: item._id })).then((res) => {
                                                    setDeleteBoatModal(1)
                                                    setTimeout(() => {
                                                        setDeleteBoatModal(0)
                                                    }, 3000)
                                                    dispatch(getOwnerBoats(boatOwner._id)).then((first) => {
                                                        setAllBoats(first.payload.data)
                                                    })
                                                })
                                            }}>
                                                <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>Delete Boat</Text></View>
                                            </TouchableOpacity>
                                            {
                                                item.category == "swvl" &&
                                                <TouchableOpacity onPress={() => {
                                                    setswVlVisibleModal(1)
                                                    setBoatId(item._id)
                                                }}>
                                                    <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>+ Add swvl</Text></View>
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
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item?.boatId?.images[0]}`
                                                }} style={styles.cardboat__img} />

                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.boatId.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.price}</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{item.boatId.type}</Text>
                                                <Text style={styles.card__price}>{item.boatId.portName}</Text>
                                            </View>
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
                                                <Image source={{
                                                    uri: `http://${ip}:5000/${item?.boatId?.images[0]}`
                                                }} style={styles.cardboat__img} />
                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.boatId.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.price}</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{item.type}</Text>
                                                <Text style={styles.card__price}>{item.portName}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                dispatch(ownerFinishTrip(item._id)).then((res) => {
                                                    dispatch(getOwnerRequests(boatOwner._id)).then((res) => {
                                                        setCurrBoats(res)
                                                    })
                                                    dispatch(getOwnerPreviousTrips(boatOwner._id)).then((res) => {
                                                        setPrevBoats(res)
                                                    })
                                                }); console.log("first")

                                            }}>
                                                <View style={styles.cancel__button}><Text style={styles.cancel__button__text}>Finish</Text></View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />

                            )

                        }
                        {
                            tap == "Swvl" && (

                                <FlatList
                                    data={swvlTrips.payload.data}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.card__box}>
                                            <View style={styles.card__image}>
                                                <Image source={cardboat} style={styles.cardboat__img} />
                                            </View>
                                            <View style={styles.card__content}>
                                                <Text style={styles.card__name}>{item.boat.name}</Text>
                                                <Icona name="location" size={13} style={styles.loc__icon} />
                                                <Text style={styles.card__location}>{item.priceForTrip}</Text>
                                                <IIcon name="date-range" size={13} />
                                                <Text style={styles.card__date}>{item.time}</Text>
                                                <Text style={styles.card__price}>{item.date}</Text>
                                            </View>

                                        </View>
                                    )}
                                />

                            )

                        }

                    </View>

                </Animated.View>

            </Animated.View>

        </SafeAreaView>
    );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (

        <TouchableOpacity onPress={() => {
            if (title == "Logout") {
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
        color: '#ffffff',
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
        bottom: 210,
        left: 231,
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
        width: 100,
        height: 45,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        left: 180,
        bottom: 50,
        lineHeight: 45,
        marginBottom: 10

    },
    cancel__button__text: {
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
        color: '#ffffff'
    },
    add__boat__button: {
        width: 85,
        height: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        left: 23,
        bottom: 115,
    },
    add__boat__button__style: {
        fontSize: 15,
        fontWeight: 600,
        color: '#ffffff'
    },
    add__boat__image__button: {
        width: 85,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c8df7',
        marginTop: 20,
    },
    add__boat__image__button__text: {
        fontSize: 15,
        fontWeight: 600,
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
    modal__dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 10,
    },
    modal__dropdown__item: {
        width: 100,
        height: 40,
    },
    add__boat__text: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        alignItems: 'center',
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
        marginRight: 20,
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
    boatImages: {
        flexWrap: 'wrap',
        flexDirection: "row"

    },
    card__Rate: {
        justifyContent: 'center',
        width: 100,
        borderRadius: 50,
        marginTop: 20,
        marginLeft: 160,
    },
    upload__image__button:{
        borderColor: '#0c8df7',
        borderWidth: 1,
        padding: 5,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
    }
});

export default NewBoatOwnerProfile