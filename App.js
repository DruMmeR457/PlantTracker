import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Cat from './components/Cat.js';
import List from './components/ListView.js';
import GetAll from './api/GetAll.js';

export default function App() {
  return (
    <View>
    <Text><Cat /></Text>

    <Text><List /></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
