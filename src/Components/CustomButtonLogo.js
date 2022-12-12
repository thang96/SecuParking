import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
const CustomButtonLogo = props => {
  const {onPress, styleButton, disabled, source, styleImage} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, styleButton]}>
      <Image source={source} style={styleImage} resizeMode={'contain'} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomButtonLogo;
