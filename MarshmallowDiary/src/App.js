import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import { ThemeProvider } from "styled-components"
// import SplashScreen from 'react-native-splash-screen';
import { lightTheme, darkTheme } from "./theme/theme";



const App = () => {
  // useEffect(() => {
  //   try {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 2000);
  //   } catch(e) {
  //     console.warn('에러발생');
  //     console.warn(e);
  //   }
  // });

  const isLight = true;

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App;


const styles = StyleSheet.create({

});