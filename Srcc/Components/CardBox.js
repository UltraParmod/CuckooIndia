// library
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// Utils
import {hp, wp} from '../Utils/ResponnsiveSize';
import VectorIconsPath from '../Utils/VectorIconsPath';
import ColorsPath from '../Utils/ColorsPath';
import StringsName from '../Utils/StringsName';

// Variables
const size30 = 30;
const CardBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardBoxinner}>
        <View style={styles.innerCartTxt}>
          <VectorIconsPath
            type="MaterialCommunityIcons"
            name="food-apple"
            size={size30}
            color={ColorsPath.MainColor}
          />
          <View></View>
        </View>
        <View style={styles.innerCartTxt}>
          <Text style={styles.title}>{StringsName.ongoing}</Text>
          <Text style={styles.ongoingCount}>{StringsName.ongoingCount}</Text>
        </View>
      </View>
      <View style={styles.cardBoxinner}>
        <View style={styles.innerCartTxt}>
          <VectorIconsPath
            type="MaterialIcons"
            name="pending-actions"
            size={size30}
            color={ColorsPath.MainColor}
          />
          <View></View>
        </View>
        <View style={styles.innerCartTxt}>
          <Text style={styles.title}>{StringsName.pending}</Text>
          <Text style={styles.ongoingCount}>{StringsName.deliverdCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '88%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cardBoxinner: {
    width: '46%',
    borderWidth: wp(0.2),
    borderColor: 'lightgrey',
    padding: wp(5),
    borderRadius: wp(5),
    backgroundColor: ColorsPath.WhiteColor,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1.5},
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  innerCartTxt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: hp(1),
  },
  ongoingCount: {
    fontWeight: '800',
    fontSize: hp(2),
    color: ColorsPath.DarkBlack,
  },
  title: {
    color: ColorsPath.DarkGeay,
  },
});
