import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo_philsup.png';
import CustomInPut from '../../components/CustomInPut';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        // validation de l'identité de l'utilisateur
        navigation.navigate('Feed')
    };

    const onRegisterPressed = () => {
        // envoyer sur la page de creation de compte
        navigation.navigate('SignUp')
    };


    return (

        <View>
            
            <View style={styles.root} >
                
                <Text style={styles.h1}>Login</Text>
                
                <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.17 }]}
                resizeMode='contain' />
                
            </View>
             

             <View>
                 
                 <Text style={styles.text}>Adresse mail</Text>
                 
                 <CustomInPut
                 placeholder='Ex: phils@up.com'
                 value={email}
                 setValue={setEmail}
                 />
                 
                 <Text style={styles.text}>Mot de passe</Text>
                 
                 <CustomInPut
                 placeholder='Tapez votre mot de passe...'
                 value={password}
                 setValue={setPassword}
                 secureTextEntry
                 />

                 <CustomButton text="Se connecter" onPress={onSignInPressed} type="PRIMARY" />
                 
                 <CustomButton text="Créer un compte" onPress={onRegisterPressed} type="TERTIARY"/>
            
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

export default SignInScreen