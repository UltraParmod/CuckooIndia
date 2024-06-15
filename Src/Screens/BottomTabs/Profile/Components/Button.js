import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../../../Constants/Colors';
import Images from '../../../../Constants/Images';
import Fonts from '../../../../Constants/Fonts';

const Button = ({BtnIcon, btnTitle, btnOnpress}) => {
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => {
          btnOnpress();
        }}>
        <View style={styles.leftProfile}>
          <View style={styles.profileContianer}>
            <BtnIcon />
          </View>
          <Text style={styles.txtStyle}>{btnTitle}</Text>
        </View>
        <Image source={Images.rightArrow} style={styles.rightArrow} />
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  profileContainer: {
    padding: ms(15),
  },
  profileBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContianer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LightmainColor,
  },
  profileStyle: {
    tintColor: Colors.MainColor,
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
  },
  txtStyle: {
    fontSize: s(16),
    marginLeft: ms(15),
    color: Colors.Black,
    fontFamily: Fonts.PoppinsRegular,
  },
  rightArrow: {
    width: ms(20),
    height: ms(20),
    tintColor: Colors.Gray,
  },
});
