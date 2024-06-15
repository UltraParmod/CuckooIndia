import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Strings from '../../../../../../../Constants/Strings';

const UseraddressList = ({data}) => {
  return (
    <View>
      <Text>
        {Strings.address}: {data.address}
      </Text>
      <Text>
        {Strings.title}: {data.addressTitle}
      </Text>
      <Text>
        {Strings.country}: {data.country}
      </Text>
      <Text>
        {Strings.state}: {data.state}
      </Text>
      <Text>
        {Strings.district}: {data.district}
      </Text>
      <Text>
        {Strings.pinCode}: {data.pinCode}
      </Text>
    </View>
  );
};

export default UseraddressList;

const styles = StyleSheet.create({});
