import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = {
  storeData: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      // saving error
      console.log('Store data error: ', e);
      return false;
    }
  },
  getData: async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log('error reading value ', e);
      throw Error(e);
    }
  },
  removeValue: async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      // remove error
      console.log('remove error :', e);
      return false;
    }
  },
  getMultiple: async keys => {
    let values;
    try {
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      // read error
      console.log('storage multiGet error :', e);
      throw Error(e);
    }
    console.log(values);

    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  },
  getAllKeys: async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      console.log(keys);
      // example console.log result:
      // ['@MyApp_user', '@MyApp_key']
      return keys;
    } catch (e) {
      // read key error
      console.log('get all keys error: ', e);
      throw Error(e);
    }
  },
};
