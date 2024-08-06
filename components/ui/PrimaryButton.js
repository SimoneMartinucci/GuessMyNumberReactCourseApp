import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from '../../constants/colors'

export default function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.buttonOutContainer}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} android_ripple={{ color: Colors.primary600 }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOutContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    //iOS ripple quick workaround 
    pressed: {
        opacity: 0.75,
    }
});