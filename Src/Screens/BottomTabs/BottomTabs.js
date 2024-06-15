import {Image, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
// libairy
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ms, s} from 'react-native-size-matters';
// Constants
import ScreenName from '../../Constants/ScreenName';
import Colors from '../../Constants/Colors';
import Images from '../../Constants/Images';
// Screens
import Home from './Home/Home';
import Feedback from './Feedback/Feedback';
import Profile from './Profile/Profile';
import CuckooRewards from './Rewards/Rewards';
import Fonts from '../../Constants/Fonts';

// Varables
const icon_height = 20;
const icon_width = 20;
const fontSize = 10;
const font_Family = Fonts.PoppinsRegular;
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.MainColor,
          tabBarInactiveTintColor: Colors.GreyTxt,
          tabBarStyle: {
            height: s(65),
            borderTopLeftRadius: ms(30),
            borderTopRightRadius: ms(30),
            paddingVertical: ms(10),
            paddingBottom: Platform.OS == 'android' ? ms(10) : ms(17),
            backgroundColor: Colors.TransplanteGey,
          },
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name={ScreenName.HOME}
          component={Home}
          options={{
            tabBarLabel: 'HOME',
            tabBarLabelStyle: {
              fontSize: fontSize,
              fontWeight: '600',
              fontFamily: font_Family,
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={Images.home}
                style={{
                  width: s(icon_width),
                  height: s(icon_height),
                  tintColor: focused ? Colors.MainColor : Colors.LightGray,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ScreenName.FEEDBACK}
          component={Feedback}
          options={{
            tabBarLabel: 'HELP & SUPPORT',
            tabBarLabelStyle: {
              fontSize: fontSize,
              fontWeight: '600',
              fontFamily: font_Family,
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={Images.feedback}
                style={{
                  width: s(icon_width),
                  height: s(icon_height),
                  tintColor: focused ? Colors.MainColor : Colors.LightGray,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ScreenName.CUCKOOREWARDS}
          component={CuckooRewards}
          options={{
            tabBarLabel: 'CUCKOO REWARDS',
            tabBarLabelStyle: {
              fontSize: fontSize,
              fontWeight: '600',
              fontFamily: font_Family,
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={Images.rewards}
                style={{
                  width: s(icon_width),
                  height: s(icon_height),
                  tintColor: focused ? Colors.MainColor : Colors.LightGray,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ScreenName.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'SETTINGS',
            tabBarLabelStyle: {
              fontSize: fontSize,
              fontWeight: '600',
              fontFamily: font_Family,
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? Images.settingss : Images.settingss}
                style={{
                  width: s(icon_width),
                  height: s(icon_height),
                  tintColor: focused ? Colors.MainColor : Colors.LightGray,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
