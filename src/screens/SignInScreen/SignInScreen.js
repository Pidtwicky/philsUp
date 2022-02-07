import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { TextInput } from "react-native";
import Logo from "../../../assets/images/logo_philsup.png";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
// ------------------------------
import { Formik } from "formik";
import * as Yup from "yup";
import AppText from "../../components/AppText";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function SignInScreen(props) {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    // envoyer sur la page de creation de compte
    navigation.navigate("SignUp");
    
  };

  return (
    // ============================[logo]====================
    <>
      {/* <View> */}
      <View style={styles.root}>
        <Text style={styles.h1}>Login</Text>

        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.17 }]}
          resizeMode="contain"
        />
      </View>

      {/* ====================[ formulaire sign in ]============================= */}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => console.log(value)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
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
              text="Se connecter"
              onPress={handleSubmit}
              type="PRIMARY"
            />

            <CustomButton
              text="Créer un compte"
              onPress={onRegisterPressed}
              type="TERTIARY"
            />
          </>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  h1: {
    color: "#FF7F6F",
    fontSize: 30,
  },
  logo: {
    width: "20%",
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "left",
    marginLeft: 40,
    marginRight: 50,
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

export default SignInScreen;
