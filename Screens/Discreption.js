import { ScrollView, StyleSheet, Text, View, Dimensions, Image, Button, Alert, TouchableOpacity, FlatList, TIME } from 'react-native';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'
import { IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import Iconn from 'react-native-vector-icons/Fontisto'
import Iconnn from 'react-native-vector-icons/Ionicons'
// Modal Data

import { DatePickerModal } from 'react-native-paper-dates';

import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextInput } from 'react-native-paper';

import ip from '../config'
import { bookTrip } from '../redux/slices/UserSlice';
import { Root, Popup } from 'popup-ui'
import { PopupDialog } from 'react-native-popup-dialog';
const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: '#000' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    );
};



export const Discreption = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.UserSlice)
    const [isPopupVisible, setPopupVisible] = useState(false);


    // Timer Picker
    const [visible, setVisible] = React.useState(false)
    const [timey, setTime] = React.useState({})
    const [dateOnly, setdateOnly] = React.useState("")
    const [isPicked, setIsPicked] = React.useState(false)
    const [DateisPicked, setDateisPicked] = React.useState(false)
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            console.log({ hours, minutes });
            
            setTime({ hours: hours, minutes: minutes })
        },
        [setVisible]
    );

    // DAte Picker 
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
            console.log(params)
            setDateisPicked(true)
            const datepi=[...params.date.toString().split(" ")[1]," ",...params.date.toString().split(" ")[2]," ",...params.date.toString().split(" ")[3]].join("")
        
            setdateOnly(datepi)

        },
        [setOpen, setDate]
    );

    // hours Picker
    const [text, setText] = React.useState("");


    const [visibleModal, setVisibleModal] = useState(null);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };


    const handleBookPress = () => {
        setVisibleModal(1);
    };

    const handelChange = (props) => {
        setDate(props)
    };

    const renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleSubmit = () => {
        console.log('time:', timey);
        console.log('Date:', date);
        console.log('hour:', text);
    
        dispatch(bookTrip({
            time: timey,
            date: date,
            hours: text,
            boatId: data._id,
            clientId: user._id,
        }))
            console.log(dateOnly,"d")
        // setPopupVisible(true);
        alert(`Your Trip has been booked Successfully .. Boat Owner will a2ccept it SOON , Keep Update :)`
        )
        //  Day: ${date} 
        //  Start Hour: ${time.hours}:${time.minutes}
        //  Number Of Hours: ${text}
    };

    const renderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.select}>
            <View style={{flexDirection:"row" , justifyContent:"flex-start" , alignItems:"center"}}>
            <IconButton
        icon={() => <Iconnn name="arrow-back" size={24} color="#000" style={{marginLeft:20,zIndex:1000}} />}
        
        
        style={{marginLeft:200}}
        onPress={() => setVisibleModal(null)}
      />
                <Text style={styles.Header_filter}>Submit You Trip</Text>
                </View>
            </View>
            <View style={styles.modalBtn}>

                <TouchableOpacity onPress={() => 
                   {
                       setVisible(true)
                       setIsPicked(true)

                   } 
                    
                    
                    
                    } uppercase={false} mode="outlined" title='start time' style={styles.timeBtn}>

                    {
                        isPicked ? <Text style={styles.time} >{timey.hours} : {timey.minutes}</Text> : <Text style={styles.time} >Start Time</Text>

                    }

                <Iconnn name="time-outline" color={'#000'} size={20} style={styles.cardItems_time_icon} />
                </TouchableOpacity>
                <Iconn name="date" color={'#000'} size={20} style={styles.cardItems_date_icon} />
                <TouchableOpacity onPress={() => 
                    {
                        setOpen(true)
                      

                    }
                    
                    } uppercase={false} mode="outlined" title='Pick Date' style={styles.dataBtn} >
                          {
                        DateisPicked ? <Text style={styles.date} >{dateOnly}</Text> : <Text style={styles.date} >Pick Date</Text>

                    }
                </TouchableOpacity>
                {/* Hours Picker */}

                {/* Hours Picker  End */}
            </View>

            <TextInput

                value={text}
                style={styles.hoursBtn}
                onChangeText={text => setText(text)}
                placeholderTextColor={"#a4a4a4"}
                placeholder='Hours'
            />
            {/* Time Picker  */}
            {/* </TouchableOpacity> */}
            <SafeAreaProvider>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center',color:"#fdfdfd" }}>

                    <TimePickerModal
                        visible={visible}
                        use24HourClock={true}
                        animationType='slide'

                        onDismiss={onDismiss}
                        onConfirm={onConfirm}
                        minutes={14}
                    />
                </View>
            </SafeAreaProvider>
            {/* Time Picker  End*/}

            {/* Date Picker  */}
            <SafeAreaProvider>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>

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
            {/* Date Picker  End */}
            <View style={styles.book_fixToText}>
                <TouchableOpacity style={styles.book_bookBtn} onPress={handleSubmit}>
                    <Text style={styles.book_btn}>{'Book '}</Text>
                    <Icon name="arrow-right" color={'#000'} size={20} style={styles.book_arrow} />
                </TouchableOpacity>
            </View> 

         

            {/* {renderButton('Apply', () => setVisibleModal(null))} */}
 
        </View>
    );


    const route = useRoute();
    const { data } = route.params;
    useEffect(() => {
        console.log(data)


    }, [])
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={false}>
                {
                    data.images.map((item) => {
                        return (
                            <View style={styles.slide} key={item}>
                                <Image style={styles.image} source={{ uri: `http://${ip}:5000/${item}` }} />
                            </View>
                        );
                    })}

            </Swiper>

            <View style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.cardTitle}>{data.name}</Text>
                    <Text style={styles.cardItemsRate}>{data.rate}</Text>
                </View>

                <Text style={styles.cardText}>{data.description}</Text>

                <View style={styles.itemContainer}>
                    <View style={styles.item}>
                        <Text style={styles.cardItems}>Number of people:</Text>
                        <Text style={styles.cardItems}>Price Per Hour:</Text>
                        <Text style={styles.cardItems}>Boat Type:</Text>
                        <Text style={styles.cardItems}>Port Name:</Text>
                    </View>

                    <View style={styles.vlaue}>
                        <Text style={styles.cardItemsVlaue}>{data.numberOfpeople}</Text>
                        <Text style={styles.cardItemsVlaue}>{data.price}</Text>
                        <Text style={styles.cardItemsVlaue}>{data.type}</Text>
                        <Text style={styles.cardItemsVlaue}>{data.portName}</Text>
                    </View>
                </View>
            </View>

                {
                    data.portName == "KFC" &&
            <View style={styles.map}>
                <MapView
                    style={{ flex: 1, height: 180, }}
                    initialRegion={{
                        latitude: 24.088328063959082,
                        longitude: 32.89322136116728,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 24.088328063959082, longitude: 32.89322136116728 }}
                        title="Marker Title"
                        description="Marker Description"
                    />
                </MapView>
            </View>
                }
                {
                    data.portName == "MAC" &&
            <View style={styles.map}>
                <MapView
                    style={{ flex: 1, height: 180, }}
                    initialRegion={{
                        latitude: 24.09541698251378,
                        longitude: 32.89688121883719,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 24.09541698251378, longitude: 32.89688121883719 }}
                        title="Marker Title"
                        description="Marker Description"
                    />
                </MapView>
            </View>
                }

            <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
                {renderModalContent()}
            </Modal>

            <View style={styles.fixToText}>
                <TouchableOpacity style={styles.bookBtn} onPress={handleBookPress}>
                    <Text style={styles.btn}>{'B\nO\nO\nK'}</Text>
                    <Icon name="arrow-right" color={'#000'} size={20} style={styles.arrow} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    wrapper: {},
    slide: {
        // marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width,
        height: 300
    },
    paginationStyle: {
        position: "absolute",
        bottom: 470,
        right: 20,
    },
    paginationText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: 'bold'
    },
    card: {
        height: 265,
        width: 415,
        position: "absolute",
        marginHorizontal: 20,
        // marginVertical: 10,
        bottom: 220,
        padding: 20,
        // borderRadius: 10,
        backgroundColor: '#F8F8F8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardItems: {
        fontSize: 15,
        fontWeight: 'bold',
        // marginBottom: 10
    },
    cardItemsVlaue: {
        fontSize: 15,
        marginLeft: 30
    },
    cardItemsRate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffcd00'
    },
    cardText: {
        fontSize: 16,
        // marginTop: 10,
        marginBottom: 15,
    },
    itemContainer: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    vlaue: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        right: 50,
        // flex: 1,
        // alignItems: 'flex-end'
    },
    map: {
        height: 200,
        backgroundColor: '#fff',
        // flex: 1,
        marginHorizontal: 45,
        // marginVertical: 10,
        // borderRadius: 10,
        // overflow: 'hidden',
        bottom: 40,
        left: 45,
        zIndex: 99,
        shadowColor: 'blue',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
    },
    fixToText: {
        position: 'absolute',
        height: 100,
        width: 35,
        fontSize: 15,
        fontWeight: 'bold',
        bottom: 100,
        left: 22,
        right: 50,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
  
    },
    bookBtn: {
        justifyContent: "space-between",
        backgroundColor: '#ff6a00',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderRadius: 30,
        // marginRight: 10,
        width: 50,
        height: 140,
        borderRadius: 10,
    },
    btn: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        // marginRight: 10,
        paddingTop: 15,
        paddingLeft: 2,

    },
    arrow: {
        paddingBottom: 15,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 500,
        borderColor: 'rgba(0, 0, 0, 0.1)',

    },
    select: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: "#ffffff",

    },
    Header_filter: {
        fontWeight: 'bold',
        fontSize: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(213, 213, 213, 1)',
        width: 530,
        paddingLeft: 200,
        paddingBottom: 20,

    },
    input: {
        height: 10,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    hoursBtn: {
        width: 400,
        height: 50,
        margin: 40,
        backgroundColor: "white",

    },
    timeBtn: {
        width: 200,
        height: 40,


        fontSize: 20,

        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    time: {
        width: 140,
        height: 50,
        color: '#a6a5a5',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(59, 140, 253, 0.496)',
        fontSize: 20,
    },
    modalBtn: {
        height: 100,
        width: 390,
        paddingTop: 40,
        display: "flex",
        flexDirection: "row",

    },
    cardItems_date_icon: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0378ee',
        top: 30,

    },
    cardItems_time: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top: 150,
        left: 20
    },
    cardItems_time_icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#009dff',
        left:105 ,
        // right: 105,
        bottom: 45,
    },
    date: {
        width: 150,
        height: 50,
        color: '#a6a5a5',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(59, 140, 253, 0.496)',
        fontSize: 19,
    },
    cardItems_date_icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#009dff',
        left: 140,
        bottom: 0,
    },
    book_fixToText: {
    position: 'absolute',
    height: 65,
    width: 405,
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 100,
    
    // right: 30,
    backgroundColor: '#0c8df7',
    borderRadius: 55,
  
    top:405,
    // left:10 ,
 
},
book_bookBtn: {
    justifyContent: "space-between",
   
    flexDirection: 'row',
    alignItems: 'center',
    width: 380,
    height: 50,
    paddingTop: 15,
},
book_btn: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 25,
    height:40,
    paddingLeft: 20,
    marginTop:10,
},
book_arrow: {
    color: '#000000',
    backgroundColor:"#fff",
    borderRadius:50,
    width:40,
    height:40,
    padding:10,
    marginTop:10,
},
});

export default Discreption;