import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from './components/Navigation/Drawer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import FeedScreen from './src/screens/FeedScreen';

const Stack = createNativeStackNavigator();
// const storage = new MMKVStorage.Loader().initialize();

export default class App extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            data: [],
            fontLoaded: false
        }
        this.fonts = {
            'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
            'HoneyFloristPersonalUse': require('./assets/fonts/HoneyFloristPersonalUse.otf'),
        }
    }

    // async storeData(value){ 
    //     await AsyncStorage.setItem('storeUser', value);
    // }

    // async getData(){  
    //     const value = await AsyncStorage.getItem('storeUser'); 
    //     if(value !== null) {      
    //         console.log("OMG je store des valeurs !!!")    
    //     } 
    // }

    async componentDidMount() {
        this._loadFontsAsync();

        callToAPI = "testImage/truc";
        XHR( callToAPI, (response) => {
            this.setState({data: response.data,allFieldsCompleted:false, isDataFound:true})     
            
        }) 
    }

    async _loadFontsAsync() {
        await Font.loadAsync(this.fonts);
        this.setState({ fontsLoaded: true });
    }

    render() {
        
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          }

        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>

                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="Drawer" component={Drawer} />

                </Stack.Navigator>
                <StatusBar style="auto"/>
            </NavigationContainer>
        );
    }
}
