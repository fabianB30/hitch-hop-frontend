// Import React
import React, { useState } from 'react';

// Input Fields Components
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function FormPublicarRuta() {
    const [fecha, setFecha] = useState(new Date());
    const [hora, setHora] = useState(new Date());
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [asientosDisponibles, setAsientosDisponibles] = useState('');
    const [vehiculo, setVehiculo] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [error, setError] = useState('');
    
    const handlePublicarRuta = () => {
        // Aquí iría la lógica para publicar la ruta
        console.log('Ruta publicada:', { fecha, hora, origen, destino, asientosDisponibles, vehiculo, metodoPago });
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Publicar Ruta</Text>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto de Inicio</Text>
            <TextInput
                value={origen}
                onChangeText={setOrigen}
                placeholder="Ingrese el punto de inicio"
                style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Puntos de Parada</Text>
            <TextInput
                value={destino}
                onChangeText={setDestino}
                placeholder="Ingrese los puntos de parada"
                style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto Final</Text>
            <TextInput
                value={destino}
                onChangeText={setDestino}
                placeholder="Ingrese el punto final"
                style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehículo a Usar</Text>
            <Select
                options={[
                    'Vehículo 1',
                    'Vehículo 2',
                    'Vehículo 3'
                ]}
                selectedValue={vehiculo}
                onValueChange={setVehiculo}
                placeholder="Seleccione un vehículo"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cantidad de Pasajeros</Text>
            <TextInput
                value={asientosDisponibles}
                onChangeText={setAsientosDisponibles}
                placeholder="Ingrese la cantidad de asientos disponibles"
                keyboardType="numeric"
                style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Método de Pago</Text>
            <Select
                options={[
                    'Efectivo',
                    'Tarjeta de Crédito',
                    'Transferencia Bancaria'
                ]}
                selectedValue={metodoPago}
                onValueChange={setMetodoPago}
                placeholder="Seleccione un método de pago"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Elegir un Horario</Text>
            <TouchableOpacity onPress={() => setHora(new Date())}>
                <Text style={styles.dateTimeText}>{hora.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <Button
            onPress={handlePublicarRuta}
            style={styles.button}
        >
            <Text style={{color: 'white'}}>Registrar Ruta</Text>
        </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    dateTimeText: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    },
    button: {
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 5
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%'
    },
    inputLabel: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        fontSize: 12
    }
});