import React from 'react';
import { Pressable, Text, View } from 'react-native';
import tw from '~configs/tw';

export type InputOption<TValue extends string | number = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

export interface RadioProps<TValue extends string | number = string> {
  label?: string;
  value?: TValue;
  options: InputOption<TValue>[];
  onChange: (value: TValue) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Radio<TValue extends string | number = string>({
  label,
  value,
  options,
  onChange,
  error,
  required = false,
  disabled = false,
}: RadioProps<TValue>) {
  return (
    <View style={tw`w-full mb-4`}>
      {label ? (
        <Text style={tw`text-gray-800 text-sm font-medium mb-2`}>
          {label}
          {required ? <Text style={tw`text-red-500`}> *</Text> : null}
        </Text>
      ) : null}

      <View>
        {options.map(option => {
          const isSelected = option.value === value;
          const isDisabled = disabled || option.disabled;

          return (
            <Pressable
              key={String(option.value)}
              onPress={() => !isDisabled && onChange(option.value)}
              style={tw.style(
                'flex-row items-center rounded-xl border px-3 py-3',
                isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white',
                isDisabled ? 'opacity-50' : '',
                'mb-2',
              )}
            >
              <View
                style={tw.style(
                  'h-5 w-5 rounded-full border-2 items-center justify-center mr-3',
                  isSelected ? 'border-blue-600' : 'border-gray-400',
                )}
              >
                {isSelected ? (
                  <View style={tw`h-2.5 w-2.5 rounded-full bg-blue-600`} />
                ) : null}
              </View>
              <Text style={tw`text-gray-900`}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text> : null}
    </View>
  );
}

export default Radio;
