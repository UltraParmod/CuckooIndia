import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './Src/Screens/MainNavigation'
import { Provider } from 'react-redux'
import { store } from './Src/redux/store'

const App = () => {
  return (
    <View>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </View>

  )
}

export default App

const styles = StyleSheet.create({})