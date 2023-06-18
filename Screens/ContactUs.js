import { View, Text , StyleSheet , Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icona from 'react-native-vector-icons/Entypo'



const ContactUs = () => {
    const [text, setText] = React.useState("");
    const [message, setMessage] = React.useState("");
    
  return (
    <View style={styles.container}>
      <View style={styles.blueFrame}>
        <View style={styles.circle}></View>
        <View style={styles.circle2}></View>
        <View style={styles.circle3}></View>
        <Text style={styles.name}>Welcome, Name</Text>
        <Text style={styles.paragraph}>Keep track and grow your relationship with us</Text>
      </View>
      <View style={styles.card}>
        <Image  style={styles.image} resizeMode="contain" source={require('../assets/boat2.jpeg')} />
        <Text style={{top:-60,left:30,color:"white"}}>Name</Text>
        <Text style={{top:-50,left:30,color:"white"}}>Email</Text>
        <Text style={{textAlign: 'center',fontSize:20,top:-20}}>Leave your message</Text>
        <TextInput
            label="title"
            value={text}
            onChangeText={text => setText(text)}
            style={styles.input}
        />
        <TextInput
            label="Message"
            value={message}
            onChangeText={text => setMessage(text)}
            style={styles.input2}
            numberOfLines={4}
            multiline={true}
        />
        <View style={styles.icons}>
            <Icons style={styles.icon} name="facebook" size={35} color="#900" />
            <Icona style={styles.icon} name="twitter-with-circle" size={30} color="#900" />
            <Icon style={styles.icon} name="logo-whatsapp" size={32} color="#900" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop:40,
        backgroundColor:"#F3F3F3"
      },
    blueFrame:{
        height:400,
        backgroundColor:"#0f29e8",
        borderBottomRightRadius:50,        
        borderBottomLeftRadius:50,
         width:450
    },
    name:{
        color:"white",
        fontSize:30,
        paddingHorizontal: 30,
        // paddingVertical: 15
        paddingTop:25
    },
    paragraph : {
        color:"#dddddd",
        fontSize:15,
        paddingHorizontal: 30,
        paddingVertical: 15
    },
    card:{
        width: 400,
        top:-250,
        borderRadius: 20,
        backgroundColor:"white",
        elevation:20
    },
    image:{
        width: 400,
        height:200,
        // borderBottomEndRadius:50,
        borderTopRightRadius:20,        
        borderTopLeftRadius:20,
        
    },
    input:{
        height:50,
        width:330,
        alignSelf:"center",
        backgroundColor:"white",
        marginBottom:15
    },
    input2:{
        width:330,
        alignSelf:"center",
        backgroundColor:"white",
        marginBottom:15
    },
    icons:{
        flexDirection:"row",
        paddingVertical:15,
        paddingHorizontal:35,
        justifyContent:"center",
        width: 400,
        alignItems:"center",
    },
    icon:{
        marginRight:20,
        color:"black",
    },
    circle:{
        width:300,
        height:300,
        borderWidth: 2,
    borderColor: "#FFFFFF22",
    borderRadius: 150,
    position: 'absolute',
    right:-90,
    top:-10
    },
    circle2:{
        width:100,
        height:100,
        borderWidth: 2,
    borderColor: "#FFFFFF22",
    borderRadius: 150,
    position: 'absolute',
    right:110,
    top:-40
    },
    circle3:{
        width:200,
        height:200,
        borderWidth: 2,
    borderColor: "#FFFFFF22",
    borderRadius: 150,
    position: 'absolute',
    left:-90,
    top:-10
    }
})

export default ContactUs