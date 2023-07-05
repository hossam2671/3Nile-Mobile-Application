import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

const Chat = () => {
  const [userMessages, setUserMessages] = useState([
    { id: 1, text: 'Hello', sender: 'right', avatar: 'https://example.com/avatar.jpg' },
    { id: 2, text: 'How are you?', sender: 'right', avatar: 'https://example.com/avatar.jpg' },
  
    { id: 4, text: 'What about you?', sender: 'left', avatar: 'https://example.com/avatar.jpg' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: userMessages.length + 1,
        text: inputMessage,
        sender: 'right',
        avatar: 'https://example.com/avatar.jpg',
      };

      setUserMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={userMessages}
        renderItem={({ item }) => (
          <View style={item.sender === 'right' ? styles.rightMessage : styles.leftMessage}>
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
          value={inputMessage}
          onChangeText={setInputMessage}
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
  // Styles for the chat component...
});

export default Chat;
