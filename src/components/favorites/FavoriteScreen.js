import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../res/colors';
import FavoriteEmptyState from './FavoriteEmptyState';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <FavoriteEmptyState />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoriteScreen;
