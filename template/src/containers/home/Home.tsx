import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { FormInput } from '~components/input';
import tw from '~configs/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

type DemoFormValues = {
  fullName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: 'vn' | 'us' | 'jp';
};

const Home = () => {
  const [submittedData, setSubmittedData] = useState<DemoFormValues | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      gender: 'male',
      country: 'vn',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: DemoFormValues) => {
    setSubmittedData(values);
  };

  const onReset = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView
        style={tw`flex-1 bg-gray-50`}
        contentContainerStyle={tw`px-4 py-6`}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>
          Form Input Demo
        </Text>
        <Text style={tw`text-gray-600 mb-6`}>
          Test `text`, `radio`, `select` via `FormInput` + react-hook-form
        </Text>

        <FormInput
          type="text"
          name="fullName"
          control={control}
          label="Full Name"
          required
          error={errors.fullName?.message}
          rules={{ required: 'Full name is required' }}
          inputProps={{ placeholder: 'Enter your full name' }}
        />

        <FormInput
          type="text"
          name="email"
          control={control}
          label="Email"
          required
          error={errors.email?.message}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email format is invalid',
            },
          }}
          inputProps={{
            placeholder: 'Enter your email',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
        />

        <FormInput
          type="radio"
          name="gender"
          control={control}
          label="Gender"
          required
          error={errors.gender?.message}
          rules={{ required: 'Please choose gender' }}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
        />

        <FormInput
          type="select"
          name="country"
          control={control}
          label="Country"
          required
          error={errors.country?.message}
          rules={{ required: 'Please choose country' }}
          options={[
            { label: 'Vietnam', value: 'vn' },
            { label: 'United States', value: 'us' },
            { label: 'Japan', value: 'jp' },
          ]}
          inputProps={{
            placeholder: 'Tap to choose country',
            modalTitle: 'Select Country',
          }}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={tw.style(
            'items-center rounded-xl py-3 mt-2',
            isSubmitting ? 'bg-blue-300' : 'bg-blue-600',
          )}
        >
          <Text style={tw`text-white font-semibold`}>Submit</Text>
        </Pressable>

        <Pressable
          onPress={onReset}
          style={tw`items-center rounded-xl py-3 mt-3 border border-gray-300 bg-white`}
        >
          <Text style={tw`text-gray-700 font-semibold`}>Reset</Text>
        </Pressable>

        {submittedData ? (
          <View style={tw`mt-6 p-4 rounded-xl bg-white border border-gray-200`}>
            <Text style={tw`font-semibold text-gray-900 mb-2`}>
              Submitted Data
            </Text>
            <Text style={tw`text-gray-700`}>
              {JSON.stringify(submittedData, null, 2)}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
