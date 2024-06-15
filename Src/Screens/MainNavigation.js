import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Constants
import ScreenName from '../Constants/ScreenName';
import Colors from '../Constants/Colors';
// Screens
import OtpVerifactions from './OtpVerifactions/OtpVerifactions';
import BottomTabs from './BottomTabs/BottomTabs';
import RegisterNewProducts from './RegisterNewProducts/RegisterNewProducts';
import RequestForService from './BottomTabs/RequestForService/RequestForService';
import MyProfile from './BottomTabs/Profile/Screens/MyProfile/MyProfile';
import Addresses from './BottomTabs/Profile/Screens/Addresses/Addresses';
import Settings from './BottomTabs/Profile/Screens/Settings/Settings';
import Logout from './BottomTabs/Profile/Screens/Logout/Logout';
import SaveAddress from './BottomTabs/Profile/Screens/Addresses/Screen/SaveAddress/SaveAddress';
import NameEmail from './NameEmail/NameEmail';
import FeedbackReview from './BottomTabs/Feedback/Components/FeedbackReview';
import MyPurchase from './BottomTabs/Profile/Screens/MyPurchase/MyPurchase';
import Requests from './BottomTabs/Profile/Screens/Requests/Requests';
import Login from './Login/Login';

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.MainColor} barStyle="default" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenName.LOGIN} component={Login} />
        <Stack.Screen
          name={ScreenName.OTPVERIFACTION}
          component={OtpVerifactions}
        />
        <Stack.Screen name={ScreenName.NAMEEMAIL} component={NameEmail} />
        <Stack.Screen name={ScreenName.BOTTOMTABS} component={BottomTabs} />
        <Stack.Screen
          name={ScreenName.REGISTERNEWPRODUCTS}
          component={RegisterNewProducts}
        />
        <Stack.Screen name={ScreenName.MYPURCHASE} component={MyPurchase} />
        <Stack.Screen name={ScreenName.REQUESTS} component={Requests} />
        <Stack.Screen
          name={ScreenName.MYPROFILE}
          component={MyProfile}
          options={{animation: 'flip'}}
        />
        <Stack.Screen
          name={ScreenName.REQUESTFORSERVICE}
          component={RequestForService}
          options={{animation: 'flip'}}
        />
        <Stack.Screen
          name={ScreenName.ADDRESSES}
          component={Addresses}
          options={{animation: 'flip'}}
        />
        <Stack.Screen
          name={ScreenName.SETTINGS}
          component={Settings}
          options={{animation: 'flip'}}
        />
        <Stack.Screen
          name={ScreenName.LOGOUT}
          component={Logout}
          options={{animation: 'flip'}}
        />
        <Stack.Screen
          name={ScreenName.SAVEADDRESS}
          component={SaveAddress}
          options={{animation: 'flip'}}
        />
        <Stack.Screen
          name={ScreenName.FEEDBACKREVIWE}
          component={FeedbackReview}
          options={{animation: 'flip'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
const styles = StyleSheet.create({});
