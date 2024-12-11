import { Text } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILIES } from '../Themes/Themes'
import { decode } from 'html-entities'

const RNText = ({ children, style, ...props }) => {
    return (
        <Text {...props} style={[{ fontSize: 16, fontFamily:FONTFAMILIES.medium , color: COLORS.black }, style]}>
            {children === null || children === undefined || children === '' ? '' : decode(typeof children == Array ? children.filter((c) => c !== '' || c !== undefined).join(' ') : children, { level: 'html5' })}
        </Text>
    )
}
export default RNText
