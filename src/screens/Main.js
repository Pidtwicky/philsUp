
import React from 'react';
import { View, Button, Text } from 'react-native';



export default class Main  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        dataSource: [],
        
    
        };
    }

    declenche(){
        this.props.navigation.navigate('HomeScreen')
    }

    render(){
        return(
            <View>
                <Text>Blabla</Text>
                <Text>Blabla</Text>
                <Text>Blabla</Text>
                <Text>Blabla</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.declenche() }
                />
            </View>
        );
    }
}