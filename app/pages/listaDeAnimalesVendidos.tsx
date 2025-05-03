import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { readVentas } from './conexionasqlite'; // Asegúrate de que la ruta sea correcta

const ListaDeAnimalesVendidos = () => {
    const [ventas, setVentas] = useState<
        {
            id_venta: number;
            id_animal: number;
            fecha_venta: string;
            comprador: string;
            precio_venta: number;
            forma_pago: string;
        }[]
    >([]);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const data = await readVentas();
                setVentas(data);
            } catch (err) {
                setError('Error al cargar las ventas');
                console.error(err);
            }
        };

        fetchVentas();
    }, []);

    const renderItem = ({ item }: { item: typeof ventas[0] }) => (
        <View style={styles.item}>
            <Text style={styles.text}>ID Venta: {item.id_venta}</Text>
            <Text style={styles.text}>ID Animal: {item.id_animal}</Text>
            <Text style={styles.text}>Fecha: {item.fecha_venta}</Text>
            <Text style={styles.text}>Comprador: {item.comprador}</Text>
            <Text style={styles.text}>Precio: ${item.precio_venta}</Text>
            <Text style={styles.text}>Forma de Pago: {item.forma_pago}</Text>
        </View>
    );

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Animales Vendidos</Text>
            <FlatList
                data={ventas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_venta.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default ListaDeAnimalesVendidos;