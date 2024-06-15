// library
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// Utils
import StringsName from '../Utils/StringsName';
import ColorsPath from '../Utils/ColorsPath';
import {hp, wp} from '../Utils/ResponnsiveSize';
import VectorIconsPath from '../Utils/VectorIconsPath';

export default function RatingCom() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.customerRatings}>
          {StringsName.customerRatings}
        </Text>
        <Text style={styles.lastMonths}>{StringsName.lastMonths}</Text>
        <Text style={[styles.lastMonths, styles.ratingCount]}>
          {StringsName.ratingCount}
        </Text>
      </View>
      <View style={styles.ratingOuterCricle}>
        <View style={styles.ratingOuterCricle}>
          <View style={styles.smallCricel}>
            <View style={styles.innerCricle}>
              <View style={styles.hartIcon}>
                <VectorIconsPath
                  type="AntDesign"
                  name="heart"
                  size={25}
                  color={ColorsPath.MainColor}
                  style={styles.hartIconstyle}
                />
                <View style={styles.cricleTitle}>
                  <Text style={styles.ratingTitle3}>
                    {StringsName.rating38}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: wp(0.1),
    borderColor: ColorsPath.LightGrayColor,
    width: '90%',
    alignSelf: 'center',
    borderRadius: wp(4),
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: wp(2.5),
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  customerRatings: {
    fontSize: hp(2),
    color: ColorsPath.DarkBlack,
    fontWeight: '700',
  },
  ratingOuterCricle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: ColorsPath.DarkGeay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cricleTitle: {
    position: 'absolutes',
    left: wp(12),
    top: hp(-4.5),
  },
  hartIcon: {
    position: 'absolute',
    top: wp(-1),
    left: wp(-4.2),
  },
  innerCricle: {
    width: 98,
    height: 98,
    borderRadius: 48,
    zIndex: -10,
    position: 'relative',
    bottom: hp(0.6),
    left: wp(-1.3),
    borderWidth: wp(1.6),
    borderColor: ColorsPath.MainColor,
    borderTopColor: ColorsPath.DarkGeay,
    // borderTopColor: red,

    transform: [{rotate: '-35deg'}],
  },
  smallCricel: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'white',
  },
  ratingTitle3: {
    color: ColorsPath.MainColor,
    fontSize: hp(2.3),
    position: 'relative',
    top: hp(5.5),
    left: wp(-1.3),
    fontWeight: '700',
    transform: [{rotate: '35deg'}],
  },
  hartIconstyle: {
    transform: [{rotate: '35deg'}],
    position: 'relative',
    top: hp(0.5),
    left: wp(2),
  },
  lastMonths: {
    marginBottom: hp(2),
    color: ColorsPath.DarkGeay,
  },
  ratingCount: {
    marginBottom: hp(0),
  },
});
