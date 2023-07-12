import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { Chip, Searchbar } from 'react-native-paper';
import Modal from 'react-native-modal';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryOne, getCategoryTwo, filter, filter2,filterTaps,filterTaps2, getSwvl, search, filterTaps3 } from '../redux/slices/UserSlice';
import Icon from "react-native-vector-icons/FontAwesome"
import ip from '../config'
import { withTiming } from 'react-native-reanimated';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { convertToAmPm, formatDate, formatTime } from '../functions';
const data = [
  { key: '1', value: 'KFC' },
  { key: '2', value: 'shra3 2' },
  { key: '3', value: 'Cameras' },
];
const data2 = [
  { key: '1', value: 'shera3' },
  { key: '2', value: 'Felucca' },
  { key: '3', value: 'Houseboat' },
  { key: '4', value: 'Dahabiya' },
  { key: '5', value: 'swvl' },
];



export default function Filter(props) {
  const offset = useSharedValue(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => { setSearchQuery(query); dispatch(search(query)); console.log(query) };
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("FFFFF")
    // dispatch(getAllBoats());
    dispatch(getCategoryOne())
    dispatch(getCategoryTwo()).then((res) => {
      console.log(res.data)
    })
    // dispatch(getCategoryThree())
    dispatch(getSwvl())
    console.log(filteredcategoryOne)

  }, [])
  const { filteredcategoryOne } = useSelector(state => state.UserSlice)
  const { filteredcategoryTwo } = useSelector(state => state.UserSlice)
  const { filteredswvl } = useSelector(state => state.UserSlice)
  const route = useRoute();
  const { num } = route.params;
  const [visibleModal, setVisibleModal] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue1, setSliderValue1] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  const handleSliderChange1 = (value) => {
    setSliderValue1(value);
  };

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
        <Text style={styles.Header_filter}>Filter</Text>

   
        <Text style={styles.Header_filter_price_lapel}>number of poeple: {sliderValue}</Text>
        <Slider
          style={{ width: 380, height: 20, marginTop: 10 }}
          minimumValue={0}
          maximumValue={1000}
          minimumTrackTintColor="#185271"
          maximumTrackTintColor="#114B5F"
          thumbTintColor="#0c8df7"
          onValueChange={handleSliderChange}
          step={10}
        />



        <MultipleSelectList
          dropdownStyles={{ borderColor: "#114B5F", borderRadius: 0, marginBottom: 10 }}

          dropdownTextStyles={{ color: '#114B5F' }}
          placeholder="choose Categories"
          boxStyles={{ borderBottomColor: "#dddedf", borderRadius: 0, borderBottomWidth: 1, borderWidth: 0 }}
          badgeTextStyles={{ color: "#114B5F", fontSize: 18 }}
          badgeStyles={{ borderRadius: 0, backgroundColor: '#fff' }}
          setSelected={(val) => setSelectedItems1(val)}
          data={data2}
          save="value"
          // onSelect={(e) => alert(selectedItems1)}
        // inputStyles={{}}


        />
        <Text style={styles?.Header_filter_price_lapel}>price value: {sliderValue1}</Text>
        <Slider
          style={{ width: 380, height: 20, marginTop: 10 }}
          minimumValue={0}
          maximumValue={1000}
          minimumTrackTintColor="#114B5F"
          maximumTrackTintColor="#114B5F"
          thumbTintColor="#0c8df7"
          onValueChange={handleSliderChange1}
          step={10}
        />



        <View style={styles?.book_fixToText}>
          <TouchableOpacity style={styles?.book_bookBtn} onPress={() => {
            if (num === 1) {
              dispatch(filter({ type: selectedItems1, port: selectedItems, numberOfpeople: sliderValue, price: sliderValue1 }))
            }
            else if (num === 2) {
              dispatch(filter2({ type: selectedItems1, port: selectedItems, numberOfpeople: sliderValue, price: sliderValue1 }))
            }
            ; setVisibleModal(null)
          }}>
            <Text style={styles?.book_btn}>{'filter '}</Text>
            <Icon name="arrow-right" color={'#000'} size={20} style={styles?.book_arrow} />
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );



  const [activeButton, setActiveButton] = useState('');
  const [acive, setActive] = useState(false);

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
    if(num==1){
      dispatch(filterTaps({  port: buttonName}))

    }
    else if(num==3){
      dispatch(filterTaps3({  port: buttonName}))

    }
    else if(num==2){
      dispatch(filterTaps2({  port: buttonName}))

    }

  };

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offset.value * 9) }],
    };
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transition:''
    };
  });
  return (

  

      
        <View >
          {/* modal */}
          <View style={styles?.container_left}>
        

              <TouchableOpacity
                style={[styles?.kfc, activeButton === 'all' && styles?.activeButton]}
                onPress={() => 
                  {

                    handlePress('all')
                  
                  }
                  }
              >
                {
                  activeButton === 'all' ? (<>

                    <Animated.View style={[styles?.div]}>
                      <Text style={styles?.Mac_btnActive}>{'All'}</Text>
                    </Animated.View>

                  </>) : (
                    <Text style={styles?.Mac_btn}>{'All'}</Text>

                  )
                }
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles?.kfc, activeButton === 'MAC' && styles?.activeButton]}
                onPress={() => 
                  {

                    handlePress('MAC')
                  
                  }
                  }
              >
                {
                  activeButton === 'MAC' ? (<>

                    <Animated.View style={[styles?.div]}>
                      <Text style={styles?.Mac_btnActive}>{'Mac'}</Text>
                    </Animated.View>

                  </>) : (
                    <Text style={styles?.Mac_btn}>{'Mac'}</Text>

                  )
                }
              </TouchableOpacity>


              <TouchableOpacity
                style={[styles?.kfc, activeButton === 'Mahata' && styles?.activeButton]}
                onPress={() => handlePress('Mahata')}
              >
                {
                  activeButton === 'Mahata' ? (<>

                    <Animated.View style={styles?.div}> 
                      <Text style={styles?.mahata_btnActive}>{'Mahata'}</Text>
                    </Animated.View>

                  </>) : (
                    <Text style={styles?.mahata_btn}>{'Mahata'}</Text>

                  )
                }
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles?.kfc, activeButton === 'KFC' && styles?.activeButton]}
                onPress={() => handlePress('KFC')
                 }
              >

                {
                  activeButton === 'KFC' ? (<>

                    <View style={styles?.div}>
                      <Text style={styles?.kfc_btnActive}>{'KFC'}</Text>
                    </View>

                  </>) : (
                    <Text style={styles?.kfc_btn}>{'KFC'}</Text>

                  )
                }
              </TouchableOpacity>

          

          

          </View>






        
          <View style={styles.container}>
            {num == 2 &&
              <Modal isVisible={visibleModal === 1} style={styles?.bottomModal}>

                {renderModalContent()}
              </Modal>
            }
            {num == 1 &&
              <Modal isVisible={visibleModal === 1} style={styles?.bottomModal}>

                {renderModalContent()}
              </Modal>
            }
            {/* modal */}

            {/* filter icon */}
            {num == 2 &&
           
            
                   <View style={styles?.ffixToText}>
                <TouchableOpacity style={styles?.fbookBtn}
                  onPress={() => { setVisibleModal(1); setSelectedItems([]); setSelectedItems1([]); setSliderValue(1000); setSliderValue1(1000) }}
                >
                    <Text style={styles?.fbtn}>{'Filter'}</Text>
                    <Icon name="filter" color={'#000'} size={20} style={styles?.farrow} />
                </TouchableOpacity>
            </View> 
               
             
          
            }
            {num == 1 &&


<View style={styles?.ffixToText}>
<TouchableOpacity style={styles?.fbookBtn}
    onPress={() => { setVisibleModal(1); setSelectedItems([]); setSelectedItems1([]); setSliderValue(1000); setSliderValue1(1000) }}
>
    <Text style={styles?.fbtn}>{'Filter'}</Text>
    <Icon name="filter" color={'#000'} size={20} style={styles?.farrow} />
</TouchableOpacity>
</View> 

         
            }
            {
              num == 3 &&
              <Searchbar
                style={styles?.filter_search}
                placeholder="Target Place"
                onChangeText={onChangeSearch}
                value={searchQuery}

              />
            }




            {/* cards */}
            <View style={styles?.cards}>
           
              {
                num === 1 && (
                  <FlatList
                    style={styles?.FlatList}
                    data={filteredcategoryOne}
                    renderItem={({ item }) => (

                      <View style={styles?.card_con}>
                        <Image
                          style={styles?.card_con_img}
                          width={170}
                          height={170}
                          source={{
                            uri: `http://${ip}:5000/${item?.images[0]}`,
                          }}
                        />

                        <View style={styles?.card_con_info}>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_name}>{item?.name}</Text>
                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_price}>{item?.price} per Hour</Text>

                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_port}>{item?.type}</Text>
                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Icon name='anchor' size={18} color={'#166582'} />
                            <Text style={styles?.card_con_info_row_type}> {item?.portName} </Text>

                          </View>
                        </View>
                        <View style={styles?.fixToText}>
                        <TouchableOpacity style={styles?.bookBtn} onPressIn={() => {
                          console.log("first");
                          props.navigation.navigate('Discreption', { data: item });
                        }}>
                          <Text style={styles?.arrow}>See Details</Text>
                        </TouchableOpacity>
                        </View>
                      
                      </View>
                      
                    )}
                    keyExtractor={(item) => item?._id}
                  />
                )
              }
            
              {
                num === 2 && (
                  <FlatList
                  style={styles?.FlatList}
                    data={filteredcategoryTwo}
                    renderItem={({ item }) => (

                      <View style={styles?.card_con}>
                        <Image
                          style={styles?.card_con_img}
                          width={170}
                          height={170}
                          source={{
                            uri: `http://${ip}:5000/${item?.images[0]}`,
                          }}
                        />

                        <View style={styles?.card_con_info}>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_name}>{item?.name}</Text>
                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_price}>{item?.price} per Hour</Text>

                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_port}>{item?.type}</Text>
                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Icon name='anchor' size={18} color={'#166582'} />
                            <Text style={styles?.card_con_info_row_type}> {item?.portName} </Text>

                          </View>
                        </View>


                        <View style={styles?.fixToText}>
                      
                        <TouchableOpacity style={styles?.bookBtn} onPressIn={() => {
                          console.log("first");
                          props?.navigation.navigate('Discreption', { data: item });
                        }}>
                          <Text style={styles?.arrow}>See Details</Text>
                        </TouchableOpacity>
                        </View>
                      </View>

                    )}
                    keyExtractor={(item) => item?._id}

                  />
                )
              }
              {
                num === 3 && (
                  <FlatList
                    data={filteredswvl}
                    renderItem={({ item }) => (
                      <View style={styles?.card_con}>
                        <Image
                          style={styles?.card_con_img}
                          width={170}
                          height={170}
                          source={{
                            uri: `http://${ip}:5000/${item?.boat?.images[0]}`,
                          }}
                        />

                        <View style={styles?.card_con_info}>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_name}>{item?.boat?.name}</Text>
                            <Text style={styles?.card_con_info_row_name}>{item?.port}</Text>
                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_price}>{item?.priceForTrip}L.E/ Hour</Text>

                          </View>
                          <View style={styles?.card_con_info_row}>
                            <Text style={styles?.card_con_info_row_port}>{formatDate(item?.date)}</Text>
                          </View>
                          <View style={styles?.card_con_info_row}>
                            {/* <Icon  name='anchor' size={18} color={'#166582'} /> */}
                            <Text style={styles?.card_con_info_row_item}> {convertToAmPm(item?.time)} </Text>
                            <Text style={styles?.card_con_info_row_targetPlace}> {item?.targetPlace} </Text>

                          </View>
                        </View>

                        <View style={styles?.fixToText}>
                      
                
                        <TouchableOpacity style={styles?.bookBtn} onPressIn={() => {
                          console.log("first");
                          props?.navigation.navigate('swvl', { data: item });
                        }}>
                          <Text style={styles?.arrow}>See Details</Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                    )}
                    keyExtractor={(item) => item?._id}
                  />
                )
              }



            </View>


       
          </View>

        </View>
       

  )
}

const styles = StyleSheet.create({
  scroll:{
    height: 805,
    // width: 600,
    backgroundColor: "#fdfdfd",
    // paddingBottom:230,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: 850,
    marginLeft: 45,
    paddingBottom:230,
    width: 600,
  },
  container_left: {
    position: "absolute",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#0073ff",
    width: 60,
    height: 805,
  },
  kfc: {
    color: "#ffffff",
    fontSize: 15,
    backgroundColor: "#0073ff",
    transform: [{ rotate: '-90deg' }],
    marginTop: 100,
    marginLeft: 10,
    width: 30,
  },
  activeButton: {
    backgroundColor: "#ebeff5",
    color: "#ffffff",
  },
  kfc_btn: {
    color: '#fff',
    fontSize: 16,
    marginLeft: -50,
  },
  kfc_btnActive: {
    color:  "#2090f9",
    fontSize: 16,
    marginTop: 15,
    marginLeft: 45,
  },
  Mac_btn: {
    width: 30,
    color: "#ffffff",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
  },
  Mac_btnActive: {
    width: 30,
    color:  "#2090f9",
    fontSize: 15,
    marginTop: 15,
    marginLeft: 45,
  },
  mahata_btn: {
    width: 70,
    height: 60,
    color: "#ffffff",
    fontSize: 15,
    marginTop: 30,
    marginLeft: -50,

  },
  mahata_btnActive: {
    color: "#2090f9",
    fontSize: 15,
    marginTop: 15,
    marginLeft: 28,
  },
  div: {
    width: 120,
    height: 160,
    left: -15,
    top: -18,
    backgroundColor: '#fefefe',
    borderRadius: 100,
    color: '#000',
    position: 'absolute',
    zIndex: 10000,
    marginLeft:-50,


  },
  cards: {
    // marginBottom:10,
    backgroundColor:"#ffffff",
    width: 400,
  },
  filter_input_con: {
    backgroundColor: "#fcfcfcfb",
    borderRadius: 20,
    width: 200,
    marginLeft: 100,
    marginTop:20,
    marginBottom:20,
    borderColor: "#0000001f",
    borderWidth: 1,
  },
  card_con_img: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: 150,
    width: 160,
  },


  card_con: {

    width: 280,
    paddingTop: 10,
    paddingBottom: 5,
    marginLeft: 70,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 7,
    justifyContent: "center",
  },
  card_con_info: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#161313',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#c8c8c8',
    borderBottomWidth: 1,
    borderBottomColor: '#c8c8c8',
    borderRightWidth: 1,
    borderRightColor: '#c8c8c8',
  },
  card_con_info_row_name: {
    fontSize: 20,
    color: '#1c5d73',
    paddingTop: 6,
  },
  card_con_info_row_price: {
    fontSize: 14,
    color: '#979797',

  },
  card_con_info_row_port: {
    fontSize: 17,
    color: '#8a8a8a',
  },
  card_con_info_row_type: {
    paddingLeft: 20,
    fontSize: 14,

  },
  card_con_info_row_item:{
    // paddingLeft: 20,
    fontSize: 14,
    color: '#8a8a8a',
  },
  card_con_info_row_targetPlace:{
    fontSize: 14,
    color: '#8a8a8a',
  },
  card_con_info_row: {
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,

    paddingLeft: 30,
  },
  button: {
    padding: 10,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: '#d0d0d0',
    borderRadius: 2
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  bottomModal: {
    margin: 0,
    justifyContent: "flex-end"
  },


  Header_filter: {
    textAlign: 'center',
    fontSize: 30,
    color: "#0c8df7",
    paddingBottom: 10,
    marginLeft: 130,
    borderBottomColor: '#000000',
    borderBottomWidth: .5,
    width: 100
  },
  Header_filter_catrgories: {
    paddingBottom: 10,
    paddingTop: 20,
    color: "#cc6300",
    fontSize: 20,
  },
  Header_filter_type: {
    paddingBottom: 10,
    color: "#cc6300",
    fontSize: 20,
  },
  Header_filter_price_lapel: {
    paddingTop: 10,
    color: "#114B5F",
    paddingLeft: 10
  },

  book_fixToText: {
    height: 65,
    width: 405,
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#0c8df7',
    borderRadius: 55,
    marginTop: 30,


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
    height: 40,
    paddingLeft: 20,
    marginTop: 10,
  },
  book_arrow: {
    color: '#000000',
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 10,
    marginTop: 10,
  },
  filter_search: {
    backgroundColor: "#ffffff60",
    width: 420,
    margin: 15,
    borderColor: "#0000001f",
    borderWidth: 1,
  },

  fixToText: {
    position: 'absolute',
    height: 80,
    width: 455,
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 100,
    right: 50,
    
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    
    left:200,
 
},
bookBtn: {
    justifyContent: "space-between",
   
    flexDirection: 'row',
    alignItems: 'center',
    width: 430,
    height: 50,
    paddingTop: 15,
},

arrow: {
    color: '#000000',
    backgroundColor: '#d3d3d372',
    borderRadius:50,
    width:60,
    height:60,
    paddingTop:10,
    marginTop:80,
    left:50,
    top:60,
    color:"#010101",
    paddingLeft:10,
    borderColor: "#0000001f",
    borderWidth: 1,
},
ffixToText: {

  height: 50,
  width: 285,
  fontSize: 15,
  fontWeight: 'bold',

  

  backgroundColor: '#0c8df7',
  borderRadius: 35,
 
  top:10,

  left:50 , 
marginBottom:20,
marginTop:20,
},
fbookBtn: {
  justifyContent: "space-between",
 
  flexDirection: 'row',
  alignItems: 'center',
  width: 260,
  height: 50,
  // paddingTop: 15,
},
fbtn: {
  color: '#ffffff',

  fontSize: 25,
  height:40,
  paddingLeft: 20,
  // marginTop:10,
},
farrow: {
  color: '#000000',
  backgroundColor:"#fff",
  borderRadius:50,
  width:30,
  height:30,
  padding:5,
  // marginTop:10,
},

})