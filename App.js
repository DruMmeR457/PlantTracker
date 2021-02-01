import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// import Cat from './components/Cat.js';
// import List from './components/ListView.js';
// import GetAll from './api/GetAll.js';

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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }

    const db = SQLite.openDatabase('PlantDatabase.db');

    // db.transaction(tx => {
    //      // sending 4 arguments in executeSql
    //      tx.executeSql('CREATE TABLE IF NOT EXISTS Plant(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LastWatered DATETIME, LastFertilized DATETIME, LastPotted DATETIME);')
    //    }
    //  );

   // db.transaction(tx => {
   //   tx.executeSql('INSERT INTO Plant (Name, LastWatered, LastFertilized, LastPotted) VALUES (?, ?, ?, ?)', ['gibberish', '6/14', '5/30', '4/15'],
   //     (txObj, resultSet) => this.setState({ data: this.state.data.concat(
   //         { Id: resultSet.insertId, Name: 'gibberish', LastWatered: '6/14', LastFertilized: '5/30', LastPotted: '4/15' }) }),
   //     (txObj, error) => console.log('Error', error))
   // })

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
        <Text>Hello, World!</Text>
        <Text>Hello, World!</Text>
        <Text>Hello, World!</Text>
        <ScrollView>
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
export default App;

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
