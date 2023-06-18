import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#3191eaaf',
    height: 55,
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
    marginHorizontal: 20,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius:50,
  },
  formButton: {
    borderRadius:30,
    backgroundColor: '#3191eaff',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 80,
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
});

export default styles;