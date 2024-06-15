import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// library
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ms, s} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
// Components
import Input from '../../../../Components/Input';
import Strings from '../../../../Constants/Strings';
import Label from '../../../../Components/Label';
import Button from '../../../../Components/Button';
import DropdownModal from '../../../../Components/DropdownModal';
// DataAPI
// Constants
import Colors from '../../../../Constants/Colors';
import Fonts from '../../../../Constants/Fonts';
import Images from '../../../../Constants/Images';
import Config from '../../../../Constants/Config';
// Utils
import {postNewApi} from '../../../../Utils/commenFunction';

const Switch = ({address, Callback}) => {
  const [selectedState, setselectedState] = useState('');
  const [stateList, setStateList] = useState([]);
  const [distictList, setDistictList] = useState([]);
  const [selectedDistict, setselectedDistict] = useState('');
  const [openDistrictModal, setOpenDistrictModall] = useState('');
  const [selectedCity, setselectedCity] = useState('');
  const [cityList, setCityList] = useState('0');
  const [openStateModal, setOpenStateModall] = useState(false);
  const [addnewaddress, setAddNewAddress] = useState();

  const [pincode, setPinCode] = useState();
  const data = useSelector(state => state.UserDetail);
  const [openexitingaddressModle, setOpenexitingaddressModel] = useState(false);
  const [exitingaddress, setExitingAddress] = useState();
  const [addressList, setAddressList] = useState([]);
  const addressDataList = useSelector(state => state.SaveAddressList?.data);
  const [addressId, setAddressId] = useState();

  // address
  useEffect(() => {
    if (addressDataList) {
      let addreesses = JSON.parse(JSON.stringify(addressDataList));
      addreesses?.map(item => {
        item.id = item?.addressId;
        item.value = item?.address;
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
    const _getState = async () => {
      try {
        const res = await postNewApi({
          body: {
            operation: 'getState',
            data: [],
          },
        });
        let states = res?.data;
        states.map(ele => {
          (ele.id = ele?.stateid), (ele.value = ele?.state);
        });
        setStateList(states);
      } catch (error) {
        console.log(' state api  error', error);
      }
    };
    _getState();
  }, []);

  useEffect(() => {
    const _district = async () => {
      if (selectedState) {
        try {
          let state = stateList.filter(eleme => eleme.state == selectedState);

          const res = await postNewApi({
            body: {
              operation: Config.GetDistrict,
              data: [
                {
                  stateid: state[0].stateid,
                },
              ],
            },
          });
          let district = res?.data;

          district?.map(ele => {
            (ele.id = ele?.id), (ele.value = ele?.district);
          });

          setDistictList(district);
        } catch (error) {
          console.log('Distict Api error ', error);
        }
      }
    };
    _district();
  }, [selectedState]);
  useEffect(() => {
    const _cityList = async () => {
      try {
        let statee = stateList.filter(elem => elem.state == selectedState);

        const res = await postNewApi({
          body: {
            operation: 'getCity',
            data: [
              {
                stateid: statee[0]?.stateid,
              },
            ],
          },
        });
        let citys = res?.data;

        citys.map(ele => {
          ele.id = ele?.cityid;
          ele.value = ele?.city;
        });

        setCityList(citys);
      } catch (error) {
        console.log('City api error', error);
      }
    };
    _cityList();
  }, [selectedState]);

  return (
    <View>
      {address == 0 ? (
        <View>
          <View>
            <Label labelTitle={Strings.address} />
            <DropdownModal
              data={addressList}
              ListEmptyComponent
              visible={openexitingaddressModle}
              onSelected={existingAddress => {
                setExitingAddress(existingAddress);
                setOpenexitingaddressModel(false);
              }}
              closedModal={() => {
                setOpenexitingaddressModel(false);
              }}
            />

            <TouchableOpacity
              style={styles.btnDropDown}
              onPress={() => {
                setOpenexitingaddressModel(true);
              }}>
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
                  styles.DropDownIcon,
                  {
                    tintColor: exitingaddress ? Colors.Black : Colors.LightGray,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <Button
            style={styles.style}
            label={Strings.btnSubmit}
            btnOnpress={() => {
              Callback({selectedpurchased: exitingaddress, addressId});
            }}
          />
        </View>
      ) : (
        <View>
          <Input
            labelTitle={Strings.addNewAddress}
            value={addnewaddress}
            onChangeText={val => setAddNewAddress(val)}
            inputStyle={styles.inputContainerStyle}
            multiline={true}
          />
          <View style={styles.flexContainer}>
            <View style={styles.innerFlex}>
              <Label labelTitle={Strings.state} />
              <DropdownModal
                data={stateList}
                visible={openStateModal}
                onSelected={State => {
                  setselectedState(State);
                  setOpenStateModall(false);
                  setselectedCity('');
                }}
                closedModal={() => {
                  setOpenStateModall(false);
                }}
              />
              <TouchableOpacity
                style={styles.country}
                onPress={() => {
                  setOpenStateModall(true);
                }}>
                <Text
                  style={[
                    styles.selectedProducts,
                    {color: selectedState != '' ? Colors.Black : Colors.Gray},
                  ]}>
                  {selectedState || 'Select State'}
                </Text>
                <Image
                  source={Images.arrowDown}
                  style={[
                    styles.arrowDown,
                    {tintColor: selectedState ? Colors.Black : Colors.Gray},
                  ]}
                />
              </TouchableOpacity>
            </View>
            {/* Distic api  */}
            <View style={styles.innerFlex}>
              <Label labelTitle={Strings.district} />
              <DropdownModal
                data={distictList}
                visible={openDistrictModal}
                onSelected={District => {
                  setselectedDistict(District);
                  setOpenDistrictModall(false);
                  setselectedCity('');
                }}
                closedModal={() => {
                  setOpenDistrictModall(false);
                }}
              />
              <TouchableOpacity
                disabled={selectedState != '' ? false : true}
                style={styles.country}
                onPress={() => {
                  setOpenDistrictModall(true);
                }}>
                <Text
                  style={[
                    styles.selectedProducts,
                    {color: selectedDistict != '' ? Colors.Black : Colors.Gray},
                  ]}>
                  {selectedDistict || 'Select District'}
                </Text>
                <Image
                  source={Images.arrowDown}
                  style={[
                    styles.arrowDown,
                    {tintColor: selectedDistict ? Colors.Black : Colors.Gray},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flexContainer}>
            <View style={{flexDirection: 'column', width: '100%'}}>
              <View
                style={{
                  marginBottom: Platform.OS != 'android' ? ms(5) : ms(-3),
                }}>
                <Label labelTitle={Strings.pinCode} />
              </View>

              <Input
                style={styles.container}
                value={pincode}
                label={Strings.pinCode}
                placeholderTxt={Strings.entrePinCode}
                keyboardType={'number-pad'}
                onChangeText={val => setPinCode(val)}
                maxLength={6}
              />
            </View>
          </View>

          <Button
            style={styles.style}
            label={Strings.btnSubmit}
            btnOnpress={() => {
              let stateObj = stateList?.filter(
                ele => ele?.state == selectedState,
              );
              let stateID = stateObj[0]?.id;

              let distictObj = distictList?.filter(
                ele => ele?.district == selectedDistict,
              );
              let distictId = distictObj[0]?.id;
              let addressObj = addressList?.filter(
                ele => ele?.address == exitingaddress,
              );
              let addressID = addressObj[0]?.addressId;
              Callback({
                userId: data?.data?.userId,
                userName: data?.data?.userName,
                userEmail: data?.data?.userEmail,
                userMobile: data?.data?.userPhone,
                userAddress: addnewaddress,
                userState: selectedState,
                userDistrict: selectedDistict,
                userCity: selectedCity,
                userAddressStatus: '1',
                userPincode: pincode,
                stateId: stateID,
                districtId: distictId,
                addressId: addressID,
              });
            }}
          />
        </View>
      )}
    </View>
  );
};
export default Switch;
const styles = StyleSheet.create({
  style: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: ms(30),
  },
  inputContainerStyle: {
    height: ms(100),
    paddingTop: ms(15),
    textAlignVertical: 'top',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  country: {
    flexDirection: 'row',
    borderWidth: ms(0.5),
    borderRadius: ms(10),
    width: '100%',
    height: ms(50),
    alignItems: 'center',
    paddingHorizontal: ms(10),
    justifyContent: 'space-between',
    marginTop: ms(3),
  },
  innerFlex: {
    width: '48%',
    marginTop: ms(15),
  },
  arrowDown: {
    position: 'absolute',
    right: ms(10),
    width: ms(15),
    height: ms(15),
    resizeMode: 'contain',
  },
  selectedProducts: {
    fontSize: s(14),
    color: Colors.Black,
    fontFamily: Fonts.PoppinsRegular,
    width: '88%',
  },
  container: {
    marginTop: ms(-40),
    width: '100%',
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
  DropDownIcon: {
    width: ms(20),
    height: ms(20),
  },
});
