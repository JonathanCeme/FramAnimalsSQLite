// contiene la logica de la base de datos(conexion, funciones , tblas, etc)

import * as SQlite from 'expo-sqlite';
 const db = SQlite.openDatabaseSync('Pr-db'); // Open the database synchronously

export async function read(): Promise<{
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
}[]> {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            tipo TEXT NOT NULL,
            raza TEXT NOT NULL,
            sexo TEXT NOT NULL,
            fecha_nacimiento TEXT NOT NULL,
            peso_actual_kg REAL NOT NULL,
            estado_salud TEXT NOT NULL,
            ubicacion TEXT NOT NULL,
            fecha_ingreso TEXT NOT NULL,
            destinado_para TEXT NOT NULL
        );
    `);
    const rows = await db.getAllAsync(`SELECT * FROM animals`);
    return rows.map(row => row as {
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
    });

    
}

export async function deleteAnimalById(animalId: number): Promise<void> {
    try {
        await db.runAsync(`DELETE FROM animals WHERE id = ?`, [animalId]); // Elimina el animal con el ID especificado
        console.log(`Animal con ID ${animalId} eliminado correctamente.`);
    } catch (error) {
        console.error('Error al eliminar el animal:', error);
        throw error; // Lanza el error para manejarlo en el nivel superior si es necesario
    }
}

export async function updateAnimalById(
    animalId: number,
    updatedFields: {
        name?: string;
        tipo?: string;
        raza?: string;
        sexo?: string;
        fecha_nacimiento?: string;
        peso_actual_kg?: number;
        estado_salud?: string;
        ubicacion?: string;
        fecha_ingreso?: string;
        destinado_para?: string;
    }
): Promise<void> {
    try {
        const fields = Object.keys(updatedFields);
        const values = Object.values(updatedFields);

        if (fields.length === 0) {
            throw new Error('No se proporcionaron campos para actualizar.');
        }

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        values.push(animalId); // Agregar el ID al final de los valores

        await db.runAsync(
            `UPDATE animals SET ${setClause} WHERE id = ?`,
            values
        );

        console.log(`Animal con ID ${animalId} actualizado correctamente.`);
    } catch (error) {
        console.error('Error al actualizar el animal:', error);
        throw error; // Lanza el error para manejarlo en el nivel superior si es necesario
    }
}
/* -------------------------------------------------------table sales---------------- */
// Crear la tabla 'ventas' si no existe
export async function createVentasTable(): Promise<void> {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ventas (
                id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
                id_animal INTEGER NOT NULL,
                fecha_venta TEXT NOT NULL,
                comprador TEXT NOT NULL,
                precio_venta REAL NOT NULL,
                forma_pago TEXT NOT NULL,
                FOREIGN KEY (id_animal) REFERENCES animals (id)
            );
        `);
        console.log('Tabla "ventas" creada correctamente.');
    } catch (error) {
        console.error('Error al crear la tabla "ventas":', error);
        throw error;
    }
}

// Función para añadir una nueva venta
export async function addVenta(
    id_animal: number,
    fecha_venta: string,
    comprador: string,
    precio_venta: number,
    forma_pago: string
): Promise<void> {
    try {
        await db.runAsync(
            `INSERT INTO ventas (id_animal, fecha_venta, comprador, precio_venta, forma_pago) VALUES (?, ?, ?, ?, ?)`,
            [id_animal, fecha_venta, comprador, precio_venta, forma_pago]
        );
        console.log('Venta añadida correctamente.');
    } catch (error) {
        console.error('Error al añadir la venta:', error);
        throw error;
    }
}

// Función para leer todas las ventas
export async function readVentas(): Promise<{
    id_venta: number;
    id_animal: number;
    fecha_venta: string;
    comprador: string;
    precio_venta: number;
    forma_pago: string;
}[]> {
    try {
        const rows = await db.getAllAsync(`SELECT * FROM ventas`);
        return rows.map(row => row as {
            id_venta: number;
            id_animal: number;
            fecha_venta: string;
            comprador: string;
            precio_venta: number;
            forma_pago: string;
        });
    } catch (error) {
        console.error('Error al leer las ventas:', error);
        throw error;
    }
}