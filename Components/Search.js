import React from "react";
import { StyleSheet,Button, TextInput, View,FlatList, Text,ActivityIndicator } from "react-native";
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
class Search extends React.Component{
constructor(props){
  super(props)
  this.page=0
  this.totalPages=0 
  this.state={films:[],
    isLoading:false
}
this.searchedText = ""
}

  _loadFilms(){
    this.setState({ isLoading:true })
   if (this.searchedText.length>0) {
    getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
      this.page = data.page
      this.totalPages = data.total_pages
      this.setState({
      films: [...this.state.films, ...data.results],
      isLoading:false
      })
    }
    )
   }
  }
  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => { 
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms() 
    })
}
  _searchTextChanged(text){
    this.searchedText=text
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }
  render(){
   
    return (
      <View style={styles.main_container}>
         <TextInput onSubmitEditing={()=>this._loadFilms()} onChangeText={(text)=>this._searchTextChanged(text)} style={styles.textinput} placeholder='Titre du film'/>
         <Button style={{height: 50}} title='Rechercher'  onPress={() => this._searchFilms()}/>
         <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
               this._loadFilms()
            }
        }}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
         {this._displayLoading()}
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
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Search
