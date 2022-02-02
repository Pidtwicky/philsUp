import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../assets/images/logo_philsup.png';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const FeedScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('HomeScreen')
    };

    return (

        <View>
            
            <View style={styles.root} >
                
                <Text style={styles.h1}>FUTURE FEED</Text>
                
                <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.17 }]}
                resizeMode='contain' />
                
            </View>

             <View>

                 <CustomButton text="retour test" onPress={onSignInPressed} type="PRIMARY" />
                 
             </View>

        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20,
    },
    h1: {
        color: '#FF7F6F',
        fontSize: 30,
    },
    logo: {
        width: '20%',
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: "left",
        marginLeft: 40,
        marginRight: 50,
    },
});

export default FeedScreen;
