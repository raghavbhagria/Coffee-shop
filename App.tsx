
import React from 'react'
import DetailScreen from './src/screens/DetailScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './src/navigators/TabNavigator'


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{headerShown:false}} >

      <Stack.Screen name="tab" component={TabNavigator} 
        options={{animation:'slide_from_bottom'}}></Stack.Screen>


        <Stack.Screen name="Details" component={DetailScreen} 
        options={{animation:'slide_from_bottom'}}></Stack.Screen>

<Stack.Screen name="payment" component={PaymentScreen} 
        options={{animation:'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

