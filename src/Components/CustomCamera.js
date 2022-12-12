import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Modal} from 'react-native';
import {CameraScreen, Camera, CameraType} from 'react-native-camera-kit';
import {icons, images} from '../Constants';
import common from '../Utils/common';
const CustomCamera = props => {
  const camera = useRef();
  const {onRequestClose, modalVisible, cancel, getPicture} = props;
  const takePicture = async () => {
    const image = await camera.current.capture();
    const resizeImage = await common.resizeImageNotVideo(image);
    getPicture(resizeImage);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            ref={camera}
            cameraType={CameraType.Back} // front/back(default)
          />
          <View style={styles.viewVertical} />
          <TouchableOpacity onPress={takePicture} style={styles.buttonCamera}>
            <Image
              source={icons.ic_circle}
              style={{
                width: 70,
                height: 70,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  viewModal: {
    width: '100%',
    height: '100%',
    zIndex: 9999,
    position: 'absolute',
  },
  horizontalLine: {
    flex: 1,
    height: 200,
  },
  viewVertical: {flex: 1},
  buttonCamera: {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
export default CustomCamera;
