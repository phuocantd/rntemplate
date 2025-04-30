import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { tw } from '~configs/tw';

const Text = ({ style, ...props }: TextProps) => {
  return <RNText {...props} style={StyleSheet.flatten([tw`text-neutral-800 `, style])} />;
};

export default Text;
