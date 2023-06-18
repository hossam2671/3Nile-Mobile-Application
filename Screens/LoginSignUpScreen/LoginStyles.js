import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#f7fdff',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3a6df7',
    letterSpacing: 0.5

},
  bottomContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  textInput: {
    height: 60,
    borderWidth: 1,
    borderColor: '#114B5F',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingLeft: 10
  },
  formButton: {
    backgroundColor: '#114B5F',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
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
    marginBottom: 70,
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
    
    backgroundColor: '#114B5F',
    alignItems: 'center',
    
    borderRadius: 20,
    top: -40
  },
  radios:{
    flexDirection:"row",
    marginLeft:30
  }
});

export default styles;