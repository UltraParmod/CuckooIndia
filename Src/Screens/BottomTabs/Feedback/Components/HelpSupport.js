import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../../../Constants/Colors';
import Fonts from '../../../../Constants/Fonts';

const HelpSupport = ({imageIcon, label, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <Image source={imageIcon} style={styles.IconStyle} />
      <Text style={styles.title}>{label}</Text>
    </TouchableOpacity>
  );
};
export default HelpSupport;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    width: ms(150),
    height: ms(150),
    borderWidth: ms(1),
    borderColor: Colors.ExtraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(15),
  },
  IconStyle: {
    width: ms(40),
    height: ms(40),
  },
  title: {
    marginTop: ms(10),
    color: Colors.DarkBlue,
    fontSize: s(14),
    fontWeight: '600',
    fontFamily: Fonts.PoppinsSemiBold,
  },
});
