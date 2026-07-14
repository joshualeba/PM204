import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableSwitchScreen from './PressableSwitchScreen';
import TextInputAlertScreen from './TextInputAlertScreen';
import FlatListSectionListScreen from './FlatListSectionListScreen';
import ImageBackgroundSplashScreen from './ImageBackgroundSplashScreen';
import ActivityIndicatorKeyboardScreen from './ActivityIndicatorKeyboardScreen';
import ModalBottomSheetScreen from './ModalBottomSheetScreen';

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'tarjetas':
      return <TarjetasScreen />;
    case 'safearea':
      return <SafeAreaScreen />;
    case 'pressable':
      return <PressableSwitchScreen />;
    case 'textinput':
      return <TextInputAlertScreen />;
    case 'flatlist':
      return <FlatListSectionListScreen />;
    case 'imagebackground':
      return <ImageBackgroundSplashScreen />;
    case 'activityindicator':
      return <ActivityIndicatorKeyboardScreen />;
    case 'modal':
      return <ModalBottomSheetScreen />;
    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Práctica Tarjetas" onPress={() => setScreen('tarjetas')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="SafeAreaView, ScrollView" onPress={() => setScreen('safearea')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Pressable & switch" onPress={() => setScreen('pressable')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="TextInput & Alert" onPress={() => setScreen('textinput')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="FlatList y Section List" onPress={() => setScreen('flatlist')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="ImageBackground & SplashScreen" onPress={() => setScreen('imagebackground')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="ActivityIndicator, KeyboardAvoidingView" onPress={() => setScreen('activityindicator')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Modal & Bottom sheet" onPress={() => setScreen('modal')} />
            </View>
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  buttonWrapper: {
    marginVertical: 10,
    width: '80%',
  }
});