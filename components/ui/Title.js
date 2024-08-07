import { StyleSheet, Text, View } from "react-native"
export default function Title({ children }) {
    return (
        <View>
            <Text style={styles.titleStyle}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    }
})