import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity , FlatList} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Chip, Searchbar } from 'react-native-paper';
import Modal from 'react-native-modal';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryOne , getCategoryTwo , filter } from '../redux/slices/UserSlice';

const data = [
  { key: '1', value: 'shra3',},
  { key: '2', value: 'shra3 2' },
  { key: '3', value: 'Cameras' },
  { key: '4', value: 'Computers', disabled: true },
  { key: '5', value: 'Vegetables' },
  { key: '6', value: 'Diary Products' },
  { key: '7', value: 'Drinks' },
];

export default function Filter() {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(getAllBoats());
    dispatch(getCategoryOne())
    dispatch(getCategoryTwo())
    // dispatch(getCategoryThree())
    // dispatch(getSwvl())


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
        thumbTintColor="#cc6300"
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
data={data}
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
        thumbTintColor="#cc6300"
        onValueChange={handleSliderChange1}
        step={10}
      />
</View>

    


      {renderButton('Apply', () =>{ dispatch(filter(selectedItems , selectedItems1 , sliderValue , sliderValue1 ));console.log(selectedItems  , selectedItems1 , sliderValue , sliderValue1); setVisibleModal(null)})}
    </View>
  );
  
  return (
      
      <View style={styles.container}>
     
   {/* modal */}
         
   <Modal isVisible={visibleModal === 1} style={styles.bottomModal}>
        {renderModalContent()}
      </Modal>
      {/* modal */}

      {/* filter icon */}
        <View style={styles.filter_input_con}>
          <IconButton
            icon="filter"
            iconColor={'#114B5F'}
            size={20}
            isVisible={visibleModal === 1}
            style={styles.bottomModal}
            onPress={() => setVisibleModal(1)}
          />
        </View>
  {/* filter icon */}

        {/* chips */}
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
 {/* chips */}

 {/* cards */}
        <View style={styles.cards}>
        {
  num === 1 && (
    <FlatList
      data={filteredcategoryOne}
      renderItem={({ item }) => (
        <View style={styles.card_con}>
          <Image
            width={170}
            height={170}
            source={{
              uri:
                'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
            }}
          />
          <View style={styles.card_con_after}></View>
          <View style={styles.card_con_info}>
            <View style={styles.card_con_info_row}>
              <Text> Boat Name:</Text>
              <Text> {item.name}</Text>
            </View>
            <View style={styles.card_con_info_row}>
              <Text> Price:</Text>
              <Text> {item.price} $</Text>
            </View>
            <View style={styles.card_con_info_row}>
              <Text> TYPE:</Text>
              <Text> {item.type}</Text>
            </View>
            <View style={styles.card_con_info_row}>
              <Text> port:</Text>
              <Text> {item.portName}</Text>
            </View>
          </View>
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
            width={170}
            height={170}
            source={{
              uri:
                'https://i.insider.com/5d3a0c24454a3908467e0f37?width=750&format=jpeg&auto=webp',
            }}
          />
          <View style={styles.card_con_after}></View>
          <View style={styles.card_con_info}>
            <View style={styles.card_con_info_row}>
              <Text> Boat Name:</Text>
              <Text> {item.name}</Text>
            </View>
            <View style={styles.card_con_info_row}>
              <Text> Price:</Text>
              <Text> {item.price} $</Text>
            </View>
            <View style={styles.card_con_info_row}>
              <Text> TYPE:</Text>
              <Text> {item.type}</Text>
            </View>
            <View style={styles.card_con_info_row}>
              <Text> port:</Text>
              <Text> {item.portName}</Text>
            </View>
          </View>
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
        filter_input_con:{
       
        borderColor:'black',
        borderWidth:1,
        margin:20,
   
        
    
        
        },
        chips_con:{
        width:450,
        },
        
        chisp:{
        margin:10,
        backgroundColor:'#fff',
        borderRadius:20,
        borderWidth:1,
        },
        card_con:{
        backgroundColor:'#ffffff',
        width:410,
        paddingTop:5,
        paddingBottom:5,
        borderWidth:1,
        margin:20,
        display: 'flex',
        flexDirection:'row',
        borderRadius:7,
        },
        
        card_con_after:{
        borderWidth:.5,
        borderColor:'#114B5F' ,
        margin:5,
        marginLeft:10,
        },
        card_con_info:{
        display: 'flex',
        flexDirection:'column',
        marginTop:20,
        },
        card_con_info_row:{
        width:200,
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:8,
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
          color:"#ec7200",
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

        
        })