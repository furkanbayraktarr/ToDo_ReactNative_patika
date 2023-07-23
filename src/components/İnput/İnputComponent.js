import { TextInput, View } from "react-native"
import styles from './input_style'

function İnputComponent (props) {
return(
    <View >
<TextInput
    placeholder="To do..."
    style={styles.input}
    value={props.Değer}
    onChangeText={props.onSearch}

/>
</View>
)
}
export default İnputComponent