import React from "react";
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import XHR from "../utils/XHR";
import DateHumanizer from "../utils/DateHumanizer";

const callToAPI = "utilisateurs/2";

export default class TestChild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    onChangeText = (text) => {
        this.setState({
          myUpdatedText: text
        })
      }


    render() {

        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="white"
                    style={styles.input}
                    onChangeText={this.props.onChangeText}
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    }
})