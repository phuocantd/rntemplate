import React from 'react';
import { Text, View } from 'react-native';
import { tw } from '~configs/tw';

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
