import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const Seats = () => {
    
  const [seat, setSeat] = useState([
    'Front1', 'Front2', 'Front3',
    'Middle1', 'Middle2', 'Middle3',
    'Back1', 'Back2', 'Back3'
  ]);
  const [seatAvailable, setSeatAvailable] = useState([
    'Front1', 'Front2', 'Front3',
    'Middle1', 'Middle2', 'Middle3',
    'Back1', 'Back2', 'Back3'
  ]);
  const [seatReserved, setSeatReserved] = useState([]);
  console.log(seatAvailable.length+1)
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
        onPress={() => onClickData(item)}
      >
        <Icon name='person' size={20}/>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Seat Reservation System</Text>
      <FlatList
        data={seat}
        renderItem={renderSeatItem}
        keyExtractor={(item) => item}
        numColumns={3}
      />
      <AvailableList available={seatAvailable} />
      <ReservedList reserved={seatReserved} />
    </View>
  );
};

const AvailableList = ({ available }) => {
  const seatCount = available.length;

  return (
    <View style={styles.left}>
      <Text style={styles.listHeading}>
        Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})
      </Text>
      <FlatList
        data={available}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const ReservedList = ({ reserved }) => {
  return (
    <View style={styles.right}>
      <Text style={styles.listHeading}>Reserved Seats: ({reserved.length})</Text>
      <FlatList
        data={reserved}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  seat: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  reserved: {
    backgroundColor: 'gray',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  listHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Seats;

