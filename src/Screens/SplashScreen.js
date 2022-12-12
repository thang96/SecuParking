import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Animated,
} from 'react-native';
import {icons, images} from '../Constants';
const SplashScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    scaleAnimated();
  }, []);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const scaleAnimated = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, [isFocused]);
  useEffect(() => {
    if (!isReady) return;
    if (isReady) {
      setIsReady(false);
      navigation.navigate('HomeNavigation');
    }
  }, [isReady]);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={images.im_background}>
        <Animated.Image
          style={{
            tintColor: 'rgb(2,255,255)',
            width: 250,
            height: 250,
            transform: [{scale: scaleValue}],
          }}
          source={icons.ic_scan}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(5,11,41)',
  },
});

export default SplashScreen;
