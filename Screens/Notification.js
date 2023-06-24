import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
const Notification= () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
      <Icon name="notification" size={24} color="#333" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Notification 1</Text>
          <Text>Notification 2</Text>
          <Text>Notification 3</Text>
        </View>
      </Modal>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     marginRight:30,
//     // top:50,
//     // left:360,
//   },
// });

export default Notification;