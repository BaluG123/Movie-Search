// import {View, Text} from 'react-native';
// import React from 'react';

// const SplashScreen = ({navigation}) => {
//   setTimeout(() => {
//     navigation.navigate('MovieList');
//   }, 2000);
//   return (
//     <View>
//       <Text>SplashScreen</Text>
//     </View>
//   );
// };

// export default SplashScreen;

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('MovieList');
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <Text style={styles.title}>Movie Search</Text>
        <Text style={styles.subtitle}>Discover Your Next Watch</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: wp('10%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  subtitle: {
    color: '#888',
    fontSize: wp('4%'),
  },
});

export default SplashScreen;
