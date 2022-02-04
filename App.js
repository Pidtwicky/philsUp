import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './components/Navigation/Drawer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


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

    async componentDidMount() {
        this._loadFontsAsync();
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
                <Drawer />
                <StatusBar style="auto"/>
            </NavigationContainer>
        );
    }
}