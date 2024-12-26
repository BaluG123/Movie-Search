import {View, Text} from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('MovieList');
  }, 2000);
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
