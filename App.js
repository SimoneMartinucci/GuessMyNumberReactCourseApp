import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';

import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  function startGameHandler(userNumber) {
    setUserNumber(userNumber);
    setIsGameOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onConfirmNumber={startGameHandler} />;

  if (userNumber) {
    screen = <GameScreen choosenNum={userNumber} onGameOver={gameOverHandler} />
  }

  if (isGameOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }


  return <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootContainer}>
    <ImageBackground
      source={require('./assets/images/background.png')}
      resizeMode="cover"
      style={styles.imageContainer}
      imageStyle={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeAreaContainer}>{screen}</SafeAreaView>
    </ImageBackground>
  </LinearGradient>;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  imageContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
