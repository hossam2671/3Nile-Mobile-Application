import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import loader from '../assets/loader.gif'

const Splash = (props) => {
    useEffect(() => {

        setTimeout(() => {
            props.navigation.navigate('HomeCards');
        }, 2000)
    }, [])
    return (
        <View style={style.container}>
            <Image style={{ width: 400, height: 400 }} source={loader} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Splash