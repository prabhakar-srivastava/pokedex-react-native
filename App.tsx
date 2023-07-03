import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import BookmarkScreen from './app/screen/BookmarkScreen';
import DetailScreen from './app/screen/DetailScreen';
import ListingScreen from './app/screen/ListingScreen';
import WelcomeScreen from './app/screen/WelcomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListingScreen"
          component={ListingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ headerTransparent: true, headerTitle: () => <View />, headerTintColor: "white" }}
        />
        <Stack.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{ headerTransparent: true, headerTitle: () => <View><Text style={{ fontSize: 30, fontWeight: "700", left: 50 }}>Bookmarks</Text></View>, headerTintColor: "black" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
