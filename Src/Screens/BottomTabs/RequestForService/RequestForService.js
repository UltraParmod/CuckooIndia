import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// library
import React, {useEffect, useState} from 'react';
import {ms, s} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// Constants
import Strings from '../../../Constants/Strings';
import Colors from '../../../Constants/Colors';
import Images from '../../../Constants/Images';
import ScreenName from '../../../Constants/ScreenName';
import Config from '../../../Constants/Config';
// Components
import Header from '../../../Components/Header';
import DropdownModal from '../../../Components/DropdownModal';
import Label from '../../../Components/Label';
import CalenderView from '../../RegisterNewProducts/Components/CalenderView';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Fonts from '../../../Constants/Fonts';
// Utils
import {postApi} from '../../../Utils/commenFunction';
import {Installation_ReInstallation} from '../../../DataAPI/Installation_ReInstallation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fetchProductsRegisterList} from '../../../redux/slice/ProductsRegisterList';

const RequestForService = () => {
  const navigation = useNavigation();
  const [selectedProducts, setSelectedProducts] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [reasonList, setReasonList] = useState([]);
  const [openproductModal, setOpenProductModal] = useState(false);
  const [openexitingaddressModle, setOpenexitingaddressModel] = useState(false);
  const [exitingaddress, setExitingAddress] = useState();
  const [addressList, setAddressList] = useState([]);
  const addressDataList = useSelector(state => state.SaveAddressList?.data);
  const [
    openInstallation_ReInstallationModal,
    setOpenInstallation_ReInstallationModal,
  ] = useState(false);
  const dispatch = useDispatch();
  const [serviceChoise, setServiceChoise] = useState('ReInstallation');
  const [openReasonModal, setOpenReasonModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [date, setDate] = useState('');
  const productsList = useSelector(state => state.ProductsList.data);
  const userId = useSelector(state => state?.UserDetail?.data?.userId);
  const [addressId, setAddressId] = useState();
  const [Loadgin, setLoading] = useState(false);

  useEffect(() => {
    if (addressDataList) {
      let addreesses = JSON.parse(JSON.stringify(addressDataList));
      addreesses?.map(item => {
        item.id = item.addressId;
        item.value = item.address;
      });
      setAddressList(addreesses);
    }
  }, []);
  useEffect(() => {
    let addressObj = addressList?.filter(ele => ele?.address == exitingaddress);
    let addressID = addressObj?.[0]?.addressId;
    setAddressId(addressID);
  }, [exitingaddress]);

  useEffect(() => {
    const _getReason = async () => {
      try {
        const res = await postApi(Config.ReasonListApi);
        if (res?.status == true) {
          let reasion = res?.data.reasons;
          reasion.map(ele => {
            (ele.id = ele?.reasonId), (ele.value = ele?.reasonName);
            setReasonList(reasion);
          });
        } else {
        }
      } catch (error) {
        console.log('_getReason api...', error);
      }
    };
    _getReason();
  }, []);

  const _getRequestHandle = async () => {
    if (selectedProducts == '') {
      Alert.alert('Please Select Product');
      return;
    } else if (date == '') {
      Alert.alert('Please Choose Preferred Date & Time');
      return;
    } else if (selectedReason == 'ReInstallation') {
      Alert.alert('Please Choose Reason');
      return;
    } else if (remark == '') {
      Alert.alert('Please Enter Remarks');
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
        payload.append(
          'formType',
          serviceChoise == 'ReInstallation' ? '2' : '3',
        );
        payload.append('addressId', addressId);
        payload.append('remark', remark);
        payload.append('reason', selectedReason);
        const req = await postApi(Config.ProductRegisterApi, payload);
        setLoading(false);
        if (req?.status === true) {
          navigation.goBack();
          dispatch(fetchProductsRegisterList(userId));
          Alert.alert(' Request Submitted Successfully');
          navigation.navigate(ScreenName.REQUESTS);
        } else {
          Alert.alert('something went wrong ');
        }
      } catch (error) {
        console.log('GetReguestHandle Api ', error);
      }
    }
  };
  const reciveWarranty = varwarranty => {
    setDate(varwarranty);
  };
  return (
    <View style={styles.container}>
      <Header
        title={Strings.requestService}
        titleStyle={styles.titleStyle}
        titleRight={Strings.registerNewProduct}
        titleRightStyle={styles.titleRightStyle}
        iconRight={true}
        iconRightSource={Images.add}
        containerStyle={styles.containerStyle}
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
          style={styles.loaderActive}
        />
      )}

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={150}>
        <View style={styles.innerContainer}>
          <Label labelTitle={Strings.pickFrom} />
          <DropdownModal
            data={Installation_ReInstallation}
            visible={openInstallation_ReInstallationModal}
            onSelected={Produnct => {
              setServiceChoise(Produnct);
              setOpenInstallation_ReInstallationModal(false);
            }}
            closedModal={() => {
              setOpenInstallation_ReInstallationModal(false);
            }}
          />

          <TouchableOpacity
            style={styles.btnDropDown}
            onPress={() => setOpenInstallation_ReInstallationModal(true)}>
            <Text
              style={[
                styles.selectedValue,
                {
                  color: serviceChoise != '' ? Colors.Black : Colors.Gray,
                },
              ]}>
              {serviceChoise || 'Installation/ReInstallation'}
            </Text>

            <Image
              source={Images.arrowDown}
              style={[
                styles.dropDownIcon,
                {
                  tintColor: serviceChoise ? Colors.Black : Colors.LightGray,
                },
              ]}
            />
          </TouchableOpacity>
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
            onPress={() => setOpenProductModal(true)}>
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
                styles.dropDownIcon,
                {
                  tintColor: selectedProducts ? Colors.Black : Colors.LightGray,
                },
              ]}
            />
          </TouchableOpacity>

          <CalenderView
            reciveFunc={reciveWarranty}
            labelTitle={Strings.preferredDate}
            minimumDate={new Date()}
          />
          {serviceChoise != 'ReInstallation' && (
            <View>
              <Label labelTitle={Strings.pleaseSelectReason} />
              <DropdownModal
                data={reasonList}
                visible={openReasonModal}
                onSelected={Reason => {
                  setSelectedReason(Reason);
                  setOpenReasonModal(false);
                }}
                closedModal={() => {
                  setOpenReasonModal(false);
                }}
              />
              <TouchableOpacity
                style={styles.btnDropDown}
                onPress={() => setOpenReasonModal(true)}>
                <Text
                  style={[
                    styles.selectedValue,
                    {color: selectedReason != '' ? Colors.Black : Colors.Gray},
                  ]}>
                  {selectedReason || 'Select Reason'}
                </Text>
                <Image
                  source={Images.arrowDown}
                  style={[
                    styles.dropDownIcon,
                    {
                      tintColor: selectedReason
                        ? Colors.Black
                        : Colors.LightGray,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          )}
          <Label labelTitle={Strings.address} />
          <DropdownModal
            data={addressList}
            visible={openexitingaddressModle}
            onSelected={exitingAddress => {
              setExitingAddress(exitingAddress);
              setOpenexitingaddressModel(false);
            }}
            closedModal={() => {
              setOpenexitingaddressModel(false);
            }}
          />
          <TouchableOpacity
            style={styles.btnDropDown}
            onPress={() => setOpenexitingaddressModel(true)}>
            <Text
              style={[
                styles.selectedValue,
                {color: exitingaddress != '' ? Colors.Black : Colors.Gray},
              ]}>
              {exitingaddress || 'Select address'}
            </Text>
            <Image
              source={Images.arrowDown}
              style={[
                styles.dropDownIcon,
                {tintColor: exitingaddress ? Colors.Black : Colors.LightGray},
              ]}
            />
          </TouchableOpacity>

          <Input
            value={remark}
            labelTitle={Strings.remarks}
            onChangeText={val => setRemark(val)}
            multiline={true}
            inputStyle={styles.inputContainerStyle}
          />
          <Button
            label={Strings.btnSubmit}
            style={styles.btnStyle}
            labelStyle={styles.labelStyle}
            btnOnpress={() => {
              _getRequestHandle();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RequestForService;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  containerStyle: {
    justifyContent: 'space-between',
  },
  titleRightStyle: {
    marginLeft: ms(20),
    marginRight: ms(5),
    fontSize: ms(14),
    color: Colors.DarkBlue,
  },
  innerContainer: {
    marginHorizontal: ms(15),
  },
  titleStyle: {
    fontSize: s(15),
    margin: ms(-20),
    color: Colors.Black,
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
  selectedValue: {
    fontSize: s(16),
    color: Colors.Gray,
  },
  dropDownIcon: {
    width: ms(20),
    height: ms(20),
  },
  inputContainerStyle: {
    height: ms(100),
    borderColor: Colors.Black,
    borderWidth: ms(0.5),
    textAlignVertical: 'top',
  },
  btnStyle: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: ms(30),
  },
  labelStyle: {
    fontSize: s(15),
    fontFamily: Fonts.PoppinsMedium,
  },
  loaderActive: {
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
});
