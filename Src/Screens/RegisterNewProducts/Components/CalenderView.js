import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Images from '../../../Constants/Images';
import Colors from '../../../Constants/Colors';
import DateTimePicker from 'react-native-date-picker';
// Components
import Label from '../../../Components/Label';
const CalenderView = ({
  reciveFunc,
  minimumDate,
  maximumDate,
  labelTitle,
  disabled,
  selected,
}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    reciveFunc(selectedDate);
  };
  const showDatePicker = () => {
    setShowPicker(true);
  };
  return (
    <View>
      <Label labelTitle={labelTitle} />
      <View style={{...styles.btnDropDown, ...styles.dateTimeContainer}}>
        <Text style={{...styles.dateTxt, ...selected}}>
          {date?.toLocaleString()}
        </Text>
        <TouchableOpacity onPress={showDatePicker} disabled={disabled}>
          <Image source={Images.dateTime} style={{tintColor: Colors.Black}} />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          modal
          open={showPicker}
          date={date}
          onConfirm={date => {
            setShowPicker(false);
            setDate(date);
            reciveFunc(date);
          }}
          onCancel={() => {
            setShowPicker(false);
          }}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default CalenderView;
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
  dateTxt: {
    fontSize: s(16),
    color: Colors.Black,
  },
});
