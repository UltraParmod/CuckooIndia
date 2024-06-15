import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// library
import {ms, s} from 'react-native-size-matters';
// constants
import Colors from '../../../Constants/Colors';
import Strings from '../../../Constants/Strings';
import Fonts from '../../../Constants/Fonts';
const Switch = ({defaultTab, onChangeTab}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.buttonStyle,
          ...{
            backgroundColor:
              defaultTab == 0 ? Colors.LightPink : Colors.TransplanteGey,
          },
        }}
        onPress={() => onChangeTab(0)}>
        <View style={styles.btnOuterCricle}>
          <View
            style={{
              ...styles.btnInnerCricle,
              ...{backgroundColor: defaultTab == 0 ? Colors.DarkPink : null},
            }}></View>
        </View>
        <Text style={styles.title}>{Strings.installation}</Text>
        <Text style={styles.subTitle}>{Strings.newProducts}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.buttonStyle,
          ...{
            backgroundColor:
              defaultTab == 1 ? Colors.LightPink : Colors.TransplanteGey,
          },
        }}
        onPress={() => {
          onChangeTab(1);
        }}>
        <View style={styles.btnOuterCricle}>
          <View
            style={{
              ...styles.btnInnerCricle,
              ...{backgroundColor: defaultTab == 1 ? Colors.DarkPink : null},
            }}></View>
        </View>
        <Text style={styles.title}>{Strings.reInstallation}</Text>
        <Text style={styles.subTitle}>{Strings.exisitingProducts}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Switch;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(20),
    marginTop: ms(30),
  },
  buttonStyle: {
    backgroundColor: Colors.ExtraLightGray,
    width: '49%',
    paddingVertical: ms(15),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOuterCricle: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
    borderWidth: ms(1),
    borderColor: Colors.DarkPink,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ms(3),
  },
  btnInnerCricle: {
    width: ms(16),
    height: ms(16),
    borderRadius: ms(8),
    backgroundColor: Colors.DarkPink,
  },
  title: {
    color: Colors.Black,
    fontSize: s(16),
    fontFamily: Fonts.PoppinsMedium,
  },
  subTitle: {
    fontSize: s(12),
    marginTop: ms(-3),
    color: Colors.Gray,
    fontFamily: Fonts.PoppinsMedium,
  },
});
