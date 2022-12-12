import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Modal} from 'react-native';
import {CameraScreen, Camera, CameraType} from 'react-native-camera-kit';
import {icons, images} from '../../Constants';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
const CameraHomeScreen = () => {
  const camera = useRef();
  const [hasNfc, setHasNFC] = useState(null);
  const [cardNfc, setCardNfc] = useState('');

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      if (deviceIsSupported) {
        await NfcManager.start();
        readTag();
      }
      setHasNFC(deviceIsSupported);
    };

    checkIsSupported();
  }, []);
  const readTag = async () => {
    console.log('run');
    await NfcManager.registerTagEvent();
  };
  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      setModaCamera(true);
      setCardNfc(tag);
      // alert(JSON.stringify(tag));
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const takePicture = async () => {
    const image = await camera.current.capture();
    const resizeImage = await common.resizeImageNotVideo(image);
    console.log(resizeImage);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={camera}
        cameraType={CameraType.Back} // front/back(default)
      />
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
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonCamera: {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
export default CameraHomeScreen;
