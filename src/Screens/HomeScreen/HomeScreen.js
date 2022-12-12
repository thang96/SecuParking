import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {icons, images} from '../../Constants';
// import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
import CustomCamera from '../../Components/CustomCamera';
import {CutImageAPI} from '../../Apis/SecuParkingAPI';
import CustominformationScreen from '../../Components/CustominformationScreen';
import common from '../../Utils/common';
const HomeScreen = () => {
  const navigation = useNavigation();
  const scanValue = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const [hasNfc, setHasNFC] = useState(null);
  const [result, setResult] = useState(null);
  const [modaCamera, setModaCamera] = useState(false);
  const [modaInfor, setModaInfor] = useState(false);
  const [cardNfc, setCardNfc] = useState('');

  useEffect(() => {
    scanAnimated();
    readTag();
  }, [isFocused]);
  const spin = scanValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120],
  });
  const scanAnimated = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(scanValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  };

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
  const getDetalCard = async image => {
    let value = {
      imageLicense: image,
      cardInfo: cardNfc,
    };
    navigation.navigate('DetailInforScreen', value);
    setModaCamera(false);
    // await CutImageAPI(image)
    //   .then(res => {
    //     setResult(res?.data);
    //     setModaInfor(true);
    //     setModaCamera(false);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     setModaCamera(false);
    //   });
  };
  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.container}>
        {modaCamera && (
          <View style={styles.viewModal}>
            <CustomCamera
              cancel={() => setModaCamera(false)}
              getPicture={image => getDetalCard(image)}
            />
          </View>
        )}
        {modaInfor && (
          <View style={styles.viewModal}>
            <CustominformationScreen
              result={result}
              cancel={() => setModaInfor(false)}
            />
          </View>
        )}
        <Text style={{fontSize: 16, color: 'white'}}>NFC not supported</Text>
        <TouchableOpacity
          style={{width: 60, height: 60, backgroundColor: 'white'}}
          onPress={() => setModaCamera(true)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {modaCamera && (
        <View style={styles.viewModal}>
          <CustomCamera
            cancel={() => setModaCamera(false)}
            getPicture={image => getDetalCard(image)}
          />
        </View>
      )}
      {modaInfor && (
        <View style={styles.viewModal}>
          <CustominformationScreen
            result={result}
            cancel={() => setModaInfor(false)}
          />
        </View>
      )}
      <Text style={styles.textTitle}>Scan your NFC card</Text>
      <View style={styles.containerViewScan}>
        <Image style={styles.eachContainerViewScan} source={icons.ic_crop} />
        <Image style={styles.childrenViewScan} source={icons.ic_card} />
        <Animated.View
          style={[styles.lineScan, {transform: [{translateY: spin}]}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(2,21,66)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
  },
  containerViewScan: {
    width: '90%',
    height: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachContainerViewScan: {
    tintColor: 'white',
    width: 300,
    height: 300,
    position: 'absolute',
  },
  childrenViewScan: {
    tintColor: 'white',
    width: 150,
    height: 150,
    position: 'absolute',
  },
  lineScan: {
    height: 2,
    backgroundColor: 'white',
    width: '70%',
    zIndex: 2,
  },
  viewModal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
});

export default HomeScreen;
