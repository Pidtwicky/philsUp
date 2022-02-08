import React from "react";
import { Text, FlatList, Image, View, StyleSheet, Platform, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import XHR from "../utils/XHR";




const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;
const callToAPI = "utilisateurs/12";

function support(ios, android) {

    return (Platform.OS === 'ios') ? ios : android;
    
}

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async getStoredUser(){  
        const value = await AsyncStorage.getItem('@storeUser'); 
        // console.log("Affiche le call API : "+ call);
        return value;
    }
    
    componentDidMount() {

        // let call = callToAPI + JSON.stringify(this.getStoredUser());
        let call = callToAPI + this.getStoredUser();
        console.log("Affiche le call API : "+ call);

        XHR( callToAPI, (response) => {
            this.setState({data: response.data})
        })
    }



    render() {

        return(
          
            <FlatList
               
                data={this.state.data}
                style={styles.container}
                keyExtractor={item => item.email}
                renderItem={( {item} ) =>

                    <ScrollView style={[styles.container, {height: winHeight * 0.9, width: winWidth}]}>
                        <LinearGradient
                            colors={["rgba(15,117,188, 1)", "rgba(232,90,143, 1)", "rgba(255,127,111, 1)"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            locations={[0, 0.7, 1]}
                            // useAngle={true} 
                            // angle={90} 
                            // angleCenter={{ x: 0.5, y: 0.5 }}
                            style={styles.banner} 
                            >
                            <View>
                                <Image
                                    style={styles.bannerImage}
                                    source={require('../assets/images/avatar.png')}
                                />
                            </View>
                        </LinearGradient>

                        {/* Force l'affichage du RenderHeader */}
                        <View style={[styles.profil, {height: winHeight * 0.9, width: winWidth}]}>
                            <Text style={styles.profilName}>
                                {item.name} {item.firstname}
                            </Text>
                            <Text style={styles.profilJob}>
                                {item.jobName} - {item.teamName} 
                            </Text>
                            <Text style={styles.titleContent}>
                                Description :
                            </Text> 
                            <Text style={[styles.profilContent, {width: winWidth}]}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in dolor elementum, pretium lectus ut, tincidunt ligula. Ut finibus risus sit amet tincidunt aliquam. Nunc varius porta eros, a accumsan augue viverra a. Sed cursus arcu vitae consequat consectetur. 
                            </Text>
                            <Text style={styles.titleContent}>
                                Adresse mail :
                            </Text>
                            <Text>
                                ramelclement@philsup.com
                            </Text>
                        </View>    

                    </ScrollView>
                }
            />  
               
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        backgroundColor:'#f8f8f8'
    },
    banner:{
        height: winHeight / 9,
        width: support("100%", "100%"),
        position:'absolute',
        zIndex: 100
    },
    profil:{
        flexWrap: "wrap",
        top: 100,
        paddingBottom: 15,
        marginHorizontal: 15,
        borderBottomWidth: 2
        // borderWidth: 2,
        // borderColor: "blue",
        
    },
    profilName:{
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 5
    },
    profilJob:{
        fontSize: 20,
        fontStyle: "italic",
    },
    content:{
        top: 10,
        marginHorizontal: 15,
        // borderWidth: 2,
        // borderColor: "red"
    },
    titleContent:{
        fontSize: 20,
        fontWeight: "600",
        paddingVertical: 15
    },
    profilContent:{
        fontSize: 17,
        textAlign: "justify",
    },
    bannerImage:{
        position:'relative',
        top:(Platform.OS === 'ios') ? 50 : 20,
        left:50,
        height:100,
        width:100,
        backgroundColor:'#f8f8f8',
        borderWidth:2,
        borderColor:'#f8f8f8',
        zIndex: 100,
        borderRadius: 50,

    },
    article: {
        top:200,
        padding: 20,
        margin: 20,
        fontSize: 18,
        marginBottom: 30,
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: '#fff',
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 20,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    author_date: {
        marginTop: 10,
        marginBottom: 20,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    details: {
        opacity: 0.5,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center'
    },
    chapo: {
        fontWeight: 'bold',
        textAlign: 'justify',
        fontSize: 18,
    },
    imgContainer: {
        height: 200,
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#A1A1A1',
        overflow: 'hidden',
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
        backgroundColor: '#fff'
    },
    img: {
        height: 200
    }
})