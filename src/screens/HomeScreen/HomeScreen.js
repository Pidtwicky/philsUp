import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo_philsup.png';
import illustration from '../../../assets/images/illustration.png';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {

  const {height} = useWindowDimensions();
  const navigation = useNavigation();


    const onSignInPressed = () => {
        console.warn('onSignInPressed');
        // validation user

        navigation.navigate('SignIn')
    };

  return (

    <View>
        
        <View style={styles.root} >
            
            <Text style={styles.h1}>Phil's Up</Text>
            
            <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.17 }]}
            resizeMode='contain' />
            
        </View>
         

         <View style={styles.home}>
           
           <Image
            source={illustration}
            style={styles.illustration} />

            <Text style={styles.echangez}>Echangez entre collègue n'importe où et n'importe quand</Text>
            
            <CustomButton text="Se connecter" onPress={onSignInPressed} type="PRIMARY" />
                     
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
    home:{
      alignItems: 'center',
    },
    h1: {
        color: '#FF7F6F',
        fontSize: 30,
    },
    logo: {
        width: '20%',
    },
    illustration: {
      marginBottom: 40,
    },
    echangez: {
      marginBottom: 30,
      color: 'gray',
      marginLeft: 50,
      marginRight: 50,
      textAlign: "center",
      fontSize: 20 ,
    },
});

export default HomeScreen;
