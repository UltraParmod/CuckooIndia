// library
import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';

// Utils
import {hp, wp} from '../Utils/ResponnsiveSize';
import ColorsPath from '../Utils/ColorsPath';
import StringsName from '../Utils/StringsName';

export default function GraphView() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.horizontalDasseline}>
          {StringsName.horizontalDasseline}
        </Text>
        <Text style={{marginVertical: hp(2), color: ColorsPath.LightGrayColor}}>
          {StringsName.horizontalDasseline}
        </Text>
        <Text style={styles.horizontalDasseline}>
          {StringsName.horizontalDasseline}
        </Text>
      </View>
      <View style={styles.progressOuterr}>
        <View style={styles.progressOuterWidth}>
          <View style={[styles.progressOuter, styles.progressOuteJan]}>
            <View
              style={[styles.progressInner, styles.progressInnerJan]}></View>
          </View>
          <Text style={styles.title}>{StringsName.jan}</Text>
        </View>
        <View style={styles.progressOuterWidth}>
          <View style={[styles.progressOuter, styles.progressOuterFeb]}>
            <View style={[styles.progressInner, styles.progressInnerFeb]}>
              <View style={[styles.wrapperView, styles.wrappeHeightFeb]}></View>
            </View>
          </View>
          <Text style={styles.title}>{StringsName.feb}</Text>
        </View>
        <View style={styles.progressOuterWidth}>
          <View style={[styles.progressOuter, styles.progressOuterMar]}>
            <View style={[styles.progressInner, styles.progressInnerMar]}>
              <View style={[styles.wrapperView, styles.wrappeHeightMar]}></View>
            </View>
          </View>
          <Text style={styles.title}>{StringsName.mar}</Text>
        </View>
        <View style={styles.progressOuterWidth}>
          <View style={[styles.progressOuter, styles.progressOuterApr]}>
            <View style={[styles.progressInner, styles.progressInnerApr]}>
              <View style={[styles.wrapperView, styles.wrappeHeightApr]}></View>
            </View>
          </View>
          <Text style={styles.title}>{StringsName.apr}</Text>
        </View>
        <View style={styles.progressOuterWidth}>
          <View style={[styles.progressOuter, styles.progressOuterJun]}>
            <View style={[styles.progressInner, styles.progressInnerJun]}>
              <View style={[styles.wrapperView, styles.wrappeHeightJun]}></View>
            </View>
          </View>
          <Text style={styles.title}>{StringsName.jun}</Text>
        </View>
      </View>
      <View style={styles.progressCount}>
        <View style={styles.innerContetStyle}>
          <View style={[styles.inerOuterContaier, styles.statescolor]}></View>
          <Text style={styles.salesTitle}>{StringsName.sales}</Text>
        </View>
        <View style={styles.innerContetStyle}>
          <View style={styles.inerOuterContaier}></View>
          <Text style={styles.salesTitle}>{StringsName.profile}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: ColorsPath.WhiteColor,
    borderRadius: wp(4),
    elevation: wp(0.5),
    marginVertical: wp(5),
    padding: wp(5),
    paddingBottom: wp(0),
    borderWidth: wp(0.1),
    borderColor: ColorsPath.LightGrayColor,
    paddingTop: wp(10),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1.5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: wp(19),
    left: wp(5),
  },
  progressOuter: {
    backgroundColor: ColorsPath.LightPinkColor,
    height: '85%',
    height: hp(18),
    marginBottom: wp(2.3),
    borderRadius: wp(1.2),
  },
  progressOuterWidth: {
    width: '7%',
  },
  innerContetStyle: {flexDirection: 'row', alignItems: 'center'},
  progressInner: {
    width: '100%',
    height: hp(13),
    backgroundColor: ColorsPath.MainColor,
    borderRadius: wp(1.2),
    position: 'relative',
    bottom: hp(-5.9),
  },
  title: {
    color: ColorsPath.DarkBlack,
    fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? hp(1.4) : hp(1.5),
  },
  progressCount: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(2),
  },
  wrapperView: {
    height: '90%',
    backgroundColor: ColorsPath.MainColor,
    position: 'relative',
    bottom: hp(-1.5),
    borderRadius: wp(1),
  },
  inerOuterContaier: {
    marginHorizontal: wp(2),
    backgroundColor: ColorsPath.MainColor,
    width: wp(4),
    height: hp(2),
  },
  statescolor: {
    backgroundColor: ColorsPath.LightPinkColor,
  },
  progressOuteJan: {},
  progressInnerJan: {},
  progressOuterFeb: {},
  progressInnerFeb: {
    backgroundColor: ColorsPath.LightPinkColor,
  },
  progressOuterMar: {},
  progressInnerMar: {
    backgroundColor: ColorsPath.LightPinkColor,
  },
  progressOuterApr: {},
  progressInnerApr: {
    backgroundColor: ColorsPath.LightPinkColor,
  },
  progressOuterJun: {},
  progressInnerJun: {
    backgroundColor: ColorsPath.LightPinkColor,
  },
  wrappeHeightFeb: {
    height: '50%',
    bottom: hp(-6.4),
  },
  wrappeHeightMar: {
    height: '30%',
    bottom: hp(-9.1),
  },
  wrappeHeightApr: {
    height: '70%',
    bottom: hp(-4),
  },
  progressOuterr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  line: {
    opacity: 0.1,
    color: ColorsPath.greyextralight,
  },
  salesTitle: {
    fontSize: hp(1.7),
  },
  horizontalDasseline: {
    color: ColorsPath.LightGrayColor,
  },
});
