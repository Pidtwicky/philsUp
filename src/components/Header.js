import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Image
            style={styles.logo}
            source={require('../../assets/images/logo_philsup.png')}
            />
        </TouchableOpacity>  

        <View style={styles.iconsContainer}>
            <TouchableOpacity>
                <Image
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Boc7Phob8WIlcGTOGfQoHuKlFEbn9etJmVLQWJqYxFE6S5hPqMIoXfEXFEYH12TagJY&usqp=CAU'
                }}
                style={styles.icon}
                />
            </TouchableOpacity>  

            <TouchableOpacity>
                <Image
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEXvXP_V74dFL3-kVpDjJkxKjM3xa_1CR5cg&usqp=CAU'
                }}
                style={styles.icon}
                />
            </TouchableOpacity>  

            
            <TouchableOpacity>
            <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>11</Text>
                </View>
                <Image
                source={{
                    uri: 'data:image/png;base64,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'
                }}
                style={styles.icon}
                />
            </TouchableOpacity>  

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection:'row',
        marginHorizontal:20,
},
    iconsContainer:{
        flexDirection:'row',
    },

    logo: {
        width: 100,
        height: 50,
        resizeMode:'contain',
    },

    icon: {
        width:30,
        height:30,
        marginLeft:10,
        resizeMode:'contain'
    },

    unreadBadge:{
        backgroundColor:'#FF3250',
        position:'absolute',
        left:20,
        bottom:18,
        width:25,
        height:18,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        zIndex:100,

    },

    unreadBadgeText:{
        color:'white',
        fontWeight:'600',

    }
})

export default Header;