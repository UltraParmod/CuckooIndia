import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
// library
import {ms, s} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// Constants
import Colors from '../../../Constants/Colors';
import Strings from '../../../Constants/Strings';
import Images from '../../../Constants/Images';
import ScreenName from '../../../Constants/ScreenName';
// Components
import Header from '../../../Components/Header';
import Button from './Components/Button';
import Fonts from '../../../Constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {addListener, combineSlices} from '@reduxjs/toolkit';
import {
  Address01,
  Editbag01,
  Logout01,
  Message01,
  Settings01,
  User01,
} from '../../../Assets/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {emptyLogin} from '../../../redux/slice/UserLogin';

const Profile = () => {
  const Settingsnavigation = useNavigation();
  const dispatch = useDispatch();
  const UserDetail = useSelector(state => state.UserDetail);
  return (
    <View style={styles.container}>
      <Header
        iconName={false}
        titlefed={Strings.profile}
        title={Strings.profile}
        titleStyle={styles.titleStyle}
      />
      <ScrollView>
        <View style={styles.imgContainer}>
          {UserDetail?.data?.profileImage ? (
            <Image
              source={{uri: UserDetail?.data?.profileImage}}
              style={styles.userImg}
            />
          ) : (
            <Image source={Images.userImg} style={styles.userImg} />
          )}
        </View>
        <Text style={styles.userName}>{UserDetail.data?.userName}</Text>
        <Text style={[styles.userName, styles.emaill]}>
          {UserDetail?.data?.userEmail}
        </Text>

        <Button
          BtnIcon={() => <User01 width={20} />}
          btnTitle={Strings?.myProfile}
          btnOnpress={() => {
            Settingsnavigation.navigate(ScreenName.MYPROFILE);
          }}
        />

        <Button
          BtnIcon={() => <Editbag01 />}
          btnTitle={Strings.myPurchases}
          btnOnpress={() => {
            Settingsnavigation.navigate(ScreenName.MYPURCHASE);
          }}
        />

        <Button
          BtnIcon={() => <Message01 />}
          btnTitle={Strings.requests}
          btnOnpress={() => {
            Settingsnavigation.navigate(ScreenName.REQUESTS);
          }}
        />

        <Button
          BtnIcon={() => <Settings01 />}
          btnTitle={Strings.settings}
          btnOnpress={() => {
            Settingsnavigation.navigate(ScreenName.SETTINGS);
          }}
        />

        <Button
          BtnIcon={() => <Address01 />}
          btnTitle={Strings.addresses}
          btnOnpress={() => {
            Settingsnavigation.navigate(ScreenName.ADDRESSES);
          }}
        />

        <Button
          BtnIcon={() => <Logout01 width={20} />}
          btnTitle={Strings.logout}
          btnOnpress={() => {
            Alert.alert('Are you sure you want to Logout ?', '', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  AsyncStorage.setItem('userId', '');
                  Settingsnavigation.navigate(ScreenName.LOGIN);
                  dispatch(emptyLogin());
                },
              },
            ]);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  imgContainer: {
    width: ms(100),
    height: ms(100),
    borderRadius: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: ms(20),
  },
  userImg: {
    width: ms(98),
    height: ms(98),
    resizeMode: 'cover',
    borderRadius: ms(49),
  },
  userName: {
    color: Colors.Black,
    fontSize: s(18),
    textAlign: 'center',
    marginBottom: ms(5),
    fontFamily: Fonts.PoppinsSemiBold,
  },
  emaill: {
    marginBottom: ms(20),
    marginTop: ms(-5),
    fontSize: s(14),
    color: Colors.LightBlack,
    fontFamily: Fonts.PoppinsLight,
  },
  titleStyle: {
    color: Colors.LightBlack,
    fontFamily: Fonts.PoppinsMedium,
  },
});
