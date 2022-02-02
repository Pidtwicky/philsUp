import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput } from 'react-native';
import Logo from '../../../assets/images/logo_philsup.png';
import CustomInPut from '../../components/CustomInPut';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import XHR from "../../../utils/XHR";
import * as Yup from 'yup';
import { Formik } from "formik";

function createUser(firstname, lastname, email, password) {
    const callToAPI = "inscription/" + lastname + "/" + firstname + "/" + email + "/" + password;
    let test = ['']
    XHR(callToAPI, (response) => {
        test.push(response.data)
    })
    console.log(test);
}


const SignUpScreen = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPress = () => {
        // renvoyer sur la page login/se connecter
        navigation.navigate('SignIn')
    };

    const onRegisterPressed = () => {
        // créer l'identité de l'utilisateur
        createUser(firstname, lastname, email, password);
        console.warn('onRegisterPressed');
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().text("")

    })

    return (

        <ScrollView showsVerticalScrollIndicator={false} >

            <View>

                <View style={styles.root} >

                    <Text style={styles.h1}>Créer un compte</Text>

                    <Image
                        source={Logo}
                        style={[styles.logo, { height: height * 0.17 }]}
                        resizeMode='contain' />

                </View>


                <Formik initialValue={{ email: "" }}
                    onSubmit={(value) => console.log(value)}
                >

                    {({ handleChange, handleSubmit }) => (





                        <View>

                            <Text style={styles.text}>Nom</Text>
                            <CustomInPut
                                placeholder='Ex: Smith'
                                value={lastname}
                                setValue={setLastname}


                            />


                            <Text style={styles.text}>Prénom</Text>
                            <CustomInPut
                                placeholder='Ex: John'
                                value={firstname}
                                setValue={setFirstname}
                            />

                            <Text style={styles.text} >Adresse email  {error.email}</Text>
                            <TextInput
                                placeholder='Ex: phils@up.com'
                                value={email}
                                setValue={setEmail}
                                onChangeText={handleChange("email")}
                                

                            />

                            <Text style={styles.text}>Mot de passe</Text>
                            <CustomInPut
                                placeholder='Tapez votre mot de passe...'
                                value={password}
                                setValue={setPassword}
                                secureTextEntry
                            />

                            <CustomButton

                                text="S'inscrire"
                                onPress={onRegisterPressed}
                                type="PRIMARY" />

                            <Text style={styles.terms}>
                                By registering, you confirm that you accept our{' '}
                                <Text style={styles.link} onPress={onTermsOfUsePressed}>
                                    Terms of Use
                                </Text>{' '}
                                and{' '}
                                <Text style={styles.link} onPress={onPrivacyPressed}>
                                    Privacy Policy
                                </Text>
                            </Text>

                            <CustomButton
                                text="Connecte toi"
                                onPress={onSignInPress}
                                type="TERTIARY"

                                onPress={handleSubmit}
                            />



                        </View>
                    )}
                </Formik>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
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

export default SignUpScreen