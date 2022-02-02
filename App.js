import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import Main from './src/screens/Main';
// import Detail from './Detail';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import FeedScreen from './src/screens/FeedScreen';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {

  render (){
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
{/* 
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Detail" component={Detail} /> */}

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Feed" component={FeedScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
}
}
