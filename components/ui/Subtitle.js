import { StyleSheet, Text } from "react-native"
import Colors from '../../constants/colors'

export default function Subtitle({ children, style }) {
    return <Text style={[styles.subtitle, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    subtitle: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24
    }
})