import { View, StyleSheet, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";


function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ choosenNum, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, choosenNum);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === choosenNum) {
            onGameOver();
        }
    }, [currentGuess, choosenNum, onGameOver])

    function nextGuessHandler(direction) {

        if ((direction === 'lower' && currentGuess < choosenNum)
            || (direction === 'greater' && currentGuess > choosenNum)) {

            Alert.alert("Don't Lie!", "You know that this is wrong...", [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess + 1;
        }

        const newRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNum);
    }

    return (
        <View style={styles.screen}>
            <Title>Oppenent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher o Lower?</Text>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}> - </PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}> + </PrimaryButton>
                </View>
            </View>
            <View>
                <View></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12
    },
})