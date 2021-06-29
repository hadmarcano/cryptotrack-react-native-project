import React from 'react';
import {View, Text, Image, Pressable, StyleSheet, Platform} from 'react-native';
import UpIcon from '../../assets/arrow_up.png';
import DownIcon from '../../assets/arrow_down.png';
import Colors from '../../res/colors';

const CoinsItem = props => {
  const {item, onPress} = props;

  const getUrlImg = data => {
    if (data > 0) {
      return UpIcon;
    } else {
      return DownIcon;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'space-between',
      borderBottomColor: Colors.zircon,
      borderBottomWidth: 1,
      marginLeft: Platform.OS == 'ios' ? 16 : 0,
      paddingLeft: Platform.OS == 'ios' ? 0 : 16,
    },
    row: {
      flexDirection: 'row',
    },
    nameText: {
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center',
      marginRight: 16,
    },
    symbolText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      marginRight: 12,
    },
    percentText: {
      color: '#fff',
      fontSize: 12,
      marginRight: 8,
    },
    priceText: {
      color: '#FFF',
      fontSize: 14,
    },
    imgIcon: {
      width: 22,
      height: 22,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image
          style={styles.imgIcon}
          source={getUrlImg(item.percent_change_1h)}
        />
      </View>
    </Pressable>
  );
};

export default CoinsItem;
