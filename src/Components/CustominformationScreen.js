import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Modal} from 'react-native';
import {icons, images} from '../Constants';
import CustomButtonLogo from './CustomButtonLogo';
const CustominformationScreen = props => {
  const {onRequestClose, modalVisible, cancel, result} = props;
  console.log(result);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <View style={styles.eachContainer}>
            <Text style={styles.title}>Biển số :</Text>
            <Text style={styles.title}>{result?.result}</Text>
          </View>
          <CustomButtonLogo
            source={icons.ic_back}
            styleButton={styles.buttonBack}
            styleImage={styles.imageBack}
            onPress={cancel}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eachContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonBack: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
  imageBack: {
    width: 50,
    height: 50,
  },
});
export default CustominformationScreen;
