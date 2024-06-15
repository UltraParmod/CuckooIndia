import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ColorsPath from '../Utils/ColorsPath';
import {hp, wp} from '../Utils/ResponnsiveSize';

export default function BottomTabs() {
  return (
    <View style={styles.container}>
      <Text>jjj</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(4),
    backgroundColor: ColorsPath.WhiteColor,
    borderWidth: wp(1),
    borderColor: 'red',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 9999999999999,
  },
});
