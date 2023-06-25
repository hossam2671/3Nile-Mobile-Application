import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import ip from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { notify } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';

const socket = io(`http://${ip}:5000`);

const Notification= () => {
  const dispatch = useDispatch();

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
      console.log(id,"ssxzzx");
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
            
         
              if (!notifications.some(notification => notification._id === data.notification._id)) {
                setNotifications(prevState => [...prevState, data.notification]);
              }
                
    
          
            
  
            }
      });
        console.log(notifications,"noooot");

    },[notificnotifyColor])
  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
      <Icon name="notification" size={24}  color={notificnotifyColor?"#333":"#871616"}/>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ backgroundColor: 'white', padding: 50,borderRadius:30,bottom:30, }}>
          {
notifications.length >0  ?
           notifications.map((item,index) => {
            console.log(item,"iteeeem");
            return <Text key={index}>1{item.message}<TouchableOpacity
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

// const styles = StyleSheet.create({
//   container: {
//     marginRight:30,
//     // top:50,
//     // left:360,
//   },
// });

export default Notification;