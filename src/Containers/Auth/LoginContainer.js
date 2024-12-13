import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTFAMILIES, SPACING } from '../../Themes/Themes'
import RNText from '../../Components/RNText'

const LoginContainer = () => {
  return (
    <View>
      {/* <Text style={{paddingTop:SPACING.md , fontFamily: FONTFAMILIES.bold}}>LoginContainer raju</Text> */}
      <RNText>LoginContainer raju</RNText>
    </View>
  )
}

export default LoginContainer

const styles = StyleSheet.create({})