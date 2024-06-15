// library
import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ms} from 'react-native-size-matters';
// Components
import Header from '../../Components/Header';
//Constants
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
// Views
import Installation from './Views/Installation';
import ReInstallation from './Views/ReInstallation';

const RegisterNewProducts = () => {
  const [selectedTab, setselectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <Header IconLeft={true} title={Strings.registerNewProduct} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedTab == 0 ? (
          <Installation />
        ) : (
          <View style={styles.reCointainer}>
            <ReInstallation />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default RegisterNewProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  reCointainer: {
    marginHorizontal: ms(20),
  },
});
