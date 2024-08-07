import { View, StyleSheet, Text, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import Subtitle from "../components/ui/Subtitle";
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from "../components/ui/GuessLogItem";


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
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === choosenNum) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, choosenNum, onGameOver])

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

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
        setGuessRounds(currentGuessRounds => [...currentGuessRounds, newRndNum])
    }

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Oppenent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Subtitle style={styles.subtitleText}>Higher o Lower?</Subtitle>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
                    key={(item) => item}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginVertical: 16
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    subtitleText: {
        marginBottom: 12
    }
})