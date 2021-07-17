import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../../res/colors';
import FavoriteScreen from './FavoriteScreen';

const Stack = createStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
