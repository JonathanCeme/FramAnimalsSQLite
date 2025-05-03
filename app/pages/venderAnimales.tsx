import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createVentasTable, addVenta, readVentas, read } from './conexionasqlite';
import { useLocalSearchParams, Link } from 'expo-router'; // Asegúrate de importar Link
import listaDeAnimalesVendidos from './listaDeAnimalesVendidos'; // Importa el nuevo componente

export default function SalesScreen() {
    const { id } = useLocalSearchParams();
    const [animal, setAnimal] = useState<any>(null);
    const [ventas, setVentas] = useState<{ id_venta: number; id_animal: number; fecha_venta: string; comprador: string; precio_venta: number; forma_pago: string; }[]>([]);
    const [fechaVenta, setFechaVenta] = useState('');
    const [comprador, setComprador] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [formaPago, setFormaPago] = useState('');

    useEffect(() => {
        createVentasTable()
            .then(() => fetchVentas())
            .catch(error => console.error('Error al inicializar la tabla "ventas":', error));

        async function fetchAnimal() {
            try {
                const animals = await read();
                const selectedAnimal = animals.find((a) => a.id === parseInt(id as string, 10));
                if (selectedAnimal) {
                    setAnimal(selectedAnimal);
                } else {
                    Alert.alert('Error', 'Animal no encontrado.');
                }
            } catch (error) {
                console.error('Error al cargar el animal:', error);
                Alert.alert('Error', 'No se pudo cargar el animal.');
            }
        }

        if (id) {
            fetchAnimal();
        }
    }, [id]);

    const fetchVentas = async () => {
        try {
            const data = await readVentas();
            setVentas(data);
        } catch (error) {
            console.error('Error al leer las ventas:', error);
        }
    };

    const handleAddVenta = async () => {
        if (!fechaVenta || !comprador || !precioVenta || !formaPago) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            await addVenta(
                parseInt(id as string, 10),
                fechaVenta,
                comprador,
                parseFloat(precioVenta),
                formaPago
            );
            Alert.alert('Éxito', 'Venta añadida correctamente.');
            setFechaVenta('');
            setComprador('');
            setPrecioVenta('');
            setFormaPago('');
            fetchVentas();
        } catch (error) {
            console.error('Error al añadir la venta:', error);
            Alert.alert('Error', 'No se pudo añadir la venta.');
        }
    };

    return (
        <View style={styles.container}>
            {animal && (
                <>
                    <Text style={styles.animalName}>Codigo: {animal.name}</Text>
                    <Text style={styles.animalName}>Animal: {animal.tipo}</Text>
                </>
            )}
            <Text style={styles.title}>Registrar Venta</Text>
            <TextInput
                style={styles.input}
                placeholder="Fecha de Venta (YYYY-MM-DD)"
                value={fechaVenta}
                onChangeText={setFechaVenta}
            />
            <TextInput
                style={styles.input}
                placeholder="Comprador"
                value={comprador}
                onChangeText={setComprador}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio de Venta"
                value={precioVenta}
                onChangeText={setPrecioVenta}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Forma de Pago"
                value={formaPago}
                onChangeText={setFormaPago}
            />
            <Button title="Añadir Venta" onPress={handleAddVenta} />
            <Text style={styles.title}>Lista de Ventas</Text>
            <Link href="/pages/listaDeAnimalesVendidos" style={styles.link}>Ver listado</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    animalName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});