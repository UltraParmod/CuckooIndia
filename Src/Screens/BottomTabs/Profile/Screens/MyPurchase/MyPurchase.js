import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../../Components/Header';
import ScreenName from '../../../../../Constants/ScreenName';
import Strings from '../../../../../Constants/Strings';
import Colors from '../../../../../Constants/Colors';
import Images from '../../../../../Constants/Images';
import {ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {postApi} from '../../../../../Utils/commenFunction';
import Config from '../../../../../Constants/Config';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsRegisterList} from '../../../../../redux/slice/ProductsRegisterList';

const MyPurchase = () => {
  const navigation = useNavigation();
  const [userProductList, setuserProductList] = useState();
  const getUserId = useSelector(state => state.UserDetail.data.userId);
  const [Loadgin, setLoading] = useState(false);
  const dispatch = useDispatch();
  const _userProductList = async () => {
    let payload = {
      userId: getUserId,
    };
    const res = await postApi(Config.UserProductListApi, payload);
    setuserProductList(res?.data?.userProductList);
  };
  _userProductList();

  const getuserId = useSelector(state => state?.UserDetail?.data?.userId);
  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchProductsRegisterList(getuserId));
    setLoading(false);
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header
        titleStyle={{color: Colors.Black, marginLeft: ms(-10)}}
        title={Strings.register}
        titleRight={Strings.registerNewProduct}
        iconRight={true}
        iconRightSource={Images.add}
        titleRightStyle={{
          fontSize: ms(15),
          color: Colors.LighttGray,
          marginHorizontal: ms(30),
        }}
        onPressRight={() => {
          navigation.navigate(ScreenName.REGISTERNEWPRODUCTS);
        }}
        onPressTxt={() => {
          navigation.navigate(ScreenName.REGISTERNEWPRODUCTS);
        }}
      />
      {Loadgin && (
        <ActivityIndicator
          color={Colors.DarkPink}
          size="large"
          style={styles.loader}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userProductList}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
              }}>
              No Data Request
            </Text>
          </View>
        )}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.flatlistContainer}>
              <Text style={styles.ProductSize}>
                {Strings.product}{' '}
                <Text style={styles.productText}>{item.productName}</Text>
              </Text>

              <Text style={styles.ProductSize}>
                {Strings.serialNoo}{' '}
                <Text style={styles.productText}>{item.serialNumber}</Text>
              </Text>

              <Text style={styles.ProductSize}>
                {Strings.address} :{' '}
                <Text style={styles.productText}>{item.address}</Text>
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyPurchase;

const styles = StyleSheet.create({
  flatlistContainer: {
    backgroundColor: Colors.ExtraLightGray,
    margin: ms(10),
    padding: ms(10),
    borderRadius: ms(10),
  },
  loader: {
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
  productText: {
    color: Colors.ExtraLightBlack,
  },
  ProductSize: {
    fontSize: ms(16),
    paddingVertical: ms(4),
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: ms(10),
  },
  imageStyle: {
    marginVertical: ms(10),
    borderRadius: ms(5),
    width: ms(200),
    height: ms(200),
    alignSelf: 'center',
  },
});
