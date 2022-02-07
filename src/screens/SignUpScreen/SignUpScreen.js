import React from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo_philsup.png';
// import CustomInPut from '../../components/CustomInPut';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import XHR from "../../../utils/XHR";


// ------------------------------------
import AppText from "../../components/AppText";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native";




const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    prenom: Yup.string().required().label("Prenom"),
    nom: Yup.string().required().label("Nom")
});






function createUser(firstname, lastname, email, password) {
    const callToAPI = "inscription/" + lastname + "/" + firstname + "/" + email + "/" + password;
    let test = ['']
    XHR(callToAPI, (response) => {
        test.push(response.data)
    })
    console.log(test);
}


const SignUpScreen = () => {



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

    return (

        <ScrollView showsVerticalScrollIndicator={false} >

            <>
                {/* ==========================[logo ]========================== */}
                <View style={styles.root} >

                    <Text style={styles.h1}>Créer un compte</Text>

                    <Image
                        source={Logo}
                        style={[styles.logo, { height: height * 0.17 }]}
                        resizeMode='contain' />

                </View>




                <Formik
                    initialValues={{ email: "", password: "", prenom: "", nom: "" }}
                    onSubmit={(value) => console.log(value)}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            {/* =============================[ NOM ]======================= */}
                            <Text style={styles.text}>Nom</Text>

                            <TextInput
                                style={styles.container}
                                placeholder="Nom"
                                autoCapitalize="none"
                                autoCorrect={false}
                                // keybordType=""
                                textContentType="" // uniquement IOS
                                onChangeText={handleChange("nom")}
                            />
                            <AppText>{errors.nom}</AppText>

                            {/* =================================[ prenom ]==================== */}
                            <Text style={styles.text}>Prénom</Text>

                            <TextInput
                                style={styles.container}
                                placeholder="Prénom"
                                autoCapitalize="none"
                                autoCorrect={false}
                                // keybordType=""
                                textContentType="" // uniquement IOS
                                onChangeText={handleChange("prenom")}
                            />
                            <AppText>{errors.prenom}</AppText>
                            {/* ================[Email]================ */}
                            <Text style={styles.text}>Adresse email</Text>
                            <TextInput
                                style={styles.container}
                                placeholder="Ex: phils@up.com"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keybordType="email-adress"
                                textContentType="emailAddress" // uniquement IOS
                                onChangeText={handleChange("email")}
                            />


                            <AppText>{errors.email}</AppText>

                            {/* ================[password]============== */}

                            <Text style={styles.text}>Mot de passe</Text>
                            <TextInput
                                style={styles.container}
                                placeholder="Tapez votre mot de passe..."
                                autoCapitalize="none"
                                autoCorrect={false}
                                keybordType="password"
                                textContentType="password" // pour IOS
                                onChangeText={handleChange("password")}
                                secureTextEntry
                            />
                            <AppText>{errors.password}</AppText>


                            {/* ===========================[se connecter ]===================== */}
                            <CustomButton

                                text="S'inscrire"
                                onPress={handleSubmit}
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
                            />







                        </>

                    )}
                </Formik>
            </>
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
    container: {
        backgroundColor: "white",
        width: "80%",

        borderColor: "#303030",
        borderWidth: 1.5,
        borderRadius: 100,

        paddingHorizontal: 20,
        marginVertical: 10,
        padding: 8,

        alignSelf: "center",
    },
});

export default SignUpScreen