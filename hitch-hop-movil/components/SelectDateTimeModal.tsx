// Autores: Anthony Guevara
// Modal para seleccionar fecha y hora de inicio de una ruta
// Llamado en la página del formulario de publicación de rutas

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Font from 'expo-font';

interface DateTimeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (date: Date, departureTime: Date, arrivalTime: Date) => void;
  initialDate?: Date;
  initialDepartureTime?: Date;
  initialArrivalTime?: Date;
}

export default function DateTimeModal({
  isVisible,
  onClose,
  onConfirm,
  initialDate,
  initialDepartureTime,
  initialArrivalTime,
}: Readonly<DateTimeModalProps>) {
  // Font loading state
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  // Create default values that respect the 30 min minimum
  const now = new Date();
  const defaultMinTime = new Date(now);
  defaultMinTime.setMinutes(now.getMinutes() + 30);
    const defaultArrivalTime = new Date(defaultMinTime);
  defaultArrivalTime.setMinutes(defaultMinTime.getMinutes() + 30); // Default 30 minutes after departure
    
  // Calculate minimum allowed date (tomorrow)
  const minDate = React.useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to start of day
    return tomorrow;
  }, []);

  // Use provided values or defaults - but ensure they're not before minimum date
  const [date, setDate] = useState(() => {
    const initialDateToUse = initialDate || new Date();
    return initialDateToUse < minDate ? minDate : initialDateToUse;
  });
  
  const [departureTime, setDepartureTime] = useState(initialDepartureTime ?? defaultMinTime);
  const [arrivalTime, setArrivalTime] = useState(initialArrivalTime ?? defaultArrivalTime);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDepartureTimePicker, setShowDepartureTimePicker] = useState(false);
  const [showArrivalTimePicker, setShowArrivalTimePicker] = useState(false);
  // Load fonts
  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);
  
  // Clean up validation message when modal opens/closes
  useEffect(() => {
    if (isVisible) {
      setShowValidationMessage(false);
    }
  }, [isVisible]);

  // Reset time if needed on date change
  useEffect(() => {
    // Since we only allow dates from tomorrow onward, we don't need to check if it's today
    // But we can ensure a reasonable default time
    if (!departureTime) {
      const defaultTime = new Date();
      defaultTime.setHours(8, 0, 0, 0); // Default to 8:00 AM
      setDepartureTime(defaultTime);
    }
    
    // Don't automatically adjust arrival time here - let the validation message show first
    // Only auto-adjust on initial load if no initial arrival time was provided
    if (!initialArrivalTime && arrivalTime && departureTime) {
      const minimumArrivalTime = new Date(departureTime);
      minimumArrivalTime.setMinutes(departureTime.getMinutes() + 30);
      
      if (arrivalTime < minimumArrivalTime) {
        setArrivalTime(minimumArrivalTime);
      }
    }
  }, [date, departureTime, arrivalTime, initialArrivalTime]);// Don't render until fonts are loaded
  if (!fontsLoaded) return null;
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate && event.type !== 'dismissed') {
      setDate(selectedDate);
    }
  };
  const handleDepartureTimeChange = (event: any, selectedTime?: Date) => {
    setShowDepartureTimePicker(Platform.OS === 'ios');
    
    if (selectedTime && event.type !== 'dismissed') {
      setDepartureTime(selectedTime);
      setShowValidationMessage(true);
      
      // Show validation message for 2 seconds, then auto-adjust if needed
      setTimeout(() => {
        const minimumArrivalTime = new Date(selectedTime);
        minimumArrivalTime.setMinutes(selectedTime.getMinutes() + 30);
        
        if (arrivalTime < minimumArrivalTime) {
          setArrivalTime(minimumArrivalTime);
          setShowValidationMessage(false);
        } else {
          setShowValidationMessage(false);
        }
      }, 2000);
    }
  };
  const handleArrivalTimeChange = (event: any, selectedTime?: Date) => {
    setShowArrivalTimePicker(Platform.OS === 'ios');
    
    if (selectedTime && event.type !== 'dismissed') {
      // Always update the arrival time first to show the user's selection
      setArrivalTime(selectedTime);
      
      // Check if selected time is valid
      const minimumArrivalTime = new Date(departureTime);
      minimumArrivalTime.setMinutes(departureTime.getMinutes() + 30);
      
      if (selectedTime >= minimumArrivalTime) {
        setShowValidationMessage(false);
      } else {
        setShowValidationMessage(true);
        // Auto-correct after showing the validation message for 2 seconds
        setTimeout(() => {
          setArrivalTime(minimumArrivalTime);
          setShowValidationMessage(false);
        }, 2000);
      }
    }
  };
  const handleConfirm = () => {
    // Validate that arrival is at least 30 minutes after departure
    const minimumArrivalTime = new Date(departureTime);
    minimumArrivalTime.setMinutes(departureTime.getMinutes() + 30);
    
    if (arrivalTime < minimumArrivalTime) {
      // Auto-fix: set arrival 30 minutes after departure
      setArrivalTime(minimumArrivalTime);
      onConfirm(date, departureTime, minimumArrivalTime);
    } else {
      onConfirm(date, departureTime, arrivalTime);
    }
    setShowValidationMessage(false);
    onClose();
  };

  const handleClose = () => {
    setShowValidationMessage(false);
    onClose();
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    };
    let formatted = date.toLocaleDateString('es-ES', options);
    // Capitalize first letter
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Elije fecha y horarios</Text>
              </View>
              
              {/* Date Selection */}
              <View style={styles.contentContainer}>
                <TouchableOpacity 
                  style={styles.valueContainer}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.valueText}>{formatDate(date)}</Text>
                </TouchableOpacity>
                
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? "inline" : "default"}
                    onChange={handleDateChange}
                    minimumDate={minDate}
                    accentColor="#7875F8" 
                  />
                )}
              </View>
                {/* Divider */}
              <View style={styles.divider} />
              
              {/* Time Selection Row */}
              <View style={styles.timeRowContainer}>
                {/* Departure Time Selection */}
                <View style={styles.timeContainer}>
                  <Text style={styles.labelText}>Hora de salida</Text>
                  <TouchableOpacity 
                    style={styles.valueContainer}
                    onPress={() => setShowDepartureTimePicker(true)}
                  >
                    <Text style={styles.valueText}>{formatTime(departureTime)}</Text>
                  </TouchableOpacity>
                  
                  {showDepartureTimePicker && (
                    <DateTimePicker
                      value={departureTime}
                      mode="time"
                      display={Platform.OS === 'ios' ? "inline" : "default"}
                      onChange={handleDepartureTimeChange}
                      accentColor="#7875F8"
                    />
                  )}
                </View>
                
                {/* Arrival Time Selection */}
                <View style={styles.timeContainer}>
                  <Text style={styles.labelText}>Hora de llegada</Text>
                  <TouchableOpacity 
                    style={styles.valueContainer}
                    onPress={() => setShowArrivalTimePicker(true)}
                  >
                    <Text style={styles.valueText}>{formatTime(arrivalTime)}</Text>
                  </TouchableOpacity>
                  
                  {showArrivalTimePicker && (
                    <DateTimePicker
                      value={arrivalTime}
                      mode="time"
                      display={Platform.OS === 'ios' ? "inline" : "default"}
                      onChange={handleArrivalTimeChange}
                      accentColor="#7875F8"
                    />
                  )}
                </View>
              </View>              {/* Validation message */}
              {(showValidationMessage || (() => {
                const minimumArrivalTime = new Date(departureTime);
                minimumArrivalTime.setMinutes(departureTime.getMinutes() + 30);
                return arrivalTime < minimumArrivalTime;
              })()) && (
                <View style={styles.helpTextContainer}>
                  <Text style={styles.helpText}>
                    La hora de llegada debe ser al menos 30 minutos después de la salida
                  </Text>
                  <Text style={styles.hintText}>
                    Selecciona {(() => {
                      const minTime = new Date(departureTime);
                      minTime.setMinutes(departureTime.getMinutes() + 30);
                      return minTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                    })()} o más tarde
                  </Text>
                </View>
              )}
                {/* Action Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'Exo-Bold',
    },
    closeButton: {
        padding: 4,
    },    contentContainer: {
        marginBottom: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        gap: 10,
    },
    timeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },    labelText: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Exo-Regular',
        textAlign: 'center',
        fontWeight: '600',
    },
    valueContainer: {
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },    valueText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Exo-Regular',
    },
    pickerContainer: {
        marginTop: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 8,
    },    selectorText: {
        fontSize: 16,
        color: '#424242',
        fontFamily: 'Exo-Regular',
    },    helpText: {
        fontSize: 12,
        color: '#757575',
        fontStyle: 'italic',
        marginTop: 4,
        fontFamily: 'Exo-Regular',
        textAlign: 'center',
    },
    hintText: {
        fontSize: 11,
        color: '#7875F8',
        fontWeight: '600',
        marginTop: 2,
        fontFamily: 'Exo-Bold',
        textAlign: 'center',
    },
    helpTextContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#DDDCDB',
        width: '100%',
        marginVertical: 16,
        alignSelf: 'center',
        opacity: 0.5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 24,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
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
        fontFamily: 'Exo-Bold',
    },    cancelButtonText: {
        color: '#7875F8',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Exo-Bold',
    },
    cancelButton: {
        flex: 1,
        borderColor: '#7875F8',
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginRight: 8,
    },
});