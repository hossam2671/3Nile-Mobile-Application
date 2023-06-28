import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Lottie from 'lottie-react-native';
const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#ffffffff', black: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../assets/vec.png'),
    title: 'Welcome  ',
    subtitle: ' Hello Hello It\'s meHello Hello It\'s meHello Hello It\'s meHello Hello It\'s me.',
  },

  {
    id: '2',
    image: require('../assets/image3.jpg'),
    title: '3Nile',
    subtitle: 'watercraft of a large range of types and sizes, but generally smaller than a ship.',
  },
  {
    id: '3',
    image: require('../assets/nilevip.png'),
    title: '3Nile VIP',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit watercraft of a.',
  },
  {
    id: '4',
    image: require('../assets/aaaa.jpg'),
    title: '3Nile Bus',
    subtitle: ' a large range of types and sizes, but generally smaller than a ship.',
  },
  
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center',}}>
      <Image
        source={item?.image}
        style={{height: '95%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
          
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: "#020101",
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 45}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50,borderRadios:0,width:190, marginLeft:105,}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('LoginSignUp')}>
                <Text style={{fontWeight: 'bold', fontSize: 15,color:"#ffffffff",}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor:"#1665c0",
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                    borderRadius:30,
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"#135fd1be",
                    // borderWidth:1,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity >
              <View style={{width: 20}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"white",
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />



      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    bottom:80,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    bottom:80,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#0151ad',
    justifyContent: 'center',
    alignItems: 'center',
    color:"white",
    borderRadius:30,
  },
});
export default OnboardingScreen;