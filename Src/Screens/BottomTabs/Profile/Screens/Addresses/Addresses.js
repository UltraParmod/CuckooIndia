import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
// library
import {useSelector} from 'react-redux';
import {ms, s} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
// Constants
import Fonts from '../../../../../Constants/Fonts';
import Strings from '../../../../../Constants/Strings';
import Colors from '../../../../../Constants/Colors';
import ScreenName from '../../../../../Constants/ScreenName';
// Components
import Header from '../../../../../Components/Header';
import Button from '../../../../../Components/Button';
import UseraddressList from './Screen/components/UseraddressList';

const Addresses = () => {
  const navigation = useNavigation();
  const [Loadgin, setLoading] = useState(false);
  const SaveAddressList = useSelector(state => state.SaveAddressList?.data);

  return (
    <View style={styles.conatiner}>
      <Header title={Strings.addresses} titleStyle={styles.titleStyle} />
      {Loadgin && (
        <ActivityIndicator
          color={Colors.DarkPink}
          size="large"
          style={styles.loaderActivite}
        />
      )}
      {SaveAddressList?.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={SaveAddressList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.addressId}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: Colors.ExtraLightGray,
                  margin: ms(10),
                  padding: ms(10),
                  borderRadius: ms(10),
                }}>
                <UseraddressList data={item} />
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.centreView}>
          <Text
            style={{
              fontSize: 20,
            }}>
            {Strings.NoAddressaddedd}
          </Text>
        </View>
      )}
      <Button
        label={Strings.addNewAddress}
        style={styles.btnContianer}
        labelStyle={styles.labelStyle}
        btnOnpress={() => {
          navigation.navigate(ScreenName.SAVEADDRESS);
        }}
      />
    </View>
  );
};
export default Addresses;
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: ms(50),
  },
  titleStyle: {
    color: Colors.Black,
    fontWeight: '600',
  },
  btnContianer: {
    position: 'absolute',
    bottom: ms(10),
    width: '80%',
    alignSelf: 'center',
  },
  labelStyle: {
    fontSize: s(15),
    fontFamily: Fonts.Regular,
  },
  loaderActivite: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
    backgroundColor: Colors.ExtraLightGray,
    opacity: 0.8,
  },
  centreView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
