import React from "react";
import { Text, FlatList, ScrollView, Image, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import XHR from "../utils/XHR";




const callToAPI = "utilisateurs/12";
const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {

        XHR( callToAPI, (response) => {
            this.setState({data: response.data})
        })
    }

    renderHeader = () => {
        return(
            <>    
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

                </LinearGradient>

                {/* Force l'affichage du RenderHeader */}
                <View>
                    <Image
                        style={styles.bannerImage}
                        source={require('../assets/images/avatar.png')}
                    />
                </View>
            </>
        );
      };

    render() {

        return(
            <>
                    
                <FlatList
                    ListHeaderComponent={this.renderHeader()}
                    data={this.state.data}
                    style={styles.container}
                    keyExtractor={item => item.email}
                    renderItem={( {item} ) =>
                    <>

                        {/* <LinearGradient
                            colors={["rgba(15,117,188, 1)", "rgba(232,90,143, 1)", "rgba(255,127,111, 1)"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            locations={[0, 0.7, 1]} 
                            // useAngle={true} 
                            // angle={90} 
                            // angleCenter={{ x: 0.5, y: 0.5 }}
                            style={styles.banner} >

                            <Image 
                                style={styles.bannerImage}
                                source={require('../assets/images/avatar.png')}
                            />
                        </LinearGradient> */}
                        <View style={styles.profil}>
                            <Text style={styles.profilName}>
                                {item.name} {item.firstname}
                            </Text>
                            <Text style={styles.profilJob}>
                                {item.jobName} - {item.teamName} 
                            </Text>
                        </View>
                        <View style={styles.content}>    
                            <Text style={styles.titleContent}>
                                Description :
                            </Text> 
                            <Text style={styles.profilContent}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in dolor elementum, pretium lectus ut, tincidunt ligula. Ut finibus risus sit amet tincidunt aliquam. Nunc varius porta eros, a accumsan augue viverra a. Sed cursus arcu vitae consequat consectetur. 
                            </Text>
                            <Text style={styles.titleContent}>
                                Adresse mail :
                            </Text>
                            <Text>
                                ramelclement@philsup.com
                            </Text>
                        </View>
                        <View style={styles.po}>
                            
                        </View>
                        {/* <View style={styles.article}>
                            
                            <Text style={styles.title}>
                                
                                {item.name} {item.firstname}
                            </Text>

                            <Text style={styles.title}>
                                née le {DateHumanizer(item.birthday)}
                            </Text> 

                            <Text style={styles.title}>
                                Equipe : {item.teamName} 
                            </Text>

                            <Text style={styles.title}>
                                Métier : {item.jobName} 
                            </Text>

                            
                        </View> */}
                    </>
                    }
                />
            </>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: winWidth,
        backgroundColor:'#f8f8f8'
    },
    banner:{
        marginTop: 40,
        height: winHeight / 7.5,
        width: winWidth,
        position:'absolute',
    },
    profil:{
        flexWrap: "wrap",
        top: winHeight / 7,
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
        top: 150,
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
        textAlign: "justify"
    },
    bannerImage:{
        position:'relative',
        top:90,
        left:40,
        height:100,
        width:100,
        backgroundColor:'#f8f8f8',
        borderWidth:2,
        borderColor:'#f8f8f8',
        
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