import React from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, View, Image, Dimensions } from "react-native";
import GroupListScreen  from  '../GroupListScreen';
import ProfileScreen    from  '../ProfileScreen';
import FeedScreen       from  "../FeedScreen";
import Search from "../../components/Search";


import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';



const MyDrawer = createDrawerNavigator(),
      winHeight = Dimensions.get("window").height;

const callToAPI = 'groupes';     

export default class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputValue: '',
            triggerUpdate: false
        }
    }

    updateResearch(searchName) {
        this.setState( {inputValue: searchName, triggerUpdate: true} );  
    }

    updateIsDone() {
        if( this.state.triggerUpdate ){
            this.setState( {triggerUpdate: false} );
        }
    }
    onSignOutPress() {

        // vider la variable de session
        AsyncStorage.clear()
        // renvoyer sur la page Home/page d'acceuil
        this.props.navigation.navigate('HomeScreen');

    }


    render() {

        return (
            <>
                <MyDrawer.Navigator
                    drawerContent={(props) => {
                        return(
                            <SafeAreaView>
                                <View
                                    style={{
                                        height: winHeight/3,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: 'hidden',
                                        marginTop: winHeight/15,
                                        marginBottom: winHeight/20
                                    }}
                                >
                                    <Image
                                        source={require("../../../assets/images/icon.png")}
                                        style={{
                                            height: '100%',
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </View>
                                <DrawerItemList {...props} />
                                <Icon
                                        raised
                                        name='logout'
                                        color='black'
                                        onPress={() => this.onSignOutPress()} />

                            </SafeAreaView>
                        )
                    }}
                >
                    <MyDrawer.Screen
                        name="Fil d\'actualités"
                        children={() => <FeedScreen 
                                            inputValue={this.state.inputValue} 
                                            triggerUpdate={this.state.triggerUpdate}
                                            updateIsDone={this.updateIsDone()}
                                        />
                        }
                        options={() => ({
                            title: 'Fil d\'actualités',
                            headerRight: () => (
                                <Search
                                    inputValue={this.state.inputValue} // parent vers enfant 
                                    updateDatabase={(searchText) => this.updateResearch(searchText)} // enfant vers parent
                                    placeholder={"Chercher un groupe"}
                                />
                            ),
                            headerTitleAlign: "left",
                        })}
                    />

                    <MyDrawer.Screen
                        name="Groupes"
                        children={() => <GroupListScreen 
                                            inputValue={this.state.inputValue} 
                                            triggerUpdate={this.state.triggerUpdate}
                                            updateIsDone={this.updateIsDone()}
                                        />
                        }
                        options={() => ({
                            title: 'Groupes',
                            headerRight: () => (
                                <Search
                                    inputValue={this.state.inputValue} // parent vers enfant 
                                    updateDatabase={(searchText) => this.updateResearch(searchText)} // enfant vers parent
                                    placeholder={"Chercher un groupe"}
                                />
                            ),
                        })}
                    />
                    
                    <MyDrawer.Screen
                        name="Profil"
                        children={() => <ProfileScreen />}
                        
                    />
                    
                </MyDrawer.Navigator>
            </>
        )
    }
}