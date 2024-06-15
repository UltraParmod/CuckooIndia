import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Images from '../../../Constants/Images';
import Strings from '../../../Constants/Strings';
import Colors from '../../../Constants/Colors';
// API Data
import {ProdunctsList} from '../../../DataAPI/ProdunctsList';
// Components
import Label from '../../../Components/Label';
import DropdownModal from '../../../Components/DropdownModal';
import CalenderView from '../Components/CalenderView';
import Input from '../../../Components/Input';
import Switch from './Components/Switch';
const ReInstallation = () => {
  const [address, setAddress] = useState(0);
  const [date, setDate] = useState('');
  //   StoreData
  const [selectedProducts, setSelectedProducts] = useState('');
  //   Modal
  const [openproductModal, setOpenProductModal] = useState(false);
  const [remark, setRemark] = useState('');
  const reciveWarranty = varwarranty => {
    setDate(varwarranty);
  };

  _submitValidation = val => {
    if (selectedProducts == '') {
      Alert.alert('Please choose Products');
      return;
    } else if (date == '') {
      Alert.alert('Please select a date');
      return;
    } else if (remark == '') {
      Alert.alert('Please write a remark');
      return;
    } else if (val.selectedpurchased == '') {
      Alert.alert('Please select a Existing address ');
      return;
    }
    if (address == 1) {
      if (val.userAddress == '') {
        Alert.alert('Please add new Address');
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
    } else {
      Alert.alert('submit successfully');
    }
  };
  return (
    <View>
      <View>
        <Label labelTitle={Strings.chooseProduct} />
        <DropdownModal
          data={ProdunctsList}
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
              {tintColor: selectedProducts ? Colors.Black : Colors.LightGray},
            ]}
          />
        </TouchableOpacity>
      </View>
      <CalenderView
        reciveFunc={reciveWarranty}
        labelTitle={Strings.preferredDate}
      />
      <Input
        value={remark}
        labelTitle={Strings.remarks}
        onChangeText={val => setRemark(val)}
        inputStyle={styles.InputContainerStyle}
      />
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
            }}>
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
        <Switch address={address} Callback={res => _submitValidation(res)} />
      </View>
    </View>
  );
};

export default ReInstallation;
const styles = StyleSheet.create({
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
  InputContainerStyle: {
    height: ms(100),
    borderColor: Colors.Black,
    borderWidth: ms(0.5),
    textAlignVertical: 'top',
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
    textAlign: 'right',
  },
  addNewAddress: {
    textAlign: 'left',
  },
});
