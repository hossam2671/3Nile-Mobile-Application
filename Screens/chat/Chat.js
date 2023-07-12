import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ip from '../../config';
import { convertToAmPm } from '../../functions';
import { formatTime } from '../../functions';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io(`http://${ip}:5000`);



const Chat = () => {
  const { user } = useSelector(state => state.UserSlice)
  const { boatOwner } = useSelector(state => state.UserSlice)

  const [receivedMessages, setReceivedMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [RecievedMessages, setRecievedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('aaa');
  const [inputMessage2, setInputMessage2] = useState('aaxx');
  const [valueAfterSubmit, setvalueAfterSubmit] = useState('');
  const [isReceived, setIsReceived] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [author, setAuthor] = useState(null);
  const [userMessageImg, setuserMessageImg] = useState(null);
  const [recieverName, setRecieverName] = useState(null);
  const [senderImg, setSenderImg] = useState(null);
  const [chatNow, setChatNow] = useState(true);
  const [chatName, setchatName] = useState('Chat With ');
  const [authorID, setAuthorId] = useState(null);
  const [recieverId, setrecieverId] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  let userId = AsyncStorage.getItem('user')


  const handleChatClick = (item) => {
    try {
      AsyncStorage.setItem('activeChatId', item?._id);
      setActiveChatId(item._id);
    } catch (error) {
      console.log('Error setting active chat ID:', error);
    }
  };
  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: userMessages.length + 1,
        text: inputText,
        sender: currentUser.id,
        avatar: currentUser.avatar,
      };
      setUserMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');
    }
  };
  const sendMessages = async()=>{
    if(inputMessage !=="" && roomId !==""){
     const messageData = {
        room: roomId,
        author : author,
        authorId:authorID,
        to:recieverId,
        message:inputMessage,
        time:new Date(Date.now())
      }
      setUserMessages((prevArray) => [...prevArray, messageData])
      axios.put(`http://${ip}:5000/chatMessage`,{
        TripId:messageData.room,
        sender:authorID,
        message:messageData.message,
        time:messageData.time
      }).then((res)=>{
      })  
      
      await socket.emit('send_message',messageData)
    }
    
    setInputMessage('')
    setShowEmojiPicker(false)
  }

  // scroll to bottom when Receive message

  const flatListRef = useRef(null);
  const flatListRef2 = useRef(null);
  const combinedData = [...userMessages, ...RecievedMessages];

  // Get Rooms For User And owner , Get Updated When Any Trip Accepted Or finished
 

  useEffect(() => {
   
    if(user){
      setSenderImg(user?.img)
      axios.get(`http://${ip}:5000/user/userTrips/accepted/${user?._id}`).then((res)=>{
        setChats(res.data)
  
      })
     
      socket.on('trip-request-accepted', (data) => {
        setSenderImg(user?.img)
        axios.get(`http://${ip}:5000/user/userTrips/accepted/${user?._id}`).then((res)=>{
          setChats(res.data)
        })
        
        const { tripData, notification, chatRoomId ,owner,userData} = data;
        if(tripData.clientId===user?._id){
          socket.emit('join_room', chatRoomId);
          setFormDisplay(!formDisplay);
          setRoomId(chatRoomId)
          setAuthor(userData[0]?.name)
          setAuthorId(userData[0]?._id)
          setuserMessageImg(owner[0]?.img)
  
  
        }
  
  
        
      });
  
     socket.on('Owner-finished-Trip', (data) => {
      axios.get(`http://${ip}:5000/user/userTrips/accepted/${user?._id}`).then((res)=>{
          setChats(res?.data)
    
        })
    
  
        
      });
    }
  
    
  }, []);
  ;

  useEffect(() => {
    console.log(boatOwner?._id,"owneeerddd")
    if(boatOwner){
      setSenderImg(boatOwner?.img)  
      
      axios.get(`http://${ip}:5000/boatOwner/getAllCurrentTrips/${boatOwner?._id}`).then((res)=>{
        setChats(res?.data)
  
      })
      socket.on('trip-request-accepted', (data) => {
        axios.get(`http://${ip}:5000/boatOwner/getAllCurrentTrips/${boatOwner?._id}`).then((res)=>{
          setChats(res?.data)
    
        })
        const { tripData, notification, chatRoomId ,owner,userData} = data;
        if(owner[0]?._id===boatOwner?._id){
          setAuthor(owner[0]?.name)
          setAuthorId(owner[0]?._id)
          setuserMessageImg(userData[0]?.img)
          socket.emit('join_room', chatRoomId);
          console.log('Chat Room ID:', chatRoomId);
          setRoomId(chatRoomId)
        
  
        
        }
        
      });
      socket.on('Owner-finished-Trip', (data) => {
        axios.get(`http://${ip}:5000/boatOwner/getAllCurrentTrips/${boatOwner?._id}`).then((res)=>{
          setChats(res?.data)
    
        })
    
  
        
      });
     
    }
  
  }, []);
  



  useEffect(()=>{
    
    let auth;
    socket.on('receive_message',async (data) => {
      let active= await AsyncStorage.getItem('activeChatId')
      console.log(data.message,"messsage")
    setIsReceived(true)
      // playSound();
      // console.log(user.userData._id,"user Identity");
     auth=data.authorId
     if(user){
      console.log(data?.room,"datxxa?.room")
    
      console.log(user?._id,"userId Old",data.to,"toxxx ")

      if(user?._id===data.to){
          console.log(active,"roomxx now")
        if(active===data?.room){
          axios.get(`http://${ip}:5000/user/userTrip/${active}`).then((res)=>{
            console.log(res,"xxxxxxxxzvczxc")
            setuserMessageImg(res.data.ownerData[0].img)
            setRecieverName(res.data.ownerData[0].name)
            setUserMessages(res?.data?.userTrip?.userMessages)
            setRecievedMessages(res?.data?.userTrip?.boatOwnerMessages)
            setrecieverId(res.data.ownerData[0]._id)
            if (flatListRef2.current && RecievedMessages.length > 0) {
              flatListRef2.current.scrollToEnd({ animated: true });
            }
          })
          console.log(data.message,"data.message")
          console.log(data.time,"data.time")
          console.log(RecievedMessages,"Ddddddddddddd")
          // setRecievedMessages((prevState) => [...prevState, {message:data.message,time:data.time}]);
        
          console.log("DAta Was Reseeeved to user")
        }
      }
     }
  
     else if(boatOwner){
  
       if(boatOwner?._id===data.to){

         if(active===data.room){

           axios.get(`http://${ip}:5000/user/userTrip/${active}`).then((res)=>{
             setUserMessages(res?.data?.userTrip?.userMessages)
             setRecievedMessages(res?.data?.userTrip?.boatOwnerMessages)
             
           })
          // setRecievedMessages((prevState) => [...prevState, {message:data.message,time:data.time}]);
        }
      }
       console.log("DAta Was Reseeeved to Owner")
     }
  
      });
  },[socket ])
  

  const renderMessage = ({ item }) => {
    const handleItemClick = () => {
      // Scroll the FlatList to the end
      flatListRef2.current.scrollToEnd({ animated: true });
    };
    return (

    <TouchableOpacity onPress={() =>{
      handleItemClick
      
      handleChatClick(item)
      socket.emit('join_room', item?._id);
      console.log("joined To " , item?._id);
      setChatNow(false)
      setRoomId(item?._id)
      if(user){
        axios.get(`http://${ip}:5000/user/userTrip/${item?._id}`).then((res)=>{
          console.log(res,"chaaastdasdas")
          setuserMessageImg(res.data.ownerData[0].img)
          setRecieverName(res.data.ownerData[0].name)
          setUserMessages(res?.data?.userTrip?.userMessages)
          setRecievedMessages(res?.data?.userTrip?.boatOwnerMessages)
          console.log(res?.data?.userTrip?.boatOwnerMessages,"messsssssscxxcz")
          setrecieverId(res.data.ownerData[0]._id)
        })
        
        setSenderImg(user?.img)
        setAuthor(user?.name)
        setAuthorId(user?._id)
     
      }
      else if (boatOwner){

      axios.get(`http://${ip}:5000/user//userInfo/${item?.clientId}`).then((res)=>{
        setuserMessageImg(res?.data?.img)
      setRecieverName(res?.data?.name)
      setrecieverId(res?.data?._id)
      })
      axios.get(`http://${ip}:5000/user/userTrip/${item?._id}`).then((res)=>{
        setUserMessages(res?.data?.userTrip?.boatOwnerMessages)
        setRecievedMessages(res?.data?.userTrip?.userMessages)
      })

        setSenderImg(boatOwner?.img)
          
        setAuthor(boatOwner?.name)
        setAuthorId(boatOwner?._id)
    

      }




    }
    
  
  }
    
    
    >
  <View  
   style={[
    styles?.chatRooms , 
      activeChatId === item._id && styles.ActiveChat,
  ]}
  
  
  >
    <Image style={styles?.tripLogo} source={{ uri: `http://${ip}:5000/${item?.boatId?.images[0]}` }} />
    <Text style={styles.tripName}>{item.boatId.name}</Text>
    <View style={styles?.chatRoomsCont}>
      <Text style={styles.tripTime}>{convertToAmPm(item.startTime)}</Text>
      <Text style={styles.tripTimeEnd}>{formatTime(item.endTime)}</Text>
    </View>
  </View>
</TouchableOpacity>
    );}
  return (
    <>
   
    <View>
    <FlatList
    
      horizontal
      data={chats}
      renderItem={renderMessage}
      keyExtractor={(item) => item._id}
    />
    </View>

    <View style={styles.container}>
   
    <View style={styles.chatContainer}>
    <FlatList
      ref={flatListRef2}
    keyExtractor={item => item._id}
    data={RecievedMessages}
    renderItem={({ item }) => (
      <View style={styles.leftMessage}>
         <Image style={styles.logo} source={{ uri: `http://${ip}:5000/${userMessageImg}` }} />

        <View style={styles.messageText2}>
  <Text style={styles.message2}>{item.message}</Text>
  <Text style={styles.timeText}>{formatTime(item.time)}</Text>
</View>

   
      </View>
    )}
    contentContainerStyle={styles.chat}
    
  />
  <FlatList
    ref={flatListRef}
    keyExtractor={item => item._id}
    data={userMessages}
    renderItem={({ item }) => (
      <View style={styles.rightMessage}>
     <View style={styles.messageText}>
  <Text style={styles.message}>{item.message}</Text>
  <Text style={styles.timeText}>{formatTime(item.time)}</Text>
</View>
        {/* <Text style={styles.messageText_time}>{formatTime(item.time)}</Text> */}
        {/* <Image style={styles.logo} source={{ uri: `http://${ip}:5000/${user?.img}` }} /> */}
      </View>
    )}
    contentContainerStyle={styles.chat}
  />


</View>
  

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={valueAfterSubmit}
     
          onSubmitEditing={() => {
            sendMessages();
            setvalueAfterSubmit('');
          }}
          
              // disabled
           
          
          onChangeText={(text)=>{
  
            setvalueAfterSubmit(text)
            setInputMessage(text)
            console.log(text)
          }}
        />
        <TouchableOpacity style={styles.sendButton} onPress={
             
          
          sendMessages
          
          }>
          <Text style={styles.sendButtonText}
          >Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftMessage: {
    flex: 1,
    alignItems: 'flex-end',
    marginVertical: 7,
    paddingHorizontal: 0,
 
    flexDirection: 'row',
    justifyContent:"flex-end",
    
  },
  rightMessage: {
    flex: 1,
    alignItems: 'flex-end',
    marginVertical: 7,
    paddingHorizontal: 0,
 
    flexDirection: 'row',
    justifyContent:"flex-end",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    // backgroundColor: '#8f0101',
  },

//   messageText_time: {
//     backgroundColor: '#a92f2f',
//     borderRadius: 20,
//     maxWidth: '100%',
//     padding:10,
// //  top:35,
   
//   },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: '#0c8df7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chatRooms: {
    width: 210,
    backgroundColor: '#fff',
    margin: 5,
    height:70,
borderRadius:50,
flexDirection: 'row',
justifyContent: 'space-between',
  },
  chatRoomsCont: {
    flexDirection: 'row',
left:-38,
top:45,
  },
  tripTimeEnd: {
    color: '#000000',
fontSize:10,
  
  },
  tripTime: {
    color: '#000000',
    fontSize:10,
  },
  tripName: {
    fontSize: 20,
    color: '#000000',
  left:30,
  top:10,
  },
  tripLogo: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginLeft: 10,
    marginTop:10,
  },
  ActiveChat: {
    backgroundColor: '#0c8df7ff',
  },
  messageText: {
    backgroundColor: '#0c8df7',
    borderRadius: 20,
    padding: 6,
    maxWidth: '100%',// Replace with your desired background color
  right:5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  color:'#f3f3f3',
  },
  messageText2: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 6,
    maxWidth: '100%',// Replace with your desired background color
  right:5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
 
  },
  timeText: {
    fontSize: 10,
    paddingLeft: 5,
    color:'#c4c4c4ff',
  },
  message: {
    fontSize: 16, // Replace with your desired font size for the message
    color:'#ffffffff',
  },
  message2: {
    fontSize: 16, // Replace with your desired font size for the message
    color:'#000000',
  },
});

export default Chat;
