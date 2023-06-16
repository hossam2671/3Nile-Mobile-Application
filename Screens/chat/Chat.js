import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';



const messages = [

 
];
const currentUser = {
  id: 'right',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR9o9Pbt3znQnWr2VyrGe5bCC2p3UjMEwpg&usqp=CAU',
};
const Chat = () => {
  const [messages, setMessages] = useState([
    
    { id: 5, text: 'What have you been up to?', sender: 'right', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-bz3w3YbiCPW23zQNWR0sjH7WNZFmCV_6Q&usqp=CAU' },
    { id: 6, text: "Not much, just working and hanging out with friends. How about you?", sender: 'left', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR9o9Pbt3znQnWr2VyrGe5bCC2p3UjMEwpg&usqp=CAU' },

  ]);
  const currentUser = {
    id: 'right',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-bz3w3YbiCPW23zQNWR0sjH7WNZFmCV_6Q&usqp=CAU',
  };
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

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === currentUser.id ? styles.rightMessage : styles.leftMessage}>
            <Image style={styles.logo} source={{ uri: item.avatar }} />
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.chat}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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