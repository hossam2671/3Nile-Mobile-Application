import { ScrollView, StyleSheet, Text, View, Dimensions, Image,Button , Alert, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'

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

  return (
    
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        renderPagination={renderPagination}
        loop={false}>
        <View
          style={styles.slide}>
          <Image style={styles.image} source={require('../assets/boat.jpg')} />
        </View>

        <View
          style={styles.slide}>
          <Image style={styles.image} source={require('../assets/boat.jpg')} />
        </View>
      </Swiper>

            {/* <ScrollView> */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardTitle}>Floka</Text>
          <Text style={styles.cardItemsRate}>****</Text>
        </View>

        <Text style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar ipsum ut volutpat interdum. Suspendisse potenti.</Text>

        <View style={styles.itemContainer}>

          <View style={styles.item}>
            <Text style={styles.cardItems}>Number of people:</Text>
            <Text style={styles.cardItems}>Price Per Hour:</Text>
            <Text style={styles.cardItems}>Boat Type:</Text>
            <Text style={styles.cardItems}>Port Name:</Text>
          </View>


          <View style={styles.vlaue}>
            <Text style={styles.cardItemsVlaue}>50</Text>
            <Text style={styles.cardItemsVlaue}>100</Text>
            <Text style={styles.cardItemsVlaue}>Shera3</Text>
            <Text style={styles.cardItemsVlaue}>KFC</Text>
          </View>

        </View>
      </View>
          {/* </ScrollView> */}

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

      <View style={styles.fixToText}>
        <TouchableOpacity  style={styles.bookBtn}
          title="BOOK"
          onPress={() => Alert.alert('Left button pressed')}
        >
           <Text style={styles.btn}>{'B\nO\nO\nK'}</Text>
           <Icon name="arrow-right" color={'#000'} size={20} style={styles.arrow} />
          </TouchableOpacity>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
flex:1,
backgroundColor:'#fff'
  },
  wrapper: {},
  slide: {
    height: 10,
    top:140,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: 300
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  paginationStyle: {
    position: "absolute",
    bottom: 520,
    right: 20,
  },
  paginationText: {
    color: "#fff",
    fontSize: 30,
  },
  card: {
    height: 265,
    backgroundColor: '#fff',
    position:"absolute",
    // borderRadius: 10,
    marginHorizontal: 20,
    bottom: 230,
    padding: 20,
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 15
  },
  itemContainer: {
    height: 100,
    // flex:1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    // height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  vlaue: {
    // heightof 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    right: 50,
  },
  cardItems: {
    fontSize: 15,
    color: 'gray'
  },
  cardItemsVlaue: {
    fontSize: 15,
    marginLeft: 30
  },
  map: {
    height: 200,
    backgroundColor: '#fff',
    // borderRadius: 10,
    marginHorizontal: 45,
    borderColor: 'red',
    bottom: 50,
    left: 45,
    // padding: 30,
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
    // flexDirection: 'row',
    bottom:110,
    left:15,
    position:'absolute',
    height:100,
    width:35,
    fontSize:15,
    fontWeight:'bold',
    
    
    // justifyContent: 'space-between',
  },
  bookBtn:{
    // padding:0,
    justifyContent:"space-between",
    alignItems:"center",
    color:'black',
    // padding:10,
    width:70,
    height:140,
    borderRadius: 10,
    // backgroundColor:'red',
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderColor:'red'
  },
  btn:{
    paddingTop:30,
    fontSize:15,
    fontWeight:'bold',
    paddingLeft:2,
  },
  arrow:{
    paddingBottom:10,
  }
})



export default Discreption