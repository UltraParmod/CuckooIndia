// library
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// Utils
import {hp, wp} from '../Utils/ResponnsiveSize';
import ColorsPath from '../Utils/ColorsPath';
import VectorIconsPath from '../Utils/VectorIconsPath';
import StringsName from '../Utils/StringsName';

// Variables
const size28 = 28;
const size30 = 30;
export default function CardView() {
  return (
    <View style={styles.contaier}>
      <View style={styles.cardInnerContainer}>
        <VectorIconsPath
          type="Fontisto"
          name="shopping-store"
          size={size28}
          color={ColorsPath.MainColor}
        />
        <Text style={styles.order}>{StringsName.order}</Text>
        <Text style={styles.orderCount}>{StringsName.orderCount}</Text>
      </View>
      <View style={styles.cardInnerContainer}>
        <VectorIconsPath
          type="FontAwesome5"
          name="users"
          size={size28}
          color={ColorsPath.MainColor}
        />
        <Text style={styles.order}>{StringsName.customer}</Text>
        <Text style={styles.orderCount}>{StringsName.customerCount}</Text>
      </View>
      <View style={styles.cardInnerContainer}>
        <VectorIconsPath
          type="Ionicons"
          name="fast-food"
          size={size30}
          color={ColorsPath.MainColor}
        />
        <Text style={styles.order}>{StringsName.dishes}</Text>
        <Text style={styles.orderCount}>{StringsName.dishesCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contaier: {
    width: '90%',
    alignSelf: 'center',
    height: hp(20),
    borderRadius: wp(5),
    backgroundColor: ColorsPath.WhiteColor,
    marginTop: hp(-10),
    // elevation: wp(1),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardInnerContainer: {
    alignItems: 'center',
  },
  order: {
    marginTop: wp(2),
    fontSize: wp(3.5),
    fontWeight: '400',
    color: ColorsPath.DarkGeay,
  },
  orderCount: {
    fontWeight: '500',
    fontSize: wp(4.5),
    color: ColorsPath.DarkBlack,
  },
});
