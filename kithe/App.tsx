import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FriendProfile from './screens/FriendProfile';
import { Friend } from './database/schema';

export type RootStackParamList = {
  Home: undefined;
  FriendProfile: { friend: Friend };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
