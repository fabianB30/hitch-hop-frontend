// Autores: Anthony Guevara
// Pagina para buscar un destino o punto de inicio
// Llamado en la página del formulario de publicación de rutas

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideSearch } from 'lucide-react-native';
import { getAllPlacesRequest } from '@/interconnection/place';

// Assets
const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

interface Place {
  _id: string;
  name: string;
  description?: string;
  longitude: number;
  latitude: number;
}

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
  }>();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Fetch all places when component mounts
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const result = await getAllPlacesRequest();
        if (result && Array.isArray(result)) {
          setPlaces(result);
        } else {
          console.error('Failed to fetch places or invalid response format');
          setPlaces([]);
          setLoadError('Error al cargar las ubicaciones. Intente nuevamente.');
        }
      } catch (error) {
        console.error('Error fetching places:', error);
        setPlaces([]);
        setLoadError('Error de conexión. Verifique su conexión a internet.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Filter places based on search query - show more results for shorter queries
  const filteredLocations = searchQuery.trim() 
    ? places.filter(place => {
        const query = searchQuery.toLowerCase();
        const nameMatch = place.name.toLowerCase().includes(query);
        const descriptionMatch = place.description?.toLowerCase().includes(query);
        return nameMatch || descriptionMatch;
      }).slice(0, 20) // Limit to 20 results for performance
    : [];

  const getTitle = () => {
    return `Buscar ${type === 'origin' ? 'Punto de Inicio' : 'Punto Final'}`;
  };

  const handleLocationSelect = (place: Place) => {
    setSelectedLocation(place.name);
  };

  const handleConfirm = () => {
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
  };  // Separate function to render search results
  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7875F8" />
          <Text style={styles.loadingText}>Cargando ubicaciones...</Text>
        </View>
      );
    }

    if (loadError) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.placeholder}>{loadError}</Text>
          <TouchableOpacity 
            onPress={() => {
              // Retry loading places
              setLoadError(null);
              setIsLoading(true);
              const fetchPlaces = async () => {
                try {
                  const result = await getAllPlacesRequest();
                  if (result && Array.isArray(result)) {
                    setPlaces(result);
                  } else {
                    setLoadError('Error al cargar las ubicaciones. Intente nuevamente.');
                  }                } catch (error) {
                  console.error('Error retrying places fetch:', error);
                  setLoadError('Error de conexión. Verifique su conexión a internet.');
                } finally {
                  setIsLoading(false);
                }
              };
              fetchPlaces();
            }}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (searchQuery.trim() === '') {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.placeholder}>
            Ingrese una ubicación para buscar
          </Text>
        </View>
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
        {filteredLocations.map((place) => (
          <TouchableOpacity
            key={place._id}
            style={[
              styles.locationItem,
              selectedLocation === place.name && styles.selectedLocationItem
            ]}
            onPress={() => handleLocationSelect(place)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.locationText,
              selectedLocation === place.name && styles.selectedLocationText
            ]}>
              {place.name}
            </Text>
            {place.description && (
              <Text style={styles.locationDescription}>
                {place.description}
              </Text>
            )}
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
        <TouchableOpacity onPress={handleCancel}>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 15,
    zIndex: 10,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#7875F8',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
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
    padding: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },  locationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#7875F8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },  retryButtonText: {
    color: '#FEFEFF',
    fontSize: 16,
    fontWeight: '600',
  },
  hintText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
