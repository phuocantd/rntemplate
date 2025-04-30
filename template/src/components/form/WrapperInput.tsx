import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { tw } from '~configs/tw';

export type WrapperInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  optional?: boolean;
  hideError?: boolean;
};

const WrapperInput = ({
  containerStyle,
  titleStyle,
  title,
  errorStyle,
  error,
  children,
  hideError = false,
}: WrapperInputProps) => {
  return (
    <View style={StyleSheet.flatten([tw``, containerStyle])}>
      <View style={tw`flex-row items-center justify-between`}>
        {!!title && <Text style={[tw`mb-1 text-neutral-900`, titleStyle]}>{title}</Text>}
      </View>
      {children}
      {!!error && !hideError && <Text style={[tw`mt-1 bodySmall text-red-500`, errorStyle]}>{error}</Text>}
    </View>
  );
};

export default WrapperInput;
