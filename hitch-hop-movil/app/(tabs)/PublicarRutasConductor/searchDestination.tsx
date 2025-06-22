import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideSearch } from 'lucide-react-native';

// Assets
const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

export default function SearchDestination() {
  const { type, currentValue, contextOrigin, contextDestination, contextStops, contextVehiculo, contextAsientosDisponibles, contextMetodoPago, contextCostoPasajero, contextFecha, contextHora } = useLocalSearchParams<{
    type: 'origin' | 'destination';
    currentValue: string;
    contextOrigin?: string;
    contextDestination?: string;
    contextStops?: string;
    contextVehiculo?: string;
    contextAsientosDisponibles?: string;
    contextMetodoPago?: string;
    contextCostoPasajero?: string;
    contextFecha?: string;
    contextHora?: string;
  }>();  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  
  // Mock locations for demonstration - this would come from an API
  const [locations] = useState([
    'Universidad de Costa Rica, San José',
    'Universidad Nacional, Heredia',
    'Instituto Tecnológico de Costa Rica, Cartago',
    'Universidad Estatal a Distancia, San José',
    'Universidad Técnica Nacional, Alajuela',
    'Centro Comercial Multiplaza, Escazú',
    'Hospital México, San José',
    'Aeropuerto Juan Santamaría, Alajuela',
    'Estadio Nacional, San José',
    'Teatro Nacional, San José'
  ]);

  // Filter locations based on search query
  const filteredLocations = searchQuery.trim() 
    ? locations.filter(location => 
        location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getTitle = () => {
    return `Buscar ${type === 'origin' ? 'Punto de Inicio' : 'Punto Final'}`;
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };  const handleConfirm = () => {
    if (selectedLocation) {
      // Navigate back with the selected location as a parameter using replace to preserve form state
      if (type === 'origin') {
        router.replace({
          pathname: '/(tabs)/PublicarRutasConductor/formPublicarRuta',
          params: { 
            selectedOrigin: selectedLocation,
            // Preserve other values from context
            selectedDestination: contextDestination ?? '',
            selectedStops: contextStops ?? '',
            contextVehiculo: contextVehiculo ?? '',
            contextAsientosDisponibles: contextAsientosDisponibles ?? '',
            contextMetodoPago: contextMetodoPago ?? '',
            contextCostoPasajero: contextCostoPasajero ?? '',
            contextFecha: contextFecha ?? '',
            contextHora: contextHora ?? ''
          }
        });
      } else if (type === 'destination') {
        router.replace({
          pathname: '/(tabs)/PublicarRutasConductor/formPublicarRuta',
          params: { 
            selectedDestination: selectedLocation,
            // Preserve other values from context
            selectedOrigin: contextOrigin ?? '',
            selectedStops: contextStops ?? '',
            contextVehiculo: contextVehiculo ?? '',
            contextAsientosDisponibles: contextAsientosDisponibles ?? '',
            contextMetodoPago: contextMetodoPago ?? '',
            contextCostoPasajero: contextCostoPasajero ?? '',
            contextFecha: contextFecha ?? '',
            contextHora: contextHora ?? ''
          }
        });
      }
    }
  };
  const handleCancel = () => {
    router.back();
  };

  // Separate function to render search results
  const renderSearchResults = () => {
    if (searchQuery.trim() === '') {
      return (
        <Text style={styles.placeholder}>
          Ingrese una ubicación para buscar
        </Text>
      );
    }

    if (filteredLocations.length === 0) {
      return (
        <Text style={styles.placeholder}>
          No se encontraron ubicaciones para &quot;{searchQuery}&quot;
        </Text>
      );
    }

    return (
      <View style={styles.locationsList}>
        <Text style={styles.resultsHeader}>
          Resultados para &quot;{searchQuery}&quot;:
        </Text>
        {filteredLocations.map((location) => (
          <TouchableOpacity
            key={location}
            style={[
              styles.locationItem,
              selectedLocation === location && styles.selectedLocationItem
            ]}
            onPress={() => handleLocationSelect(location)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.locationText,
              selectedLocation === location && styles.selectedLocationText
            ]}>
              {location}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
    >
      {/* Imagen de fondo Superior*/}
      <View style={styles.backgroundImageContainer}>
        <Image
          source={fondoHeader}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <Image source={logoHeader} style={styles.hitchhopText} />
      </View>

      {/* Flecha back */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={flechaBack}
            style={styles.flechaBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Título */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{getTitle()}</Text>            {Boolean(currentValue) && (
              <Text style={styles.subtitle}>
                Actual: {currentValue}
              </Text>
            )}
          </View>

          {/* Search Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Buscar ubicación</Text>            <View style={styles.searchInputContainer}>              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Ingrese el nombre de la ubicación"
                placeholderTextColor="#999"
                style={styles.searchInput}
                returnKeyType="search"
                autoCapitalize="words"
              />
              <TouchableOpacity 
                style={styles.searchIconContainer}
                onPress={() => {
                  // Implement search functionality here
                  console.log(`Searching for: ${searchQuery}`);
                }}
              >
                <LucideSearch 
                  size={20} 
                  color="#8E8E8E" 
                />
              </TouchableOpacity>
            </View>          </View>          {/* Search results */}
          <View style={styles.resultsContainer}>
            {renderSearchResults()}
          </View>
        </ScrollView>

        {/* Action Buttons - Fixed at bottom */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !selectedLocation && styles.disabledButton
            ]}
            onPress={handleConfirm}
            disabled={!selectedLocation}
            activeOpacity={0.7}
          >
            <Text style={styles.confirmButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },  container: {
    alignItems: "center",
    paddingHorizontal: 45,
    paddingTop: 10, 
    paddingBottom: 100, // Add extra padding for fixed buttons
    backgroundColor: "#fff",
    minHeight: '100%', 
  },
  scrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: 50,
    flex: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 2,
  },
  backgroundImageContainer: {
    width: "115%",
    height: 150,
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    top: -25,
    left: 0,
    zIndex: 0,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 10,
    resizeMode: "cover",
  },
  hitchhopText: {
    position: "absolute",
    right: 75,
    bottom: 70,
    zIndex: 5,
    width: 135,
    height: 25,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
    paddingLeft: 16,
    position: "absolute",
    zIndex: 10,
    top: 0,
  },
  flechaBack: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inputGroup: {
    width: "100%",
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
    color: "#000"
  },  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12, 
    width: "100%",
    marginBottom: 5,
    fontSize: 16, 
    backgroundColor: "#fff",
  },  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "100%",
    position: 'relative',
    minHeight: 48,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    paddingRight: 44, // Add padding to prevent text overlap with icon
    fontSize: 16,
    color: "#000",
  },
  searchIconContainer: {
    position: 'absolute',
    right: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },  resultsContainer: {
    width: "100%",
    marginTop: 20,
    flex: 1,
  },
  placeholder: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
    padding: 20,
  },
  locationsList: {
    width: "100%",
  },
  resultsHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  locationItem: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedLocationItem: {
    backgroundColor: '#E8E7FF',
    borderColor: '#7875F8',
    borderWidth: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLocationText: {
    fontSize: 16,
    color: '#7875F8',
    fontWeight: '600',
  },  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
    zIndex: 10,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#7875F8',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#7875F8',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#7875F8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FEFEFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#D1D1D1',
  },
});
