import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Image
} from 'react-native';

const BACKGROUND_IMAGE = require('./assets/background.png');

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [pelicula, setPelicula] = useState('');
  
  const [peliculas, setPeliculas] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAgregarResena = () => {
    // Validar que todos los campos estén llenos
    if (!titulo.trim() || !pelicula.trim() || !genero.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setIsSaving(true);
    
    // Simular espera antes de guardar, 4 segundos con ActivityIndicator
    setTimeout(() => {
      const nuevaResena = {
        id: Date.now().toString(),
        titulo,
        pelicula,
        genero,
      };

      setPeliculas((currentPeliculas) => [...currentPeliculas, nuevaResena]);
      
      // Limpiar los TextInput
      setTitulo('');
      setGenero('');
      setPelicula('');
      
      setIsSaving(false);
      
      // Notificar con un Alert
      Alert.alert('Éxito', 'Película guardada correctamente.');
    }, 4000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.peliculaCard}>
      <Text style={styles.peliculaTitle}>Título: {item.titulo}</Text>
      <Text style={styles.peliculaDetail}>Género: {item.genero}</Text>
      <Text style={styles.peliculaGenero}>Película: {item.pelicula}</Text>
    </View>
  );

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/splash_icon.png')} style={styles.splashIconImage} />
        <Text style={styles.splashText}>Examen segundo parcial</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Catálogo de películas</Text>

          <TextInput
            style={styles.input}
            placeholder="Título de la película"
            placeholderTextColor="#888"
            value={titulo}
            onChangeText={setTitulo}
            editable={!isSaving}
          />
          <TextInput
            style={styles.input}
            placeholder="Película"
            placeholderTextColor="#888"
            value={pelicula}
            onChangeText={setPelicula}
            editable={!isSaving}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#888"
            value={genero}
            onChangeText={setGenero}
            editable={!isSaving}
          />

          <Pressable 
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              isSaving && styles.buttonDisabled
            ]}
            onPress={handleAgregarPelicula}
            disabled={isSaving}
          >
            <Text style={styles.buttonText}>Agregar película</Text>
          </Pressable>

          <Text style={styles.totalText}>Total de películas: {peliculas.length}</Text>

          <FlatList
            data={peliculas}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            style={{flex: 1}}
          />

          {isSaving && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loadingText}>Guardando película...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashIconImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  splashText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  // Main screen styles
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 40,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1d5e9e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonPressed: {
    backgroundColor: '#144677',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookDetail: {
    fontSize: 14,
    color: '#333',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  }
});