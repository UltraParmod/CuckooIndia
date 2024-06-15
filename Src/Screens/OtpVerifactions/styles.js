// library
import {Platform, StyleSheet} from 'react-native';
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.White,
    paddingHorizontal: ms(20),
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  heading: {
    fontSize: s(20),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.ExtraLightBlack,
  },
  subHeading: {
    paddingHorizontal: ms(25),
    fontSize: s(15),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.LightBlack,
    marginTop: ms(20),
  },
  btn: {
    width: ms(200),
    alignSelf: 'center',
    marginVertical: ms(40),
  },
  resentOTP: {
    textAlign: 'center',
    fontSize: s(14),
    color: Colors.MainColor,
    textDecorationLine: 'underline',
    fontFamily: Fonts.PoppinsMedium,
    letterSpacing: ms(1),
  },
  BtnChangephoneEmail: {
    alignSelf: 'center',
    marginTop: ms(20),
  },
  ChangephoneEmailTxt: {
    fontSize: s(16),
  },
  logo: {
    width: ms(140),
    marginVertical: ms(40),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  labelStyle: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: s(15),
  },
  btnStyle: {
    width: '60%',
    marginVertical: ms(40),
    alignSelf: 'center',
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
    fontSize: s(18),
    color: Colors.White,
    fontWeight: '400',
    textTransform: 'capitalize',
    fontFamily: Fonts.PoppinsMedium,
  },
  textInput: {
    width: '99%',
    textAlign: 'left',
    paddingLeft: ms(120),
    color: Colors.LightBlack,
    fontSize: s(20),
    letterSpacing: ms(11),
    paddingTop: Platform.OS != 'android' ? ms(0) : ms(10),
  },
});

export default styles;
