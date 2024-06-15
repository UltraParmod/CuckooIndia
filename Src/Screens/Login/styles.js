// library
import {StyleSheet} from 'react-native';
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
  logo: {
    marginBottom: ms(20),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: '50%',
  },
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  heading: {
    fontSize: s(15),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.LightBlack,
  },
  subHeading: {
    fontSize: s(15),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.LightBlack,
  },
  countryCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: ms(0.5),
    color: Colors.Black,
    height: ms(50),
    borderRadius: ms(20),
    marginTop: ms(20),
    fontFamily: Fonts.PoppinsMedium,
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
    shadowColor: '#000',
    shadowOffset: {
      width: ms(0),
      height: ms(2),
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(3.84),
    elevation: ms(3),
  },
  btnTxt: {
    color: Colors.White,
    textTransform: 'capitalize',
    fontFamily: Fonts.PoppinsMedium,
    fontSize: s(15),
  },
});
export default styles;
