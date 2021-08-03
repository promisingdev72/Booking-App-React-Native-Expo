import AsyncStorage from '@react-native-community/async-storage';

export const Storage = {
    setAsyncItem: async (key, obj) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(obj));
        } catch (e) {
            console.log(e);
        }
    },
    getAsyncItem: async (key) => {
        try {
            const obj = await AsyncStorage.getItem(key);
            return obj !== null ? JSON.parse(obj) : null
        } catch (e) {
            console.log(e);
        }
    },
    clearAsyncItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            console.log(e);
        }
        console.log('Done')
    }
}