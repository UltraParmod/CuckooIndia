import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
// Components
import Label from './Label';

const Input = ({
  labelTitle,
  style,
  inputStyle,
  placeholderTxt,
  keyboardType,
  maxLength,
  isLabel,
  value,
  onChangeText,
  titleStyle,
  editable,
  secureTextEntry,
  multiline,
}) => {
  return (
    <View style={{...style}}>
      {isLabel ? <Label labelTitle={labelTitle} /> : null}
      <Label labelTitle={labelTitle} titleStyle={titleStyle} />
      <TextInput
        value={value}
        onChangeText={val => onChangeText(val)}
        style={{...styles.input, ...inputStyle}}
        placeholder={placeholderTxt}
        keyboardType={keyboardType ?? 'default'}
        maxLength={maxLength ?? 1000}
        editable={editable ?? true}
        secureTextEntry={secureTextEntry ?? false}
        returnKeyType="done"
        multiline={multiline}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: '99%',
    height: ms(50),
    borderRadius: ms(10),
    borderWidth: ms(0.5),
    borderColor: Colors.Gray,
    color: Colors.Black,
    fontSize: s(14),
    backgroundColor: Colors.White,
    marginTop: ms(5),
    paddingHorizontal: ms(15),
    fontFamily: Fonts.PoppinsRegular,
  },
});
