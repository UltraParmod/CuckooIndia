// library
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms, s} from 'react-native-size-matters';
import DocumentPicker, {types} from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
// comoponents
import Switch from './Components/Switch';
import Browse from '../Components/Browse';
import CalenderView from '../Components/CalenderView';
import DropdownModal from '../../../Components/DropdownModal';
import Label from '../../../Components/Label';
import Input from '../../../Components/Input';
import Fonts from '../../../Constants/Fonts';
//Constants
import Images from '../../../Constants/Images';
import Colors from '../../../Constants/Colors';
import Strings from '../../../Constants/Strings';
import Config from '../../../Constants/Config';
// DataAPI
// Utils
import {postApi, postNewApi} from '../../../Utils/commenFunction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../../../Constants/ScreenName';
// redux
import {fetchProductsRegisterList} from '../../../redux/slice/ProductsRegisterList';
const Installation = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState(0);
  const [date, setDate] = useState();
  const [warranty, setWarranty] = useState();
  const [selectedProducts, setSelectedProducts] = useState('');
  const [choosemodle, setChooseModle] = useState('');
  const [choosemodleList, setChooseModleList] = useState('');
  const [selectedpurchased, setSelectedPurchased] = useState('');
  const [getwarrantydocs, setgetWarrantyDocs] = useState();
  const [uploadinvoice, setUploadInvoice] = useState();
  const [purchedFrom, setPurchasedFrom] = useState([]);
  const [openproductModal, setOpenProductModal] = useState(false);
  const [openchooseModle, setOpenChooseModle] = useState(false);
  const [openpurchasedModal, setOpenPurchasedModal] = useState(false);
  const [productserno, setProductSerNo] = useState();
  const productsList = useSelector(state => state.ProductsList.data);
  const [Loadgin, setLoading] = useState(false);
  const userId = useSelector(state => state?.UserDetail?.data?.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const _getModle = async () => {
      if (selectedProducts) {
        try {
          let product = productsList.filter(
            ele => ele.product_name == selectedProducts,
          );
          const response = await postNewApi({
            body: {
              operation: 'getModel',
              data: [
                {
                  product_id: product[0].product_id,
                },
              ],
            },
          });
          let modleList = response.data;
          modleList?.map(ele => {
            ele.id = ele?.model_id;
            ele.value = ele?.model;
          });
          setChooseModleList(modleList);
        } catch (error) {
          console.log('getModel error Api', error);
        }
      }
    };
    _getModle();
  }, [selectedProducts]);

  useEffect(() => {
    const purchasedFrom = async () => {
      try {
        const res = await postNewApi({
          body: {
            operation: Config.GetSourceOfSale,
            data: [],
          },
        });
        let purchasedFrom = res?.data;
        purchasedFrom.map(ele => {
          ele.id = ele?.id;
          ele.value = ele?.source;
        });
        setPurchasedFrom(purchasedFrom);
      } catch (error) {
        console.log(' purchaseFrom Api error', error);
      }
    };
    purchasedFrom();
  }, []);

  useEffect(() => {
    const _getWarranty = async () => {
      if (choosemodle != '' && date != null) {
        try {
          const modlee = choosemodleList.filter(
            ele => ele.model == choosemodle,
          );
          let payload = {
            operation: 'getWarranty',
            data: [
              {
                model_id: modlee[0].model_id,
                invoice_date: date.toLocaleDateString(),
              },
            ],
          };
          const res = await postNewApi({body: payload});
          console.log('res.....', res);
          setWarranty(res);
        } catch (error) {
          console.log('getWarranty error Api', error);
        }
      }
    };
    _getWarranty();
  }, [choosemodle, date]);

  const reciveWarranty = varwarranty => {
    setDate(varwarranty);
  };

  const _getwarrantydocs = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: types.pdf,
      });
      setgetWarrantyDocs(res[0]);
    } catch (error) {
      console.log('get warranty docs error', error);
    }
  };
  const _uploadInvoice = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: types.pdf,
      });
      setUploadInvoice(res[0]);
    } catch (error) {
      console.log('upload Invoice Error', error);
    }
  };

  const _submitValidationhandle = async val => {
    if (selectedProducts == '') {
      Alert.alert('Please Choose Product');
      return;
    } else if (choosemodle == '') {
      Alert.alert('Please Choose Modle');
      return;
    } else if (date == undefined) {
      Alert.alert('Please select date');
      return;
    } else if (productserno == undefined) {
      Alert.alert('Please Enter 12 Digit Serial No.');
      return;
    } else if (getwarrantydocs == undefined) {
      Alert.alert('Please upload Warranty Card');
      return;
    } else if (uploadinvoice == undefined) {
      Alert.alert('Please upload Invoice ');
      return;
    } else if (selectedpurchased == '') {
      Alert.alert('Please select purchase from');
      return;
    } else if (val?.selectedpurchased == '') {
      Alert.alert('Please select Existing Address');
      return;
    } else {
      let product = productsList.filter(
        elem => elem.product_name == selectedProducts,
      );
      try {
        setLoading(true);
        let payload = new FormData();
        payload.append('userId', userId);
        payload.append('productId', product[0]?.product_id);
        payload.append('purchaseDate', date.toLocaleDateString());
        payload.append('formType', '1');
        payload.append('addressId', val?.addressId);
        payload.append('serialNo', productserno);
        payload.append('warrantyCard', getwarrantydocs);
        payload.append('invoicePDF', uploadinvoice);
        console.log('patload.patload.patload', payload);
        const req = await postApi(Config.ProductRegisterApi, payload);

        setLoading(false);
        if (req?.status === true) {
          navigation.navigate(ScreenName.MYPURCHASE);
          dispatch(fetchProductsRegisterList(userId));
          Alert.alert(' Service Request Successfully');
        } else {
          Alert.alert('something went wrong ');
        }
      } catch (error) {
        console.log('GetReguestHandle Api ', error);
      }
    }

    if (address == 1) {
      if (val.userAddress == '') {
        return;
      } else if (val.userState == '') {
        Alert.alert('Please select State');
        return;
      } else if (val.userCity == '') {
        Alert.alert('Please select city');
        return;
      } else if (val.userPincode == undefined) {
        Alert.alert('Please write a pincode ');
        return;
      } else {
        Alert.alert('submit successfully');
      }
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={500}>
        {Loadgin && (
          <ActivityIndicator
            color={Colors.DarkPink}
            size="large"
            style={styles.loader}
          />
        )}
        <View>
          <Label labelTitle={Strings.chooseProduct} />
          <DropdownModal
            data={productsList}
            visible={openproductModal}
            onSelected={Produnct => {
              setSelectedProducts(Produnct);
              setOpenProductModal(false);
            }}
            closedModal={() => {
              setOpenProductModal(false);
            }}
          />
          <TouchableOpacity
            style={styles.btnDropDown}
            onPress={() => {
              setOpenProductModal(true);
            }}>
            <Text
              style={[
                styles.selectedValue,
                {color: selectedProducts != '' ? Colors.Black : Colors.Gray},
              ]}>
              {selectedProducts || 'Select Product'}
            </Text>
            <Image
              source={Images.arrowDown}
              style={[
                styles.DropDownIcon,
                {tintColor: selectedProducts ? Colors.Black : Colors.LightGray},
              ]}
            />
          </TouchableOpacity>

          <Label labelTitle={Strings.chooseModel} />
          {Loadgin && (
            <ActivityIndicator
              color={Colors.DarkPink}
              size="large"
              style={styles.loading}
            />
          )}
          <DropdownModal
            data={choosemodleList}
            visible={openchooseModle}
            onSelected={Model => {
              setChooseModle(Model);
              setOpenChooseModle(false);
            }}
            closedModal={() => {
              setOpenChooseModle(false);
            }}
          />
          <TouchableOpacity
            style={styles.btnDropDown}
            disabled={selectedProducts != '' ? false : true}
            onPress={() => {
              setOpenChooseModle(true);
            }}>
            <Text
              style={[
                styles.selectedValue,
                {color: choosemodle != '' ? Colors.Black : Colors.Gray},
              ]}>
              {choosemodle || 'Select Model'}
            </Text>
            <Image
              source={Images.arrowDown}
              style={[
                styles.DropDownIcon,
                {tintColor: choosemodle ? Colors.Black : Colors.LightGray},
              ]}
            />
          </TouchableOpacity>
        </View>

        <CalenderView
          reciveFunc={reciveWarranty}
          labelTitle={Strings.purchasedData}
          maximumDate={new Date()}
        />
        {warranty?.data[0]?.warranty_status && (
          <Text style={{color: 'red', margin: ms(5), fontSize: s(14)}}>
            {warranty?.data[0]?.warranty_status} {Strings.Warrantyy}
          </Text>
        )}
        <Input
          value={productserno}
          labelTitle={Strings.productSerialNumber}
          placeholderTxt={Strings.serialNo}
          onChangeText={val => setProductSerNo(val)}
          maxLength={12}
        />
        <Browse
          labelTitle={Strings.warrantycard}
          btnTitle={Strings.browse}
          cardTitle={getwarrantydocs?.name}
          onPressBrowse={() => {
            _getwarrantydocs();
          }}
        />
        <Browse
          labelTitle={Strings.invioce}
          cardTitle={uploadinvoice?.name}
          btnTitle={Strings.browse}
          onPressBrowse={() => {
            _uploadInvoice();
          }}
        />

        <View>
          <Label labelTitle={Strings.purchasedfrom} />
          <DropdownModal
            data={purchedFrom}
            visible={openpurchasedModal}
            onSelected={Purchased => {
              setSelectedPurchased(Purchased);
              setOpenPurchasedModal(false);
            }}
            closedModal={() => {
              setOpenPurchasedModal(false);
            }}
          />
          <TouchableOpacity
            style={styles.btnDropDown}
            onPress={() => setOpenPurchasedModal(true)}>
            <Text
              style={[
                styles.selectedValue,
                {color: selectedpurchased != '' ? Colors.Black : Colors.Gray},
              ]}>
              {selectedpurchased || null}
            </Text>
            <Image
              source={Images.arrowDown}
              style={[
                styles.DropDownIcon,
                {
                  tintColor: selectedpurchased
                    ? Colors.Black
                    : Colors.LightGray,
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Label labelTitle={Strings.selectAddress} />
          <View style={styles.btnContainer}>
            <View style={styles.btnOuterCricle}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setAddress(0);
                }}
                style={{
                  ...styles.btnInnerCricle,
                  ...{
                    backgroundColor: address == 0 ? Colors.DarkPink : null,
                  },
                }}></TouchableOpacity>
            </View>
            <View style={styles.rowWidth}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setAddress(0);
                }}>
                <Text style={styles.existing}>{Strings.existing}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setAddress(1);
                }}>
                <Text style={[styles.addNewAddress, styles.existing]}>
                  {Strings.addNewAddress}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnOuterCricle}>
              <TouchableOpacity
                onPress={() => {
                  setAddress(1);
                }}
                style={{
                  ...styles.btnInnerCricle,
                  ...{
                    backgroundColor: address == 1 ? Colors.DarkPink : null,
                  },
                }}></TouchableOpacity>
            </View>
          </View>
          <Switch
            address={address}
            Callback={res => {
              _submitValidationhandle(res), setSelectedProducts('');
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default Installation;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  btnDropDown: {
    width: '100%',
    height: ms(50),
    borderRadius: ms(10),
    borderWidth: ms(0.5),
    borderColor: Colors.Gray,
    color: Colors.Black,
    fontSize: s(14),
    backgroundColor: Colors.White,
    alignSelf: 'center',
    marginTop: ms(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(15),
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  selectedValue: {
    fontSize: s(16),
    color: Colors.Gray,
  },
  rowWidth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  DropDownIcon: {
    width: ms(20),
    height: ms(20),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    marginTop: ms(30),
  },
  btnOuterCricle: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
    borderWidth: ms(1),
    borderColor: Colors.DarkPink,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ms(3),
  },
  btnInnerCricle: {
    width: ms(16),
    height: ms(16),
    borderRadius: ms(8),
    backgroundColor: Colors.DarkPink,
  },
  existing: {
    fontSize: s(15),
    color: Colors.Black,
    fontFamily: Fonts.PoppinsMedium,
    textAlign: 'right',
  },
  addNewAddress: {
    textAlign: 'left',
  },
});
