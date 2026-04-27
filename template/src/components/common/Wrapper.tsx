import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '~configs/tw';
import LoadingOverlay from './LoadingOverlay';

export interface WrapperProps {
  children: React.ReactNode;
  /** Render a header above the content area */
  renderHeader?: React.ReactNode;
  /** Show the full-screen LoadingOverlay. Default: false */
  showLoading?: boolean;
  /** Background color of the screen. Default: '#ffffff' */
  bgColor?: string;
  /** Background color of the status bar safe area. Default: '#ffffff' */
  statusBarColor?: string;
  /** Status bar icon style. Default: 'dark-content' */
  barStyle?: StatusBarStyle;
  /** Disable KeyboardAvoidingView on iOS. Default: false */
  disableKeyboardAvoid?: boolean;
  /** Add safe-area padding at the bottom of the screen. Default: false */
  safeAreaBottom?: boolean;
  /** Hide the top safe-area spacer (e.g. for full-bleed headers). Default: false */
  hideTopSafeArea?: boolean;
}

export function Wrapper({
  children,
  renderHeader,
  showLoading = false,
  bgColor = '#ffffff',
  statusBarColor = '#ffffff',
  barStyle = 'dark-content',
  disableKeyboardAvoid = false,
  safeAreaBottom = false,
  hideTopSafeArea = false,
}: WrapperProps) {
  const { top, bottom } = useSafeAreaInsets();

  const bgStyle = { backgroundColor: bgColor };
  const safeAreaTopStyle = { height: top, backgroundColor: statusBarColor };
  const safeAreaBottomStyle = { height: bottom };

  return (
    <View style={[tw`flex-1`, bgStyle]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle}
      />

      {!hideTopSafeArea && <View style={safeAreaTopStyle} />}

      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior="padding"
        enabled={Platform.OS === 'ios' && !disableKeyboardAvoid}
      >
        {renderHeader}
        <View style={tw`flex-1`}>{children}</View>
        {safeAreaBottom && <View style={safeAreaBottomStyle} />}
      </KeyboardAvoidingView>

      {showLoading && <LoadingOverlay />}
    </View>
  );
}

export default Wrapper;
