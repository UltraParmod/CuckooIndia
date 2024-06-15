// library
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

// Utils
import {hp, wp} from '../Utils/ResponnsiveSize';
import ColorsPath from '../Utils/ColorsPath';
import VectorIconsPath from '../Utils/VectorIconsPath';

// Variables
const size30 = 30;
const size20 = 20;

const Header = ({title, titleStyle, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}>
        <VectorIconsPath
          type="Entypo"
          name="menu"
          size={size30}
          color={ColorsPath.ExtraGrayColor}
        />
      </TouchableOpacity>

      <Text style={{...styles.title, ...titleStyle}}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('notifications');
        }}>
        <VectorIconsPath
          type="Ionicons"
          name="notifications"
          size={size20}
          color={ColorsPath.ExtraGrayColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    height: hp(6),
  },
});
