import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../../../Constants/Colors';
// Componetns
import Label from '../../../Components/Label';
import Fonts from '../../../Constants/Fonts';

const Browse = ({onPressBrowse, labelTitle, cardTitle, btnTitle}) => {
  return (
    <View style={styles.container}>
      <Label labelTitle={labelTitle} />
      <View style={styles.browseContainer}>
        <Text style={styles.warrantycard}>{cardTitle}</Text>
        <TouchableOpacity
          style={styles.btnBrowse}
          onPress={() => {
            onPressBrowse();
          }}>
          <Text style={styles.browseTxt}>{btnTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Browse;
const styles = StyleSheet.create({
  browseContainer: {
    flexDirection: 'row',
    width: '100%',
    height: ms(50),
    borderColor: Colors.Gray,
    borderRadius: ms(15),
    borderWidth: ms(0.5),
    alignSelf: 'center',
    marginTop: ms(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignItems: 'center',
  },
  warrantycard: {
    color: Colors.LightGray,
    paddingLeft: ms(10),
    fontSize: s(14),
    width: '50%',
    paddingVertical: ms(8),
    fontFamily: Fonts.PoppinsRegular,
  },
  btnBrowse: {
    backgroundColor: Colors.MainColor,
    width: '40%',
    height: '100%',
    color: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: ms(15),
    borderBottomRightRadius: ms(15),
    marginTop: ms(0.1),
  },
  browseTxt: {
    color: Colors.White,
    fontSize: s(14),
    fontFamily: Fonts.PoppinsRegular,
  },
});
