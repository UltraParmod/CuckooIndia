import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import Strings from '../Constants/Strings';

const DropdownModal = ({
  visible,
  data,
  onSelected,
  innerContainerStyle,
  closedModal,
  ListEmptyComponent,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.contianer}>
        {closedModal ? (
          <TouchableOpacity
            onPress={() => {
              closedModal();
            }}
            style={styles.btnStyle}></TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnStyle}></TouchableOpacity>
        )}
        <View style={{...styles.innerContainer, ...innerContainerStyle}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={item => item?.id}
            ListEmptyComponent={
              ListEmptyComponent ? (
                <Text>{Strings.Pleaseaddaddressfirst} </Text>
              ) : (
                <Text>{Strings.NoListAvailable}</Text>
              )
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.modalList}
                key={item?.id}
                onPress={() => onSelected(item?.value)}>
                <Text style={styles.selectedValue}>{item?.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DropdownModal;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  innerContainer: {
    backgroundColor: Colors.White,
    padding: ms(15),
    width: '90%',
    borderRadius: ms(10),
    maxHeight: ms(400),
  },
  modalList: {
    width: '100%',
    height: ms(50),
    borderBottomWidth: ms(0.2),
    borderBottomColor: Colors.Gray,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  selectedValue: {
    color: Colors.LightBlack,
    fontSize: s(16),
    fontFamily: Fonts.PoppinsMedium,
  },
  btnStyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
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
});
