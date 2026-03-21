import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import tw from '~configs/tw';
import { useAppNavigation } from '~navigation';
import Text from './Text';

export interface HeaderProps {
  title?: string | React.ReactNode;
  /** Custom element on the left side. Overrides the default back button */
  renderLeft?: React.ReactElement;
  /** Custom element on the right side */
  renderRight?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  /** Show the back button when the stack can go back. Default: true */
  showBack?: boolean;
  /** Override the default back navigation handler */
  onBack?: () => void;
}

export function Header({
  title,
  renderLeft,
  renderRight,
  style,
  showBack = true,
  onBack,
}: HeaderProps) {
  const navigation = useAppNavigation();
  const canGoBack = navigation.canGoBack();

  const handleBack = onBack ?? (() => navigation.goBack());

  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  // Equal padding on both sides so title stays truly centered,
  // while still having enough room to not overlap either slot.
  const titlePadding = Math.max(leftWidth, rightWidth);
  const titlePaddingStyle = { paddingHorizontal: titlePadding };

  const leftSlot =
    renderLeft ??
    (showBack && canGoBack ? (
      <TouchableOpacity onPress={handleBack} hitSlop={8}>
        <Text style={tw`text-primary text-base`}>Back</Text>
      </TouchableOpacity>
    ) : null);

  return (
    <View style={[tw`flex-row items-center h-14 bg-white`, style]}>
      {/* Left slot — measured to determine title padding */}
      <View
        style={tw`px-4`}
        onLayout={e => setLeftWidth(e.nativeEvent.layout.width)}
      >
        {leftSlot}
      </View>

      {/* Spacer pushes right slot to the end */}
      <View style={tw`flex-1`} />

      {/* Right slot — measured to determine title padding */}
      <View
        style={tw`px-4`}
        onLayout={e => setRightWidth(e.nativeEvent.layout.width)}
      >
        {renderRight ?? null}
      </View>

      {/*
       * Title is absolutely centered over the full header.
       * paddingHorizontal = max(leftWidth, rightWidth) keeps the title
       * truly centered while preventing overlap with either slot.
       * pointerEvents="none" lets touches pass through to the slots below.
       */}
      <View
        style={[StyleSheet.absoluteFill, tw`items-center justify-center`, titlePaddingStyle]}
        pointerEvents="none"
      >
        {typeof title === 'string' ? (
          <Text
            style={tw`text-base font-semibold text-gray-900`}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
    </View>
  );
}

export default Header;
