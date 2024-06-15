import {Alert, Linking, StyleSheet, View} from 'react-native';
import React from 'react';
// library
import {ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
// Constants
import Colors from '../../../Constants/Colors';
import Strings from '../../../Constants/Strings';
import ScreenName from '../../../Constants/ScreenName';
import Images from '../../../Constants/Images';
// Components
import Header from '../../../Components/Header';
import HelpSupport from './Components/HelpSupport';
const Feedback = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        iconName={false}
        title={Strings.helpsupport}
        titleStyle={styles.titleStyle}
      />
      <View style={{paddingHorizontal: ms(20)}}>
        <View style={styles.flexDirection}>
          <HelpSupport
            imageIcon={Images.fedbackemail}
            label={Strings.contectus}
            onPress={() =>
              Linking.openURL('https://www.cuckooindia.in/contact')
            }
          />
          <HelpSupport
            imageIcon={Images.fedbackinformation}
            label={Strings.faq}
            onPress={() => {
              Alert.alert('FAQs Alert ');
            }}
          />
        </View>

        <View style={{marginTop: ms(20)}}>
          <HelpSupport
            imageIcon={Images.fedbackfeedback}
            label={Strings.feedback}
            onPress={() => {
              navigation.navigate(ScreenName.FEEDBACKREVIWE);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Feedback;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  titleStyle: {
    fontWeight: '700',
    color: Colors.Black,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(40),
  },
});
