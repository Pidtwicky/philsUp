import React from "react";
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import XHR from "../utils/XHR";
import HandleSpaceOnSearchBar from "../utils/Miscellaneous";
import Search from "./Search";

const callToAPI = "groupes";

export default class GroupList extends React.Component {

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
        console.log("je suis dans componentDidMount (Grouplist)");
    }

    updateResearch(searchName){
        this.setState({inputValue: searchName});
        console.log("Je fais des mofifications dans la barre de recherche : " + searchName );
        // console.log("Au meme moment, malgres mon setState sur inputValue, la variable n'est pas encore a jour : " + HandleSpaceOnSearchBar(searchName) );

        XHR( callToAPI + "/nom/" + HandleSpaceOnSearchBar(searchName), (response) => {
            this.setState({data: response.data})
        })

        console.log("je suis dans updateResearch (Grouplist)");

    }

    render() {

        const placeholder = "chercher un groupe"

        return(
            <View style={styles.container}>
                <Search
                    inputValue={this.state.inputValue} // parent vers enfant 
                    updateDatabase={(searchText) => this.updateResearch(searchText)} // enfant vers parent
                    placeholder={placeholder}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={( {item} ) =>
                        <View style={styles.article}>
                            <Text style={styles.title}>
                                {item.name}
                            </Text>

                            <Text style={styles.content}>
                                {item.description}
                            </Text> 
                        </View>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    article: {
        padding: 20,
        margin: 20,
        fontSize: 18,
        marginBottom: 30,
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
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
    },
    content: {
        textAlign: 'justify',
        marginTop: 20
    }
})