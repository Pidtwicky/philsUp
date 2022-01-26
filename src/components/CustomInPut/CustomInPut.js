import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput 
      value={value}
      onChangeText={setValue}
      placeholder={placeholder} 
      style={styles.input} 
      secureTextEntry={secureTextEntry}
       />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#303030',
        borderWidth: 1.5,
        borderRadius: 100,

        paddingHorizontal: 20,
        marginVertical: 20,
        padding: 5,

        alignSelf: 'center',

    },
    input: {},
})

export default CustomInput;