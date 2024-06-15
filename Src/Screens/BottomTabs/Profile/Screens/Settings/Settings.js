import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../../../../Constants/Colors';
import Strings from '../../../../../Constants/Strings';
// Components
import Header from '../../../../../Components/Header';
import Fonts from '../../../../../Constants/Fonts';
import {postApi} from '../../../../../Utils/commenFunction';
import Config from '../../../../../Constants/Config';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../../../../../Constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {emptyLogin} from '../../../../../redux/slice/UserLogin';

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.UserDetail);
  const _deliteAccount = async () => {
    try {
      const res = await postApi(Config.DeleteUserAccount, {
        userId: userDetail?.data?.userId,
      });
      if (res.status == true) {
        AsyncStorage.setItem('userId', '');
        navigation.navigate(ScreenName.LOGIN);
        dispatch(emptyLogin());
      }
    } catch (error) {
      console.log('user Accout Deleted Api', error);
    }
  };
  return (
    <View style={styles.container}>
      <Header title={Strings.settings} titleStyle={styles.titleStyle} />
      <View style={styles.innneContainer}></View>
      <View style={styles.innneContainer}>
        <View style={styles.innerStyle}>
          <Text style={styles.privacy}>{Strings.privacy}</Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'are you want to delete this accout ? ',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      _deliteAccount();
                    },
                  },
                ],
              );
            }}>
            <Text style={styles.changepass}>{Strings.deleteAccount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  titleStyle: {
    color: Colors.Black,
    fontWeight: '500',
    fontSize: s(18),
  },
  addNewAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    marginRight: ms(30),
    marginBottom: ms(10),
    fontFamily: Fonts.PoppinsRegular,
  },
  innneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  email: {
    textDecorationLine: 'underline',
    color: Colors.Black,
    fontFamily: Fonts.PoppinsMedium,
  },
  innerStyle: {
    padding: ms(20),
    marginTop: ms(30),
    width: '90%',
    minHeight: ms(160),
    borderRadius: ms(20),
    backgroundColor: Colors.ExtraLightGray,
  },
  addImg: {
    width: ms(20),
    height: ms(20),
    marginLeft: ms(5),
  },
  privacy: {
    fontSize: ms(20),
    color: Colors.Black,
    fontWeight: '600',
    fontFamily: Fonts.PoppinsMedium,
  },
  changepass: {
    color: Colors.Black,
    textDecorationLine: 'underline',
    marginTop: ms(20),
    fontSize: ms(16),
    fontFamily: Fonts.PoppinsLight,
  },
});
