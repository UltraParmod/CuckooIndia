import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
// library
import {ms, s} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
// Constants
import Colors from '../Constants/Colors';
import Images from '../Constants/Images';
import Fonts from '../Constants/Fonts';

const Header = ({
  containerStyle,
  iconRight,
  title,
  iconRightSource,
  titleRight,
  onPressRight,
  titleRightStyle,
  onPressTxt,
  iconName,
  titlefed,
  titlefedStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();
  return (
    <View style={{...styles.container, ...containerStyle}}>
      {iconName ? (
        <Text style={{...styles.txtStyle, ...titlefedStyle}}>{titlefed}</Text>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnStyle}>
          <Image source={Images.backIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      )}

      <Text style={{...styles.txtStyle, ...titleStyle}}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          onPressTxt();
        }}>
        <Text style={{...styles.txtStyle, ...titleRightStyle}}>
          {titleRight}
        </Text>
      </TouchableOpacity>
      {iconRight && (
        <TouchableOpacity onPress={() => onPressRight()}>
          <Image source={iconRightSource} style={styles.iconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS != 'android' ? ms(0) : 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(15),
    borderBottomWidth: ms(1),
    borderColor: Colors.TransplanteGey,
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
  },
  txtStyle: {
    fontSize: s(16),
    color: Colors.ExtraLightBlack,
    textAlign: 'left',
    fontFamily: Fonts.PoppinsMedium,
  },
  btnStyle: {
    shadowColor: Colors.Black,
    shadowOffset: {
      width: ms(0),
      height: ms(2),
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(3.84),
    elevation: ms(5),
    backgroundColor: Colors.White,
    width: ms(40),
    height: ms(40),
    marginRight: ms(20),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
