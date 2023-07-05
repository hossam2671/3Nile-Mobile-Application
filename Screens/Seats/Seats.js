import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { useDispatch } from 'react-redux';
import { seatResearv } from '../../redux/slices/UserSlice';

const windowWidth = Dimensions.get('window').width;

const Seats = () => {
const dispatch= useDispatch()


  const [seat, setSeat] = useState([
    'Front1', 'Front2',
    'Middle1', 'Middle2','Back6', 'Back2',
    'Back1', 'Back3','Back7', 'Back5','Back9','Back10',
    'Back11','Back12','Back13','Back14','Back15','Back16','Back17','Back18',
  ]);
  const [seatAvailable, setSeatAvailable] = useState([
    'Front1', 'Front2',
    'Middle1', 'Middle2',
    'Back1', 'Back3', 'Back5', 'Back2',
  ]);
  const [seatReserved, setSeatReserved] = useState([]);

  const onClickData = (selectedSeat) => {
    if (seatReserved.includes(selectedSeat)) {
      setSeatAvailable([...seatAvailable, selectedSeat]);
      setSeatReserved(seatReserved.filter((res) => res !== selectedSeat));
    } else {
      setSeatReserved([...seatReserved, selectedSeat]);
      setSeatAvailable(seatAvailable.filter((res) => res !== selectedSeat));
    }
  };

  const renderSeatItem = ({ item }) => {
    const isReserved = seatReserved.includes(item);
    return (
      <TouchableOpacity
        style={[styles.seat, isReserved && styles.reserved]}
        onPress={() =>{ onClickData(item) ; dispatch(seatResearv(seatReserved.length+1))}}
      >
        <Icon name='person' size={20}/>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Seat Reservation System</Text> */}
      <View style={styles.seatContainer}>
        <FlatList
          data={seat}
          renderItem={renderSeatItem}
          keyExtractor={(item) => item}
          numColumns={2}
        />
      </View>
      <AvailableList available={seatAvailable} />
      <ReservedList reserved={seatReserved} />
    </View>
  );
};

const AvailableList = ({ available }) => {
  const seatCount = available.length;

  return (
    <View style={styles.left}>
      {/* <Text style={styles.listHeading}>
        Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})
      </Text>
      <FlatList
        data={available}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item) => item}
      /> */}
    </View>
  );
};

const ReservedList = ({ reserved }) => {
  return (
    <View style={styles.right}>
      {/* <Text style={styles.listHeading}>Reserved Seats: ({reserved.length})</Text>
      <FlatList
        data={reserved}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item) => item}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    position: "absolute",
    left: 200,
    zIndex: 5000,
    top: 150,
  },
  heading: {
    fontSize: 20,
    flex: 1,
    marginBottom: 16,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: windowWidth - 330, // Adjust the width based on your requirements
  },
  seat: {
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#060706',
    marginTop: 2,
    marginLeft:33,
    flex: 1,
    // height: 8,
    backgroundColor: '#bccdc9',
  },
  reserved: {
    backgroundColor: '#67aef6',
    zIndex: 5000,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  listHeading: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Seats;
