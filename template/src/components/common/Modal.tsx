import { useKeyboard } from '@react-native-community/hooks';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '~configs/tw';

export type ModalType = 'center' | 'bottom' | 'full';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: ModalType;
  title?: string;
  /** Close modal when tapping the backdrop. Default: true */
  closeOnBackdrop?: boolean;
  /** Show the top-right close button. Default: true */
  showCloseButton?: boolean;
  /**
   * Wrap children in a ScrollView so content is scrollable and safe when
   * the keyboard pushes the modal up. Default: true
   */
  scrollable?: boolean;
}

const KB_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const ANIM: Record<ModalType, 'fade' | 'slide'> = {
  center: 'fade',
  bottom: 'slide',
  full: 'slide',
};

export function Modal({
  visible,
  onClose,
  children,
  type = 'center',
  title,
  closeOnBackdrop = true,
  showCloseButton = true,
  scrollable = true,
}: ModalProps) {
  const insets = useSafeAreaInsets();
  const { keyboardShown } = useKeyboard();

  const safeAreaTopStyle = { paddingTop: insets.top };
  const safeAreaSpacerStyle = { height: keyboardShown ? 0 : insets.bottom };
  const bottomSheetPaddingStyle = { paddingBottom: keyboardShown ? 0 : insets.bottom };

  const header =
    title || showCloseButton ? (
      <View
        style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-100`}
      >
        <Text
          style={tw`text-base font-semibold text-gray-900 flex-1 mr-3`}
          numberOfLines={1}
        >
          {title ?? ''}
        </Text>
        {showCloseButton ? (
          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <Text style={tw`text-blue-600 font-medium`}>Close</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    ) : null;

  const body = scrollable ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={tw`p-4 flex-grow`}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={tw`p-4`}>{children}</View>
  );

  // ─── Full-screen modal ────────────────────────────────────────────────────
  if (type === 'full') {
    return (
      <RNModal
        visible={visible}
        animationType={ANIM.full}
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <KeyboardAvoidingView behavior={KB_BEHAVIOR} style={tw`flex-1`}>
          <View style={[tw`flex-1 bg-white`, safeAreaTopStyle]}>
            {header}
            {body}
            {/* Reserve safe-area space below content unless keyboard is open */}
            <View style={safeAreaSpacerStyle} />
          </View>
        </KeyboardAvoidingView>
      </RNModal>
    );
  }

  // ─── Center / Bottom modal ────────────────────────────────────────────────
  const isBottom = type === 'bottom';

  return (
    <RNModal
      visible={visible}
      animationType={ANIM[type]}
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop — absolute fill behind everything */}
      <Pressable
        style={[StyleSheet.absoluteFill, styles.overlay]}
        onPress={closeOnBackdrop ? onClose : undefined}
      />

      {/*
       * KeyboardAvoidingView pushes the sheet above the keyboard.
       * pointerEvents="box-none" lets taps on the KAV background
       * fall through to the backdrop Pressable above.
       */}
      <KeyboardAvoidingView
        behavior={KB_BEHAVIOR}
        style={isBottom ? tw`flex-1 justify-end` : tw`flex-1 justify-center px-6`}
        pointerEvents="box-none"
      >
        {/*
         * onStartShouldSetResponder stops touch events on the sheet
         * from bubbling up to the backdrop when tapping sheet content.
         */}
        <View
          style={[
            tw`bg-white`,
            isBottom ? styles.bottomSheet : styles.centerModal,
            isBottom ? bottomSheetPaddingStyle : undefined,
          ]}
          onStartShouldSetResponder={() => true}
        >
          {header}
          {body}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  centerModal: {
    width: '100%',
    borderRadius: 16,
    maxHeight: '85%',
  },
});
