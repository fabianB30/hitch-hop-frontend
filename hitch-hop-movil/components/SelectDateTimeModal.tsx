import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, Alert, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateTimeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (date: Date, time: Date) => void;
  initialDate?: Date;
  initialTime?: Date;
}

export default function DateTimeModal({
  isVisible,
  onClose,
  onConfirm,
  initialDate,
  initialTime,
}: Readonly<DateTimeModalProps>) {
  // Create default values that respect the 30 min minimum
  const now = new Date();
  const defaultMinTime = new Date(now);
  defaultMinTime.setMinutes(now.getMinutes() + 30);
  
  // Use provided values or defaults
  const [date, setDate] = useState(initialDate || new Date());
  const [time, setTime] = useState(initialTime || defaultMinTime);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
    // Calculate minimum allowed time (current time + 30 mins)
  const minTime = React.useMemo(() => {
    const min = new Date();
    min.setMinutes(min.getMinutes() + 30);
    return min;
  }, []);
    // Reset time if needed on date change
  useEffect(() => {
    if (isToday(date) && time < minTime) {
      setTime(new Date(minTime));
    }
  }, [date, time, minTime]);
  
  const isToday = (someDate: Date) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate && event.type !== 'dismissed') {
      setDate(selectedDate);
    }
  };
  
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    
    if (selectedTime && event.type !== 'dismissed') {
      if (isToday(date) && selectedTime < minTime) {
        if (Platform.OS === 'ios') {
          setTime(new Date(minTime));
        } else {
          Alert.alert(
            "Tiempo no válido", 
            "Por favor seleccione un horario al menos 30 minutos en el futuro.",
            [{ text: "Entendido" }]
          );
        }
      } else {
        setTime(selectedTime);
      }
    }
  };
  
  const handleConfirm = () => {
    if (isToday(date) && time < minTime) {
      Alert.alert(
        "Tiempo no válido", 
        "Por favor seleccione un horario al menos 30 minutos en el futuro.",
        [{ text: "Entendido" }]
      );
      return;
    }
    
    onConfirm(date, time);
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

  // A helper function to get the time picker value
  const getTimePickerValue = () => {
    if (isToday(date)) {
      if (time < minTime) {
        return minTime;
      }
      return time;
    }
    return time;
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Elije una fecha y hora de inicio</Text>
              </View>
              
              {/* Simple Date Display */}
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
                    minimumDate={new Date()}
                  />
                )}
              </View>
              
              {/* Divider */}
              <View style={styles.divider} />
              
              {/* Simple Time Display */}
              <View style={styles.contentContainer}>
                <TouchableOpacity 
                  style={styles.valueContainer}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.valueText}>{formatTime(time)}</Text>
                </TouchableOpacity>
                  {showTimePicker && (
                  <DateTimePicker
                    value={getTimePickerValue()}
                    mode="time"
                    display={Platform.OS === 'ios' ? "inline" : "default"}
                    onChange={handleTimeChange}
                    minimumDate={isToday(date) ? minTime : undefined}
                  />
                )}
                
                {isToday(date) && (
                  <Text style={styles.helpText}>
                    Debe ser al menos 30 minutos en el futuro
                  </Text>
                )}
              </View>
              
              {/* Action Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
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
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'Exo',
    },
    closeButton: {
        padding: 4,
    },
    contentContainer: {
        marginBottom: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    valueContainer: {
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },    valueText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000000',
    },
    pickerContainer: {
        marginTop: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 8,
    },
    selectorText: {
        fontSize: 16,
        color: '#424242',
    },
    helpText: {
        fontSize: 12,
        color: '#757575',
        fontStyle: 'italic',
        marginTop: 4,
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
        padding: 16,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FEFEFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: '#7875F8',
        fontSize: 16,
        fontWeight: '600',
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