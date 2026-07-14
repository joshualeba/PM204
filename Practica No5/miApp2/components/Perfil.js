import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";

export const Perfil = ({nombre, carrera, materia, cuatri, style}) => {
  const [mostrar, setMostrar] = useState(false);
    
  return (
    <View style={[styles.tarjeta, style]}>
      <Text style={styles.nombre}>Nombre: {nombre}</Text>
      {mostrar &&
        <>
          <Text style={styles.carrera}>Carrera: {carrera}</Text>
          <Text style={styles.otroTexto}>Materia: {materia}</Text>
          <Text style={styles.otroTexto}>Cuatrimestre: {cuatri}</Text>
        </>
      }
      <Button title="ver perfil" onPress={() => setMostrar(!mostrar)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  nombre: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
  }, 
  tarjeta: {
    borderWidth: 2,
    padding: 15,
    margin: 10,
  },
  carrera: {
    fontSize: 18,
    color: 'blue',
    fontFamily: 'Roboto',
  },
  otroTexto: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  }
});