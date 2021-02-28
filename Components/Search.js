import React from "react";
import { StyleSheet,Button, TextInput, View } from "react-native";

class Search extends React.Component{
  render(){
    return (
      <View style={{ marginTop: 44 }}>
         <TextInput style={[styles.textinput, { marginBottom: 10 }]} placeholder='Titre du film'/>
         <Button style={{height: 50}} title='Rechercher'  onPress={() => {}}/>
      </View>
  )
  }
}
const styles = StyleSheet.create({
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 5,
    paddingLeft: 5
  }
})
export default Search
