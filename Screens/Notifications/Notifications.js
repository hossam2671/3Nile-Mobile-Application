import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationComponent = ({ notificationCount, onPress }) => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={onPress}>
      <Icon name="notifications" size={24} />
      {notificationCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: 'red',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 12 }}>
            {notificationCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NotificationComponent;
