import {set} from 'immer/dist/internal';
import React, {useEffect, useRef, useState} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
NfcManager.start();
export default useNfc = props => {
  const [cardNfc, setCardNfc] = useState(null);
  useEffect(() => {
    const readNdef = async () => {
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.NfcA);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        console.log(tag);
        if (tag) {
          setCardNfc(tag);
        }
      } catch (ex) {
        console.log('Oops!', ex);
      } finally {
        // stop the nfc scanning
        // NfcManager.cancelTechnologyRequest();
      }
    };
    readNdef();
  }, [props]);
  return cardNfc;
};
