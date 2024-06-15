import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const Label = ({labelTitle, titleStyle}) => {
  return (
    <View style={styles.container}>
      <Text style={{...styles.title, ...titleStyle}}>{labelTitle}</Text>
    </View>
  );
};
export default Label;
const styles = StyleSheet.create({
  container: {},
  title: {
    marginTop: ms(20),
    marginLeft: ms(5),
    fontSize: s(15),
    fontWeight: '500',
    color: Colors.LighttGray,
    fontFamily: Fonts.PoppinsMedium,
  },
});
