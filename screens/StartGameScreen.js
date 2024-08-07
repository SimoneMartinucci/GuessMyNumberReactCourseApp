import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from '../constants/colors'
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import Subtitle from "../components/ui/Subtitle";

export default function StartGameScreen({ onConfirmNumber }) {

    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(numberText) {
        setEnteredNumber(numberText)
    }

    function resetHandler() {
        setEnteredNumber('')
    }

    function confirmHandler() {
        const number = parseInt(enteredNumber);
        if (isNaN(number) || number <= 0 || number > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetHandler }])
            return;
        }

        onConfirmNumber(number);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card>
                <Subtitle style={styles.subtitle}>Enter a Number</Subtitle>
                <TextInput
                    style={styles.textInput}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <PrimaryButton>Reset</PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    textInput: {
        width: 50,
        height: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginVertical: 16
    },
    button: {
        flex: 1,
    },
})