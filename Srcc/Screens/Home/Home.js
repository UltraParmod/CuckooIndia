import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import StringsName from '../../Utils/StringsName';
import {hp} from '../../../Src/Utils/Responsive';
import ColorsPath from '../../Utils/ColorsPath';
import LinearGradient from 'react-native-linear-gradient';
import {wp} from '../../Utils/ResponnsiveSize';
import CardView from '../../Components/CardView';
import VectorIconsPath from '../../Utils/VectorIconsPath';
import CardBox from '../../Components/CardBox';
import GraphView from '../../Components/GraphView';
import RatingCom from '../../Components/RatingCom';

// Variables
const sizehp4 = hp(4);
const Home = () => {
  return (
    <View style={{flex: 1}}>
      <Header
        title={StringsName.dashborad}
        titleStyle={styles.title}
        onPress={() => {
          Alert.alert('Menu alert');
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 1.0, y: 0.25}}
          end={{x: 1.5, y: 1.5}}
          locations={[0, 0.5, 0.2]}
          colors={[
            ColorsPath.MainColor,
            ColorsPath.LightGrayColor,
            ColorsPath.MainColor,
          ]}
          style={styles.gradientView}>
          <View style={styles.userContainer}>
            <Text style={styles.userTitle}>{StringsName.userWelcome}</Text>
            <Text style={styles.userTitle}>{StringsName.userName}</Text>
          </View>
          <Text style={styles.searchResturent}>
            {StringsName.searchResturent}
          </Text>
        </LinearGradient>

        <CardView />
        <View style={styles.deliverdContainer}>
          <View style={styles.deleverInnerContainer}>
            <VectorIconsPath
              type="MaterialIcons"
              name="delivery-dining"
              size={sizehp4}
              color={ColorsPath.MainColor}
            />
            <Text style={styles.deliverd}>{StringsName.deliverd}</Text>
          </View>
          <Text style={styles.deliverdCount}>{StringsName.deliverdCount}</Text>
        </View>
        <CardBox />
        <GraphView />

        <RatingCom />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(2.5),
    flex: 0.8,
    color: ColorsPath.LightBlackColor,
    fontWeight: '500',
  },
  gradientView: {
    width: '100%',
    height: hp(21),
  },
  deleverInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userContainer: {
    padding: wp(4),
    paddingLeft: wp(6),
    flexDirection: 'row',
  },
  userTitle: {
    fontSize: hp(2),
    fontWeight: '500',
    color: ColorsPath.WhiteColor,
  },
  searchResturent: {
    marginLeft: wp(6),
    marginTop: wp(-3),
    fontSize: hp(1.7),
    color: ColorsPath.LightGrayColor,
  },
  deliverdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    height: hp(7),
    borderWidth: wp(0.2),
    borderColor: 'lightgrey',
    borderRadius: wp(4),
    marginVertical: wp(5),
    backgroundColor: ColorsPath.WhiteColor,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1.5},
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  deliverd: {
    color: ColorsPath.DarkGeay,
    fontWeight: '400',
    fontSize: hp(2.2),
    marginLeft: wp(2),
    paddingHorizontal: wp(2),
  },
  deliverdCount: {
    color: ColorsPath.DarkBlack,
    fontSize: hp(2),
    fontWeight: 'bold',
  },
});
