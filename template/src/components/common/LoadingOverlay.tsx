import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import tw from '~configs/tw';
import Text from './Text';

export interface LoadingOverlayProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: 'small' | 'large' | number;
  text?: string;
}

export function LoadingOverlay({
  style,
  color = 'white',
  size = 'large',
  text,
}: LoadingOverlayProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });

    anim.start();

    return () => anim.stop();
  }, [opacity]);

  const animatedStyle = { opacity };

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, tw`items-center justify-center bg-black/50`, style, animatedStyle]}
    >
      <ActivityIndicator size={size} color={color} />
      {!!text && (
        <View style={tw`mt-4`}>
          <Text>{text}</Text>
        </View>
      )}
    </Animated.View>
  );
}

export default LoadingOverlay;
