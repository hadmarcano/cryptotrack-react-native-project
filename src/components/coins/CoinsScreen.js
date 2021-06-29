import React, {useState, useEffect} from 'react';
import Http from '../../libs/http';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CoinsItem from './CoinItem';
import Colors from '../../res/colors';

const CoinsScreen = props => {
  const {navigation} = props;
  const [coins, setCoins] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    // call api
    setLoading(true);
    getAllCoins();
  }, []);

  const getAllCoins = () => {
    Http.instance
      .get('https://api.coinlore.net/api/tickers/')
      .then(response => {
        // console.log(response);
        setCoins(response.data);
        setLoading(false);
      });
  };

  const handlePress = coin => {
    console.log('go to detail', props);
    navigation.navigate('CoinDetail', {coin});
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.charade,
    },
    titleText: {
      textAlign: 'center',
    },
    btn: {
      padding: 8,
      backgroundColor: 'blue',
      borderRadius: 8,
      margin: 16,
    },
    btnText: {
      color: '#fff',
      textAlign: 'center',
    },
    loader: {
      marginTop: 60,
    },
  });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleText}>BIENVENIDOS A COINS SCREEN</Text>
      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Ir a Detail</Text>
      </Pressable> */}
      {Loading ? (
        <ActivityIndicator style={styles.loader} color="#FFF" size="large" />
      ) : (
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem
              key={item.id}
              item={item}
              onPress={() => handlePress(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default CoinsScreen;
