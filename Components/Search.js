import React from "react";
import { StyleSheet,Button, TextInput, View,FlatList, Text } from "react-native";
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends React.Component{
  render(){
    return (
      <View style={styles.main_container}>
         <TextInput style={styles.textinput} placeholder='Titre du film'/>
         <Button style={{height: 50}} title='Rechercher'  onPress={() => {}}/>
         <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
      </View>
  )
  }
}
const styles = StyleSheet.create({
  main_container:{
    marginTop: 44,
    flex:1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: 'blue',
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 5
  }
})
export default Search
