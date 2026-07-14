import { useState } from 'react'; // Hook para manejar estado reactivo
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Button, Platform } from 'react-native'; // Importar componentes nativos (agregamos Alert, Button y Platform)
 
export default function App() { // Componente principal de la app
  const [nombre, setNombre] = useState(''); // Estado 1: Nombre del usuario
  const [email, setEmail] = useState(''); // Estado 2: Email del usuario
  const [pass, setPass] = useState(''); // Estado 3: Contraseña del usuario
  const [numero, setNumero] = useState(''); // Estado 4: Número/Edad
  const [telefono, setTelefono] = useState(''); // Estado 5: Teléfono del usuario
  const [busqueda, setBusqueda] = useState(''); // Estado 6: Término de búsqueda
  const [comentario, setComentario] = useState(''); // Estado 7: Comentario multiline
  const [decimal, setDecimal] = useState(''); // Estado 8: Número decimal/precio
 
  // Array con los campos que se muestran en el resumen.
  // Si agregas un campo nuevo, solo lo agregas aquí, no escribes un <Text> nuevo.
  const campos = [
    { label: 'Nombre', value: nombre },
    { label: 'Email', value: email },
    { label: 'Contraseña', value: pass ? 'Ingresada' : 'No ingresada' },
    { label: 'Edad', value: numero },
  ];

  // Wrapper para que los alerts funcionen tanto en celular (Alert.alert) como en web (window.alert)
  const mostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web') { // Si estamos corriendo en navegador
      window.alert(`${titulo}\n\n${mensaje}`); // El navegador no soporta botones personalizados, solo OK
      return; // Salimos de la función, no seguimos al Alert.alert
    }
    Alert.alert(titulo, mensaje, botones); // En iOS/Android usamos el Alert nativo de React Native
  };

  // ALERT TIPO 1: Alert simple con un solo botón (OK)
  const validarNombre = () => { // Función que se ejecuta al presionar el botón "Guardar"
    if (nombre === '') { // Si el campo nombre está vacío
      mostrarAlerta('Campo vacío', 'Por favor escribe tu nombre antes de continuar');
    } else { // Si sí hay nombre escrito
      mostrarAlerta('Listo', `Hola ${nombre}, tu nombre fue guardado`);
    }
  };

  // ALERT TIPO 2: Alert con dos botones (Cancelar / Confirmar)
  const confirmarEnvio = () => { // Función que se ejecuta al presionar "Enviar formulario"
    mostrarAlerta(
      'Confirmar envío',
      '¿Estás seguro de que quieres enviar el formulario?',
      [
        {
          text: 'Cancelar',
          onPress: () => mostrarAlerta('Cancelado', 'No se envió nada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => mostrarAlerta('Enviado', 'Tu formulario fue enviado con éxito'),
        },
      ]
    );
  };

  // ALERT TIPO 3: Alert de validación con lógica (revisa el email)
  const validarEmail = () => { // Función que se ejecuta al presionar "Validar email"
    if (email === '') { // Caso 1: email vacío
      mostrarAlerta('Error', 'El campo de email está vacío');
    } else if (!email.includes('@')) { // Caso 2: no tiene arroba, no es válido
      mostrarAlerta('Email inválido', 'Tu correo debe contener el símbolo @');
    } else { // Caso 3: pasó las validaciones
      mostrarAlerta('Email válido', `${email} tiene un formato correcto`);
    }
  };
 
  return ( // Retorna el JSX a renderizar
    <ScrollView style={styles.container}> {/* Contenedor con scroll si hay mucho contenido */}
      <Text style={styles.title}>Ejemplos de TextInput</Text>
 
      {/* EJEMPLO 1: TextInput con capitalización */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput // Input de texto normal
        value={nombre} // Vincula el estado al valor mostrado
        onChangeText={setNombre} // Actualiza estado cuando escribe
        placeholder="Juan Pérez" // Texto de guía que desaparece al escribir
        autoCapitalize="words" // Capitaliza la primera letra de cada palabra
        placeholderTextColor="#aaa" // Color gris del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 2: TextInput especializado para email */}
      <Text style={styles.label}>Email</Text>
      <TextInput // Input para correo electrónico
        value={email} // Vincula el estado al valor mostrado
        onChangeText={setEmail} // Actualiza estado cuando escribe
        placeholder="usuario@ejemplo.com" // Formato de ejemplo
        keyboardType="email-address" // Teclado con @ y punto
        autoCapitalize="none" // NO capitaliza nada
        placeholderTextColor="#aaa" // Color del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 3: TextInput oculto para contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <TextInput // Input para contraseña
        value={pass} // Vincula el estado al valor mostrado
        onChangeText={setPass} // Actualiza estado cuando escribe
        placeholder="********" // Viñetas como referencia visual
        secureTextEntry={true} // Oculta el texto con viñetas
        maxLength={20} // Máximo 20 caracteres permitidos
        placeholderTextColor="#aaa" // Color del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 4: TextInput solo para números */}
      <Text style={styles.label}>Edad (solo números)</Text>
      <TextInput // Input numérico
        value={numero} // Vincula el estado al valor mostrado
        onChangeText={setNumero} // Actualiza estado cuando escribe
        placeholder="25" // Número de ejemplo
        keyboardType="numeric" // Teclado solo con números
        placeholderTextColor="#aaa" // Color del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 5: TextInput para teléfono */}
      <Text style={styles.label}>Teléfono</Text>
      <TextInput // Input para teléfono
        value={telefono} // Vincula el estado al valor mostrado
        onChangeText={setTelefono} // Actualiza estado cuando escribe
        placeholder="55-1234-5678" // Formato de teléfono de ejemplo
        keyboardType="phone-pad" // Teclado con números y símbolos (+, -, (), etc)
        placeholderTextColor="#aaa" // Color del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 6: TextInput para búsqueda */}
      <Text style={styles.label}>Búsqueda</Text>
      <TextInput // Input para búsqueda
        value={busqueda} // Vincula el estado al valor mostrado
        onChangeText={setBusqueda} // Actualiza estado cuando escribe
        placeholder="Buscar..." // Texto de ejemplo
        returnKeyType="search" // Muestra botón "search" en teclado
        placeholderTextColor="#aaa" // Color del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 7: TextInput para decimales */}
      <Text style={styles.label}>Precio (decimales)</Text>
      <TextInput // Input para números con decimales
        value={decimal} // Vincula el estado al valor mostrado
        onChangeText={setDecimal} // Actualiza estado cuando escribe
        placeholder="19.99" // Precio de ejemplo con punto decimal
        keyboardType="decimal-pad" // Teclado numérico con punto decimal
        placeholderTextColor="#aaa" // Color del placeholder
        style={styles.input} // Aplica estilos del objeto styles
      />
 
      {/* EJEMPLO 8: TextInput multiline como área de texto */}
      <Text style={styles.label}>Comentario (multiline)</Text>
      <TextInput // Input para múltiples líneas
        value={comentario} // Vincula el estado al valor mostrado
        onChangeText={setComentario} // Actualiza estado cuando escribe
        placeholder="Escribe tu comentario aquí..." // Instrucción de ejemplo
        multiline={true} // Permite saltos de línea
        numberOfLines={4} // Altura equivalente a 4 líneas
        textAlignVertical="top" // Alinea el texto al inicio superior
        placeholderTextColor="#aaa" // Color del placeholder
        style={[styles.input, styles.multiline]} // Combina dos estilos
      />

      {/* SECCIÓN DE BOTONES PARA PROBAR LOS ALERTS */}
      <View style={styles.botonesContainer}>
        <View style={styles.botonWrapper}>
          <Button title="Guardar nombre" onPress={validarNombre} />
        </View>
        <View style={styles.botonWrapper}>
          <Button title="Validar email" onPress={validarEmail} color="#FF9500" />
        </View>
        <View style={styles.botonWrapper}>
          <Button title="Enviar formulario" onPress={confirmarEnvio} color="#34C759" />
        </View>
      </View>
 
      {/* SECCIÓN DE RESUMEN: recorre el array "campos" en vez de repetir <Text> a mano */}
      <View style={styles.resumen}>
        <Text style={styles.resumenTitle}>Datos ingresados</Text>
        {campos.map((campo) => (
          <Text key={campo.label} style={styles.resumenText}>
            {campo.label}: {campo.value || 'Sin datos'}
          </Text>
        ))}
      </View>
    </ScrollView>
  ); // Cierra el return
} // Cierra la función App
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 20 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20, color: '#222' },
  label: { fontSize: 13, color: '#666', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, fontSize: 15, marginBottom: 4 },
  multiline: { height: 90, textAlignVertical: 'top' },
  botonesContainer: { marginTop: 20, gap: 8 }, // Espacio simple entre los 3 botones
  botonWrapper: { marginBottom: 4 }, // Pequeño respiro extra entre cada botón
  resumen: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#ddd' },
  resumenTitle: { fontWeight: '600', marginBottom: 6, color: '#444' },
  resumenText: { fontSize: 14, color: '#555' },
});