import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
// Component
import Input from '../../Components/Input';
// Constants
import {Logo} from '../../Assets/svg';
import Strings from '../../Constants/Strings';
import Config from '../../Constants/Config';
import Colors from '../../Constants/Colors';
import ScreenName from '../../Constants/ScreenName';
import {postApi} from '../../Utils/commenFunction';
// Network
import {fetchUserDetail} from '../../redux/slice/UserDetail';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
const NameEmail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const getUserDetail = useSelector(state => state?.UserDetail?.data);
  const userLogged = useSelector(state => state?.UserLogin?.data?.userDetail);
  const [Loadgin, setLoading] = useState(false);
  const handleNameChange = text => {
    setName(text.replace(/[^A-Z,a-z,0-9,' ']/g, ''));
    updateButtonStatus(text, email);
  };
  const handleEmailChange = text => {
    setEmail(text);
    updateButtonStatus(name, text);
  };
  const updateButtonStatus = (name, email) => {
    const isInputValid = name.trim() !== '' && validateEmail(email);
    setIsButtonActive(isInputValid);
  };
  const validateEmail = email => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleButtonPress = async () => {
    setLoading(true);
    if (validateEmail(email)) {
      try {
        let data = new FormData();
        data.append('userId', userLogged?.id || getUserDetail?.userId);
        data.append('userName', name);
        data.append('userEmail', email);
        data.append(
          'userMobile',
          userLogged?.mobile || getUserDetail?.userPhone,
        );
        data.append(
          'userGender',
          userLogged?.gender || getUserDetail?.userGende,
        );
        data.append('profileImage', '');
        const response = await postApi(Config?.UserProfileUpdateApi, data);

        setLoading(false);
        if (response?.status == true) {
          navigation.navigate(ScreenName.BOTTOMTABS);
          dispatch(fetchUserDetail(userLogged?.id || getUserDetail?.userId));
        } else {
          Alert.alert('Invalid Email', 'Please enter a valid email address.');
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        Alert.alert('something went wrong please try valid new email address');
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraHeight={150}
        showsVerticalScrollIndicator={false}>
        {Loadgin && (
          <ActivityIndicator
            color={Colors.DarkPink}
            size="large"
            style={styles.loading}
          />
        )}
        <View style={{marginTop: '22%'}}></View>

        <Logo width={ms(150)} style={styles.logo} />
        <View>
          <Input
            placeholderTxt={Strings.firstLastName}
            labelTitle={Strings.enterNameEmail}
            inputStyle={styles.inputStyle}
            titleStyle={styles.titleStyle}
            value={name}
            onChangeText={handleNameChange}
          />
          <Input
            placeholderTxt={Strings.email}
            inputStyle={styles.inputStyle}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.btnStyle,
            {
              backgroundColor: isButtonActive
                ? Colors.MainColor
                : Colors.ExtraLightGray,
            },
          ]}
          disabled={!isButtonActive}
          onPress={() => {
            handleButtonPress();
          }}>
          <Text style={styles.btnTxt}>{Strings.next}</Text>
        </TouchableOpacity>
        <View style={{flex: 0.4}}></View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NameEmail;
