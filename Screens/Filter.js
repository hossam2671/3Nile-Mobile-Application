import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity , FlatList} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Chip, Searchbar } from 'react-native-paper';
import Modal from 'react-native-modal';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryOne , getCategoryTwo , filter , filter2 , getSwvl, search} from '../redux/slices/UserSlice';
import Icon from "react-native-vector-icons/FontAwesome"
import ip from '../config'


const data = [
  { key: '1', value: 'KFC'},
  { key: '2', value: 'shra3 2' },
  { key: '3', value: 'Cameras' },
];
const data2 = [
  { key: '1', value: 'shera3'},
  { key: '2', value: 'shra3 2' },
  { key: '3', value: 'Cameras' },
];



export default function Filter(props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => {setSearchQuery(query); dispatch(search(query));console.log(query)};
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("FFFFF")
    // dispatch(getAllBoats());
    dispatch(getCategoryOne())
    dispatch(getCategoryTwo()).then((res)=>{
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
     <View   style={styles.select}>
     <Text style={styles.Header_filter}>Filter</Text>
    
      <MultipleSelectList
 selectText="Pick Items"
 boxStyles={{borderBottomColor:"#dddedf",borderRadius:0,borderBottomWidth:1,borderWidth:0}}
dropdownStyles={{borderRadius:0,borderBottomWidth:1}}
        setSelected={(val) => setSelectedItems(val)}
        data={data}
        save="value"
        onSelect={() => alert(selectedItems)}
        icon="anchor"
        placeholder="Choose Port"
        badgeTextStyles={{color:"#114B5F",fontSize:18}}
        badgeStyles={{borderRadius:0,backgroundColor:'#fff'}}
        
        />
         <Text style={styles.Header_filter_price_lapel}>number of poeple: {sliderValue}</Text>
 <Slider
        style={{width: 380, height: 20,marginTop:10}}
        minimumValue={0}
        maximumValue={1000}
        minimumTrackTintColor="#185271"
        maximumTrackTintColor="#114B5F"
        thumbTintColor="#0c8df7"
        onValueChange={handleSliderChange}
        step={10}
      />
     

      
<MultipleSelectList
dropdownStyles={{borderColor:"#114B5F",borderRadius:0,marginBottom:10}}

dropdownTextStyles={{color:'#114B5F'}}
placeholder="choose Categories"
boxStyles={{borderBottomColor:"#dddedf",borderRadius:0,borderBottomWidth:1,borderWidth:0}}
badgeTextStyles={{color:"#114B5F",fontSize:18}}
badgeStyles={{borderRadius:0,backgroundColor:'#fff'}}
setSelected={(val) => setSelectedItems1(val)}
data={data2}
save="value"
onSelect={(e) => alert(selectedItems1)}
        // inputStyles={{}}
      
      
        />
        <Text style={styles.Header_filter_price_lapel}>price value: {sliderValue1}</Text>
 <Slider
        style={{width: 380, height: 20,marginTop:10}}
        minimumValue={0}
        maximumValue={1000}
        minimumTrackTintColor="#114B5F"
        maximumTrackTintColor="#114B5F"
        thumbTintColor="#0c8df7"
        onValueChange={handleSliderChange1}
        step={10}
      />


    
<View style={styles.book_fixToText}>
                <TouchableOpacity style={styles.book_bookBtn} onPress={()=>{
                  if(num === 1){
                    dispatch(filter({type: selectedItems1 ,port: selectedItems , numOFPeople: sliderValue , price: sliderValue1} ))
                  }
                  else if(num === 2){
                      dispatch(filter2({type: selectedItems1 ,port: selectedItems , numOFPeople: sliderValue , price: sliderValue1} ))
                    }
                    ; setVisibleModal(null)
                }}>
                    <Text style={styles.book_btn}>{'filter '}</Text>
                    <Icon name="arrow-right" color={'#000'} size={20} style={styles.book_arrow} />
                </TouchableOpacity>
            </View> 

            </View>
        
    </View>
  );
  
  return (
      
      <View style={styles.container}>
     
   {/* modal */}
    {   num == 2 &&   
   <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
    
        {renderModalContent()}
      </Modal>
}
{  num == 1 &&   
   <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
    
        {renderModalContent()}
      </Modal>
}
      {/* modal */}

      {/* filter icon */}
      {   num == 2 &&
        <View style={styles.filter_input_con}>
          <IconButton
            icon="filter"
            iconColor={'#114B5F'}
            size={20}
            isVisible={visibleModal === 1}
            style={styles.bottomModal}
            onPress={() => 
              {setVisibleModal(1) ; setSelectedItems([]);setSelectedItems1([]) ; setSliderValue(1000) ; setSliderValue1(1000) }}
          />
        </View>
}
{  num == 1 &&
        <View style={styles.filter_input_con}>
          <IconButton
            icon="filter"
            iconColor={'#114B5F'}
            size={20}
            isVisible={visibleModal === 1}
            style={styles.bottomModal}
            onPress={() => 
              {setVisibleModal(1) ; setSelectedItems([]);setSelectedItems1([]) ; setSliderValue(1000) ; setSliderValue1(1000) }}
          />
        </View>
}
{
  num == 3 && 
  <Searchbar
      placeholder="Target Place"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
}
  {/* filter icon */}

        {/* chips */}
        {
          num == 1 &&
        <View style={styles.chips_con}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Chip  style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log("closeIcon" )}>
              {/* {filteredcategoryOne[0].name} */}
            </Chip>
            <Chip  style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Icon Chip
            </Chip>
            <Chip style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Chip
            </Chip>
            <Chip style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Right Icon Chip
            </Chip>
            <Chip style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Right
            </Chip>
          </ScrollView>
        </View>
}
{
          num == 2 &&
        <View style={styles.chips_con}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Chip  style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log("closeIcon" )}>
              {/* {filteredcategoryOne[0].name} */}
            </Chip>
            <Chip  style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Icon Chip
            </Chip>
            <Chip style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Chip
            </Chip>
            <Chip style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Right Icon Chip
            </Chip>
            <Chip style={styles.chisp} selectedColor={'#114B5F'}  onPress={() => console.log('Pressed')}>
              Right
            </Chip>
          </ScrollView>
        </View>
}
 {/* chips */}

 {/* cards */}
        <View style={styles.cards}>
        {
  num === 1 && (
    <FlatList
    style={styles.FlatList}
      data={filteredcategoryOne}
      renderItem={({ item }) => (
       
        <View style={styles.card_con}>
            <Image
            style={styles.card_con_img}
              width={170}
              height={170}
              source={{
                uri: `http://${ip}:5000/${item.images[0]}`,
              }}
            />

            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_name}>{item.name}</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_price}>{item.price} per Hour</Text>
       
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_port}>{item.type}</Text>
              </View>
              <View style={styles.card_con_info_row}>
               <Icon  name='anchor' size={18} color={'#166582'} />
                <Text style={styles.card_con_info_row_type}> {item.portName} </Text>
             
              </View>
            </View>
            <TouchableOpacity onPressIn={() => {
          console.log("first");
          props.navigation.navigate('Discreption', { data : item});
        }}> 
            <Text >See Details</Text>
          </TouchableOpacity>
          </View>
      )}
      keyExtractor={(item) => item._id}
    />
  )
}
{
  num === 2 && (
    <FlatList
      data={filteredcategoryTwo}
      renderItem={({ item }) => (
       
        <View style={styles.card_con}>
            <Image
            style={styles.card_con_img}
              width={170}
              height={170}
              source={{
                uri: `http://${ip}:5000/${item.images[0]}`,
              }}
            />

            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_name}>{item.name}</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_price}>{item.price} per Hour</Text>
       
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_port}>{item.type}</Text>
              </View>
              <View style={styles.card_con_info_row}>
               <Icon  name='anchor' size={18} color={'#166582'} />
                <Text style={styles.card_con_info_row_type}> {item.portName} </Text>

              </View>
            </View>

                <TouchableOpacity onPressIn={() => {
          console.log("first");
          props.navigation.navigate('Discreption', { data : item});
        }}> 
            <Text >See Details</Text>
          </TouchableOpacity>
          </View>

      )}
      keyExtractor={(item) => item._id}

    />
  )
}
{
  num === 3 && (
    <FlatList
      data={filteredswvl}
      renderItem={({ item }) => (
        <View style={styles.card_con}>
            <Image
            style={styles.card_con_img}
              width={170}
              height={170}
              source={{
                uri: `http://${ip}:5000/${item.boat.images[0]}`,
              }}
            />

            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_name}>{item.boat.name}</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_price}>{item.priceForTrip} per Hour</Text>
       
              </View>
              <View style={styles.card_con_info_row}>
                <Text style={styles.card_con_info_row_port}>{item.date.slice(0,10)}</Text>
              </View>
              <View style={styles.card_con_info_row}>
               {/* <Icon  name='anchor' size={18} color={'#166582'} /> */}
                <Text style={styles.card_con_info_row_type}> {item.time} </Text>
                <Text style={styles.card_con_info_row_type}> {item.targetPlace} </Text>
             
              </View>
            </View>
            <TouchableOpacity onPressIn={() => {
          console.log("first");
          props.navigation.navigate('swvl', { data : item});
        }}> 
            <Text >See Details</Text>
          </TouchableOpacity>
          </View>
      )}
      keyExtractor={(item) => item._id}
    />
  )
}


          {/* <View style={styles.card_con}>
            <Image
              width={170}
              height={170}
              source={{
                uri: 'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
              }}
            />
            <View style={styles.card_con_after}></View>
            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text> MARKEP</Text>
                <Text> Boat Name:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> $20</Text>
                <Text> Price:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> SHRA3</Text>
                <Text> TYPE:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> KFC</Text>
                <Text> port:</Text>
              </View>
            </View>
          </View>

          <View style={styles.card_con}>
            <Image
              width={170}
              height={170}
              source={{
                uri: 'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
              }}
            />
            <View style={styles.card_con_after}></View>
            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text> MARKEP</Text>
                <Text> Boat Name:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> $20</Text>
                <Text> Price:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> SHRA3</Text>
                <Text> TYPE:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> KFC</Text>
                <Text> port:</Text>
              </View>
            </View>
          </View>

          <View style={styles.card_con}>
            <Image
              width={170}
              height={170}
              source={{
                uri: 'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
              }}
            />
            <View style={styles.card_con_after}></View>
            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text> MARKEP</Text>
                <Text> Boat Name:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> $20</Text>
                <Text> Price:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> SHRA3</Text>
                <Text> TYPE:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> KFC</Text>
                <Text> port:</Text>
              </View>
            </View>
          </View>
          <View style={styles.card_con}>
            <Image
              width={170}
              height={170}
              source={{
                uri: 'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
              }}
            />
            <View style={styles.card_con_after}></View>
            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text> MARKEP</Text>
                <Text> Boat Name:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> $20</Text>
                <Text> Price:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> SHRA3</Text>
                <Text> TYPE:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> KFC</Text>
                <Text> port:</Text>
              </View>
            </View>
          </View>

          <View style={styles.card_con}>
            <Image
              width={170}
              height={170}
              source={{
                uri: 'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
              }}
            />
            <View style={styles.card_con_after}></View>
            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text> MARKEP</Text>
                <Text> Boat Name:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> $20</Text>
                <Text> Price:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> SHRA3</Text>
                <Text> TYPE:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> KFC</Text>
                <Text> port:</Text>
              </View>
            </View>
          </View>

          <View style={styles.card_con}>
            <Image
              width={170}
              height={170}
              source={{
                uri: 'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
              }}
            />
            <View style={styles.card_con_after}></View>
            <View style={styles.card_con_info}>
              <View style={styles.card_con_info_row}>
                <Text> MARKEP</Text>
                <Text> Boat Name:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> $20</Text>
                <Text> Price:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> SHRA3</Text>
                <Text> TYPE:</Text>
              </View>
              <View style={styles.card_con_info_row}>
                <Text> KFC</Text>
                <Text> port:</Text>
              </View>
            </View>
          </View> */}
    </View>
     {/* cards */}
  
</View>
  
)}

const styles = StyleSheet.create({

  container: {
  
  marginTop:40,
  },
  
  cards:{
    marginBottom:60
  },
  filter_input_con:{
 
  borderColor:'black',
  borderWidth:1,
  margin:20,
  
  },
  chips_con:{
  width:450,
  },


  card_con_img:{
  // margin:20,
borderTopLeftRadius:20,
borderBottomLeftRadius:20,  
 height:150,
    width:160,
  },

  chisp:{
  margin:10,
  backgroundColor:'#fff',
  borderRadius:20,
  borderWidth:1,
  },
  card_con:{
  
  width:410,
  paddingTop:5,
  paddingBottom:5,
  // borderWidth:1,
  margin:20,
  display: 'flex',
  flexDirection:'row',
  borderRadius:7,
  justifyContent:"center",
  },
  card_con_info:{
  shadowOffset:{width: -2, height: 4},  
  shadowColor:'#e0d6d6',  
  shadowOpacity:0.9,  
  shadowRadius:10,  
  borderTopRightRadius:20,
  borderBottomRightRadius:20,
  borderTopWidth:1,
  borderTopColor:'#c8c8c8',
  borderBottomWidth:1,
  borderBottomColor:'#c8c8c8',
  borderRightWidth:1,
  borderRightColor:'#c8c8c8',
  },
  card_con_info_row_name:{
    fontSize:20,
    color:'#1c5d73',
    paddingTop:6,
  },
  card_con_info_row_price:{
    fontSize:14,
    color:'#979797',
  
  },
  card_con_info_row_port:{
    fontSize:17,
    color:'#8a8a8a',
  },
  card_con_info_row_type:{
    paddingLeft:20,
    fontSize:14,
   
  },
  card_con_info_row:{
  width:200,
  display: 'flex',
  flexDirection:'row',
paddingTop:10,
  
  paddingLeft:30,
  },
  button: {
  padding: 10,
  margin: 16,
  justifyContent: 'center',
  alignItems: 'center',
  color:'#ffffff',
  backgroundColor: '#d0d0d0',
  borderRadius:2
  },
  modalContent: {
  backgroundColor: '#ffffff',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius:60,
  borderTopLeftRadius:60,
  },
  bottomModal: {
  justifyContent: 'flex-end',
  margin: 0,

  },


  Header_filter:{
    textAlign:'center',
    fontSize:30,
    color:"#0c8df7",
    paddingBottom:10,
    marginLeft:130,
    borderBottomColor:'#000000',
    borderBottomWidth:.5,
    width:100
  },
  Header_filter_catrgories:{
    paddingBottom:10,
    paddingTop:20,
    color:"#cc6300",
    fontSize:20,
  },
  Header_filter_type:{
    paddingBottom:10,
    color:"#cc6300",
    fontSize:20,
  },
  Header_filter_price_lapel:{
    paddingTop:10,
    color:"#114B5F",
    paddingLeft:10
  },

  book_fixToText: {
    height: 65,
    width: 405,
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#0c8df7',
    borderRadius: 55,
  marginTop:30,
 
 
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
  })