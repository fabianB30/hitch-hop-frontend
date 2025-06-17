import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Square, CheckSquare, DollarSign } from 'lucide-react-native';

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
  // Initialize payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'gratuito', name: 'Gratuito', selected: initialPaymentMethods.includes('Gratuito') },
    { id: 'sinpe', name: 'SINPE Movil', selected: initialPaymentMethods.includes('SINPE Movil') },
    { id: 'efectivo', name: 'Efectivo', selected: initialPaymentMethods.includes('Efectivo') },
  ]);
  
  const [cost, setCost] = useState(initialCost);

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
                      {method.selected ? (
                        <CheckSquare size={24} color="#7875F8" />
                      ) : (
                        <Square size={24} color="#7875F8" />
                      )}
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
                <View style={styles.currencyIcon}>
                  <DollarSign size={20} color={paymentMethods[0].selected ? "#ccc" : "#7875F8"} />
                </View>
              </View>
              
              {/* Action Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Exo',
  },
  contentContainer: {
    marginBottom: 16,
  },
  checkboxContainer: {
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
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
  },
  costInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
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
  },
});
