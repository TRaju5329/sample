import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeContainer from '../Containers/HomeContainer';
import LoginContainer from '../Containers/Auth/LoginContainer';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown : false}} >
                <Stack.Screen name='Login' component={LoginContainer}/>
                <Stack.Screen name="Home1" component={HomeContainer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})