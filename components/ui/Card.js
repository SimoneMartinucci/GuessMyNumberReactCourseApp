import { StyleSheet, View } from "react-native"
import Colors from "../../constants/colors"

export default function Card({ children }) {
    return <View style={styles.inputContainer}>{children}</View>
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        //Shadow 
        elevation: 4, //Android
        shadowColor: 'black', //iOS
        shadowOffset: { width: 0, height: 2, }, //iOS
        shadowRadius: 6, //iOS,
        shadowOpacity: 0.25 //iOS
    },
})