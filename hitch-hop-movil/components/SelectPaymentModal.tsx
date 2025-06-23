// Autores: Anthony Guevara
// Modal para seleccionar el método de pago y costo de una ruta
// Llamado en la página del formulario de publicación de rutas

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { CheckSquare } from 'lucide-react-native';
import * as Font from 'expo-font';

interface PaymentMethod {
  id: string;
  name: string;
  selected: boolean;
}

interface SelectPaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (paymentMethods: string[], cost: string) => void;
  initialPaymentMethods?: string[];
  initialCost?: string;
}

export default function SelectPaymentModal({
  isVisible,
  onClose,
  onConfirm,
  initialPaymentMethods = [],
  initialCost = '',
}: Readonly<SelectPaymentModalProps>) {  
  // Font loading state
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Initialize payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { 
      id: 'gratuito', 
      name: 'Gratuito', 
      selected: initialPaymentMethods.includes('Gratuito') 
    },
    { 
      id: 'sinpe', 
      name: 'SINPE Movil', 
      selected: initialPaymentMethods.includes('Sinpe') || initialPaymentMethods.includes('SINPE Movil')
    },
    { 
      id: 'efectivo', 
      name: 'Efectivo', 
      selected: initialPaymentMethods.includes('Efectivo') 
    },
  ]);  
  const [cost, setCost] = useState(initialCost);

  // Load fonts
  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  // Don't render until fonts are loaded
  if (!fontsLoaded) return null;

  // Handle checkbox toggle
  const togglePaymentMethod = (id: string) => {
    const updatedMethods = [...paymentMethods];
    
    // Find the method to toggle
    const methodIndex = updatedMethods.findIndex(method => method.id === id);
    
    if (methodIndex === -1) return;
    
    const isFree = id === 'gratuito';
    const willBeSelected = !updatedMethods[methodIndex].selected;
    
    // If trying to select 'Gratuito', deselect others
    if (isFree && willBeSelected) {
      updatedMethods.forEach(method => {
        method.selected = method.id === 'gratuito';
      });
      // Clear cost as it's free
      setCost('');
    } 
    // If trying to select another option while 'Gratuito' is selected, deselect 'Gratuito'
    else if (!isFree && willBeSelected) {
      updatedMethods.forEach(method => {
        if (method.id === 'gratuito') {
          method.selected = false;
        }
        if (method.id === id) {
          method.selected = true;
        }
      });
    } 
    // Normal toggle for non-free options
    else if (!isFree) {
      updatedMethods[methodIndex].selected = willBeSelected;
    }
    
    setPaymentMethods(updatedMethods);
  };

  // Handle confirm button
  const handleConfirm = () => {
    const selectedMethods = paymentMethods
      .filter(method => method.selected)
      .map(method => method.name);
    
    // If 'Gratuito' is selected, ensure cost is empty
    const finalCost = selectedMethods.includes('Gratuito') ? '' : cost;
    
    onConfirm(selectedMethods, finalCost);
    onClose();
  };
  
  // Validation check before confirming
  const isValidSelection = () => {
    const hasSelectedMethod = paymentMethods.some(method => method.selected);
    const isFreeSelected = paymentMethods.find(m => m.id === 'gratuito')?.selected || false;
    
    // If free is selected, no cost is needed
    if (isFreeSelected) return hasSelectedMethod;
    
    // If not free, need both a payment method and a cost
    return hasSelectedMethod && cost.trim() !== '';
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
                <Text style={styles.title}>Método de pago</Text>
              </View>
              
              {/* Payment Method Checkboxes */}
              <View style={styles.contentContainer}>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={styles.checkboxContainer}
                    onPress={() => togglePaymentMethod(method.id)}
                  >
                    <View style={styles.checkboxRow}>
                      <View style={[
                        styles.customCheckbox,
                        method.selected && styles.checkedCheckbox
                      ]}>
                        {method.selected && (
                          <CheckSquare size={20} color="#FFFFFF" />
                        )}
                      </View>
                      <Text style={styles.methodText}>{method.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Divider */}
              <View style={styles.divider} />
              
              {/* Cost Input - disabled if Gratuito is selected */}
              <View style={styles.costContainer}>
                <TextInput
                  style={[
                    styles.costInput,
                    paymentMethods[0].selected ? styles.disabledInput : null
                  ]}
                  placeholder="Costo por pasajero"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={cost}
                  onChangeText={setCost}
                  editable={!paymentMethods[0].selected}
                />
              </View>
              
              {/* Action Buttons */}
              <View style={styles.buttonsContainer}>
                {/* Cancel Button */}
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                {/* Confirm Button */}
                <TouchableOpacity 
                  style={[
                    styles.confirmButton, 
                    !isValidSelection() && styles.disabledButton
                  ]} 
                  onPress={handleConfirm}
                  disabled={!isValidSelection()}
                >
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
  },  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Exo-Bold',
  },
  contentContainer: {
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#7875F8',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkedCheckbox: {
    backgroundColor: '#7875F8',
    borderColor: '#7875F8',
  },  methodText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'Exo-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDCDB',
    width: '100%',
    marginVertical: 16,
    alignSelf: 'center',
    opacity: 0.5,
  },
  costContainer: {
    marginBottom: 24,
    position: 'relative',
  },  costInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
    fontFamily: 'Exo-Regular',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: '#999',
  },
  currencyIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  disabledButton: {
    backgroundColor: '#D1D1D1',
  },  confirmButtonText: {
    color: '#FEFEFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Exo-Bold',
  },  cancelButtonText: {
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
  },
});
