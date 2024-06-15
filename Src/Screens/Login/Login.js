import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// Constants
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import Config from '../../Constants/Config';
import ScreenName from '../../Constants/ScreenName';
// Components
import styles from './styles';
import Loader from '../../Components/Loader';
import {Logo} from '../../Assets/svg';
// Network
import {fetchUserDetail} from '../../redux/slice/UserDetail';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getUserDetail = useSelector(state => state?.UserDetail);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isButtonActive, setButtonActive] = useState(false);
  const [Loadgin, setLoading] = useState(false);
  const handleMobileNumberChange = text => {
    setMobileNumber(text.replace(/[^0-9]/g, ''));
    if (text.length === 10) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };
  useEffect(() => {
    axios
      .post(Config.BaseUrl, {
        usefor: Platform.OS,
      })
      .then(async function (response) {
        if (response?.status == 200) {
          await AsyncStorage.setItem('authKey', response.data?.authKey);
        } else {
          Alert.alert('something went wrong');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const getuserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId != null && userId != '') {
        dispatch(fetchUserDetail(userId));
      }
    };
    getuserId();
  }, []);

  const handleButtonPress = async () => {
    setLoading(true);
    let authToken = await AsyncStorage.getItem('authKey');
    try {
      axios
        .post(
          Config.BaseUrl + Config.SendOtpApi,
          {userName: mobileNumber},
          {headers: {authKey: authToken}},
        )
        .then(function (response) {
          if (response?.status == 200) {
            navigation.navigate(ScreenName.OTPVERIFACTION, {
              loginResponse: {
                emailPhone: mobileNumber,
                otp: response.data?.data?.otp,
              },
            });
          } else {
            Alert.alert('Something went wrong');
          }
          setMobileNumber('');
          setButtonActive(false);
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert('Please check internet connection');
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getUserDetail?.data != null) {
      if (
        getUserDetail?.data?.userEmail != '' &&
        getUserDetail?.data?.userName != ''
      ) {
        navigation.navigate(ScreenName.BOTTOMTABS);
      } else {
        navigation.navigate(ScreenName.NAMEEMAIL);
      }
    }
  }, [getUserDetail]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={150}>
        {Loadgin && (
          <ActivityIndicator
            color={Colors.DarkPink}
            size="large"
            style={styles.loader}
          />
        )}
        <Logo width={ms(150)} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{Strings.welcome}</Text>
          <Text style={styles.subHeading}>{Strings.signLoginwithMobNo}</Text>
        </View>
        <View style={styles.countryCode}>
          <Text>{'+ 91  '}</Text>
          <TextInput
            placeholderTxt={Strings.enterPhoneNo}
            maxLength={10}
            placeholder={Strings.enterPhoneNo}
            onChangeText={handleMobileNumberChange}
            value={mobileNumber}
            keyboardType="numeric"
            returnKeyType="done"
            style={{
              height: ms(40),
            }}
          />
        </View>
        <Loader />
        <TouchableOpacity
          style={[
            styles.btnStyle,
            {
              backgroundColor: isButtonActive
                ? Colors.MainColor
                : Colors.ExtraLightGray,
            },
          ]}
          onPress={() => {
            handleButtonPress();
          }}
          disabled={!isButtonActive}>
          <Text style={styles.btnTxt}>{Strings.btnSendOtp}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
