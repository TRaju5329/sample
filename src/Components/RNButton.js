import React from 'react'
import RNText from './RNText'
import { COLORS } from '../Themes/Themes'
import Spinner from 'react-native-loading-spinner-overlay'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const RNButton = ({ onPress, loading, btnStyle, btnTextStyle, title,  ...props }) => {
  return (
    <>
      <Spinner textContent="" customIndicator={<View />} size="normal" visible={loading} />
      <TouchableOpacity {...props}   style={[{backgroundColor: COLORS.primary, borderRadius: 5, paddingVertical: 5, alignItems: 'center', flexDirection:"row", justifyContent:"center", gap:10}, btnStyle]} onPress={onPress} activeOpacity={0.9}>
        {loading && (<ActivityIndicator color={COLORS.white}/>)}
        <RNText  {...props} style={[{ color: COLORS.white, fontSize: 20, fontFamily:"Poppins-Medium" },btnTextStyle]}>{title}</RNText>
      </TouchableOpacity>
    </>
  )
}

export default RNButton