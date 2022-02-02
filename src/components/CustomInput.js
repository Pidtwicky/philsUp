import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { render } from 'react-dom';


export default class CustomInput extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput 
          value={this.props.inputValue}
          onChangeText={ text => this.props.setValue(text) }
          placeholder={this.props.placeholder} 
          style={styles.input} 
          // secureTextEntry={secureTextEntry}
         />
      </View>
    );
  }

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#303030',
        borderWidth: 1.5,
        borderRadius: 100,

        paddingHorizontal: 20,
        marginVertical: 10,
        padding: 8,

        alignSelf: 'center',

    },
})
