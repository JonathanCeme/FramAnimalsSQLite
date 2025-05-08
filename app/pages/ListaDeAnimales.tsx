
// muestra la lista de animales y los botones de editar y eliminar

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Button } from 'react-native';
import { read, deleteAnimalById } from './conexionasqlite'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

export default function AnimalList() {
    const router = useRouter(); // Obtén el objeto router
    const [data, setData] = useState<{
        id: number;
        name: string;
        tipo: string;
        raza: string;
        sexo: string;
        fecha_nacimiento: string;
        peso_actual_kg: number;
        estado_salud: string;
        ubicacion: string;
        fecha_ingreso: string;
        destinado_para: string;
    }[]>([]);

    async function fetchData() {
        const rows = await read();
        setData(rows);
    }
    useFocusEffect( // se utiliza para ejecutar la función cada vez que la pantalla gana el foco
        React.useCallback(() => {
            fetchData(); // Llama a fetchData cada vez que la pantalla gana el foco
        }, [])
    );

    async function handleDelete(id: number) {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que deseas eliminar este registro?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteAnimalById(id); // Llama a la función para eliminar el registro
                        setData(data.filter(item => item.id !== id)); // Actualiza la lista local
                        Alert.alert('Registro eliminado correctamente.');
                    },
                },
            ]
        );
    }

    function handleEdit(id: number) {
        Alert.alert(
            'Confirmar edición',
            '¿Estás seguro de que deseas editar este registro?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Editar',
                    onPress: () => {
                        // Redirige a la página de edición con el ID del animal
                        router.push(`/pages/actualizarDatosDeAnimales?id=${id}`);
                    },
                },
            ]
        );
    }
    function handleSale(id: number) {
        Alert.alert(
            'Confirmar edición',
            '¿Estás seguro de que deseas Vender este animal?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Vender',
                    onPress: () => {
                        // Redirige a la página de edición con el ID del animal
                        router.push(`/pages/venderAnimales?id=${id}`);
                    },
                },
            ]
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lista de Animales</Text>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.text}>ID: {item.id}</Text>
                        <Text style={styles.text}>Codigo: {item.name}</Text>
                        <Text style={styles.text}>Tipo: {item.tipo}</Text>
                        <Text style={styles.text}>Raza: {item.raza}</Text>
                        <Text style={styles.text}>Sexo: {item.sexo}</Text>
                        <Text style={styles.text}>Fecha de Nacimiento: {item.fecha_nacimiento}</Text>
                        <Text style={styles.text}>Peso Actual (kg): {item.peso_actual_kg}</Text>
                        <Text style={styles.text}>Estado de Salud: {item.estado_salud}</Text>
                        <Text style={styles.text}>Ubicación: {item.ubicacion}</Text>
                        <Text style={styles.text}>Fecha de Ingreso: {item.fecha_ingreso}</Text>
                        <Text style={styles.text}>Destinado Para: {item.destinado_para}</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.editButton} onPress={() => handleEdit(item.id)}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </Pressable>
                            <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </Pressable>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.text}>No hay animales registrados.</Text>
            )}
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
    item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    sellButton: {
        backgroundColor: 'white', // Verde para indicar acción positiva
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#28A745',
        borderWidth: 1,
        marginStart: 230,
    },
    ButtonText: {
        color: '#28A745',
        fontSize: 18,
        fontWeight: 'bold',
    },
});