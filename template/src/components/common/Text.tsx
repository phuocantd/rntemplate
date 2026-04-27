import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import tw from '~configs/tw';

interface Props extends TextProps {}

const Text = ({ style, ...props }: Props) => {
  return <RNText style={StyleSheet.flatten([tw``, style])} {...props} />;
};

export default Text;
