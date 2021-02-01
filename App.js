import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Cat from './components/Cat.js';
import List from './components/ListView.js';
import GetAll from './api/GetAll.js';

import * as SQLite from 'expo-sqlite';

// export default function App() {
//   return (
//     <View>
//     <Text><Cat /></Text>
//     <Text><GetAll /></Text>
//     <Text><List /></Text>
//     </View>
//   );
// }

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }

    const db = SQLite.openDatabase('PlantDatabase.db');

    db.transaction(tx => {
         // sending 4 arguments in executeSql
         tx.executeSql('SELECT * FROM Plant', null, // passing sql query and parameters:null
           // success callback which sends two things Transaction object and ResultSet Object
           (txObj, { rows: { _array } }) => this.setState({ data: _array }),
           // failure callback which sends two things Transaction object and Error
           (txObj, error) => console.log('Error ', error)
           ) // end executeSQL
       })
  }
  render() {
    return (
        <View style={styles.container}>
        <ScrollView style={styles.container}>
        {
            this.state.data && this.state.data.map(data =>
            (
                <View key={data.Id} style={styles.plant}>
                <Text >{data.Name} - {data.LastWatered}</Text>
                </View>
            )
        )}
        </ScrollView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plant: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
