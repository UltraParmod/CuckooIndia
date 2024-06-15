import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Strings from '../../../../../Constants/Strings';
import Images from '../../../../../Constants/Images';
import {ms} from 'react-native-size-matters';
import Colors from '../../../../../Constants/Colors';
import Header from '../../../../../Components/Header';
import ScreenName from '../../../../../Constants/ScreenName';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsRegisterList} from '../../../../../redux/slice/ProductsRegisterList';

const Requests = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Loadgin, setLoading] = useState(false);
  const getuserId = useSelector(state => state?.UserDetail?.data?.userId);
  const ProductsRegisterList = useSelector(
    state => state?.ProductsRegisterList?.data,
  );

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchProductsRegisterList(getuserId));
    setLoading(false);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        titleStyle={{color: Colors.Black, marginLeft: ms(-10)}}
        title={Strings.serviceReq}
        titleRight={Strings.requestforService}
        iconRight={true}
        iconRightSource={Images.add}
        titleRightStyle={{
          fontSize: ms(15),
          color: Colors.LighttGray,
          marginHorizontal: ms(20),
        }}
        onPressRight={() => {
          navigation.navigate(ScreenName.REQUESTFORSERVICE);
        }}
        onPressTxt={() => {
          navigation.navigate(ScreenName.REQUESTFORSERVICE);
        }}
      />
      {Loadgin && (
        <ActivityIndicator
          color={Colors.DarkPink}
          size="large"
          style={styles.loading}
        />
      )}
      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ProductsRegisterList}
          ListEmptyComponent={() => (
            <View style={styles.justifyAlignn}>
              <Text
                style={{
                  fontSize: 20,
                }}>
                {Strings.NoRequestsadded}
              </Text>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlistContainer}>
                <Text style={styles.ProductSize}>
                  {Strings.ProductNamee}
                  <Text style={styles.productText}> {item.productName}</Text>
                </Text>
                <Text style={styles.ProductSize}>
                  {Strings.Productreasonn}
                  <Text style={styles.productText}> {item.value}</Text>
                </Text>
                <Text style={styles.ProductSize}>
                  {Strings.Productremarkss}
                  <Text style={styles.productText}> {item.remarks}</Text>
                </Text>
                <Text style={styles.ProductSize}>
                  {Strings.ProductDateTime}
                  <Text style={styles.productText}>
                    {' '}
                    {item.productDateTime}
                  </Text>
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  flatlistContainer: {
    backgroundColor: Colors.ExtraLightGray,
    margin: ms(10),
    padding: ms(10),
    borderRadius: ms(10),
  },
  productText: {
    color: Colors.ExtraLightBlack,
  },
  ProductSize: {
    fontSize: ms(16),
    paddingVertical: ms(4),
  },
  loading: {
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
  justifyAlignn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
