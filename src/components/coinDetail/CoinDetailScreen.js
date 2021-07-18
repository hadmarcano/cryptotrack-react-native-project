import React from 'react';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import Storage from '../../libs/storage';

const CoinDetailScreen = props => {
  const {coin} = props.route.params;
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log(coin);
    props.navigation.setOptions({title: coin.symbol});
    getMarkets(coin.id);
    getFavorite(coin.id);
  }, []);

  const getSymbolIcon = nameStr => {
    console.log('nameStr:', nameStr);
    if (nameStr) {
      const name = nameStr.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${name}.png`;
    }
  };

  const getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      // remove from favorites
      removeFromFavorite();
    } else {
      // add to favorites
      addToFavorite();
    }
  };

  const addToFavorite = async () => {
    const key = `favorite-${coin.id}`;
    const stored = await Storage.storeData(key, coin);
    console.log('stored', stored);
    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFromFavorite = () => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Removed'),
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;
          const removed = await Storage.removeValue(key);
          console.log('removed', removed);
          if (removed) {
            setIsFavorite(false);
          }
        },
      },
    ]);
  };

  const getFavorite = async id => {
    try {
      const key = `favorite-${id}`;
      const favStr = await Storage.getData(key);
      console.log('FOVORITO', favStr);
      if (favStr != null) setIsFavorite(true);
    } catch (error) {
      console.log('Get favorite error :', error);
    }
  };

  const getMarkets = async coinId => {
    let result = [];
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    try {
      result = await Http.instance.get(url);
      console.log(result);
      setMarkets(result);
    } catch (err) {
      console.log('call err', err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.charade,
    },
    subHeader: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.white,
      marginLeft: 8,
    },
    iconImage: {
      width: 25,
      height: 25,
    },
    section: {
      maxHeight: 220,
    },
    list: {
      maxHeight: 100,
      paddingLeft: 16,
    },
    row: {
      flexDirection: 'row',
    },
    sectionHeader: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      padding: 8,
    },
    sectionItem: {
      padding: 8,
    },
    sectionText: {
      color: Colors.white,
      fontSize: 14,
      fontWeight: 'bold',
    },
    itemText: {
      color: Colors.white,
      fontSize: 14,
    },
    marketTitle: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 16,
      marginBottom: 16,
    },
    btnFavorite: {
      padding: 8,
      borderRadius: 8,
    },
    btnFavoriteText: {
      color: Colors.white,
    },
    btnFavoriteAdd: {
      backgroundColor: Colors.picton,
    },
    btnFavoriteRemove: {
      backgroundColor: Colors.carmine,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImage}
            source={{uri: getSymbolIcon(coin.nameid)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          );
        }}
        renderSectionHeader={({section}) => {
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          );
        }}
      />
      <Text style={styles.marketTitle}>Markets</Text>
      <FlatList
        horizontal={true}
        style={styles.list}
        keyExtractor={(item, index) => item + index}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

export default CoinDetailScreen;
