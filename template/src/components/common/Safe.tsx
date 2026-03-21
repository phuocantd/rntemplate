import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SafeProps {
  top?: boolean;
  bottom?: boolean;
}

export function Safe({ top, bottom = !top }: SafeProps) {
  const insets = useSafeAreaInsets();
  const height = top ? insets.top : bottom ? insets.bottom : 0;
  const safeStyle = { height };

  return <View style={safeStyle} />;
}

export default Safe;
