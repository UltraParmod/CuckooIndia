import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../../../Constants/Colors';
const Button = ({children, onPressClick, containerStyle, productTitle}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle}}
      onPress={() => {
        onPressClick();
      }}>
      {children}
      <Text style={styles.title}>{productTitle}</Text>
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.MainColorr,
    width: '47%',
    height: ms(180),
    borderRadius: ms(20),
    justifyContent: 'space-evenly',
    padding: ms(15),
  },
  title: {
    color: Colors.White,
    fontSize: s(15),
  },
});
