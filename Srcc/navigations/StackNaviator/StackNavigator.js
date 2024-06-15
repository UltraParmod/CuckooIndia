import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../../Screens/Home/Home';

export default function StackNavigator() {
  return (
    <View style={{flex: 1}}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({});
