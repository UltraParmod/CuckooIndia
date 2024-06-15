import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// library
import {ms, s} from 'react-native-size-matters';
// Constants
import Strings from '../../../../Constants/Strings';
import Colors from '../../../../Constants/Colors';
// Components
import Header from '../../../../Components/Header';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import {postApi} from '../../../../Utils/commenFunction';
import Config from '../../../../Constants/Config';
import {useSelector} from 'react-redux';
import DocumentPicker, {types} from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const FeedbackReview = () => {
  const [feedback, setFeedback] = useState('');
  const [fileResponse, setFileResponse] = useState({});
  const [storefeedbacklist, setStoreFeedbackList] = useState([]);
  const getuserId = useSelector(state => state.UserDetail?.data?.userId);
  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: types.pdf,
      });
      setFileResponse(response[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const _addFeedback = async () => {
    if (feedback == '') {
      Alert.alert('Please Select feedback ');
      return;
    } else {
      try {
        let data = new FormData();
        data.append('userId', getuserId);
        data.append('Message', feedback);
        data.append('feedbackDoc', fileResponse);
        const res = await postApi(Config.AddFeedbackApi, data);
        if (res?.status) {
          _getFeedbackList();
        }
      } catch (error) {
        console.log('save feedback error', error);
      }
      Alert.alert('Feedback sent successfully ..');
    }
  };
  const _getFeedbackList = async () => {
    const response = await postApi(Config.FeedbackListApi, {
      userId: getuserId,
    });

    setStoreFeedbackList(response.data.feedbackList);
  };

  useEffect(() => {
    _getFeedbackList();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={Strings.feedback} titleStyle={styles.titleStyle} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={150}>
        <View style={styles.innerContianer}>
          <Input
            labelTitle={Strings.submitfeedback}
            inputStyle={styles.inputStyle}
            value={feedback}
            multiline={true}
            onChangeText={txt => setFeedback(txt)}
          />
          <Button
            label={Strings.btnSubmit}
            style={styles.btnStyle}
            labelStyle={styles.labelStyle}
            btnOnpress={() => {
              _addFeedback();
              setFileResponse(''), setFeedback('');
            }}
          />
          <View
            style={{
              borderRadius: 10,
            }}></View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FeedbackReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  titleStyle: {
    color: Colors.LightGray,
    fontWeight: '500',
  },
  innerContianer: {
    padding: ms(20),
    marginTop: ms(-30),
  },
  inputStyle: {
    height: ms(110),
    marginTop: ms(10),
    textAlignVertical: 'top',
  },
  btnStyle: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: ms(20),
  },
  labelStyle: {
    fontSize: s(15),
  },
});
