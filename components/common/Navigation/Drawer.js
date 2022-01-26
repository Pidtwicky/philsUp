import React from "react";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, View, Image, Dimensions } from "react-native";
import GroupList from '../../../views/GroupList';

const MyDrawer = createDrawerNavigator(),
    winHeight = Dimensions.get("window").height;

export default class Drawer extends React.Component {

    render() {

        return (
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
                                    source={require('../../../assets/images/icon.png')}
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
                />
            </MyDrawer.Navigator>
        )
    }
}