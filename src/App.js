import React, {useState} from "react"
import { Alert } from "react-native"
import { View,Text, FlatList, TouchableOpacity,StyleSheet } from "react-native"
import İnputComponent from './components/İnput/İnputComponent'


function App () {
const [inputValue, setInputValue] = useState('')
const [componentList, setComponentList] = useState([])
const [counter,setCounter]= useState(0)

const handleButtonPress =()=>{
  const newComponent = {
    id: Date.now(),
    text: inputValue,
    üstünüÇiz: false,
  }
  setComponentList([...componentList,newComponent])
  setCounter(counter + 1)
  setInputValue('')
}
const handleComponentPress=(id)=>{
  const updatedList = componentList.map((item)=>{
    if (item.id === id) {
      return { ...item, üstünüÇiz: !item.üstünüÇiz }; //item döndür,üstünüçiz özelliğini neyse tersine çevir
    }
    return item;
  })
  setComponentList(updatedList)

  const ActiveComponents = updatedList.filter((item)=> item.üstünüÇiz===false)
  setCounter(ActiveComponents.length)
}

const handleComponentLongPress =(id)=>{
Alert.alert(
  "Delete Component",
  "Are you sure you want to delete this component?",
[
  { text: 'Cancel', style:"cancel"},
  { text:"Delete", style:'destructive', onPress : () => handleDeleteComponent(id) }
]
)
}

handleDeleteComponent = (id) => {
  const updatedList = componentList.filter((item)=> item.id !== id ) 
  
  setComponentList(updatedList)
  
  const ActiveComponents = updatedList.filter((item)=> item.üstünüÇiz===false)
  setCounter(ActiveComponents.length)
}

const handleList = ({item}) =>{
  return(
  <TouchableOpacity 
  onPress={()=>handleComponentPress(item.id)}
  onLongPress={()=>handleComponentLongPress(item.id)} >
<Text style={item.üstünüÇiz ? styles.üstünüÇizText : styles.normalText}>{item.text}</Text>
</TouchableOpacity>
)
}
 
  return(
    <View style={styles.container}> 
      <View style={styles.head}>
      <Text style={styles.başlık} >TO DO LIST</Text>
      <Text style={styles.counterText}>{counter}</Text>
      </View>
  <View style={styles.container_List}>
<FlatList
keyExtractor={(item)=>item.id.toString()}
data={componentList}
renderItem={handleList}
/>

<View style={styles.user_input}>
<İnputComponent Değer={inputValue} onSearch={setInputValue}/>
<TouchableOpacity style={styles.button} onPress={handleButtonPress} >
<Text style={styles.buttonText}>Add to List</Text>
</TouchableOpacity>
</View>
</View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  başlık:{
    fontSize:40,
    margin:10,
    fontWeight:'bold',
    color:'#e9967a',
    flex:8,
  },
  counterText: {
    fontSize: 40,
    margin:10,
    fontWeight:'bold',
    color:'#e9967a',
    flex:1,
    
  },
  head:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff8dc'
  },
  container_List: {
    flex: 8,
    padding: 16,
    backgroundColor:'#fff8dc'
    
  },
  normalText: {
    fontSize: 18,
    marginBottom: 10,
    backgroundColor:'#8fbc8f',
    color:'black',
    padding: 12,
    borderRadius:10,
  },
  üstünüÇizText: {
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    backgroundColor:'#8fbc8f',
    color:'black',
    padding: 12,
    borderRadius:10,
    backgroundColor:'#808080'
  },
  user_input:{
    backgroundColor:"#e9967a",
    padding:12,
    borderRadius:10,
  },
  button:{
    backgroundColor:"#8fbc8f",
    padding:12,
    borderRadius:10,
    alignItems:'center',
    
  },
  buttonText:{
    fontSize:16,
  }
});

export default App