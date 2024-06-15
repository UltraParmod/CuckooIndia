import {StyleSheet} from 'react-native';
import {ms, s} from 'react-native-size-matters';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  logo: {
    width: ms(140),
    marginBottom: ms(30),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  inputStyle: {
    marginTop: ms(-25),
  },
  titleStyle: {
    fontSize: s(20),
    marginBottom: ms(3),
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.ExtraLightBlack,
  },
  btnStyle: {
    width: '50%',
    marginTop: ms(40),
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
    marginBottom: ms(20),
  },
  btnTxt: {
    fontSize: s(15),
    color: Colors.White,
    fontWeight: '400',
    textTransform: 'capitalize',
    fontFamily: Fonts.PoppinsMedium,
  },
});
export default styles;
