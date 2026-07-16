import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TarjetaPelicula from './components/TarjetaPelicula';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <TarjetaPelicula 
            titulo="Shrek 1" 
            genero="Comedia" 
            pelicula="El Origen" 
          />
          <TarjetaPelicula 
            titulo="Shrek 2" 
            genero="Comedia" 
            pelicula="Shrek 2" 
          />
          <TarjetaPelicula 
            titulo="Spider-Man" 
            genero="Acción" 
            pelicula="Spider-Man 2" 
          />
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    padding: 20,
    paddingTop: 50,
  }
});