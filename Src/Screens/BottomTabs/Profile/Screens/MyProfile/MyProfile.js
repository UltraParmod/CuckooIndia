import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ms, s } from 'react-native-size-matters';
import Images from '../../../../../Constants/Images';
import Header from '../../../../../Components/Header';
import Colors from '../../../../../Constants/Colors';
import Strings from '../../../../../Constants/Strings';
import Label from '../../../../../Components/Label';
import Input from '../../../../../Components/Input';
import DropdownModal from '../../../../../Components/DropdownModal';
import Button from '../../../../../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import Config from '../../../../../Constants/Config';
import { postApi } from '../../../../../Utils/commenFunction';
import { fetchUserDetail } from '../../../../../redux/slice/UserDetail';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../../../../../permissions';

export const Gender = [
  {
    id: '1',
    value: 'Male',
  },
  {
    id: '2',
    value: 'Female',
  },
  {
    id: '3',
    value: 'Other',
  },
];

const MyProfile = () => {
  const dispatch = useDispatch();
  const myData = useSelector(state => state.UserDetail);
  const [selectedGender, setselectedGender] = useState(
    myData?.data?.userGender || 'Select Gender',
  );
  const [fullname, setFullName] = useState(myData?.data?.userName);
  const [email, setEmail] = useState(myData?.data?.userEmail);
  const [mobileno, setMobileNo] = useState(myData?.data?.userPhone);
  const [profileImg, setProfilleImg] = useState(myData?.data?.profileImage);
  const [Loadgin, setLoading] = useState(false);

  const handleButtonPress = async () => {
    try {
      setLoading(true);
      let data = new FormData();
      data.append('userId', myData?.data.userId);
      data.append('userName', fullname);
      data.append('userEmail', myData?.data.userEmail);
      data.append('userMobile', myData?.data.userPhone);
      data.append('userGender', selectedGender);
      data.append('profileImage', {
        uri:
          Platform.OS == 'android'
            ? profileImg
            : profileImg.replace('file://', ''),
        name: myData?.data?.userId + Date.now() + '.jpg',
        type: 'image/jpeg',
      });
      const response = await postApi(Config.UserProfileUpdateApi, data);
      setLoading(false);
      if (response.status == true) {
        dispatch(fetchUserDetail(myData?.data?.userId));
        Alert.alert(response.message);
      } else {
        Alert.alert(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.log('user udapdate details ', error);
    }
  };
  //   Modal
  const [openGenderModal, setOpenGenderModal] = useState(false);
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'android') {
      Alert.alert('Upload Picture', 'Choose Option', [
        { text: 'Camera', onPress: onCamera },
        { text: 'Gallery', onPress: onGallery },
        { text: 'Cancel', onPress: () => { } },
      ]);
    }
  };
  const onCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.2,
      freeStyleCropEnabled: true,
    }).then(image => {
      setProfilleImg(image?.path);
    });
  };
  const onGallery = () => {
    try {
      ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.2,
        freeStyleCropEnabled: true,
      }).then(image => {
        setProfilleImg(image?.path);
      });
    } catch (error) {
      console.log('errorr ...', error.message);
    }
  };
  return (
    <View style={styles.contianer}>
      <Header title={Strings.editProfile} titleStyle={styles.titleStyle} />

      {Loadgin && (
        <ActivityIndicator
          color={Colors.DarkPink}
          size="large"
          style={styles.loading}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          {profileImg ? (
            <Image source={{ uri: profileImg }} style={styles.userImg} />
          ) : (
            <Image source={Images.userImg} style={styles.userImg} />
          )}
          <TouchableOpacity
            style={styles.openCamaraContainer}
            activeOpacity={1}
            onPress={() => {
              onSelectImage();
              // Alert.alert('kkk');
            }}>
            <Image source={Images.openCamara} style={styles.openCamara} />
          </TouchableOpacity>
        </View>
        <View style={styles.detials}>
          <Input
            value={fullname}
            inputStyle={styles.inputStyle}
            placeholderTxt={Strings.fullnamee}
            labelTitle={Strings.fullname}
            onChangeText={val => setFullName(val)}
            titleStyle={{ color: Colors.Black }}
          />
          <Input
            value={email}
            inputStyle={styles.inputStyle}
            placeholderTxt={Strings.emaill}
            labelTitle={Strings.email}
            onChangeText={val => setEmail(val)}
            titleStyle={{ color: Colors.Black }}
            editable={false}
          />
          <Input
            value={mobileno}
            inputStyle={styles.inputStyle}
            placeholderTxt={Strings.phonee}
            labelTitle={Strings.phone}
            onChangeText={val => setMobileNo(val)}
            titleStyle={{ color: Colors.Black }}
            editable={false}
          />
          <Label
            labelTitle={Strings.gender}
            titleStyle={{ color: Colors.Black }}
          />
          <DropdownModal
            innerContainerStyle={styles.innerContainerStyle}
            data={Gender}
            visible={openGenderModal}
            onSelected={Gender => {
              setselectedGender(Gender);
              setOpenGenderModal(false);
            }}
            closedModal={() => {
              setOpenGenderModal(false);
            }}
          />
          <TouchableOpacity
            style={styles.btnDropDown}
            onPress={() => setOpenGenderModal(true)}>
            <Text
              style={[
                styles.selectedValue,
                { color: selectedGender != '' ? Colors.Black : Colors.Gray },
              ]}>
              {selectedGender != 'Undefined' ? selectedGender : 'Select Gender'}
            </Text>
            <Image
              source={Images.arrowDown}
              style={[
                styles.dropDownIcon,
                { tintColor: selectedGender ? Colors.Black : Colors.LightGray },
              ]}
            />
          </TouchableOpacity>

          <Button
            btnOnpress={() => {
              handleButtonPress();
            }}
            label={Strings.save}
            style={styles.btnStyle}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  titleStyle: {
    fontWeight: '500',
    color: Colors.Black,
    marginLeft: ms(10),
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
  imgContainer: {
    width: ms(150),
    height: ms(150),
    borderRadius: ms(75),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: ms(20),
  },
  userImg: {
    width: ms(148),
    height: ms(148),
    resizeMode: 'cover',
    borderRadius: ms(74),
  },
  openCamaraContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: Colors.MainColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: ms(8),
    bottom: ms(10),
  },
  openCamara: {
    width: ms(20),
    height: ms(20),
    tintColor: Colors.White,
  },
  detials: {
    marginHorizontal: ms(15),
  },
  titleStyle: {
    color: Colors.Gray,
  },
  inputStyle: {
    borderTopWidth: ms(0),
    borderLeftWidth: ms(0),
    borderRightWidth: ms(0),
    borderBottomWidth: ms(0.5),
    paddingHorizontal: ms(8),
  },
  innerContainerStyle: {
    height: ms(150),
  },
  btnDropDown: {
    width: '100%',
    height: ms(50),
    borderRadius: ms(10),
    borderBottomWidth: ms(0.5),
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
  dropDownIcon: {
    width: ms(20),
    height: ms(20),
  },
  btnStyle: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: ms(50),
  },
});
