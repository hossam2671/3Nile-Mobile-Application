import { ScrollView, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity, FlatList, TextInput, TIME } from 'react-native';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'
import Iconnnn from 'react-native-vector-icons/FontAwesome'
import Iconnnnn from 'react-native-vector-icons/FontAwesome'
import Iconn from 'react-native-vector-icons/Fontisto'
import Iconnn from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import bk from '../assets/homecardimg.png'
import boatSeats from '../assets/card.jpeg';
import boatswvl from '../assets/swvlboatnew.png'
import { OwnerdeleteBoat, SwvlDetails, bookSwvl, getSwvl, getSwvlById} from '../redux/slices/UserSlice'
import { ResizeMode, Video } from 'expo-av'
import { Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import succ from '../assets/succsses.png'
import Iconnnnnn from 'react-native-vector-icons/FontAwesome';
import { IconButton } from 'react-native-paper';
// import { MaterialDatetimePickerAndroid } from 'react-native-material-datetime-picker'; import DatePicker from 'react-native-modern-datepicker'
// import { getToday, getFormatedDate } from 'react-native-modern-datepicker'


// LASSSSS

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector ,useDispatch} from 'react-redux';

import ip from '../config'
import Seats from './Seats/Seats';
import { formatDate } from '../functions';
import { convertToAmPmFor3NileBus } from '../functions';

const renderPagination = (index, total, context) => {
    return (
        <View style={styles?.paginationStyle}>
            <Text style={{ color: '#000' }}>
                <Text style={styles?.paginationText}>{index + 1}</Text>/{total}
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
    const [visibleModal, setVisibleModal] = useState(null);
    const { user } = useSelector((state) => state.UserSlice);
    const { seatReserved } = useSelector((state) => state.UserSlice);
    const { swvlRecit } = useSelector((state) => state.UserSlice);

    // const [number, onChangeNumber] = React.useState('');

    // const [date, setDate] = useState(new Date())
    // const Today = new Date()
    // const startedDate = getFormatedDate(Today.setDate(Today.getDate(), 'YYYY/MM/DD'))

    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


// modal recite

const [modalVisible, setModalVisible] = useState(false);
const [iscoming,setIsComing]=useState(false)
const [Deatils,setDeatils]=useState({})
let [Data,setData]=useState()

useEffect(()=>{
    
},[])
// modal recite

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
        <View style={styles?.modalContent}>
            <View style={styles?.select}>
                <Text style={styles?.Header_filter}>Submit You Trip</Text>
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
    const { data } = route?.params;
    useEffect(() => {
        console.log(data?._id,"ljlfsjeoeorj")
          dispatch(getSwvlById(data._id)).then((res)=>{
            
            setData(res?.payload?.data)
          });
        
    }, [])
    const vid = React.useRef(null);
    let [viewed, setViewed] = useState(false)
    function hello() {
      props?.navigation.navigate('Filter')
    }
    console.log(Data,"hhhhhhhhhhhhhhhhhhhhhhhhhhh")
    return (
        <View style={styles?.container}>
        
        <Video
          ref={vid}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isMuted
          onLoad={() => {
            setTimeout(() => {
              setViewed(true)
              console.log("first")
              
            }, 5000)
          }}
          isLooping
          source={require('../assets/swvlvidio.mp4')
          }

          style={styles?.container}
        />
             <Seats />
       <Image source={boatswvl} style={styles?.boatswvl}  />
        <Text style={styles?.cardItems_name}> {Data?.boat?.name}</Text>
       <Text style={styles?.cardItems_date}> {formatDate(Data?.date)}</Text>
       <Iconn name="date" color={'#000'} size={20} style={styles?.cardItems_date_icon} />
        <Text style={styles?.cardItems_time}> {convertToAmPmFor3NileBus(Data?.time)}</Text>
        <Iconnn name="time-outline" color={'#000'} size={20} style={styles?.cardItems_time_icon} />
        <View style={styles?.card}>
        <Text style={styles?.cardItems_availableSeats}>Available Seats</Text>
        <Text style={styles?.cardItems_availableSeats_val}>{Data?.availableSeats}</Text>
        <Text style={styles?.cardItems_Pricd}>Price</Text>
        <Text style={styles?.cardItems_price_val}>{Data?.priceForTrip}</Text>
        <Iconnnn name="money" color={'#000'} size={20} style={styles?.cardItems_price_icon} />
        <Text style={styles?.cardItems_place}>Target Place</Text>
        <Text style={styles?.cardItems_place_val}>{Data?.targetPlace}</Text>
        <Text style={styles?.cardItems_port}>Port </Text>
        <Text style={styles?.cardItems_port_val}>{Data?.port}</Text>
        <Iconnnnn name="anchor" color={'#000'} size={20} style={styles?.cardItems_port_icon} />
        <View style={styles?.fixToText}>
        <TouchableOpacity
  style={styles?.bookBtn}
  onPress={() => {
    
               
        dispatch(bookSwvl({ swvlId:data?._id,userId:user?._id, numberOfSeats:seatReserved })).then((res=>{
                setDeatils(res?.payload?.data)
                dispatch(getSwvlById(data?._id)).then((res)=>{
            
                    setData(res?.payload?.data)
            })}))
    
        setModalVisible(true);
  }}
>
<Text style={styles?.btn}>{'Book Now'}</Text>
                    <Icon name="arrow-right" color={'#000'} size={20} style={styles?.arrow} />
</TouchableOpacity>
            </View> 
        </View>




{/*   

            <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
                {renderModalContent()}
            </Modal> */}

           
      
    
<Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
      <View style={styles?.modalContainer}>
        {/* <Text>BarCode :{swvlRecit.TripDetails.bookingBarcode}</Text> */}
        <View style={styles?.modalContainer_card_con}>
            { Deatils?.TripDetails ? 
            <>
        <IconButton
        icon={() => <Iconnnnnn name="close" size={25} color="#999999" style={{marginLeft:15,zIndex:1000}} />}
        
        
        style={{marginLeft:-230}}
        onPress={() => setModalVisible(false)}
      />
            {/* <Image source={succ} style={styles?.succ} /> */}
        <Text style={styles?.TotalPrice_text}>bookingBarcode :{Deatils?.TripDetails?.TotalPrice}</Text>
        <Text style={styles?.numberOfSeats_text}>numberOfSeats :{Deatils?.TripDetails?.numberOfSeats}</Text>
       
      <Text style={styles?.barCode_text}>bookingBarcode:</Text>
        <QRCode
        value={Deatils?.TripDetails?.bookingBarcode}
        size={50} 
        color= '#000000'
        backgroundColor="#ffffff"
        
      />
        
        </>
        :
        <>
        <IconButton
        icon={() => <Iconnnnnn name="close" size={25} color="#999999" style={{marginLeft:20,zIndex:1000}} />}
        
        
        style={{marginLeft:-230}}
        onPress={() => setModalVisible(false)}
      />
        <Text style={styles?.numberOfSeats_text}>There is No Available Seats</Text>
        </>
            }
        <View>
        
    </View>
  
      
         
    
        </View>
      </View>
    </Modal>


    </View>
   
    )
}

const styles = StyleSheet.create({

    container: {
 height:800,
 position:'relative'
    },
    
    boatswvl:{
        position: 'absolute',
        // top:10,
        left:240,
        height: 830,
        width:175,
        bottom:40
    },
    cardItems_name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:80,
        left:20
    },

    cardItems_date:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:110,
        left:20   
    },
    cardItems_date_icon:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:115,
        left:145 
    },
    cardItems_time: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:150,
        left:20
    },
    cardItems_time_icon:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:153,
        left:110 ,
    },
    card:{
        height: 490,
        width:175,
        position: "absolute",
        marginHorizontal: 20,
        padding: 20,
        top:200,
        borderRadius: 20,
        backgroundColor: '#0e7ee75f',
        shadowColor: '#f3f3f3',

    },
    cardItems_availableSeats:{
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fffffffe',
        position: 'absolute',
        top:20,
        left:10 ,
        borderRadius: 10,
        borderColor:"white",
        borderWidth:1,
        width:150,
        height:90,
        paddingTop:15,
        paddingLeft:10,
    },
    cardItems_availableSeats_val:{
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fffffffe',
        position: 'absolute',
        top:55,
        left:40 ,
        width:150,
        height:80,
        paddingTop:15,
        paddingLeft:10,
    },
    cardItems_Price:{
        marginTop:10,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:110,
        left:10 ,
        borderRadius: 10,
        borderColor:"white",
        borderWidth:1, 
        width:150,
        height:90,
        paddingTop:10,
        paddingLeft:30,
    },
    cardItems_price_val:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fffffffe',
        position: 'absolute',
        top:165,
        left:20 ,
        width:150,
        height:80,
        paddingTop:5,
        paddingLeft:20,
    },
    cardItems_price_icon:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:175,
        left:85 ,
    },

    cardItems_place:{
        marginTop:10,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:220,
        left:10 ,
        borderRadius: 10,
        borderColor:"white",
        borderWidth:1, 
        width:150,
        height:90,
        padding:13, 
    },    
    cardItems_place_val:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fffffffe',
        position: 'absolute',
        top:265,
        left:20 ,
        width:150,
        height:80,
        paddingTop:5,
        paddingLeft:20,
    },
    cardItems_port:{
        marginTop:10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:330,
        left:10 ,
        borderRadius: 10,
        borderColor:"white",
        borderWidth:1, 
        width:150,
        height:90,
        paddingTop:5,
        paddingLeft:30,
    },
    cardItems_port_val:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fffffffe',
        position: 'absolute',
        top:385,
        left:20 ,
        width:150,
        height:80,
        // paddingTop:5,
        paddingLeft:30,
    },
    cardItems_port_icon:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:353,
        left:96 ,
    },
    cardItems_Pricd:{
        marginTop:10,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top:110,
        left:10 ,
        borderRadius: 10,
        borderColor:"white",
        borderWidth:1, 
        width:150,
        height:90,
        padding:13,
     
    },
    fixToText: {
        position: 'absolute',
        height: 80,
        width: 455,
        fontSize: 15,
        fontWeight: 'bold',
        bottom: 100,
        
        right: 50,
        backgroundColor: '#0c8df7',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        top:455,
        left:-20 ,
     
    },
    bookBtn: {
        justifyContent: "space-between",
       
        flexDirection: 'row',
        alignItems: 'center',
        width: 430,
        height: 50,
        paddingTop: 15,
    },
    btn: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
        height:40,
        paddingLeft: 20,
        marginTop:10,
    },
    arrow: {
        color: '#000000',
        backgroundColor:"#fff",
        borderRadius:50,
        width:40,
        height:40,
        padding:10,
        marginTop:10,
    },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 34, 34, 0.5)',
    width:480,
    // marginRight:-60,
    right:30,
    top:30,
    // height:700,
  },
  modalContainer_card_con:{
    backgroundColor: 'rgba(247, 247, 247, 1)',
    width:260,
    height:210,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barCode:{
    marginLeft:60,
    paddingBottom:25,
  },
  barCode_text:{
paddingBottom:10,
// right:30,
color: '#000000',
  },
  TotalPrice_text:{
  
    color: '#000000',
  },
  numberOfSeats_text:{
    padding:10,
    color: '#000000',
  },
  succ:{
    width:70,
    height:70,
  },
});

export default Swvl;