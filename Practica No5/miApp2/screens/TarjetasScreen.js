import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Perfil} from '../components/Perfil';

export default function App() {
  return (
    <View style={styles.container}>
      <Perfil style={styles.tarjetaVerde} nombre="Alberto" carrera="Ingeniería en sistemas computacionales" materia="Programación móvil" cuatri="Noveno cuatrimestre"/>
      <Perfil style={styles.tarjetaRoja} nombre="Andrés" carrera="Ingeniería en sistemas computacionales" materia="Programación móvil" cuatri="Noveno cuatrimestre"/>
      <Perfil style={styles.tarjetaVerde} nombre="Joshua" carrera="Ingeniería en sistemas computacionales" materia="Programación móvil" cuatri="Noveno cuatrimestre"/>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tarjetaVerde: {
    backgroundColor: '#8bc48b',
  },
  tarjetaRoja: {
    backgroundColor: '#b86e6e',
  }
});