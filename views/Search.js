import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


export default class Search extends React.Component {


    constructor(props) {
        super(props);                                                 //Récupère les props fournies lors de l'utilisation de la balise <Search props1={} props2={} .../> du parent
        this.state = {                                                //Variables d'état, qui peuvent être actualisées au fil du temps, en fonction des interractions via setState()
            data: []
        }
    }

    render() {
      const inputValue = this.props.inputValue;
                            //Assigne la props "inputValue" fournie lors de l'utilisation de la balise <Search inputValue={}  .../> du parent
      
        return (
          <TextInput
            style={styles.input}
            placeholder={this.props.placeholder}     //exercice a faire pour comprendre le fonctionnement des props
            clearButtonMode='always'
            autoCapitalize="none"
            value={inputValue}                                          //value={this.state.myText}
            onChangeText={ text => this.props.updateDatabase(text) }    //onChangeText={(text) => this.setText(text)}   
          />
      




        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    input: {
        backgroundColor: '#fff',
        marginRight: 20,
        width: '50%',

        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,

        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e1e1e1',

        shadowColor: 'black',
        shadowOffset: {x:10, y:10},
        shadowOpacity: 1,
        elevation: 3
    }
})
/*
const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // la saisie n'est pas vide
    
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };*/