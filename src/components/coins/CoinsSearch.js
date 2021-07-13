import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

const CoinsSearch = props => {
  const {onChange} = props;
  const [values, setValues] = useState({
    query: '',
  });

  const {query} = values;

  const handleText = query => {
    setValues({
      ...values,
      query,
    });

    if (onChange) {
      onChange(query);
    }
  };

  const styles = StyleSheet.create({
    textInput: {
      height: 46,
      backgroundColor: Colors.charade,
      paddingLeft: 16,
      color: '#fff',
    },
    textInputAndroid: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.zircon,
    },
    textInputIOS: {
      margin: 8,
      borderRadius: 8,
    },
  });

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        value={query}
        onChangeText={handleText}
        placeholder={'Search coin'}
        placeholderTextColor="#fff"
      />
    </View>
  );
};

export default CoinsSearch;
