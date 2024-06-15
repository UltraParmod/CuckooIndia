import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const Button = ({label, style, btnOnpress, labelStyle}) => {
  return (
    <TouchableOpacity
      style={{...styles.btnStyle, ...style}}
      onPress={() => {
        btnOnpress();
      }}>
      <Text style={{...styles.btnTxt, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    height: ms(45),
    backgroundColor: Colors.MainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(30),
    shadowColor: Colors.Black,
    shadowOffset: {
      width: ms(0),
      height: ms(2),
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(3.84),
    elevation: ms(3),
  },
  btnTxt: {
    fontSize: s(15),
    color: Colors.White,
    fontFamily: Fonts.PoppinsRegular,
    textTransform: 'capitalize',
  },
});
