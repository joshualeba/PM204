import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Pressable, Alert, ActivityIndicator, StyleSheet } from 'react-native';

const TarjetaPelicula = ({ titulo, genero, pelicula }) => {
  const [resena, setResena] = useState('');
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [resenaGuardada, setResenaGuardada] = useState('');

  const guardarResena = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setResenaGuardada(resena);
      Alert.alert('Guardado', 'La reseña fue guardada.');
    }, 1000);
  };

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.texto}>Género: {genero}</Text>
      <Text style={styles.texto}>Película: {pelicula}</Text>
      
      <View style={styles.fila}>
        <Text style={styles.texto}>Favorito:</Text>
        <Switch value={esFavorito} onValueChange={setEsFavorito} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Escribe una reseña"
        value={resena}
        onChangeText={setResena}
      />

      <Pressable style={styles.boton} onPress={guardarResena}>
        {cargando ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.textoBoton}>Guardar</Text>
        )}
      </Pressable>

      {resenaGuardada !== '' && (
        <Text style={styles.resenaTexto}>{resenaGuardada}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resenaTexto: {
    marginTop: 15,
    fontSize: 16,
    color: '#333333',
    padding: 10,
    backgroundColor: '#eef',
    borderRadius: 5,
  },
});

export default TarjetaPelicula;
