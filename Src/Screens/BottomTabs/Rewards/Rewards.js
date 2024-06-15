import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// library
import LinearGradient from 'react-native-linear-gradient';
import {ms, s} from 'react-native-size-matters';
// Constants
import {useSelector} from 'react-redux';
import Header from '../../../Components/Header';
import Strings from '../../../Constants/Strings';
import Colors from '../../../Constants/Colors';
import Images from '../../../Constants/Images';
import Button from '../../../Components/Button';

const Rewards = () => {
  const userData = useSelector(state => state?.UserDetail);

  return (
    <View style={styles.container}>
      <Header
        iconName={false}
        title={Strings.cuckooRewards}
        titleStyle={styles.titleStyle}
      />
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#4D4D4D', '#4D4D4D', '#171717']}
        style={styles.rewardsCard}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{Strings.welcome}</Text>
          <Text style={[styles.title, styles.userName]}>
            {' '}
            {userData?.data?.userName}
          </Text>
        </View>
        <Text style={[styles.title, styles.subTitle]}>
          {Strings.memberSince}
        </Text>
        <View style={styles.cardRewardBtn}>
          <Image source={Images.rewards} style={styles.rewards} />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.rewardsPoints}>{Strings.rewardsPoints}</Text>
            <Text style={[styles.rewardsPoints, styles.points]}>2000</Text>
          </View>
        </View>
      </LinearGradient>
      <Button
        label={Strings.redeemNow}
        style={styles.btnStyle}
        labelStyle={styles.labelStyle}
        btnOnpress={() => {
          Alert.alert('Reddem Alert ');
        }}
      />
    </View>
  );
};
export default Rewards;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  rewardsCard: {
    marginVertical: ms(30),
    alignSelf: 'center',
    width: '85%',
    padding: ms(20),
    borderRadius: ms(20),
  },
  titleStyle: {
    fontWeight: '600',
    color: Colors.Black,
  },
  title: {
    color: Colors.White,
    textAlign: 'center',
  },
  userName: {
    fontWeight: '700',
  },
  subTitle: {
    fontSize: s(13),
  },
  cardRewardBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#c9c9c9',
    borderRadius: ms(20),
    marginHorizontal: ms(20),
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
    alignItems: 'center',
    marginVertical: ms(20),
  },
  rewards: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    tintColor: 'gold',
  },
  rewardsPoints: {
    color: Colors.White,
    fontSize: s(11.5),
  },
  points: {
    fontWeight: '700',
  },
  btnStyle: {
    width: '60%',
    alignSelf: 'center',
  },
  labelStyle: {
    fontSize: s(14),
  },
});
