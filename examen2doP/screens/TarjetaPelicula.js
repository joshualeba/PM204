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


  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [pelicula, setPelicula] = useState('');


   const renderItem = ({ item }) => (

    <View style={styles.TarjetaPelicula}>
      <Text style={styles.peliculaTitle}>{item.titulo}</Text>
      <Text style={styles.peliculaGenero}>: {item.genero}</Text>
    </View>
  );