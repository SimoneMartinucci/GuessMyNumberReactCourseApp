import { StyleSheet, Text, View } from "react-native"
import Colors from '../../constants/colors'
export default function Title({ children }) {
    return (
        <View>
            <Text style={styles.titleStyle}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    }
})