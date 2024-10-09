import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeContainer = () => {
     
    const Navigation = useNavigation()

    return (
        <View>
            <Text>HomeContainer</Text>
            <TouchableOpacity onPress={() => {Navigation.navigate('Home2')}} >
                <Text>Button</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeContainer

const styles = StyleSheet.create({})