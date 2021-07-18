import React, {useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import colors from '../../res/colors';
import FavoriteEmptyState from './FavoriteEmptyState';
import CoinItem from '../coins/CoinItem';
import Storage from '../../libs/storage';
import {useEffect} from 'react/cjs/react.development';

const FavoriteScreen = props => {
  const [listFavorites, setListFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
    props.navigation.addListener('focus', () => getFavorites());
    return function cleanup() {
      props.navigation.removeListener('focus', () => getFavorites());
    };
  }, []);

  const handlePress = coin => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.getAllKeys();
      console.log('ALL KEYS', allKeys);
      const keys = allKeys.filter(key => key.includes('favorite-'));
      console.log('FAVORITE KEYS :', keys);
      const favs = await Storage.getMultiple(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      console.log('FAVORITES LIST', favorites);
      setListFavorites(favorites);
    } catch (error) {
      console.log('Have occurred an error get all keys', error);
    }
  };

  return (
    <View style={styles.container}>
      {listFavorites.length == 0 ? (
        <FavoriteEmptyState />
      ) : (
        <FlatList
          data={listFavorites}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => handlePress(item)} />
          )}
          keyExtractor={item => item.id}
        />
      )}
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
