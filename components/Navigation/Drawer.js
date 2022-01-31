import React from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, View, Image, Dimensions } from "react-native";
import GroupList from '../../views/GroupList';
import Profile from '../../views/Profile';
import Search from "../../views/Search";



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
                                        source={require('../../assets/images/icon.png')}
                                        style={{
                                            height: '100%',
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </View>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                        )
                    }}
                >

                    <MyDrawer.Screen
                        name="Groupes"
                        children={() => <GroupList 
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
                        children={() => <Profile />}
                        
                    />
                    
                </MyDrawer.Navigator>
            </>
        )
    }
}