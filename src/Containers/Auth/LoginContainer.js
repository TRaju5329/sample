import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTFAMILIES, SPACING } from '../../Themes/Themes'

const LoginContainer = () => {
  return (
    <View>
      <Text style={{paddingTop:SPACING.md , fontFamily: FONTFAMILIES.bold}}>LoginContainer</Text>
    </View>
  )
}

export default LoginContainer

const styles = StyleSheet.create({})