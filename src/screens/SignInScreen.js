import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import Logo from '../../assets/images/logo_philsup.png';
import CustomInPut from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';


const height = Dimensions.get('window').height;

export default class SignInScreen extends React.Component{

    constructor(props){
        super(props),
        this.state = {
            data:[],
            inputEmail:'',
            inputPassword:'',
            allFieldsCompleted:false
        }
    }

    login(){
        // validation de l'identité de l'utilisateur
        console.log("SingIn - onSignInPressed -> dirige vers la page Feed");
        if( this.state.allFieldsCompleted == true )
        {
            console.warn('Appel a la base de données');
        }
        else{
            console.warn('Vous devez entrer vos informations pour vous connecter');
        }
        //this.props.navigation.navigate('Feed');
    }

    displayRegisterScreen(){
        // envoyer sur la page de creation de compte
        console.log("SignIn - onRegisterPressed -> dirige vers la page SignUp");
        this.props.navigation.navigate('SignUp');
    }

    handleInputValue( inputText, inputOrigin){

        if( inputOrigin === "email"){
            this.setState( {inputEmail: inputText} );
        }
        else if( inputOrigin === "password"){
            this.setState( {inputPassword: inputText} );
        }

        if( this.state.inputEmail != "" && this.state.inputPassword != "")
            this.setState( { allFieldsCompleted:true } );
    }

    render(){
        console.log("Affichage SignIn: " + JSON.stringify(this.props) );
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
                        inputValue={this.props.inputEmail}
                        setValue={ (inputText) => this.handleInputValue(inputText, "email") }
                     />
                     
                     <Text style={styles.text}>Mot de passe</Text>
                     <CustomInPut
                        placeholder='Tapez votre mot de passe...'
                        inputValue={this.props.inputPassword}
                        setValue={ (inputText) => this.handleInputValue(inputText, "password") }
                    //  secureTextEntry
                     />
    
                     <CustomButton text="Se connecter" onPress={ ()=> this.login() } type="PRIMARY" />
                     <CustomButton text="Créer un compte" onPress={ ()=> this.displayRegisterScreen() } type="TERTIARY"/>
                 </View>
            </View>
        )

    }

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
