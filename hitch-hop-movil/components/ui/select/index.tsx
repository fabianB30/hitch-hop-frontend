'use client';
import React, { useState } from 'react';
import {
  View,
  Pressable,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';

const selectStyle = tva({
  base: 'border-background-300 border rounded px-4 py-3 flex-row items-center justify-between bg-white',
  variants: {
    isInvalid: {
      true: 'border-error-700',
      false: '',
    },
    isDisabled: {
      true: 'opacity-50',
      false: '',
    },
  },
});

type SelectProps = {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  className?: string;
};

const Select = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Selecciona una opción',
  isInvalid = false,
  isDisabled = false,
  className,
}: SelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable
        className={selectStyle({ isInvalid, isDisabled, class: className })}
        onPress={() => !isDisabled && setModalVisible(true)}
        disabled={isDisabled}
      >
        <Text style={{ color: selectedValue ? '#000' : '#888' }}>
          {selectedValue || placeholder}
        </Text>
        <ChevronDown size={18} color="#888" />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const SelectError = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ color: '#EF4444', fontSize: 13, marginTop: 2, marginLeft: 4 }}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 6,
    maxHeight: 400,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

Select.displayName = 'Select';
SelectError.displayName = 'SelectError';

export { Select, SelectError };

