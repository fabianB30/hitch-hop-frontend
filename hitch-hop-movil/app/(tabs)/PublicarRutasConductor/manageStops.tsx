// Autores: Anthony Guevara
// Pagina para manejar las paradas a realizar en un viaje
// Llamada desde el formulario de publicación de rutas con 
// los ClickableInputs
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideSearch, LucideX, LucideChevronUp, LucideChevronDown } from 'lucide-react-native';
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

export default function ManageStops() {
  const {
    currentStops,
    contextOrigin,
    contextDestination,
    contextVehiculo,
    contextAsientosDisponibles,
    contextMetodoPago,
    contextCostoPasajero,
    contextFecha,
    contextHora
  } = useLocalSearchParams<{
    currentStops: string;
    contextOrigin?: string;
    contextDestination?: string;
    contextVehiculo?: string;
    contextAsientosDisponibles?: string;
    contextMetodoPago?: string;
    contextCostoPasajero?: string;
    contextFecha?: string;
    contextHora?: string;
  }>(); const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStops, setSelectedStops] = useState<string[]>(
    currentStops ? currentStops.split(',').map(stop => stop.trim()).filter(Boolean) : []
  );
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

  // Filter places based on search query and exclude already selected stops
  const filteredLocations = searchQuery.trim()
    ? places.filter(place => {
      const query = searchQuery.toLowerCase();
      const nameMatch = place.name.toLowerCase().includes(query);
      const descriptionMatch = place.description?.toLowerCase().includes(query);
      const locationName = place.name;
      return (nameMatch || descriptionMatch) && !selectedStops.includes(locationName);
    }).slice(0, 20) // Limit to 20 results for performance
    : [];
  const handleLocationAdd = (place: Place) => {
    const locationName = place.name;
    if (!selectedStops.includes(locationName)) {
      setSelectedStops(prev => [...prev, locationName]);
    }
    setSearchQuery(''); // Clear search after adding
  };

  const handleLocationRemove = (locationToRemove: string) => {
    setSelectedStops(prev => prev.filter(location => location !== locationToRemove));
  };
  const handleMoveStop = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

    // Check bounds
    if (toIndex < 0 || toIndex >= selectedStops.length) {
      return;
    }

    const newStops = [...selectedStops];
    const [movedItem] = newStops.splice(fromIndex, 1);
    newStops.splice(toIndex, 0, movedItem);
    setSelectedStops(newStops);
  }; const handleConfirm = () => {
    // Navigate back with the selected stops as a parameter using replace to preserve form state
    router.replace({
      pathname: '/(tabs)/PublicarRutasConductor/formPublicarRuta',
      params: {
        selectedStops: selectedStops.join(', '),
        // Preserve other values from context
        selectedOrigin: contextOrigin ?? '',
        selectedDestination: contextDestination ?? '',
        contextVehiculo: contextVehiculo ?? '',
        contextAsientosDisponibles: contextAsientosDisponibles ?? '',
        contextMetodoPago: contextMetodoPago ?? '',
        contextCostoPasajero: contextCostoPasajero ?? '',
        contextFecha: contextFecha ?? '',
        contextHora: contextHora ?? ''
      }
    });
  };
  const handleCancel = () => {
    router.replace({
      pathname: '/(tabs)/PublicarRutasConductor/formPublicarRuta',
      params: {
        // Preserve other values from context without changing stops
        selectedOrigin: contextOrigin ?? '',
        selectedDestination: contextDestination ?? '',
        selectedStops: currentStops ?? '', // Keep original stops, don't change them
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
          <Text style={styles.loadingText}>Cargando...</Text>
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
                  }
                } catch (error) {
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
        <Text style={styles.placeholder}>
          Ingrese una ubicación para buscar paradas
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
        <ScrollView
          style={styles.searchResultsScrollView}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          {filteredLocations.map((place) => (
            <TouchableOpacity
              key={place._id}
              style={styles.locationItem}
              onPress={() => handleLocationAdd(place)}
              activeOpacity={0.7}
            >
              <Text style={styles.locationText}>
                {place.name}
              </Text>
              {place.description && (
                <Text style={styles.locationDescription}>
                  {place.description}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
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
            <Text style={styles.title}>Agregar Paradas</Text>
            <Text style={styles.subtitle}>
              Seleccione y ordene las paradas de su viaje
            </Text>
          </View>          {/* Selected Stops Section */}
          {selectedStops.length > 0 && (
            <View style={styles.selectedStopsContainer}>
              <Text style={styles.sectionTitle}>Paradas Seleccionadas ({selectedStops.length})</Text>
              <ScrollView
                style={styles.selectedStopsScrollView}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {selectedStops.map((stop, index) => (
                  <View key={`${stop}-${index}`} style={styles.selectedStopItem}>
                    <View style={styles.stopContent}>
                      <View style={styles.stopInfo}>
                        <Text style={styles.stopNumber}>{index + 1}</Text>
                        <Text style={styles.stopText}>{stop}</Text>
                      </View>
                    </View>

                    {/* Reorder and Remove Controls */}
                    <View style={styles.controlsContainer}>
                      {/* Move Up/Down Buttons */}
                      <View style={styles.reorderButtons}>
                        <TouchableOpacity
                          style={[styles.reorderButton, index === 0 && styles.disabledReorderButton]}
                          onPress={() => handleMoveStop(index, 'up')}
                          disabled={index === 0}
                        >
                          <LucideChevronUp size={16} color={index === 0 ? "#CCC" : "#666"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.reorderButton, index === selectedStops.length - 1 && styles.disabledReorderButton]}
                          onPress={() => handleMoveStop(index, 'down')}
                          disabled={index === selectedStops.length - 1}
                        >
                          <LucideChevronDown size={16} color={index === selectedStops.length - 1 ? "#CCC" : "#666"} />
                        </TouchableOpacity>
                      </View>

                      {/* Remove Button */}
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleLocationRemove(stop)}
                      >
                        <LucideX size={18} color="#FF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Search Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Buscar nueva parada</Text>
            <View style={styles.searchInputContainer}>
              <TextInput
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
                  console.log(`Searching for: ${searchQuery}`);
                }}
              >
                <LucideSearch
                  size={20}
                  color="#8E8E8E"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search results */}
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
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.7}
          >
            <Text style={styles.confirmButtonText}>
              Guardar {selectedStops.length > 0 ? `(${selectedStops.length})` : ''}
            </Text>
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
  },
  container: {
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
    marginVertical: 10,
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
    color: "#000"
  },
  searchInputContainer: {
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
    paddingRight: 44,
    fontSize: 16,
    color: "#000",
  },
  searchIconContainer: {
    position: 'absolute',
    right: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
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
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
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
  locationText: {
    fontSize: 16,
    color: '#333',
  },  // New styles for stops management
  selectedStopsContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    maxHeight: 250, // Limit height to make it scrollable
  },
  selectedStopsScrollView: {
    maxHeight: 180, // Allow scrolling within the container
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  selectedStopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stopContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stopNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7875F8',
    backgroundColor: '#E8E7FF',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  stopText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reorderButtons: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  reorderButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
    marginVertical: 1,
  },
  disabledReorderButton: {
    backgroundColor: '#F8F8F8',
  },
  removeButton: {
    padding: 8,
    borderRadius: 4,
  },
  // Scrollable search results
  searchResultsScrollView: {
    maxHeight: 200, // Limit height for search results
  }, buttonsContainer: {
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
    padding: 12,
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
    padding: 12,
    alignItems: 'center',
  }, confirmButtonText: {
    color: '#FEFEFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Loading and error states
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#7875F8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
});
