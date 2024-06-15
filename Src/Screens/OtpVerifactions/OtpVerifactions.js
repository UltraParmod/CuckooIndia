import React, {useEffect, useState} from 'react';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// Components
import styles from './styles';
import Input from '../../Components/Input';
// Constants
import {Logo} from '../../Assets/svg';
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import ScreenName from '../../Constants/ScreenName';
// Network
import {fetchUserLogin} from '../../redux/slice/UserLogin';
import axios from 'axios';
import Config from '../../Constants/Config';
import {fetchUserDetail} from '../../redux/slice/UserDetail';

const OtpVerifactions = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.UserLogin);
  const [otp, SetOtp] = useState();
  const [resentTime, setResentTime] = useState(60);
  const [showResent, setShowResent] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [otpResponse, setOtpResponse] = React.useState(
    props?.route?.params?.loginResponse,
  );
  React.useEffect(() => {
    setLoading(true);
    const unsuscribe = _runTimer();
    setLoading(false);
    return () => clearInterval(unsuscribe);
  }, []);
  const handleOtpChange = text => {
    SetOtp(text.replace(/[^0-9]/g, ''));
    if (text.length === 4) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  const _resentOtp = async () => {
    setLoading(true);
    let authToken = await AsyncStorage.getItem('authKey');
    try {
      axios
        .post(
          Config.BaseUrl + Config.SendOtpApi,
          {userName: otpResponse.emailPhone},
          {headers: {authKey: authToken}},
        )
        .then(function (response) {
          if (response?.data?.status == true) {
            let mapObj = {
              emailPhone: response?.data?.data?.userName,
              otp: response?.data?.data?.otp,
            };
            setLoading(false);
            setOtpResponse(mapObj);
          } else {
            Alert.alert('something went wrong please try again');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log('Otp error', error);
    }
  };

  const handleButtonPress = async () => {
    if (otpResponse.otp == otp) {
      ('');

      dispatch(fetchUserLogin(otpResponse?.emailPhone));
    } else {
      Alert.alert('Invalid Otp');
      console.log('No');
    }
  };
  useEffect(() => {
    if (user?.data?.userDetail != null) {
      const setData = async () => {
        await AsyncStorage.setItem('userId', user?.data?.userDetail?.id);
        dispatch(fetchUserDetail(user?.data?.userDetail?.id));
      };
      setData();
      if (
        user?.data?.userDetail?.name != '' &&
        user?.data?.userDetail?.email != ''
      ) {
        navigation.navigate(ScreenName.BOTTOMTABS);
      } else {
        navigation.navigate(ScreenName.NAMEEMAIL);
      }
    }
  }, [user?.data?.userDetail]);

  const _runTimer = () => {
    let timeLfet = 60;
    setShowResent(false);
    const sub = setInterval(() => {
      if (timeLfet == 0) {
        setShowResent(true);
        clearInterval(sub);
      } else {
        timeLfet = timeLfet - 1;
        setResentTime(timeLfet);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={150}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: ms(20)}}>
          {Loading && (
            <ActivityIndicator
              color={Colors.DarkPink}
              size="large"
              style={styles.loader}
            />
          )}
          <Logo width={ms(150)} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.heading}>{Strings.verificationCode}</Text>
            <Text style={styles.subHeading}>
              {Strings.verificationTxt + otpResponse.emailPhone}
            </Text>
            {/* <Text> Otp:{otpResponse.otp} </Text> */}
          </View>
          <Input
            value={otp}
            secureTextEntry={true}
            style={styles.input}
            placeholderTxt={Strings.dassed}
            onChangeText={handleOtpChange}
            keyboardType={'numeric'}
            maxLength={4}
            inputStyle={styles.textInput}
          />
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                backgroundColor: isButtonActive
                  ? Colors.MainColor
                  : Colors.ExtraLightGray,
              },
            ]}
            onPress={handleButtonPress}
            disabled={!isButtonActive}>
            <Text style={styles.btnTxt}>{Strings.next}</Text>
          </TouchableOpacity>
          {!showResent ? (
            <Text style={styles.resentOTP}>
              {'Send again OTP ' + '(' + resentTime + 's)'}
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                _runTimer();
                _resentOtp();
              }}>
              <Text style={styles.resentOTP}>{Strings.resentOTP}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.BtnChangephoneEmail}
            onPress={() => {
              navigation.navigate(ScreenName.LOGIN);
            }}>
            <Text style={[styles.resentOTP, styles.ChangephoneEmailTxt]}>
              {Strings.changephoneEmail}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default OtpVerifactions;
