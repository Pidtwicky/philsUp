import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({onPress, text, type}) => {
  return (

    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
    
  );
};

const styles = StyleSheet.create({
    container:{
        width: '60%',
        borderRadius: 100,

        padding: 12,
        marginVertical: 20,

        alignItems: 'center',
        alignSelf: 'center',
    },

    container_PRIMARY: {
      backgroundColor: '#0F75BC',
      marginVertical: 20,

    },
    container_TERTIARY:{
      backgroundColor: '#FF7F6F',
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
});

export default CustomButton;