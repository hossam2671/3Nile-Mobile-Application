import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import ip from '../../config'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const socket = io(`http://${ip}:5000`);


const messages = [

 
];
const currentUser = {
  id: 'right',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR9o9Pbt3znQnWr2VyrGe5bCC2p3UjMEwpg&usqp=CAU',
};
const Chat = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [RecievedMessages, setRecievedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(false);
  const [inputMessage2, setInputMessage2] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [author, setAuthor] = useState(null);
  const [userMessageImg, setuserMessageImg] = useState(null);
  const [authorID, setAuthorId] = useState("");
  const { user } = useSelector(state => state.UserSlice)
  const { boatOwner } = useSelector(state => state.UserSlice)






  const [messages, setMessages] = useState([
    
    { id: 5, text: 'Whssddasdou been up to?', sender: 'right', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-bz3w3YbiCPW23zQNWR0sjH7WNZFmCV_6Q&usqp=CAU' },
    { id: 6, text: "Not much, just working and hanging out with friends. How about you?", sender: 'left', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR9o9Pbt3znQnWr2VyrGe5bCC2p3UjMEwpg&usqp=CAU' },

  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: currentUser.id,
        avatar: currentUser.avatar,
      };
      const updatedMessages = [...messages, newMessage];
      setInputText('');
      setMessages(updatedMessages);
    }
  };
  useEffect(() => {

    let id = AsyncStorage.getItem('user')
    console.log(id._j,"sssssssssssssss");
        if(user){
      console.log(user,"userTest");
      console.log("woork");
      socket.on('trip-request-accepted', (data) => {
        console.log(data);
        const { tripData, notification, chatRoomId ,owner,userData} = data;
        console.log(userData[0]._id,"kero");
        if(tripData.clientId===user._id){
          setUserMessages(tripData.userMessages)
          setAuthorId(userData[0]._id)
          setRoomId(tripData._id)
          console.log(tripData,"tripDatatripData");
          socket.emit('join_room', chatRoomId);
          console.log("joined");
          setFormDisplay(!formDisplay);
          setAuthor(user?.name)
          setuserMessageImg(owner[0]?.img)
          setUserMessages(tripData.userMessages)
          // setRecievedMessages(tripData.boatOwnerMessages)
  
        }
        
      });
  
    
    }
  
    
  }, []);





  useEffect(() => {
  
      console.log(boatOwner);
    if(boatOwner){
      console.log("owner Here");
      socket.on('trip-request-accepted', (data) => {
        console.log(data,"gotIt");
        const { tripData, notification, chatRoomId ,owner,userData} = data;
        console.log(owner)
        if(owner[0]?._id===boatOwner._id){
          setAuthor(owner[0]?.name)
          setAuthorId(owner[0]?._id)
          setuserMessageImg(userData[0]?.img)
          console.log(userMessageImg);
          socket.emit('join_room', chatRoomId);
          console.log('Chat Room ID:', chatRoomId);
          setRoomId(chatRoomId)
          setUserMessages(tripData.boatOwnerMessages)
          setRecievedMessages(tripData.userMessages)
  
        
        }
        
      });
     
    }
    
  }, []);
  
  useEffect(()=>{
    socket.on('receive_message', (data) => {
      setIsReceived(true)
      // playSound();
      console.log(data,"receeeei");
      setRecievedMessages((prevArray) => [...prevArray, data])
      //   console.log(RecievedMessages,"ressssdasd");
      });
      socket.off()
  },[socket ])
  
  const sendMessages = async()=>{
    if(inputMessage !==""){
     const messageData = {
        room: roomId,
        author : authorID,
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
        console.log(res,"tttthjt");
      })  
      
      await socket.emit('send_message',messageData)
    }
    console.log(authorID,"sentt");
  
  }


  const currentUser = {
    id: authorID,
    avatar: `http://${ip}:5000/${userMessageImg}`,
  };
  return (
    <View style={styles.container}>
      <FlatList
       keyExtractor={(item) => item._id}
        data={userMessages}
        renderItem={({ item }) => (
          <View style={styles.rightMessage}>
            <Image style={styles.logo} source={`http://${ip}:5000/${userMessageImg}`} />
            <Text style={styles.messageText}>{item.message}</Text>
            
          </View>
        )}
        contentContainerStyle={styles.chat}
        inverted

      />
      <FlatList
       keyExtractor={(item) => item._id}
        data={RecievedMessages}
        renderItem={({ item }) => (
          <View style={styles.leftMessage}>
            <Image style={styles.logo} source={`http://${ip}:5000/${userMessageImg}`} />
            <Text style={styles.messageText}>{item.message}</Text>
            
          </View>
        )}
        contentContainerStyle={styles.chat}

      />



      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={sendMessages}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessages}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chat: {
    flexGrow: 1,
    padding: 10,
  },
  leftMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rightMessage: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageText: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    maxWidth: '80%',
  },
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
    backgroundColor: 'blue',
   paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;