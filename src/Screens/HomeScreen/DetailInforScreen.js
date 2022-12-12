import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {icons, images} from '../../Constants';
import {CutImageAPI} from '../../Apis/SecuParkingAPI';
const DetailInforScreen = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getResult();
  }, []);
  //   console.log(route.params?.imageLicense?.uri);
  const getResult = async () => {
    let image = route.params?.imageLicense;
    await CutImageAPI(image)
      .then(res => {
        if (res?.status == 200) {
          setResult(res?.data);
          setTextChange(res?.data?.result);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        // alert(JSON.stringify(error));
      });
  };
  const [textChange, setTextChange] = useState('');
  const endHandleEdit = val => {
    setTextChange(val);
    // changeValue(val);
  };
  console.log(result, 'resultttt');
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'green'} />
      ) : (
        <View style={styles.eachContainer}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: route.params?.imageLicense?.uri}}
            // source={{uri: `data:image/png;base64,${result?.lp}`}}
          />
          <Text
            style={[
              styles.text,
              {marginTop: 15},
            ]}>{`NFC Card ID : ${route.params?.cardInfo?.id}`}</Text>
          <View style={styles.viewRow}>
            <Text style={styles.text}>Biển số : </Text>
            <TextInput
              onEndEditing={evt => endHandleEdit(evt.nativeEvent.text)}
              style={styles.styleCustomTextInput}
              defaultValue={textChange}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.textButton}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  styleCustomTextInput: {
    width: 150,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: 'rgba(12,18,100,1)',
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default DetailInforScreen;
