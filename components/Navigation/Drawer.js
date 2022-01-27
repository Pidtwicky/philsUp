import React from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, View, Image, Dimensions } from "react-native";
import GroupList from '../../views/GroupList';
import Profile from '../../views/Profile';
import Search from "../../views/Search";
import XHR from "../../utils/XHR";
import HandleSpaceOnSearchBar from "../../utils/Miscellaneous";


const MyDrawer = createDrawerNavigator(),
      winHeight = Dimensions.get("window").height;

const callToAPI = 'groupes';     

export default class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputValue: '',
        }
    }

    componentDidMount() {

        XHR( callToAPI, (response) => {
            this.setState({data: response.data})
        })
        console.log("je suis dans componentDidMount (Drawer)");
    }

    updateResearch(searchName){
        this.setState({inputValue: searchName});
        console.log("Je fais des mofifications dans la barre de recherche : " + searchName );
        // console.log("Au meme moment, malgres mon setState sur inputValue, la variable n'est pas encore a jour : " + HandleSpaceOnSearchBar(searchName) );

        XHR( callToAPI + "/nom/" + HandleSpaceOnSearchBar(searchName), (response) => {
            this.setState({data: response.data})
        })

        console.log("je suis dans updateResearch (Drawer)");

    }



    render() {

        const placeholder = "Rechercher..."

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
                        name="GroupList"
                        children={() => <GroupList />}
                        options={() => ({
                            title: 'Groupes',
                            headerRight: () => (
                                <Search
                                inputValue={this.state.inputValue} // parent vers enfant 
                                updateDatabase={(searchText) => this.updateResearch(searchText)} // enfant vers parent
                                placeholder={placeholder}
                            />
                            ),
                        })}
                        
                    />
                    
                    <MyDrawer.Screen
                        name="Profile"
                        children={() => <Profile />}
                        
                    />
                </MyDrawer.Navigator>
            </>
        )
    }
}