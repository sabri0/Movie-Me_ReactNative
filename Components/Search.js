import React from "react";
import { StyleSheet,Button, TextInput, View,FlatList, Text } from "react-native";
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
class Search extends React.Component{
constructor(props){
  super(props)
  this.state={films:[],
    isLoading:false
}
this.searchedText = ""
}

  _loadFilms(){
    this.setState({ isLoading:true })
   if (this.searchedText.length>0) {
    getFilmsFromApiWithSearchedText(this.searchedText).then(data => 
      this.setState({films: data.results,
      isLoading:false
      })
    
    )
   }
  }
  _searchTextChanged(text){
    this.searchedText=text
  }
  render(){
    console.log('render')
    return (
      <View style={styles.main_container}>
         <TextInput onSubmitEditing={()=>this._loadFilms()} onChangeText={(text)=>this._searchTextChanged(text)} style={styles.textinput} placeholder='Titre du film'/>
         <Button style={{height: 50}} title='Rechercher'  onPress={() => this._loadFilms()}/>
         <FlatList
          data={this.state.films}
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
