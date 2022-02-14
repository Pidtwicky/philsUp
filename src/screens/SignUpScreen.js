import React from "react";
import { ScrollView, View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Logo from '../../assets/images/logo_philsup.png';
import CustomInPut from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import XHR from "../utils/XHR";
import bcrypt from 'react-native-bcrypt';


const height = Dimensions.get('window').height;

export default class SignUpScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            inputFirstname: '',
            inputLastname: '',
            Error:false,
            inputEmail: '',
            inputPassword: '',
            allFieldsCompleted:false
        }
    }


    onSignInPress(){

        // renvoyer sur la page login/se connecter
        this.props.navigation.navigate('SignIn');
    }

    onRegisterPressed(){
        // créer l'identité de l'utilisateur
        if  ( this.state.inputLastname != "" && this.state.inputFirstname != "" && this.state.inputEmail != "" && this.state.inputPassword != ""){
            this.createUser ();
            console.log('tous les champs sont remplis')
        }
        
        else{
            //console.warn('tous les champs sont requis')
            this.setState( {Error: true} );
        }
    }

    createUser(){
        let firstname = this.state.inputFirstname;
        let lastname =  this.state.inputLastname;
        let email =     this.state.inputEmail;
        let password =  this.state.inputPassword; 

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);
        let hashedPasswordForURL = this.handleSlashOnHashedPassword(hashedPassword);

        const callToAPI = "inscription/" + lastname + "/" + firstname + "/" + email + "/" + hashedPasswordForURL;
        XHR( callToAPI, (response) => {
            if (response.data.length === 0){
                this.props.navigation.navigate('SignIn');
            }
            else
                console.warn('Cet email existe déjà') 
        })
    }

    handleInputValue( inputText, inputOrigin){

        if( inputOrigin === "firstname"){
            this.setState( {inputFirstname: inputText} );
        }
        else if( inputOrigin === "lastname"){
            this.setState( {inputLastname: inputText} );
        }
        else if( inputOrigin === "email"){
            this.setState( {inputEmail: inputText} );
        }
        else if( inputOrigin === "password"){
            this.setState( {inputPassword: inputText} );
        }
    }

    handleSlashOnHashedPassword(stringReplace) {

        console.log("MDP AVANT : " + stringReplace);

        while( stringReplace.search("\/") != -1){
            stringReplace = stringReplace.replace("\/", "~*-");
        }
        console.log("MDP APRES : " + stringReplace);

        return stringReplace;
    }

    onTermsOfUsePressed(){
        // console.warn('onTermsOfUsePressed');
    }

    onPrivacyPressed(){
        // console.warn('onPrivacyPressed');
    }

    render(){

        return (
            <ScrollView showsVerticalScrollIndicator={false} > 
                <View>
                    <View style={styles.root} >
                        <Text style={styles.h1}>Créer un compte</Text>
                        <Image
                            source={Logo}
                            style={[styles.logo, { height: height * 0.17 }]}
                            resizeMode='contain' 
                        />
                    </View>
                    
                    <View>
                        <Text style={styles.text}>Nom</Text>
                        <CustomInPut
                            afficheError={this.state.Error}
                            messageError="Merci d'entrer votre  nom"
                            placeholder='Ex: Smith'
                            inputValue={this.state.inputLastname}
                            setValue={ (inputText) => this.handleInputValue(inputText, "lastname") }
                        />


                        
                        <Text style={styles.text}>Prénom</Text>
                        <CustomInPut
                            afficheError={this.state.Error}
                            messageError="Merci d'entrer votre  prénom"
                            placeholder='Ex: John'
                            inputValue={this.state.inputFirstname}
                            setValue={ (inputText) => this.handleInputValue(inputText, "firstname") }
                        />
    
                        <Text style={styles.text}>Adresse email</Text>
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
                        
                       <CustomButton 
                            text="S'inscrire"
                            onPress={ () => this.onRegisterPressed() }
                            type="PRIMARY" 
                        />
    
                         <Text style={styles.terms}>
                            By registering, you confirm that you accept our{' '}
                            <Text style={styles.link} onPress={ this.onTermsOfUsePressed() }>
                                Terms of Use
                            </Text>{' '}
                            and{' '}
    
                            <Text style={styles.link} onPress={ this.onPrivacyPressed() }>
                                Privacy Policy
                            </Text>
                        </Text>
                        
                        <CustomButton
                            text="Connecte toi"
                            onPress={ () => this.onSignInPress() }
                            type="TERTIARY"
                        />
    
                    </View>
    
                </View>
    
            </ScrollView>
        );
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
    terms: {
        color: 'gray',
        marginLeft: 50,
        marginRight: 50,
        textAlign: "center",
    },
    link: {
        color: '#FFA65F',
    },
});