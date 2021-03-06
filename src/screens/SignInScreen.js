import React from "react";
import { ScrollView, View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import Logo from '../../assets/images/logo_philsup.png';
import CustomInPut from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XHR from '../utils/XHR';
import bcrypt from 'react-native-bcrypt';


const height = Dimensions.get('window').height;

export default class SignInScreen extends React.Component{

    constructor(props){
        super(props),
        this.state = {
            data:[],
            inputEmail:'',
            inputPassword:'',
            Error:false,
            allFieldsCompleted:false,
            isDataFound:false,
            secureTextEntry:''
        }
    }

    async storeUser(value){ 
        await AsyncStorage.setItem('storeUser', value);
    }
    
    async componentDidUpdate () {

            if (this.state.allFieldsCompleted === true){
                let callToAPI = 'connexion/' + this.state.inputEmail + '/' + this.state.inputPassword;
                XHR( callToAPI, (response) => {
                    this.setState({data: response.data,allFieldsCompleted:false, isDataFound:true});
                })    
            }

            if (this.state.isDataFound==true) {                                                         //Si on a récupéré les données de la requete XHR
                if ( this.state.data.length !== 0 ) {                                                   //et qu'il y a des informations à l'intérieur
                 
                    if( bcrypt.compareSync(this.state.inputPassword, this.state.data[0].password) ){    //compare le MdP saisi avec le MdP crypté dans la base de données
                        this.storeUser( "'" + this.state.data[0].id + "'" );                            //Sauvegarde l'id de l'utilisateur connecté dans la variable de Session
                        this.props.navigation.navigate('Feed');                                         //Redirige vers la page Feed
                    } 
                    else{
                        console.warn("Le mot de passe ne correspond pas à cette adresse Email...");
                    }   
                }
                else                                                                                    //Si les données sont vides -> l'email n'est pas dans la BdD
                    console.warn('Cette adresse mail est introuvable...')
            
            this.setState({isDataFound:false});   
        }
    }    

    login(){
        // validation de l'identité de l'utilisateur
        //console.log("SingIn - onSignInPressed -> dirige vers la page Feed");
        if( this.state.inputEmail != "" && this.state.inputPassword != "")
            this.setState( { allFieldsCompleted:true } );
        else{
            //console.warn('Vous devez entrer vos informations pour vous connecter');
            this.setState( {Error: true} );
        }
    }

    displayRegisterScreen(){
        // envoyer sur la page de creation de compte
        //console.log("SignIn - onRegisterPressed -> dirige vers la page SignUp");
        this.props.navigation.navigate('SignUp');
    }

    handleInputValue( inputText, inputOrigin){

        if( inputOrigin === "email"){
            this.setState( {inputEmail: inputText} );
        }
        else if( inputOrigin === "password"){
            this.setState( {inputPassword: inputText} );
        }
    }

    render(){

        const myPlaceHolder = 'Je gere la transmition de props';
        return (
            <ScrollView>
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
                        afficheError={this.state.Error}
                        messageError="Merci d'entrer votre email"
                        placeholder='Ex: phils@up.com'
                        inputValue={this.state.inputEmail}
                        setValue={ (inputText) => this.handleInputValue(inputText, "email") }
                     />
                   
                     <Text style={styles.text}>Mot de passe</Text>
                     <CustomInPut
                        afficheError={this.state.Error}
                        messageError="Merci d'entrer votre mot de passe"
                        placeholder='Tapez votre mot de passe...'
                        inputValue={this.state.inputPassword}
                        setValue={ (inputText) => this.handleInputValue(inputText, "password") }
                        secureTextEntry
                     />
    
                     <CustomButton text="Se connecter" onPress={ ()=> this.login() } type="PRIMARY" />
                     <CustomButton text="Créer un compte" onPress={ ()=> this.displayRegisterScreen() } type="TERTIARY"/>
                 </View>
            </ScrollView>
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
