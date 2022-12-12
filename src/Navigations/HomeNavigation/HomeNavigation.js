import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {HomeScreen, DetailInforScreen, CameraHomeScreen} from '../../Screens';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        component={CameraHomeScreen}
        name={'CameraHomeScreen'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{headerShown: false}}
      />

      <Stack.Screen
        component={DetailInforScreen}
        name={'DetailInforScreen'}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MainNavigation;
