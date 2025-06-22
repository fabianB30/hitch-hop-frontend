import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideSearch, LucideX, LucideChevronUp, LucideChevronDown } from 'lucide-react-native';

// Assets
const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

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
  }>();const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStops, setSelectedStops] = useState<string[]>(
    currentStops ? currentStops.split(',').map(stop => stop.trim()).filter(Boolean) : []
  );
  
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
    'Teatro Nacional, San José',
    'Mall San Pedro, San José',
    'Terminal de Buses MUSOC, San José',
    'Parque Central, Alajuela',
    'Hospital San Juan de Dios, San José',
    'Centro Comercial Lincoln Plaza, San José'
  ]);

  // Filter locations based on search query and exclude already selected stops
  const filteredLocations = searchQuery.trim() 
    ? locations.filter(location => 
        location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedStops.includes(location)
      )
    : [];

  const handleLocationAdd = (location: string) => {
    if (!selectedStops.includes(location)) {
      setSelectedStops(prev => [...prev, location]);
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
  };  const handleConfirm = () => {
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
    router.back();
  };
  // Separate function to render search results
  const renderSearchResults = () => {
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
          {filteredLocations.map((location) => (
            <TouchableOpacity
              key={location}
              style={styles.locationItem}
              onPress={() => handleLocationAdd(location)}
              activeOpacity={0.7}
            >
              <Text style={styles.locationText}>
                {location}
              </Text>
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
            <Text style={styles.inputLabel}>Buscar nueva parada</Text>            <View style={styles.searchInputContainer}>
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
  },
  buttonsContainer: {
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
});
