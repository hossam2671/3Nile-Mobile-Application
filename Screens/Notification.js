import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { notify } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';

const socket = io(`http://${ip}:5000`);

const Notification= () => {
  const dispatch = useDispatch();
  const [showFlash, setShowFlash] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificnotifyColor, setnotificnotifyColor] = useState(notify);
  const { user } = useSelector(state => state.UserSlice)
  const { notify } = useSelector(state => state.UserSlice)

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const remove = (index) => {
      setNotifications((prevState) => {
        const newNotifications = [...prevState];
        newNotifications.splice(index, 1);
        return newNotifications;
      })}
    useEffect(()=>{
      setnotificnotifyColor(notify)
      let id = AsyncStorage.getItem('user')
      axios.get(`http://${ip}:5000/user/notifications/${user._id}`).then((res)=>{
        console.log(res,"userNooot");
        setNotifications(res.data.unreadNotifications)
        console.log(notifications,"eee");
  
      })


      socket.on('Owner-accepted-Trip', (data) => {
        
        dispatch(notify(true))


        console.log(data,"sssssssssssw3q");
      
     
    const { message, status, _id } = data.notification;
       
            const isNewNotification = notifications.find(notification => notification._id === _id) === undefined;        
          
          if(isNewNotification){
            setShowFlash(true);

              if (!notifications.some(notification => notification._id === data.notification._id)) {
                setNotifications(prevState => [...prevState, data.notification]);
              }
                
    
          
            
  
            }
      });
        console.log(notifications,"noooot");

    },[notificnotifyColor,socket])
  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
      <View style={styles.iconContainer}>
          {
            notifications.length >0 ? <Icon name="md-notifications" size={24} color={ '#0378ee'} />
            :
            <Icon name="notification" size={24} color={"#252222"} />
          }
       
      </View>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ backgroundColor: 'white', padding: 20,borderRadius:60,bottom:30,width:280,left:60, }}>
          {
notifications.length >0  ?
           notifications.map((item,index) => {
            console.log(item,"iteeeem");
            return <Text style={{color:'#535252',fontSize:20, }} key={index}>1{item.message}<TouchableOpacity
              onPressIn={()=>{
                remove(index)
                
                axios.put(`http://${ip}:5000/user/notifications/${item._id}/mark-as-read`).then((res)=>{
                  console.log(res,"readed");


                })
              }
                
              }
            >
              <Text>X</Text>
              </TouchableOpacity> </Text>

            
          })
          
          
            :

            <Text>No Notification Yet</Text>
          
          }



          
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 30,
    // Add other styles for the container if needed
  },
  flashAnimation: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the background color and opacity as desired
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Notification;