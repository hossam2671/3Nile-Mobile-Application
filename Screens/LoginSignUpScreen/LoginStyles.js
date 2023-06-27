import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#3191eaaf',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,
    marginVertical: 10,
    borderRadius:20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5

},
  bottomContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  textInput: {
    height: 60,
    borderWidth: 1,
    borderColor: '#a1a1a1ff',
    marginHorizontal: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius:50,
  },
  formButton: {
    borderRadius:30,
    backgroundColor: '#3191eaff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,
    marginVertical: 30,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 100,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    
    backgroundColor: '#0a79e1fc',
    alignItems: 'center',
    
    borderRadius: 20,
    top: -30
  },
  radios:{
    flexDirection:"row",
   justifyContent:"space-between",
   marginTop:20,
  },
  radios_user:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:80,
    marginLeft:50,
  },
  radios_user_text:{
    marginTop:5,
    fontSize:18,
    color:"#6f6f6f"
  },
  radios_owner:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:130,
    marginRight:40,
  },
  modalContainer_al:{
    backgroundColor: 'rgba(137, 136, 136, 0.29)',
    // height:900,
    top: -600,
  },
// modalContainer: {
//   flex: 1,
//   // justifyContent: 'center',
//   // alignItems: 'center',
//   backgroundColor: 'rgba(248, 248, 248, 0.5)',
//   width:280,
//   // marginRight:60,
//   left:90,
//   top:-90,
//   height:700,
// },
modalContainer_card_con:{
  backgroundColor: 'rgba(247, 247, 247, 1)',
  width:320,
  height:270,
  borderRadius:40,
  alignItems: 'center',
  left:30,
  // top:-400,
},


succ:{
  width:70,
  height:70,
},

modaltitle:{
  // paddingTop:5,
  color: '#000000',
  fontSize:25,
  width:300,
  marginTop:20,
  marginLeft:20,   
   color: '#0b4227',
   textAlign:'center'
},
Total_text:{
  color: '#0c8df7',
  paddingTop:5,
},
Hours_text:{
  color: '#0c8df7',
  paddingTop:5,
},
Date_text:{
  color: '#0c8df7',
  paddingTop:10,
},

});

export default styles;