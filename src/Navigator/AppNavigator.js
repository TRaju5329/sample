import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import OrderConfirmScreen from '../Screens/OrderConfirmScreen';
import OrderScreen from '../Screens/OrderScreen';
import ThanksScreen from '../Screens/ThanksScreen';
import QRPayment from '../Screens/QRPayment';
import ExportData from '../Screens/ExportData';
import FruitsList from '../Screens/FruitsList';
import FruitsList1 from '../Screens/FruitsList1';
import HomeContainer from '../Containers/HomeContainer';
import ReportsScreen from '../Screens/ReportsScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown : false}} >
                <Stack.Screen name='Fruitslist' component={FruitsList}/>
                <Stack.Screen name='Reports' component={ReportsScreen}/>
                <Stack.Screen name='Fruitslist1' component={FruitsList1}/>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name='HomeContiner' component={HomeContainer}/>
                <Stack.Screen name='Exportdata' component={ExportData}/>
                <Stack.Screen name="QRPayment" component={QRPayment}/>
                <Stack.Screen name="Order" component={OrderScreen} />
                <Stack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
                <Stack.Screen name="Thanks" component={ThanksScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})