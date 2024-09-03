import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Appointments from './src/screens/Appointments';
import Footer from './src/components/footer';

import Configs from './src/screens/Configs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Appointments" 
          component={Appointments} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Configs" 
          component={Configs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}
