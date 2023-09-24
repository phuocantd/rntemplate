import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { tw } from '~configs/tw';

interface Props extends FastImageProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const FImage = ({ containerStyle, ...props }: Props) => {
  return (
    <View style={containerStyle}>
      <FastImage style={tw`flex-1`} {...props} />
    </View>
  );
};

export default FImage;
