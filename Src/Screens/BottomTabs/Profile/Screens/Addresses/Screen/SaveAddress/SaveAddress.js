import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
// library
import {ms} from 'react-native-size-matters';
// Constants
import Strings from '../../../../../../../Constants/Strings';
import Colors from '../../../../../../../Constants/Colors';
// Components
import Header from '../../../../../../../Components/Header';
import Input from '../../../../../../../Components/Input';
import Switch from '../../../../../../RegisterNewProducts/Views/Components/Switch';
import {useState} from 'react';
import {postApi} from '../../../../../../../Utils/commenFunction';
import Config from '../../../../../../../Constants/Config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchListAddress} from '../../../../../../../redux/slice/SaveAddress';

const SaveAddress = () => {
  const navigation = useNavigation();
  const [saveaddress, setSaveAddress] = useState('');
  const [Loadgin, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  const handleButtonPress = async response => {
    if (saveaddress == '') {
      Alert.alert('Please select a Title');
      return;
    } else if (response.userAddress == undefined) {
      Alert.alert('Please add a New Address');
      return;
    } else if (response.userState == '') {
      Alert.alert('Please select a State');
      return;
    } else if (response.userPincode == undefined) {
      Alert.alert('Please  select a pincode');
    }
    response.userAddressTitle = saveaddress;

    setLoading(true);

    const res = await postApi(Config.AddUserAddressApi, {
      userId: response?.userId,
      addressTitle: response?.userAddressTitle,
      userAddress: response?.userAddress,
      stateId: response?.stateId,
      districtId: response?.districtId,
      cityId: '0',

      pinCode: response?.userPincode,
    });
    setLoading(false);
    if (res.status === true) {
      navigation.goBack();
      dispatch(fetchListAddress(response.userId));
      Alert.alert('New Address Saved Successfully');
    } else {
      Alert.alert('something went wrong ');
    }
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.contianer}>
      <Header title={Strings.addresses} titleStyle={styles.titleStyle} />
      {Loadgin && (
        <ActivityIndicator
          color={Colors.DarkPink}
          size="large"
          style={styles.loader}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={150}>
          <View style={styles.innerContainer}>
            <Input
              labelTitle={Strings.title}
              value={saveaddress}
              onChangeText={val => setSaveAddress(val)}
            />
            <Switch
              Callback={res => {
                handleButtonPress(res);
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default SaveAddress;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
    backgroundColor: Colors.ExtraLightGray,
    opacity: 0.8,
  },
  titleStyle: {
    color: Colors.Black,
    fontWeight: '600',
  },
  innerContainer: {
    marginHorizontal: ms(15),
  },
});
