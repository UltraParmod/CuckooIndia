import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageBackground,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
// library
import {ms} from 'react-native-size-matters';
import {
  TabActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  BuyCuckooAmc,
  CheckOffer,
  RequestServ,
  RroductReg,
} from '../../../Assets/svg';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useState} from 'react';
// Constants
import Colors from '../../../Constants/Colors';
import ScreenName from '../../../Constants/ScreenName';
import Images from '../../../Constants/Images';
// Components
import Header from './Components/Header';
import Button from './Components/Button';
import Strings from '../../../Constants/Strings';
import Fonts from '../../../Constants/Fonts';
// redux
import {fetchProducts} from '../../../redux/slice/Products';
import {fetchListAddress} from '../../../redux/slice/SaveAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const navigation = useNavigation();
  const getProducts = useSelector(state => state.ProductsList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const getuserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      dispatch(fetchListAddress(userId));
    };
    getuserId();
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // const jumpToMessage = TabActions.jumpTo(ScreenName.HOME);
  // const jumpToMessage = TabActions.jumpTo('Message');

  // useFocusEffect(
  //   useCallback(() => {
  //     if (Platform.OS === 'android') {
  //       Alert.alert('Exit App', 'Are you sure want to exit this app ?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             const backAction = () => {
  //               navigation.dispatch(jumpToMessage);
  //               // navigation.dispatch(jumpToMessage);
  //             };
  //             const subscription = BackHandler.addEventListener(
  //               'hardwareBackPress',
  //               backAction,
  //             );
  //             // return subscription.remove();
  //             return BackHandler.exitApp();
  //           },
  //         },
  //       ]);
  //     }
  //   }, [navigation.dispatch()]),
  // );

  return (
    <View style={styles.contianer}>
      <TouchableOpacity
        onPress={() => {
          ScreenWithCustomBackBehavior();
        }}></TouchableOpacity>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: ms(30)}}></View>
        <View style={styles.btnContainer}>
          <Button
            productTitle={Strings.productRegistration}
            onPressClick={() => {
              navigation.navigate(ScreenName.REGISTERNEWPRODUCTS);
            }}>
            <RroductReg style={styles.imgStyle} />
          </Button>
          <Button
            containerStyle={styles.containerStyle}
            productTitle={Strings.requestservice}
            onPressClick={() => {
              navigation.navigate(ScreenName.REQUESTFORSERVICE);
            }}>
            <RequestServ style={styles.imgStyle} />
          </Button>
        </View>
        <View style={[styles.btnContainer, styles.btnContainerr]}>
          <Button
            productTitle={Strings.buyCuckooAmc}
            containerStyle={styles.containerStyle}
            onPressClick={() => {
              navigation.navigate(ScreenName.REGISTERNEWPRODUCTS);
            }}>
            <BuyCuckooAmc style={styles.imgStyle} />
          </Button>
          <Button
            productTitle={Strings.chackOffers}
            containerStyle={styles.containerStyle}
            onPressClick={() => {
              navigation.navigate(ScreenName.REQUESTFORSERVICE);
            }}>
            <CheckOffer style={styles.imgStyle} />
          </Button>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={8}
            onPress={() => {
              navigation.navigate(ScreenName.REGISTERNEWPRODUCTS);
            }}>
            <View>
              <View style={styles.btncontainerexplore}>
                <Text style={styles.btnTxtexplore}>
                  {Strings.exploreCuckoo}
                </Text>
                <Text style={styles.btnTxtexplore}>{Strings.productRange}</Text>
                <TouchableOpacity
                  style={styles.btnInnerExplore}
                  onPress={() => {
                    navigation.navigate(ScreenName.REGISTERNEWPRODUCTS);
                  }}
                  activeOpacity={9}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: ms(11),
                      textAlign: 'center',
                      fontFamily: Fonts.PoppinsRegular,
                    }}>
                    {Strings.shopNow}
                  </Text>
                </TouchableOpacity>
              </View>

              <ImageBackground
                source={Images.explorebackground}
                style={[styles.productImgStyle]}
                resizeMode="contain">
                <Image
                  source={Images.explorefrent}
                  style={[
                    styles.productImgStyle,
                    styles.productfrentImgStyle,
                    {
                      position: 'absolute',
                      bottom: Platform.OS != 'android' ? ms(-98.5) : ms(-80.5),
                      borderBottomRightRadius: 50,
                      resizeMode: 'contain',
                    },
                  ]}
                />
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  productServiceContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: ms(30),
  },
  btnContainerr: {
    padding: ms(15),
  },
  containerStyle: {
    backgroundColor: '#595957',
  },
  productImgStyle: {
    // width: '90%',
    width: '95%',
    overflow: 'hidden',
    marginLeft: ms(20),

    marginBottom: ms(20),
    // height: ms(350),
    height: ms(310),

    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: ms(-80),
  },
  btncontainerexplore: {
    position: 'relative',
    alignSelf: 'center',
    top: ms(50),
    zIndex: 99,
  },
  btnTxtexplore: {
    color: '#fff',
    fontSize: ms(26),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsBold,
  },
  btnInnerExplore: {
    backgroundColor: Colors.MainColorr,
    borderRadius: ms(20),
    paddingVertical: ms(4),
    paddingHorizontal: ms(20),
    marginTop: ms(10),
    alignSelf: 'center',
  },
  productfrentImgStyle: {
    width: '75%',
    right: ms(60),
  },
});
