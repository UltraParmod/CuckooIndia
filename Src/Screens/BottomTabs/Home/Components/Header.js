import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// library
import {useSelector} from 'react-redux';
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../../../Constants/Colors';
import Strings from '../../../../Constants/Strings';
import Images from '../../../../Constants/Images';
import Fonts from '../../../../Constants/Fonts';

const Header = () => {
  const UserDetail = useSelector(state => state?.UserDetail);
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        {UserDetail?.data?.profileImage ? (
          <Image
            source={{uri: UserDetail?.data?.profileImage}}
            style={styles.userImg}
          />
        ) : (
          <Image source={Images.userImg} style={styles.userImg} />
        )}
      </View>
      <View>
        <Text style={styles.userName}>{UserDetail?.data?.userName}</Text>
        <Text style={styles.cuckooWelcomeTxt}>{Strings.cuckooWelcomeTxt}</Text>
      </View>
      <View style={{flex: 1}}></View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Notification Alert');
        }}>
        <Image source={Images.notification} style={styles.notifications} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(15),
    paddingTop: ms(15),
    justifyContent: 'space-between',
    borderBottomWidth: ms(0.5),
    borderBottomColor: Colors.Gray,
  },
  user: {
    width: ms(62),
    height: ms(62),
    borderRadius: ms(31),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(20),
  },
  userImg: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(30),
    resizeMode: 'cover',
  },
  userName: {
    fontSize: s(15),
    lineHeight: ms(21),
    color: Colors.LightBlack,
    fontFamily: Fonts.PoppinsBold,
  },
  cuckooWelcomeTxt: {
    fontSize: s(12),
    color: Colors.ExtraLightBlack,
    fontFamily: Fonts.PoppinsRegular,
  },
  notifications: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    tintColor: Colors.MainColor,
  },
});
