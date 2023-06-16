import { ScrollView, StyleSheet, Text, View, Dimensions, Image, Button, Alert, TouchableOpacity, FlatList, TextInput, TIME } from 'react-native';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import bk from '../assets/homecardimg.png'
import boatSeats from '../assets/Screenshot 2023-06-15 213456.png'
import { OwnerdeleteBoat, SwvlDetails} from '../redux/slices/UserSlice'
// import { MaterialDatetimePickerAndroid } from 'react-native-material-datetime-picker'; import DatePicker from 'react-native-modern-datepicker'
// import { getToday, getFormatedDate } from 'react-native-modern-datepicker'


// LASSSSS

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector ,useDispatch} from 'react-redux';

import ip from '../config'

const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: '#000' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    );
};


// hours
// price
// startTime
// date

 const Swvl = () => {

    const dispatch =useDispatch()
    const { swvlTrip } = useSelector((state) => state.UserSlice);
    console.log(swvlTrip,"fff");
    const [visibleModal, setVisibleModal] = useState(null);
    

    // const [number, onChangeNumber] = React.useState('');

    // const [date, setDate] = useState(new Date())
    // const Today = new Date()
    // const startedDate = getFormatedDate(Today.setDate(Today.getDate(), 'YYYY/MM/DD'))

    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    useEffect(()=>{
       
      },[])

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

    const renderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.select}>
                <Text style={styles.Header_filter}>Submit You Trip</Text>
            </View>


            <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined" title='Pick Trip Time' />
            {/* Time Picker  */}
            <SafeAreaProvider>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>

      
                </View>
            </SafeAreaProvider>


            {renderButton('Apply', () => setVisibleModal(null))}
            {renderButton('Cancel', () => setVisibleModal(null))}
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
                    data.boat.images.map((item) => {
                        console.log("ho hudfh");
                        return (
                            <View style={styles.slide} key={item}>
                                <Image style={styles.image} source={{ uri: `http://10.171.200.31:5000/${item}` }}  />
                            </View>
                        );
                    })}
            </Swiper>


            <View style={styles.card}>
                <View style={styles.itemContainer}>
                    <View style={styles.item}>
                        <Text style={styles.cardItems}>Available Seats:{data.availableSeats}</Text>
                        <Text style={styles.cardItems}>Price: {data.priceForTrip} </Text>
                        <Text style={styles.cardItems}>Target Place: {data.targetPlace}</Text>
                        <Text style={styles.cardItems}>Port Name:{data.port}</Text>
                        <Text style={styles.cardItems}>Trip Time : {data.time}</Text>
                        <Text style={styles.cardItems}>Trip Date : {data.date.slice(0,10)}</Text>
                    </View>

                    <View style={styles.vlaue}>
                       
                        <Image style={styles.bk__style} source={boatSeats}/>
                       
                    </View>
                </View>
            </View>

            <View style={styles.map}>
                <MapView
                    style={{ flex: 1, height: 180, }}
                    initialRegion={{
                        latitude: 23.999035,
                        longitude: 32.855434,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 23.999035, longitude: 32.855434 }}
                        title="Marker Title"
                        description="Marker Description"
                    />
                </MapView>
            </View>

            <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
                {renderModalContent()}
            </Modal>

            <View style={styles.fixToText}>
                <TouchableOpacity style={styles.bookBtn}>
                    <Text style={styles.btn}>{'B\nO\nO\nK'}</Text>
                    <Icon name="arrow-right" color={'#000'} size={20} style={styles.arrow} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bk__style:{
        width:200,
        height:200,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {},
    slide: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width:600,
        height: 300,
        zIndex:999,
      
    },
    paginationStyle: {
        position: "absolute",
        bottom: 170,
        right: 20,
    },
    paginationText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: 'bold'
    },
    card: {
        height: 265,
        width:415,
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
        // marginBottom: 10,
    },
    cardItems: {
        fontSize: 15,
        fontWeight: 'bold',
        // padding:10,
        marginBottom: 10
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
        // marginBottom: 15,
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
        bottom: 50,
        // top:70,
        left: 35,
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
        // paddingVertical: 20,
        // paddingHorizontal: 20,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: -5,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 6.68,

        // elevation: 11,
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
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 700,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    select: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 100
    },
    Header_filter: {
        fontWeight: 'bold',
        fontSize: 22,
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    boat_seats:{
        width:200,
        height:200,
        borderColor:'black',
        borderWidth:4,
        marginLeft:70,
        borderBottomLeftRadius: 190,
        borderTopRightRadius: 190,
    },
});

export default Swvl;