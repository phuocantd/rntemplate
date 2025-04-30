import React, { ReactNode, useMemo, useState } from 'react';
import {
  TextInput as Input,
  TextInputProps as InputProps,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { tw } from '~configs/tw';
import WrapperInput, { WrapperInputProps } from './WrapperInput';
import { EyeOffSVG, EyeOnSVG } from '~assets';

export interface TextInputProps extends InputProps {
  wrapperProps?: WrapperInputProps;
  renderRight?: ReactNode;
  renderLeft?: ReactNode;
  inputStyle?: StyleProp<ViewStyle>;
  variant?: 'text' | 'area';
}

const TextInput = ({
  wrapperProps,
  renderRight,
  style,
  secureTextEntry,
  renderLeft,
  inputStyle,
  onChangeText,
  variant = 'text',
  ...props
}: TextInputProps) => {
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

  const isArea = useMemo(() => variant === 'area', [variant]);

  const onPressEye = () => {
    setIsSecureTextVisible((p) => !p);
  };

  return (
    <WrapperInput {...wrapperProps}>
      <View
        style={StyleSheet.flatten([
          tw`flex-row items-center border border-neutral-2 rounded-full px-4 py-3`,
          isArea && tw`rounded-3`,
          !!wrapperProps?.error && tw`border-function-red`,
          inputStyle,
        ])}
      >
        {renderLeft}
        <Input
          placeholderTextColor={tw.color('neutral-4')}
          cursorColor={tw.color('neutral-6')}
          {...props}
          multiline={isArea}
          style={StyleSheet.flatten([
            tw`flex-1 text-neutral-9 pt-0 pb-0 font-regular text-3.5`,
            isArea && tw`h-36 align-top`,
            style,
          ])}
          secureTextEntry={secureTextEntry && !isSecureTextVisible}
          onChangeText={onChangeText}
        />
        {renderRight}
        {secureTextEntry && (
          <Pressable onPress={onPressEye}>{isSecureTextVisible ? <EyeOnSVG /> : <EyeOffSVG />}</Pressable>
        )}
      </View>
    </WrapperInput>
  );
};

export default TextInput;
