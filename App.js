import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);

  function startGameHandler(userNumber) {
    setUserNumber(userNumber);
    setIsGameOver(false);
  }
  function gameOverHandler() {
    setIsGameOver(true);
  }

  let screen = <StartGameScreen onConfirmNumber={startGameHandler} />;

  if (userNumber) {
    screen = <GameScreen choosenNum={userNumber} onGameOver={gameOverHandler} />
  }

  if (isGameOver && userNumber) {
    screen = <GameOverScreen />
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
