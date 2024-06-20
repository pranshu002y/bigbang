import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import Home from './Homepage';
import Search from './Search';
import Profile from './Profile';
import Stories from './Stories'; // Import your Stories component
import LoginScreen from './LoginScreen';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home-sharp' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'ios-search-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
        } else if (route.name === 'Reels') {
          iconName = focused ? 'film' : 'film-outline';
        }

        return <Ionicons name={iconName} size={size} color={"black"} />;
      },
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 60,
      },
      headerShown: false, 
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);



export default TabNavigator;
