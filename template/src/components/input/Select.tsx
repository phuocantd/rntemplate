import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '~configs/tw';
import { InputOption } from './Radio';

export interface SelectProps<TValue extends string | number = string> {
  label?: string;
  value?: TValue;
  options: InputOption<TValue>[];
  onChange: (value: TValue) => void;
  placeholder?: string;
  modalTitle?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Select<TValue extends string | number = string>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  modalTitle = 'Choose an option',
  error,
  required = false,
  disabled = false,
}: SelectProps<TValue>) {
  const [visible, setVisible] = useState(false);

  const selectedLabel = useMemo(() => {
    return options.find(option => option.value === value)?.label;
  }, [options, value]);

  const onSelect = (optionValue: TValue) => {
    onChange(optionValue);
    setVisible(false);
  };

  return (
    <View style={tw`w-full mb-4`}>
      {label ? (
        <Text style={tw`text-gray-800 text-sm font-medium mb-2`}>
          {label}
          {required ? <Text style={tw`text-red-500`}> *</Text> : null}
        </Text>
      ) : null}

      <Pressable
        onPress={() => !disabled && setVisible(true)}
        style={tw.style(
          'border rounded-xl px-4 py-3 bg-white',
          error ? 'border-red-500' : 'border-gray-300',
          disabled ? 'bg-gray-100 opacity-60' : '',
        )}
      >
        <Text style={tw.style(selectedLabel ? 'text-gray-900' : 'text-gray-400')}>
          {selectedLabel ?? placeholder}
        </Text>
      </Pressable>

      {error ? <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text> : null}

      <Modal visible={visible} animationType="fade" transparent>
        <View
          style={[
            tw`flex-1 justify-center px-6`,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          ]}
        >
          <View style={[tw`bg-white rounded-2xl`, { maxHeight: '70%' }]}>
            <View style={tw`flex-row items-center justify-between px-4 py-4 border-b border-gray-200`}>
              <Text style={tw`text-base font-semibold text-gray-900`}>
                {modalTitle}
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={tw`text-blue-600 font-medium`}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`p-2`}>
              {options.map(option => {
                const isSelected = option.value === value;
                const isDisabled = Boolean(option.disabled);

                return (
                  <Pressable
                    key={String(option.value)}
                    onPress={() => !isDisabled && onSelect(option.value)}
                    style={tw.style(
                      'px-3 py-3 rounded-xl mb-1',
                      isSelected ? 'bg-blue-50' : 'bg-white',
                      isDisabled ? 'opacity-50' : '',
                    )}
                  >
                    <Text
                      style={tw.style(
                        isSelected
                          ? 'text-blue-700 font-medium'
                          : 'text-gray-900',
                      )}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Select;
