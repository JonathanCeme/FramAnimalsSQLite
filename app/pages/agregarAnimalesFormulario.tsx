// maneja el formulario para añadir animales a la base de datos

import * as SQlite from 'expo-sqlite';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router'; // Importa Link de expo-router

const db = SQlite.openDatabaseSync('Pr-db'); // Open the database synchronously

export function HandleTableAnimals() {
    const [name, setName] = useState<string>(''); // State for the animal name
    const [tipo, setTipo] = useState<string>(''); // State for the animal type
    const [raza, setRaza] = useState<string>(''); // State for the animal breed
    const [sexo, setSexo] = useState<string>(''); // State for the animal gender
    const [fechaNacimiento, setFechaNacimiento] = useState<string>(''); // State for birth date
    const [pesoActualKg, setPesoActualKg] = useState<string>(''); // State for weight
    const [estadoSalud, setEstadoSalud] = useState<string>(''); // State for health status
    const [ubicacion, setUbicacion] = useState<string>(''); // State for location
    const [fechaIngreso, setFechaIngreso] = useState<string>(''); // State for entry date
    const [destinadoPara, setDestinadoPara] = useState<string>(''); // State for purpose

    async function handleAddAnimal() {
        if (name && tipo && raza && sexo && fechaNacimiento && pesoActualKg && estadoSalud && ubicacion && fechaIngreso && destinadoPara) {
            await db.runAsync(
                `INSERT INTO animals (name, tipo, raza, sexo, fecha_nacimiento, peso_actual_kg, estado_salud, ubicacion, fecha_ingreso, destinado_para) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, tipo, raza, sexo, fechaNacimiento, parseFloat(pesoActualKg), estadoSalud, ubicacion, fechaIngreso, destinadoPara]
            );
            setName('');
            setTipo('');
            setRaza('');
            setSexo('');
            setFechaNacimiento('');
            setPesoActualKg('');
            setEstadoSalud('');
            setUbicacion('');
            setFechaIngreso('');
            setDestinadoPara('');
            alert('Animal añadido correctamente.');
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Formulario de Animales</Text>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Tipo" value={tipo} onChangeText={setTipo} />
                <TextInput style={styles.input} placeholder="Raza" value={raza} onChangeText={setRaza} />
                <TextInput style={styles.input} placeholder="Sexo" value={sexo} onChangeText={setSexo} />
                <TextInput style={styles.input} placeholder="Fecha de Nacimiento" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
                <TextInput style={styles.input} placeholder="Peso Actual (kg)" value={pesoActualKg} onChangeText={setPesoActualKg} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Estado de Salud" value={estadoSalud} onChangeText={setEstadoSalud} />
                <TextInput style={styles.input} placeholder="Ubicación" value={ubicacion} onChangeText={setUbicacion} />
                <TextInput style={styles.input} placeholder="Fecha de Ingreso" value={fechaIngreso} onChangeText={setFechaIngreso} />
                <TextInput style={styles.input} placeholder="Destinado Para" value={destinadoPara} onChangeText={setDestinadoPara} />
                <Pressable style={styles.button} onPress={handleAddAnimal}>
                    <Text style={styles.textbutton}>AÑADIR</Text>
                </Pressable>
            </View>
            {/* Agregamos el enlace a la página "ListaDeAnimales" */}
            <View style={styles.linkContainer}>
                <Link href="/pages/ListaDeAnimales" style={styles.link}>Ver listado</Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    form: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    textbutton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    link: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default HandleTableAnimals;
