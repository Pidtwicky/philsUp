import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Logo from '../../assets/images/logo_philsup.png';
import CustomInPut from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import XHR from "../../utils/XHR";


const height = Dimensions.get('window').height;

export default class SignUpScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            inputFirstname: '',
            inputLastname: '',
            inputEmail: '',
            inputPassword: ''
        }
    }

    onSignInPress(){
        // renvoyer sur la page login/se connecter
        this.props.navigation.navigate('SignIn');
    }

    onRegisterPressed(){
        // créer l'identité de l'utilisateur
        this.createUser ();
        console.warn('onRegisterPressed');
    }

    createUser(){
        let firstname = this.props.inputFirstname;
        let lastname =  this.state.inputLastname;
        let email =     this.state.inputEmail;
        let password =  this.state.password; 

        const callToAPI = "inscription/" + lastname + "/" + firstname + "/" + email + "/" + password;
        let test = ['']
        XHR( callToAPI, (response) => {
            this.setState( {data: response.data});
        })
        console.log(test);
    }

    handleInputValue( inputText, inputOrigin){

        if( inputOrigin === "firstname"){
            this.setState( {inputEmail: inputText} );
        }
        else if( inputOrigin === "lastname"){
            this.setState( {inputPassword: inputText} );
        }
        else if( inputOrigin === "email"){
            this.setState( {inputPassword: inputText} );
        }
        else if( inputOrigin === "password"){
            this.setState( {inputPassword: inputText} );
        }
    }

    onTermsOfUsePressed(){
        console.warn('onTermsOfUsePressed');
    }

    onPrivacyPressed(){
        console.warn('onPrivacyPressed');
    }

    render(){
        console.log("Affichage SignUP: " + JSON.stringify(this.props) );

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
                            placeholder='Ex: Smith'
                            inputValue={this.props.inputLastname}
                            setValue={ (inputText) => this.handleInputValue(inputText, "lastname") }
                        />


                        
                        <Text style={styles.text}>Prénom</Text>
                        <CustomInPut
                            placeholder='Ex: John'
                            inputValue={this.props.inputFirstname}
                            setValue={ (inputText) => this.handleInputValue(inputText, "firstname") }
                        />
    
                        <Text style={styles.text}>Adresse email</Text>
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