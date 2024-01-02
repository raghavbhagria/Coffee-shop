import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="shopping-cart"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="heart"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="bell"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
});

export default TabNavigator;
