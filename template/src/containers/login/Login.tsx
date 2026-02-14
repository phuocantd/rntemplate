import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '~components/input';
import tw from '~configs/tw';
import {
  selectAuthError,
  selectAuthLoading,
  signInActions,
} from '~features/auth';
import type { AppDispatch } from '~store';
import type { LoginFormValues } from '~types';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    dispatch(
      signInActions.request({
        ...values,
        expiresInMins: 30,
      }),
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`px-5 py-6`}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={tw`text-3xl font-bold text-gray-900 mb-2`}>Login</Text>
        <Text style={tw`text-gray-500 mb-6`}>
          Sign in with your username and password
        </Text>

        <FormInput
          type="text"
          name="username"
          control={control}
          label="Username"
          required
          error={errors.username?.message}
          rules={{ required: 'Username is required' }}
          inputProps={{
            placeholder: 'Enter username',
            autoCapitalize: 'none',
          }}
        />

        <FormInput
          type="text"
          name="password"
          control={control}
          label="Password"
          required
          error={errors.password?.message}
          rules={{ required: 'Password is required' }}
          inputProps={{
            placeholder: 'Enter password',
            secureTextEntry: true,
            autoCapitalize: 'none',
          }}
        />

        {authError ? (
          <Text style={tw`text-red-500 text-sm mb-3`}>{authError}</Text>
        ) : null}

        <Pressable
          disabled={loading || isSubmitting}
          onPress={handleSubmit(onSubmit)}
          style={tw.style(
            'items-center rounded-xl py-3',
            loading || isSubmitting ? 'bg-blue-300' : 'bg-blue-600',
          )}
        >
          <Text style={tw`text-white font-semibold`}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
