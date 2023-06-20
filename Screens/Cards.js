// import { StyleSheet, Text, View, Image , ScrollView} from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/Ionicons';
// import IIcon from 'react-native-vector-icons/MaterialIcons';
// import cardboat from '../assets/Nile.jpg'


// const Cards = () => {
//     return (
        
//         <ScrollView contentContainerStyle={styles.cards__container}>
//             <View style={styles.card__box}>
//                 <View style={styles.card__image}>
//                     <Image source={cardboat} style={styles.cardboat__img} />
//                 </View>
//                 <View style={styles.card__content}>
//                     <Text style={styles.card__name}>Feloka</Text>
//                     <Icon name="location" size={13} style={styles.loc__icon} />
//                     <Text style={styles.card__location}>Port: MAC</Text>
//                     <IIcon name="date-range" size={13} />
//                     <Text style={styles.card__date}>27 June 2023</Text>
//                     <Text style={styles.card__price}>200$</Text>
//                 </View>
//             </View>
//             </ScrollView>

//     )
// }


// const styles = StyleSheet.create({

//     cards__container: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-around'
//     },

//     card__box: {
//         elevation: 4,
//         width: 200,
//         height: 300,
//         borderRadius: 20,
//         backgroundColor: '#fff',
//         shadowColor: '#171717',
//         shadowOffset: { width: -2, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//     },
//     card__image:{
//         width: 170,
//         height: 120,
//         alignItems: 'center',
//         borderRadius: 20,
//         left: 15,
//         top: 20,
//     },
//     cardboat__img: {
//         width: 170,
//         height: 120,
//         borderRadius: 10,
//     },
//     card__content:{
//         top: 40,
//         left: 15,
//     },
//     card__name: {
//         fontSize: 20,
//         fontWeight: 600,
//         bottom: 15,
//     },
//     card__location:{
//         bottom: 18,
//         left: 16,
//     },
//     card__date:{
//         bottom: 17,
//         left: 16,
//     },
//     card__price:{
//         fontSize: 20,
//         fontWeight: 600,
//     }

// })

// export default Cards